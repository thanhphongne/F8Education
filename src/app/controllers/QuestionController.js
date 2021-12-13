const Question = require("../models/Question");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require('../../util/mongoose');

class QuestionController {

  show(req, res, next) {
    Question.findOne({ slug: req.params.slug })
        .then((question) => {
            res.render('question/show', {
              question: mongooseToObject(question),
            });
        })
        .catch(next);
}
  //[POST] /question/store
  store(req, res, next) {
    req.body.image = req.file.path.split("\\").slice(2).join("/");

    const question = new Question(req.body);
    question
      .save()
      .then(() => res.redirect("/question"))
      .catch(next);
  }
  //[GET] /question
  index(req, res, next) {
    Question.find({})
      .then((questions) => {
        res.render("question/question", {
          questions: mutipleMongooseToObject(questions),
        });
      })
      .catch(next);
  }
  //[PUT] /question/:id
  answer(req, res, next) {
    console.log(req.body.answers);
    Question.updateOne({ _id: req.params.id }, { $push: { answers: req.body.answers } })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new QuestionController();
