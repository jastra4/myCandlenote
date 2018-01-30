const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const mongoose = require('mongoose');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');

const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');
const webshot = require('webshot');

// db imports
const inserts = require('../database/inserts');
const queries = require('../database/queries');

const app = express();
const server = require('http').createServer(app); // socket stuff
const io = require('socket.io').listen(server); // socket stuff

app.use(bodyParser.json());
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
  name: 'candleNote',
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

// Invoked when main page renders
// Controls whether to emit a socket connection
app.get('/checkAuth', (req, res) => {
  console.log('check auth ran!!');
  const isAuth = req.isAuthenticated();
  if (!isAuth) {
    res.send(false);
  } else {
    const userId = req.session.passport.user;
    console.log('userId: ', userId);
    // res.send(true, userId);
    res.status(200).send({
      auth: true,
      userId,
    });
  }
});

/* --------- POST Handlers ----------- */

app.post('/makePDF', (req, res) => {
  const myUrl = req.body.tab_url;
  const title = JSON.stringify(Date.now());

  // defaut webshot options
  const options = {
    streamType: 'pdf',
    windowSize: {
      width: 1024,
      height: 786,
    },
    shotSize: {
      width: 'all',
      height: 'all',
    },
  };

  // webshot wraps phantomjs and provides a simple API
  // phantomjs is basically a web browser with no GUI
  webshot(myUrl, `PDFs/${title}.pdf`, options, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

/* ----------- Sockets ------------ */

app.get('/username', (req, res) => {
  console.log('q: ', req.query);
  // const userId = req.session.passport.user;
  // '5a6cc3c1da0212ef30d070fe'
  // queries.getUserName(userId, (username) => {
  //   console.log('FOUND USER: ', username);
  //   res.send(username);
  // });
});

io.sockets.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);
  
  // socket.on('new user', data => {
  //   console.log('new user data: ', data);
  //   socket.username = data;
  // });

  socket.on('send message', (data) => {
    io.sockets.emit('new message', data);
  });
});

/* ----------- API Routes ------------ */

app.post('/api/decks', (req, res) => {
  inserts.insertDeck(req.body)
    .then((result) => {
      const { _id: id, subject, title, userId } = result._doc;
      res.send({
        id,
        subject,
        title,
        userId,
      });
    })
    .catch(err => console.log(err));
});

// app.post('/api/flashcards', (req, res) => {
//   inserts.insertFlashcard(req.body)
//     .then((result) => {
//       const { _id: id, subject, title, userId } = result._doc;
//       res.send({
//         id,
//         subject,
//         title,
//         userId,
//       });
//     })
//     .catch(err => console.log(err));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

/* -------- Initialize Server -------- */

server.listen(port, () => {
  console.info(`🌎  Server now running on port ${port}.  🌎`);
});

