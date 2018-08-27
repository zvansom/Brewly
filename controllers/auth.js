const express = require("express");
const passport = require('../config/passportConfig');

const db = require('../models');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res) => {
  res.send('login form submitted');
})

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  if(req.body.password !== req.body.confirm_password) {
    // TODO: Get flash message working for non-matching passwords.
    res.redirect('/auth/signup');
  } else {
    db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body })
    .spread( (user, wasCreated) => {
      if (wasCreated) {
        // Log the newly created user in
        passport.authenticate('local', {
          successRedirect: '/profile',
          successFlash: 'Successfully logged in.',
          failureRedirect: '/',
          failureFlash: 'Authenticate failed.'
        })(req, res);
      }
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/auth/signup');
    })
  }
});

module.exports = router;