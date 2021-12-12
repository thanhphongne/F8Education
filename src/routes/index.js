const cartRouter = require('./cart');
const coursesRouter = require('./courses');
const userRouter = require('./users');
const siteRouter = require('./site');
const meRouter = require('./me');
const questionRouter = require('./question');
const authRouter = require('./auth');

function route(app) {
    app.use('/me', meRouter);
    app.use('/cart', cartRouter);
    app.use('/courses', coursesRouter);
    app.use('/users', userRouter);
    app.use('/question', questionRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}
module.exports = route;
