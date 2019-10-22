//Initialize Express
const express = require('express');
const path = require('path');  

//Setup Express for use
const app = express();

//Set default view engine to Pug and set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Setup Express
app.use(express.static('public'));

//Setup Production routes 
app.use('/', require('./routes/prodRoutes'));

//Start server
app.listen(3000, function() {
    console.log('Server hot to trot on 3000 buddy')
})