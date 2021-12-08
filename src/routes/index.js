const cartRouter = require('./cart');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const meRouter = require('./me');
const questionRouter = require('./question');
const authRouter = require('./auth');
// const {
//     verifyToken,
//     verifyTokenAndAuthorization,
//     verifyTokenAndAdmin,
// } = require('../app/middlewares/authenticate');

function route(app) {
    app.use('/me', meRouter);
    app.use('/cart', cartRouter);
    app.use('/courses', coursesRouter);
    app.use('/question', questionRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}
module.exports = route;
