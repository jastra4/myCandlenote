const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

router.get('/login', (req, res) => {
  // something something something;
  res.send('login page!');
});

router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached a callback uri');
});

module.exports = router;
