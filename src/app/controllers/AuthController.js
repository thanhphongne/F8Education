const User = require('../models/User');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerForm = (req, res) => {
    res.render('auth/register');
}
const loginForm = (req, res) => {
    res.render('auth/login');
}

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if(err) {
            res.json({ 
                error: err
            })
        }
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.redirect('/auth/loginForm')
            })
            .catch(error => {
                res.json({ 
                    message: 'Error saving user'
                })
            })
    })
}
const login = (req, res, next) => {
    var username = req.body.email
    var password = req.body.password

    User.findOne({ $or: [{ email: username},{phone:username}]})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(err) {
                        error: err
                    }
                    if(result){
                        let token = jwt.sign({name: user.name}, 'thesecrettoken', {expiresIn: '30s'});
                        // let refreshtoken = jwt.sign({name: user.name}, 'therefreshtokensecret', {expiresIn: '2h'});
                        res.status(200).json({
                            message: 'Login successful',
                            token
                            // refreshtoken
                        })
                        // res.redirect('/')
                    }else{
                        res.status(200).json({
                            message: 'Password incorrect'
                        })
                    }
                })
            }
            else {
                res.json({ 
                    message: 'No user found'
                })
            }
        })
}
// const refreshToken = (req, res, next) => {
//     const refreshToken = req.body.refreshToken
//     jwt.verify(refreshToken, 'therefreshtokensecret', function(err,decode){
//         if(err) {
//             res.status(400).json({
//                 err
//             })
//         }
//         else {
//             let token = jwt.sign({name: decode.name}, 'thesecrettoken', {expiresIn: '60s'})
//             let refreshToken = req.body.refreshToken
//             res.status(200).json({
//                 message: 'Token refreshed successfully',
//                 token,
//                 refreshToken
//             })
//         }
//     })
// }


module.exports ={ 
    registerForm,
    loginForm,
    register,
    login
    // refreshToken
}