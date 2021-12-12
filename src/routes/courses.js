const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../app/middlewares/authenticate');

const courseController = require('../app/controllers/CourseController');

router.get('/create',verifyTokenAndAdmin, courseController.create);
router.post('/store',verifyTokenAndAdmin, courseController.store);
router.get('/:id/edit',verifyTokenAndAdmin, courseController.edit);
router.post('/handle-form-actions',verifyTokenAndAdmin, courseController.handleFormActions);
router.put('/:id',verifyTokenAndAdmin, courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id',verifyTokenAndAdmin, courseController.delete);
router.delete('/:id/force',verifyTokenAndAdmin, courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;
