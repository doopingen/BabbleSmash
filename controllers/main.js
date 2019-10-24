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

//POST - Logout route
router.post('/results', function(req, res) {
  var requestBody = {
    url: req.body.url,
  };
  axios.post(YONDER_URL + process.env.YONDER_API,
    qs.stringify(requestBody), config).then(function(response) {
      res.render('results', { urlData: response.data })
  }).catch(function(err) {
    console.log(err);
    res.redirect('profile');
  });
});

//GET - Profile page
router.get('/profile', isLoggedIn, function(req, res) {
  db.user.findByPk(req.user.id)
  .then(function(user) {
    user.getArticles().then(function(articles) {
      res.render('profile', {
        articles : articles,
        user: req.user
      })
    })
  })
});

//POST - Save Route
router.post('/save', function(req, res) {
  db.user.findByPk(req.user.id).then(function(user) {
    user.createArticle({
      text: req.body.sentiment,
      summary: req.body.summary,
      url: req.body.url,
    })
  })
 .then(function(article) {
    console.log(article);
    res.redirect('profile')
  })
});

// post.getAuthor().then(function(author) {
//   post.getComments().then(function(comments) {
//       res.render('posts/show', {post, author, comments})

// db.post.findByPk(postId)
//     .then(function(post) {
//         console.log(`Post: ${post}`)
//         db.tag.findOrCreate({
//             where:{
//                 name: req.body.name
//             }
//         }).then(function([tag, created]) {
//             console.log(`Tag: ${tag}`)
//             post.addTag(tag).then(function(data) {
//                 res.redirect(`/posts/${postId}`)
//             })

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