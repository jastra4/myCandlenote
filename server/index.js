const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

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
const deletes = require('../database/deletes');
const helpers = require('./helpers');

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb' }));
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

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
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
  // phantomjs is essentially a web browser with no GUI
  webshot(myUrl, `PDFs/${title}.pdf`, options, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
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

app.post('/api/suggestedResources', (req, res) => {
  console.log('SOMEITalskejl;kFJ;lkdfsja;ldfkja');
  console.log('Params:', req.body);
  axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      q: req.body.searchTerms,
      key: process.env.GOOGLE_SEARCH_API_KEY,
      cx: process.env.GOOGLE_SEARCH_API_ID,
    },
  })
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

app.post('/api/suggestedVideos', (req, res) => {
  console.log('SOMEITalskejl;kFJ;lkdfsja;ldfkja');
  console.log('Params:', req.body);
  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      maxResults: 5,
      part: 'snippet',
      q: req.body.searchTerms,
      type: 'video',
      key: process.env.YOUTUBE_DATA_API_KEY,
      videoEmbeddable: 'true',
    },
  })
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

// https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=10&namespace=0&format=jsonfm

app.post('/api/suggestedWiki', (req, res) => {
  console.log('WIKIWIKIWIKI ;kFJ;lkdfsja;ldfkja');
  console.log('Params:', req.body);
  axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      action: 'opensearch',
      search: req.body.searchTerms,
      limit: 10,
      namespace: 0,
      format: 'json',
    },
  })
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

/* -------- Initialize Server -------- */

app.listen(port, () => {
  console.info(`🌎  Server now running on port ${port}.  🌎`);
});
