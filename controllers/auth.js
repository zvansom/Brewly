const express = require("express");

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('login stubbed');
});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  res.send('signup form submitted');
})

module.exports = router;