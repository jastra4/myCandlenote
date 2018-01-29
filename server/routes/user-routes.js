const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    console.log('You are not logged in!');
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('*', authCheck, (req, res) => {
  console.log('You are logged in this is your user profile: ', req.user);
  console.log('authenticated? : ', req.isAuthenticated());
  res.send('lol');
});

module.exports = router;
