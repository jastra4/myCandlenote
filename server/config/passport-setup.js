const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  console.log('Serializing user by user: ', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Deserializing user by id: ', id);
  User.findById(id).then((user) => {
    console.log('Deserialized user by id: ', user);
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
        username: profile.displayName,
        googleId: profile.id,
        profileImage: profile.photos[0].value,
      }).save().then((newUser) => {
        console.log('New user created: ', newUser);
        done(null, newUser);
      });
    }
  });
}));

// passport.use(new FacebookStrategy({
//   // options for strategy
//   callbackURL: '/auth/facebook/redirect',
//   clientID: keys.facebook.appID,
//   clientSecret: keys.facebook.appSecret,
// }, (accessToken, refreshToken, profile, done) => {
//   // callback
//   console.log('FB Profile information: ', profile)
//   .then((user) => {
//     console.log('new user from facebook!');
//     done(null, user);
//   })
// }));
