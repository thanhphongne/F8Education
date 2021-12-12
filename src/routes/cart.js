const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../app/middlewares/authenticate');

const cartController = require('../app/controllers/CartController');

router.post('/',verifyTokenAndAuthorization, cartController.store);
router.post('/delete/:id',verifyTokenAndAuthorization, cartController.delete);
router.get('/',verifyTokenAndAuthorization, cartController.index);

module.exports = router;
