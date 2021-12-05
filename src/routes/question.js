const express = require('express');
const router = express.Router();

const questionController = require('../app/controllers/QuestionController');

    router.put('/:id', questionController.answer);
    router.post('/store', questionController.store);
    router.get('/', questionController.index);

module.exports = router;
