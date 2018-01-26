const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
const passport = require('passport');
var session = require('express-session');

const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');

const app = express();

const DIST_DIR = path.join(__dirname, '../client/dist');
// const SRC_DIR = path.join(__dirname,  "../client/src/");
const port = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
  secret: 'shakeweight',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [keys.session.cookieKey],
// }));

app.use(passport.initialize());

app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connecting to mongodb');
});

/* ----------- GET Handlers --------- */
// app.get('/user', (req, res) => {
//   console.log('You are logged in this is your user profile: ', req.user);
//   console.log('authenticated at /user? : ', req.isAuthenticated())

// });

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


/* --------- POST Handlers ----------- */


/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
