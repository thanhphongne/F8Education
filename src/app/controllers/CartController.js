const Cart = require('../models/Cart');
const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { render } = require('node-sass');
class CartController {

    index(req, res, next) {
        Cart.find({})
            .then((carts) => {
                res.render('cart', {
                    carts: mutipleMongooseToObject(carts),
                });
            })
            .catch(next);
    }
    store (req, res) {
        // res.send(req.params.id);
        const newCart = new Cart(req.body);
        newCart
            .save()
            .then(() => res.redirect('/'))
    }

    delete(req, res, next) {
        Cart.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

module.exports = new CartController();
