const express = require("express");

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
  res.send('signup form submitted');
})

module.exports = router;