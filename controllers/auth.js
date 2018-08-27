const express = require("express");

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('login stubbed');
});

router.get('/signup', (req, res) => {
  res.send('signup stubbed');
});

module.exports = router;