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
const { promisify } = require('util');
const fs = require('fs');
const uuid = require('uuid');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// db imports
const inserts = require('../database/inserts');
const deletes = require('../database/deletes');
const { parseMeaningWithGoogleAPI, makePDF } = require('./helpers');

const app = express();
app.use(bodyParser.json());
const DIST_DIR = path.join(__dirname, '../client/dist');
// const SRC_DIR = path.join(__dirname,  "../client/src/");
const PORT = process.env.PORT || 3000;

const DOMAIN = process.env.ENV === 'production' ? 'http://candlenote.io' : `localhost:${PORT}` ;

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
  const url = req.body.tab_url;
  const fileName = JSON.stringify(Date.now());

  // webshot wraps phantomjs and provides a simple API
  // phantomjs is essentially a web browser with no GUI
  makePDF(url, fileName, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});


/* ----------- API Routes ------------ */

app.get('/api/PDF', (req, res) => {
  const { fileName } = req.body;
  res.download(`/PDFs/${fileName}.pdf`);
});

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
  parseMeaningWithGoogleAPI(req.body.content)
    .then((meaning) => {
      res.send({ meaning });
    })
    .catch(((e) => {
      console.error(e);
      res.status(500).end();
    }));
});

app.post('/api/tempSavePacket', (req, res) => {
  const { packet } = req.body;
  const fileName = uuid();
  const filePath = path.join(__dirname, `/assets/temp/${fileName}.txt`);

  writeFile(filePath, packet)
    .then(() => {
      console.log('yay');
      const url = `${DOMAIN}/PDF/${fileName}`;
      const pathToPDF = path.join(__dirname, `../PDFs/${fileName}.pdf`);      
      makePDF(url, fileName, (err) => {
        if (err) { res.sendStatus(500); }
        res.download(pathToPDF);
      });
    })
    .catch((e) => { console.error(e); });
});

app.post('/api/getEditorPacket', (req, res) => {
  const { fileName } = req.body;
  const filePath = path.join(__dirname, `/assets/temp/${fileName}.txt`);
  readFile(filePath, 'utf8')
    .then((data) => {
      res.json({ data });
    })
    .catch((e) => { 
      console.error(e);
      res.sendStatus(500);
    })
});

/* -------- Initialize Server -------- */

app.listen(PORT, () => {
  console.info(`🌎  Server now running on port ${PORT}.  🌎`);
});
