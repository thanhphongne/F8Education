const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const registerForm = (req, res) => {
    res.render('auth/register');
};
const loginForm = (req, res) => {
    res.render('auth/login');
};

const register = async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC,
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).redirect('/auth/loginForm');
        
    } catch (err) {
        res.status(500).json(err);
    }
};

//login
const login = async (req, res, next) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json('Wrong credentials!');

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC,
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password &&
            res.status(401).json('Wrong credentials!');

        const accessToken = jwt.sign(
            {
                id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' },
        );

        //const { password, ...others } = user._doc;

        res
            .status(201)
            .cookie('accessToken', accessToken)
            .cookie('userId', user._id)
            .redirect('/')

        
    } catch (err) {
        res.status(500).json(err);
    }
};
const logout = (req, res) => {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('userId', { path: '/' });
    res.redirect('/')
}

module.exports = {
    registerForm,
    loginForm,
    register,
    login,
    logout
};
