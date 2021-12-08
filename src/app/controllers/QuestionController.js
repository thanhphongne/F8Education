const Question = require('../models/Question');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class QuestionController {
    //[POST] /question/store
    store(req, res, next) {
        req.body.image = req.file.path;
        const question = new Question(req.body);
        question
            .save()
            .then(() => res.redirect('/question'))
            .catch(next);
    }
    //[GET] /question
    index(req, res, next) {
        Question.find({})
            .then((questions) => {
                res.render('question/question', {
                    questions: mutipleMongooseToObject(questions),
                });
            })
            .catch(next);
    }
    //[PUT] /question/:id
    answer(req, res, next) {
        Question.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/question'))
            .catch(next);
    }
}

module.exports = new QuestionController();
