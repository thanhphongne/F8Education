const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    question: { type: String, required: true },
    image: { type: String},
    answers: { type: Array },
    slug: { type: String, slug: 'question', unique: true },
}, {timestamps: true});


module.exports = mongoose.model('Question', questionSchema);