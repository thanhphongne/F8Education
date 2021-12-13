const Cart = require('../models/Cart');
const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { render } = require('node-sass');
const jwt = require('jsonwebtoken');



class CartController {
    index(req, res, next) {
        Cart.find({userId: req.cookies.userId})
            .then((carts) => {
                res.render('cart', {
                    carts: mutipleMongooseToObject(carts),
                });
            })
            .catch(next);
    }
    store (req, res, next) {
        req.body.userId = req.cookies.userId;
        const newCart = new Cart(req.body);
        // console.log(newCart);
        newCart
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    delete(req, res, next) {
        Cart.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

module.exports = new CartController();
