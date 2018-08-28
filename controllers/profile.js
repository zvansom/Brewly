const express = require('express');

const router = express.Router();

const loggedIn = require('../middleware/loggedIn');

router.get('/', loggedIn, (req, res) => {
  res.render('profile/index');
});

module.exports = router;
