const express = require('express');
const router = express.Router();
// const authenticate = require('../app/middlewares/authenticate');

const meController = require('../app/controllers/MeController');
// courseController.index

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
