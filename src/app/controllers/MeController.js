const Course = require('../models/Course');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/stored/users
    storedUsers(req, res, next) {
        Promise.all([
            User.find({}).sortable(req),
            User.countDocumentsDeleted(),
        ])
            .then(([users, deletedCount]) =>
                res.render('me/stored-users', {
                    deletedCount,
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }

    // [GET]  /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET]  /me/trash/users
    trashUsers(req, res, next) {
        User.findDeleted({})
            .then((users) =>
                res.render('me/trash-users', {
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
