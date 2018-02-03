// const { ExpressPeerServer } = require('peerjs');
// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const dateFormat = require('dateformat');
const axios = require('axios');

const puppeteer = require('puppeteer');

const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const { promisify } = require('util');
const fs = require('fs');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
// const cookieSession = require('cookie-session');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);


// db imports
const inserts = require('../database/inserts');
const queries = require('../database/queries');
const deletes = require('../database/deletes');

const app = express();
const server = require('http').createServer(app); // socket stuff
const io = require('socket.io').listen(server); // socket stuff

// const peerServer = ExpressPeerServer(server, { debug: true });

// Helpers
const { parseMeaningWithGoogleAPI, makePDF } = require('./helpers');

// const SRC_DIR = path.join(__dirname,  "../client/src/");
const DIST_DIR = path.join(__dirname, '../client/dist');
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.ENV === 'production' ? 'candlenote.io' : `localhost:${PORT}`;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theworldsgreatesthue@gmail.com',
    pass: 'discoverAustin1!',
  },
});

const emailNoteOptions = (email, filePath) => ({
  from: 'no-reply@theworldsgreatesthue.com',
  to: email,
  subject: 'Fresh CandleNote! ✔',
  html: '<b>Hello world?</b>',
  attachments: [{
    contentType: 'application/pdf',
    path: filePath,
    filename: 'note.pdf',
  }],
});

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb' }));

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
// app.use('/peerjs', peerServer);


// TODO: Investigate
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});


/* ----------- GET Handlers --------- */
// app.get('/user', (req, res) => {
//   console.log('You are logged in this is your user profile: ', req.user);
//   console.log('authenticated at /user? : ', req.isAuthenticated())
// });

app.get('/login', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


app.get('*', (req, res, next) => {
  const isAuth = req.isAuthenticated();
  if (!isAuth) {
    res.redirect('/login');
  } else {
    next();
  }
  // res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// called by app.js
app.get('/api/userid', (req, res) => {
  const userid = req.session.passport.user;
  res.status(200).send({ userid });
});

app.get('/api/pdf/:id', (req, res) => {
  const { id: fileName } = req.params;
  console.log('fileName: ', fileName);
  res.sendFile(path.join(__dirname, `../PDFs/${fileName}.pdf`));
});

// called by FriendsList.js
app.get('/loadFriendsList', (req, res) => {
  const { currentUser } = req.query;
  queries.loadFriendsList(currentUser, (friends) => {
    res.send(friends);
  });
});

app.get('/userProfile', (req, res) => {
  console.log('PROFILE ROUTE PINGED');
  console.log('USER:', req.user);
  queries.getCurrentUser(req.user)
    .then((response) => {
      const { _id: userId, username, googleId, profileImage } = response;
      res.send({
        userId,
        username,
        googleId,
        profileImage,
      });
    })
    .catch((err) => {
      res.write(err);
      res.sendStatus(400);
    });
});

/* --------- POST Handlers ----------- */

// called by Search.js
app.post('/handleFriendRequest', (req, res) => {
  const { newFriend, currentUser } = req.body;
  inserts.addFriend(currentUser, newFriend, (response) => {
    res.send(response);
  });
});

app.post('/removeFriend', (req, res) => {
  const { user, friend } = req.body;
  deletes.removeFriend(user, friend, (bool) => {
    res.send(bool);
  });
});

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

/* ----------- Sockets ------------ */
const activeUserSockets = {};

// called by ChatBox.js
app.get('/loadChatHistory', (req, res) => {
  const { sentBy, to } = req.query;
  queries.loadChatHistory(sentBy, to, (messages) => {
    res.send(messages);
  });
});

// called by app.js
app.get('/identifySocket', (req, res) => {
  const userid = req.query.id;
  queries.getUserName(userid, (username) => {
    res.send(username);
  });
});

io.sockets.on('connection', (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on('away', (data) => {
    if (data !== undefined) {
      socket.username = data; // eslint-disable-line
      activeUserSockets[socket.username] = socket;
    }
  socket.status = 'away'; // eslint-disable-line
    io.sockets.emit('notify away', socket.username, socket.status);
  });

  // listening to app.js and emitting to Friend.js
  socket.on('available', () => {
    socket.status = 'available'; // eslint-disable-line
    io.sockets.emit('notify available', socket.username, socket.status);
  });

  socket.on('acknowledged', () => {
    io.sockets.emit('notify acknowledged', socket.username, socket.status);
  });

  // listening to ChatBox.js and emitting to Chatbox.js
  socket.on('send message', (data) => {
    const now = dateFormat(new Date(), 'dddd, mmm dS, h:MM TT');
    inserts.saveMessage({
      to: data.to,
      sentBy: socket.username,
      text: data.text,
      timeStamp: now,
    });
    data.timeStamp = now; // eslint-disable-line
    if (data.to in activeUserSockets) {
      activeUserSockets[data.to].emit('receive message', data);
    }
    activeUserSockets[data.sentBy].emit('receive message', data);
  });

  socket.on('new friend', (friendName, user) => {
    if (friendName in activeUserSockets) {
      const { username, status } = activeUserSockets[friendName];
      activeUserSockets[user].emit('update friends', { username, status });
      activeUserSockets[friendName].emit('update friends', { username: user, status: 'available' });
    } else {
      activeUserSockets[user].emit('update friends', { username: friendName, status: 'offline' });
    }
  });

  // trigged by closing browser and emtting to Friend.js
  socket.on('disconnect', () => {
    io.sockets.emit('notify offline', socket.username, 'offline');
    delete activeUserSockets[socket.username];
    console.log(`${socket.username} disconnected!`);
  });
});

/* ----------- API Routes ------------ */

app.post('/api/emailPDF', (req, res) => {
  const { email } = req.body;
  const filePath = path.join(__dirname, '../PDFs/70f744e6-26c4-4f7d-b0b2-c6aeebf02f0e.pdf');
  transporter.sendMail(emailNoteOptions(email, filePath), (error) => {
    if (error) {
      console.error(error);
      res.status(500).end();
    } else {
      console.log(`PDF successfully emailed to ${email}!`);
      res.status(201).end();
    }
  });
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

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
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

server.listen(PORT, () => {
  console.info(`🌎  Server now running on port ${PORT}.  🌎`);
});

// peerServer.on('connection', (id) => {
//   console.log(id);
//   console.log(server._clients);
// });
