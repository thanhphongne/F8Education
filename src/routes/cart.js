const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.post('/', cartController.store);
router.post('/delete/:id', cartController.delete);
router.get('/', cartController.index);

module.exports = router;
