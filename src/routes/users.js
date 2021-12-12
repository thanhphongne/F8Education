const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../app/middlewares/authenticate');

const userController = require('../app/controllers/UserController');


router.get('/:id/edit',verifyTokenAndAdmin, userController.edit);
router.post('/handle-form-actions',verifyTokenAndAdmin, userController.handleFormActions);
router.put('/:id',verifyTokenAndAdmin, userController.update);
router.patch('/:id/restore', userController.restore);
router.delete('/:id',verifyTokenAndAdmin, userController.delete);
router.delete('/:id/force',verifyTokenAndAdmin, userController.forceDelete);
module.exports = router;
