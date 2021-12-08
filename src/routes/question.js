const express = require('express');
const router = express.Router();
const multer  = require('multer');


const upload = multer({ dest: 'uploads/' });

const questionController = require('../app/controllers/QuestionController');

router.put('/:id', questionController.answer);
router.post('/store',upload.single('image'), questionController.store);
router.get('/', questionController.index);

module.exports = router;
