const { ExpressPeerServer } = require('peer');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const { promisify } = require('util');
const fs = require('fs');
const uuid = require('uuid');
// const cookieSession = require('cookie-session');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// db imports
const inserts = require('../database/inserts');
const deletes = require('../database/deletes');

// Helpers
const { parseMeaningWithGoogleAPI, makePDF } = require('./helpers');

// const SRC_DIR = path.join(__dirname,  "../client/src/");
const DIST_DIR = path.join(__dirname, '../client/dist');
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.ENV === 'production' ? 'candlenote.io' : `localhost:${PORT}`;


const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb' }));

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, { debug: true });

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

// TODO: Investigate
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connecting to mongodb');
});

app.use('/peerjs', peerServer);


/* ----------- GET Handlers --------- */
// app.get('/user', (req, res) => {
//   console.log('You are logged in this is your user profile: ', req.user);
//   console.log('authenticated at /user? : ', req.isAuthenticated())

// });
app.get('/api/pdf/:id', (req, res) => {
  const { id: fileName } = req.params;
  console.log('fileName: ', fileName);
  res.sendFile(path.join(__dirname, `../PDFs/${fileName}.pdf`));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

/* --------- POST Handlers ----------- */

app.post('/makePDF', (req, res) => {
  const url = req.body.tab_url;
  const fileName = JSON.stringify(Date.now());

  makePDF(url, fileName, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
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
    .then(() => {
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

app.post('/api/suggestedResources', (req, res) => {
  axios.get('https://www.googleapis.com/customsearch/v1', { params: {
    q: req.body.searchTerms,
    key: process.env.GOOGLE_SEARCH_API_KEY,
    cx: process.env.GOOGLE_SEARCH_API_ID,
  } })
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

app.post('/api/suggestedVideos', (req, res) => {
  axios.get('https://www.googleapis.com/youtube/v3/search', { params: {
    maxResults: 5,
    part: 'snippet',
    q: req.body.searchTerms,
    type: 'video',
    key: process.env.YOUTUBE_DATA_API_KEY,
    videoEmbeddable: 'true',
  } })
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

// https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=10&namespace=0&format=jsonfm

app.post('/api/suggestedWiki', (req, res) => {
  const searchTerms = req.body.searchTerms.split(' ').slice(0, 3).join('+');
  axios.get('https://en.wikipedia.org/w/api.php', { params: {
    action: 'opensearch',
    search: req.body.searchTerms,
    limit: 10,
    namespace: 0,
    format: 'json',
  } })
    .then((result) => {
      // If no results
      if (!result.data[1].length) {
        axios.get('https://www.googleapis.com/customsearch/v1', { params: {
          q: `${searchTerms}+wikipedia`,
          key: process.env.GOOGLE_SEARCH_API_KEY,
          cx: process.env.GOOGLE_WIKI_SEARCH_KEY,
        } })
          .then((googleResult) => {
            const { data } = googleResult;
            data.isFromGoogle = true;
            res.send(data);
          })
          .catch(err => res.send(err));
      } else {
        res.send(result.data);
      }
    })
    .catch(err => res.send(err));
});

app.post('/api/tempSavePacket', (req, res) => {
  const { packet } = req.body;
  const fileName = uuid();
  const filePath = path.join(__dirname, `/assets/temp/${fileName}.txt`);

  writeFile(filePath, packet)
    .then(() => {
      console.log('File successfully written');
      const url = `http://${DOMAIN}/pdf/${fileName}`;
      const pathToPDF = path.join(__dirname, `../PDFs/${fileName}.pdf`);

      (async () => {
        function resolveAfter1Seconds() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('resolved');
            }, 1000);
          });
        }

        function logAfterPDF(pdfLocation, title = 'notes.pdf') {
          return new Promise((resolve) => {
            console.log('PDF successfully printed 🖨️  👍');
            // res.download(pdfLocation, title)
            res.sendFile(pathToPDF, title, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('yes!');
              }
            });
            resolve('PDF printed');
          });
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await resolveAfter1Seconds();
        await page.pdf({
          path: pathToPDF,
          format: 'Letter',
          printBackground: true,
          margin: {
            top: '10mm',
            bottom: '10mm',
            left: '10mm',
            right: '10mm',
          },
        });
        await logAfterPDF(`PDFs/${fileName}.pdf`);
        await browser.close();
      })();
    });
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
    });
});

/* -------- Initialize Server -------- */

app.listen(PORT, () => {
  console.info(`🌎  Server now running on port ${PORT} 🌎`);
});

peerServer.on('connection', (id) => {
  console.log(id);
  console.log(server._clients);
});
