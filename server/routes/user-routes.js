const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You are logged in this is your user profile: ', req.body);
});

module.exports = router;
