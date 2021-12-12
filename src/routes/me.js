const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../app/middlewares/authenticate');

const meController = require('../app/controllers/MeController');
// courseController.index

router.get('/stored/courses',verifyTokenAndAdmin, meController.storedCourses);
router.get('/stored/users',verifyTokenAndAdmin, meController.storedUsers);
router.get('/trash/courses',verifyTokenAndAdmin, meController.trashCourses);
router.get('/trash/users',verifyTokenAndAdmin, meController.trashUsers);

module.exports = router;
