require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser= require('body-parser')
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const SortMiddleware = require('./app/middlewares/sortMiddleware');

const exp = require('constants');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');

//connect toi db
db.connect();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

//http logger
app.use(morgan('combined'));

app.use(methodOverride('_method'));

//custom middlewares
app.use(SortMiddleware);

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

//localhost: 127.0.0.1
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
