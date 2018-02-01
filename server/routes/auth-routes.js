const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

router.get('/login', (req, res) => {
  // something something something;
  res.send('login page!');
});

console.log(passportSetup);

router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/auth/login');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('Logged in user: ', req.user.username);
  console.log('authenticated? : ', req.isAuthenticated());
  res.redirect('/profile');
});

// router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));

// router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
//   res.send('You reached the callback uri!');
// });

module.exports = router;
