const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: 'profile',
  failureRedirect: 'login',
  successFlash: 'You have logged in',
  failureFlash: 'Invalid credentials'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

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
      //we created it, redirect to home
      console.log('User successfully created');
      passport.authenticate('local', { 
        successRedirect: '/',
        successFlash: 'You have successfully logged in with new account'
      })(req, res);
    }else {
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('/');
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