const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const dateFormat = require('dateformat');

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
const deletes = require('../database/deletes');
const helpers = require('./helpers');

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
  console.log('check auth ran');
// drop messages collection
// mongoose.connection.db.dropCollection('messages', function(err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('dropped Messages');
//   }
// });
  const isAuth = req.isAuthenticated();
  if (!isAuth) {
    res.send(false);
  } else {
    const userId = req.session.passport.user;
    res.status(200).send({
      auth: true,
      userId,
    });
  }
});

app.get('/messages', (req, res) => {
  const to = req.query.to;
  const sentBy = req.query.from;
  queries.getMessages(sentBy, to, (messages) => {
    res.send(messages);
  });
});

app.get('/users', (req, res) => {
  console.log('get users received');
  queries.getUsers((users) => {
    res.send(users);
  });
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
  const userId = req.query.id;
  queries.getUserName(userId, (username) => {
    res.send(username);
  });
});

io.sockets.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);

  socket.on('new user', (data) => {
    socket.username = data;
    // console.log('New user!: ', socket.username);
    io.sockets.emit('update users', socket.username);
  });

  socket.on('send message', (data) => {
    const now = new Date();
    inserts.insertMessage({
      to: data.to,
      sentBy: socket.username.data,
      text: data.text,
      timeStamp: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
      // timeStamp: Date.now(),
    });
    // data.timeStamp = Date.now();
    data.timeStamp = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
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

app.post('/api/deleteDeck', (req, res) => {
  deletes.deleteDeck(req.body.deckId)
    .then((result) => {
      console.log(result);
      const { _id: id } = req.body;
      res.send(id);
    })
    .catch(err => console.log(err));
});

app.post('/api/flashcards', (req, res) => {
  inserts.insertFlashcard(req.body)
    .then((result) => {
      const { _id: id, front, back, deckId } = result._doc;
      res.send({
        id,
        front,
        back,
        deckId,
      });
    })
    .catch(err => console.log(err));
});

app.post('/api/deleteCard', (req, res) => {
  deletes.deleteFlashcard(req.body)
    .then(() => res.send('Deleted'))
    .catch(err => console.log(err));
});

app.post('/api/parseContentMeaning', (req, res) => {
  console.log('lol');
  helpers.parseMeaningWithGoogleAPI(req.body.content)
    .then((meaning) => {
      console.log('meaning!: ', meaning);
      res.send({ meaning });
    })
    .catch(((e) => {
      console.error(e);
      res.status(500).end();
    }));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

/* -------- Initialize Server -------- */

server.listen(port, () => {
  console.info(`🌎  Server now running on port ${port}.  🌎`);
});

