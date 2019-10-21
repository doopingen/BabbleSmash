//Router dependencies
const express = require('express');
const router = express.Router();

//Home route
router.get('/', function(req, res) {
    res.render('index')
});

//Results route
router.get('/results', function(req, res) {
    res.render('results')
})

module.exports = router;