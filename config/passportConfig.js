const passport = require('passport');
const passportLocalStrategy = require('passport-local').Strategy;

const db = require('../models');

passport.serializeUser((user, callback) => callback(null, user.id));
passport.deserializeUser((id, callback) => {
  db.user.findById(id)
  .then(user => callback(null, user))
  .catch(err => callback(err, null));
});

passport.use(new passportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, callback) => {
  db.user.findOne({ where: { email } })
  .then(foundUser => {
    if(!foundUser || !foundUser.isValidPassword(password)) {
      callback(null, null);
    } else {
      callback(null, foundUser);
    }
  })
  .catch(err => callback(err, null))
}));

module.exports = passport;