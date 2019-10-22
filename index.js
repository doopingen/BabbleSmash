//Initialize Express
const express = require('express');
const path = require('path');

//Initialize Authentication
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const RateLimit = require('express-rate-limit');

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

//Setup Production routes 
app.use('/', require('./routes/prodRoutes'));

//Start server
app.listen(3000, function() {
    console.log('Server hot to trot on 3000 buddy')
})