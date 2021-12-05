const express = require('express');
const router = express.Router();


const AuthController = require('../app/controllers/AuthController');


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// router.post('/refresh-token', AuthController.refreshToken);
router.get('/registerForm', AuthController.registerForm);
router.get('/loginForm', AuthController.loginForm);


module.exports = router;