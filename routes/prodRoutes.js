//Router dependencies
const express = require('express');
const router = express.Router();
const fs = require('fs');
const isLoggedIn = require('./middleware/isLoggedIn');

//Home route
router.get('/', function(req, res) {
    res.render('index')
});

//User Login route
router.get('/login', function(req, res) {
    res.render('login')
});

//User Profile route
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile')
});

//Results route
router.get('/results', function(req, res) {
    var article = fs.readFileSync('./glass.json');
    var articleData = JSON.parse(article);
    res.render('results', { urlData: articleData });
})

module.exports = router;