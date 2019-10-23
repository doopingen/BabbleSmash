const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const qs = require('querystring')

const YONDER_URL = 'https://api.yonderlabs.com/1.0/text/allsingletext/fromURL?access_token=';
const testUrl = 'url=https%3A%2F%2Fnewrepublic.com%2Farticle%2F155292%2Fbetsy-devos-cost-trump-election'
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };


//GET - Root route
router.get('/', function(req, res) {
    res.render('index');
});

//GET - Login route
router.get('/login', function(req, res) {
  res.render('login');
});

//GET - Logout route
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

router.post('/results', function(req, res) {
  var requestBody = {
    url: req.body.url,
  };
  axios.post(YONDER_URL + process.env.YONDER_API,
    qs.stringify(requestBody) , config).then(function(response) {
    res.render('results', { urlData: response.data })
  }).catch(function(err) {
    console.log(err);
    res.redirect('profile');
  });
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
});

//POST - Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: 'profile',
  failureRedirect: 'login',
  successFlash: 'You have logged in',
  failureFlash: 'Invalid credentials'
}));

//POST - Signup route
router.post('/signup', function(req, res) {
  // Find or create the user
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]) {
    if(created) {
      //we created it, redirect to profile
      console.log('User successfully created');
      passport.authenticate('local', { 
        successRedirect: '/',
        successFlash: 'You have successfully logged in with new account'
      })(req, res);
    }else {
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('login');
    }
  }).catch(function(err) {
    console.log(err);
    res.redirect('login');
  });
  // if user existed, error and rediect to signup
  // else, we created it, redirect to home
  // catch any errors
});

module.exports = router;