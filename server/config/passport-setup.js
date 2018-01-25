const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user.id);
  });
});

passport.use(new GoogleStrategy({
  // options for strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // callback
  User.findOne({ googleId: profile.id }).then((currentUser) => {
    if (currentUser) {
      console.log('User already in database!');
      done(null, currentUser);
    } else {
      new User({
        username: profile.displayname,
        googleId: profile.id,
      }).save().then((newUser) => {
        console.log('New user created: ', newUser);
        done(null, newUser);
      });
    }
  });
}));
