const express = require('express');

const router = express.Router();

const loggedIn = require('../middleware/loggedIn');

router.get('/', loggedIn, (req, res) => {
  res.render('profile/index');
});

router.get('/recipes', loggedIn, (req, res) => {
  res.render('profile/recipes');
});

router.get('/new', loggedIn, (req, res) => {
  res.render('profile/new');
});

router.get('/find', loggedIn, (req, res) => {
  res.render('profile/find');
});

module.exports = router;
