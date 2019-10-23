const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');

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