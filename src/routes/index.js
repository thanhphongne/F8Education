const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const meRouter = require('./me');
const questionRouter = require('./question');
const authRouter = require('./auth');

function route(app) {
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/question', questionRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
    
}
module.exports = route;
