const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const phantom = require('phantom');

const mongoose = require('mongoose');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const nightmare = require('nightmare');

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

const DOMAIN = process.env.ENV === 'production' ? 'http://candlenote.io' : `localhost:${PORT}`;

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
  console.log('called!');
  const url = req.body.tab_url;
  const fileName = JSON.stringify(Date.now());

  // webshot wraps phantomjs and provides a simple API
  // phantomjs is essentially a web browser with no GUI
  makePDF(url, fileName, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
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
      // makePDF(url, fileName, (err) => {
      //   if (err) {
      //     console.error(err);
      //     res.sendStatus(500);
      //   } else { console.log('lol') }
      //   // res.download(pathToPDF);
      // }, { takeShotOnCallback: true });
      // console.log('Loading a web page');
      // var page = require('webpage').create();
      // page.open(url, function (status) {
      //   //Page is loaded!
      //   phantom.exit();
      // });

      // (async function () {
      //   const instance = await phantom.create();
      //   const page = await instance.createPage();
      //   await page.on('onResourceRequested', function (requestData) {
      //     console.info('Requesting', requestData.url);
      //   });

      //   const status = await page.open(url);
      //   const content = await page.property('content');
      //   console.log(content);

      //   const timer = await function(){
      //     return (
      //       setTimeout(() => {
      //         instance.exit();
      //         res.sendStatus(200);
      //       }, 200)
      //     )}
      // })();
      const puppeteer = require('puppeteer');

      (async () => {
        function resolveAfter1Seconds() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('resolved');
            }, 2000);
          });
        }

        function logAfterPDF() {
          return new Promise((resolve) => {
            console.log('PDF printed :)');
            resolve('PDF printed :)');
          });
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/pdf/fa2426de-f73e-4a2d-b3bd-b69f2080fd6d', { waitUntil: 'networkidle0' });
        // await page.goto('http://localhost:3000/pdf/fa2426de-f73e-4a2d-b3bd-b69f2080fd6d', { waitUntil: 'networkidle0' });
        // await page.emulateMedia('screen');
        // await resolveAfter1Seconds();
        await page.pdf({
          path: 'page.pdf',
          format: 'Letter',
          printBackground: true,
          margin: {
            top: '10mm',
            bottom: '10mm',
            left: '10mm',
            right: '10mm',
          },
        });
        await logAfterPDF();
        await browser.close();
      })();

      // let _ph, _page, _outObj;

      // phantom.create().then(function (ph) {
      //   _ph = ph;
      //   return _ph.createPage();
      // }).then(function (page) {
      //   _page = page;
      //   return _page.open('http://localhost:3000/pdf/fa2426de-f73e-4a2d-b3bd-b69f2080fd6d');
      // }).then(function (status) {
      //   res.sendStatus(201);
      //   // console.log(status);
      //   // console.log('_page: ', _page);
      //   // return _page.property('content')
      // // }).then(function (content) {
      //   // console.log(content);
      //   // _page.close()
      //     // res.sendStatus(201);
      //     // _ph.exit();
      // }).catch(function (e) {
      //   console.log(e);
      // });
    });
  // .catch((e) => { console.error(e); });
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
  console.info(`🌎  Server now running on port ${PORT}.  🌎`);
});
