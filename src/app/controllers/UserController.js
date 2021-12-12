const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { render } = require('node-sass');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

class UserController {
    
    
    // [GET] /users/:id/edit
    edit(req, res, next) {

        User.findById(req.params.id).then((user) =>
            res.render('users/edit', {
                user: mongooseToObject(user),
                hashedPassword : CryptoJS.AES.decrypt(
                    user.password,
                    process.env.PASS_SEC,
                ).toString(CryptoJS.enc.Utf8)
            }),
        );
    }
    // [PUT] /users/:id
    update(req, res, next) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC,
        ).toString(),
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/users'))
            .catch(next);
    }
    //[DELETE] /users/:id
    delete(req, res, next) {
        User.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /users/:id/force
    forceDelete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /users/:id/restore
    restore(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [POST] /user/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            //xoa mem
            case 'delete':
                User.delete({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            //xoa vinh vien
            case 'deleteforce':
                User.deleteMany({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            //khoi phuc
            case 'restore':
                User.restore({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new UserController();
