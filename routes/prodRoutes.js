//Router dependencies
const express = require('express');
const router = express.Router();
const fs = require('fs');

//Home route
router.get('/', function(req, res) {
    res.render('index')
});

//Results route
router.get('/results', function(req, res) {
    var article = fs.readFileSync('./glass.json');
    var articleData = JSON.parse(article);
    res.render('results', { urlData: articleData });

})

module.exports = router;