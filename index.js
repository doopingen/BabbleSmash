//Initialize Express
require('dotenv').config();
const express = require('express');
const path = require('path');

//Initialize Authentication
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const RateLimit = require('express-rate-limit');
const methodOverride = require('method-override');

//Set Database models
const db = require('./models');

//Setup Express to use it as a middleware
const app = express();

//Set default view engine to Pug and set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Setup Express
app.use(express.static('public'));
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(methodOverride('_method'))

//Rate limiters for login and signup
const loginLimiter = new RateLimit({
    windowMs: 1000 * 60 * 5,
    max: 3,
    message: 'Maximum login attempts exceeded. Please try again later.'
});

const signupLimiter = new RateLimit({
    windowMs: 1000 * 60 * 5,
    max: 3,
    delayMs: 0,
    message: 'Maximum login attempts exceeded. Please try again later.'
});

const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
});

//Session must come before flash and passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

//Use this line once to setup the store table
sessionStore.sync();

//Most come after session abd before passport middleware
app.use(flash());

// This must come after we setup the session
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    //before every route, attach the flas messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
})

// //Setup Production routes 
app.use('/', require('./controllers/main'));

//Start server
var server = app.listen(process.env.PORT || 3000);

module.exports = server;