const express = require('express');
const passport = require('../config/passportConfig');

const db = require('../models');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile/recipes',
  successFlash: 'Successfully logged in.',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    req.flash('error', 'Passwords don\'t match.  Please try again.');
    res.redirect('/auth/signup');
  } else {
    db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body
    })
    .spread((user, wasCreated) => {
      if (wasCreated) { // Expected behavior
        // Log the user in
        passport.authenticate('local', {
          successRedirect: '/profile',
          successFlash: 'Successfully logged in.',
          failureRedirect: '/',
          failureFlash: 'Authenticate failed.'
        })(req, res);
      } else { // User already exists
        req.flash('error', 'Email already in use.  Please login');
        res.redirect('/auth/login');
      }
    }).catch(err => {
      req.flash('error', err.message);
      res.redirect('/auth/signup');
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout(); // Logs out of session
  req.flash('success', 'Successfully logged out!');
  res.redirect('/');
});

module.exports = router;
