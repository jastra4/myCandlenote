const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const keys = require('./keys');

passport.use(new GoogleStrategy({
  // options for strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, () => {
  // callback
}),
);
