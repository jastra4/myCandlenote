// const { ExpressPeerServer } = require('peerjs');
// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const dateFormat = require('dateformat');
const axios = require('axios');
const Promise = require('promise');

const keys = require('./config/keys');
const puppeteer = require('puppeteer');
const passport = require('passport');
const session = require('express-session');
const nodemailer = require('nodemailer');
// const cookieSession = require('cookie-session');


const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');

// db imports
const inserts = require('../database/inserts');
const queries = require('../database/queries');
const deletes = require('../database/deletes');

const app = express();
const server = require('http').createServer(app); // socket stuff
const io = require('socket.io').listen(server); // socket stuff

// const peerServer = ExpressPeerServer(server, { debug: true });

// Helpers
const { parseMeaningWithGoogleAPI, makePDF, getCalendarFreeBusy,
  setCalendarEventPerUser, refreshMultipleTokens,
  getCalendarList, reduceFreeBusyToTimeSpans, buildGoogleCalEvent } = require('./helpers');

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
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
}));

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

/* ----------- GET Handlers --------- */
// app.get('/user', (req, res) => {
//   console.log('You are logged in this is your user profile: ', req.user);
//   console.log('authenticated at /user? : ', req.isAuthenticated());
// });

// This route must come before authentication routes
// Headless Browser will not be authenticated

app.get('/pdf/:id', (req, res) => {
  res.sendFile(path.join(DIST_DIR, '/index.html'));
});

app.get('/api/pdf/:id', (req, res) => {
  const { id: fileName } = req.params;
  console.log('fileName: ', fileName);
  // res.end();
  res.sendFile(path.join(__dirname, `../PDFs/${fileName}.pdf`));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(DIST_DIR, '/index.html'));
});


app.get('*', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    next();
  }
});

// // called by app.js
app.get('/api/userid', (req, res) => {
  const userid = req.session.passport.user;
  res.status(200).send({ userid });
});


app.post('/api/createNote', (req, res) => {
  const { noteInfo } = req.body;
  // console.log('noteID: ', noteInfo.authorID);
  inserts.insertNote(noteInfo)
    .then((response) => {
      console.log('Successfully saved new note to DB');
      const noteId = response._id;
      res.send({ noteId });
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500).end();
    });
});


app.post('/api/editNote', (req, res) => {
  const { noteInfo } = req.body;
  console.log('updated note: ', noteInfo);
  queries.updateNote(noteInfo)
    .then(() => {
      console.log('Successfully edited note in DB');
      res.end();
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500).end();
    });
});

app.get('/users', (req, res) => {
  queries.getAllUsers((users) => {
    res.send(users);
  });
});

app.post('/friendrequest', (req, res) => {
  console.log('friendrequest: ', req.body.username);
  res.send(201);
});

// called by FriendsList.js
app.get('/loadFriendsList', (req, res) => {
  const { currentUser } = req.query;
  queries.loadFriendsList(currentUser, (friends) => {
    res.send(friends);
  });
});

app.get('/userProfile', (req, res) => {
  queries.getCurrentUser(req.user)
    .then((response) => {
      const { _id: userId, username, googleId, profileImage, friends } = response;
      const dateJoined = response._id.getTimestamp();
      res.send({
        userId,
        username,
        googleId,
        profileImage,
        dateJoined,
        friends,
      });
    })
    .catch((err) => {
      res.write(err);
      res.sendStatus(400);
    });
});

// /* --------- POST Handlers ----------- */

// called by Search.js
app.post('/handleFriendRequest', (req, res) => {
  const { newFriend, currentUser } = req.body;
  inserts.addFriend(currentUser, newFriend, (response) => {
    res.send(response);
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

io.sockets.on('error', (e) => { console.error(e); });

io.sockets.on('connection', (socket) => {
  console.log('✅  Successfully connected new Socket: ', socket.id);

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
    if (data.to in activeUserSockets) {
      // const { username, status } = activeUserSockets[data.to];
      activeUserSockets[data.to].emit('update friends', {
        username: socket.username,
        status: 'available',
      });
    }
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
    const newFriend = {
      username: friendName,
      status: 'offline',
    };
    if (friendName in activeUserSockets) {
      newFriend.status = activeUserSockets[friendName].status;
    }
    activeUserSockets[user].emit('update friends', newFriend);
  });

  app.post('/removeFriend', (req, res) => {
    const { user, friend } = req.body;
    deletes.removeFriend(user, friend, (response) => {
      if (response !== false) {
        activeUserSockets[user].emit('removed friend', response);
      }
      res.send(200);
    });
  });

  // trigged by closing browser and emtting to Friend.js
  socket.on('disconnect', () => {
    io.sockets.emit('notify offline', socket.username, 'offline');
    delete activeUserSockets[socket.username];
    console.log(`${socket.username} disconnected!`);
  });
});

/* ----------- Google Cal Routes ------------ */

app.post('/api/refreshToken', (req, res) => {
  console.log('USER ID REFRESHTOKEN:', req.body.userId);
  const { userId } = req.body;
  queries.getRefreshToken(userId)
    .then((data) => {
      const { googleRefreshToken } = data;
      return axios({
        url: 'https://www.googleapis.com/oauth2/v4/token',
        method: 'post',
        params: {
          client_id: keys.google.clientID,
          client_secret: keys.google.clientSecret,
          refresh_token: googleRefreshToken,
          grant_type: 'refresh_token',
        },
      })
        .then((response) => {
          inserts.saveAccessToken({
            userId,
            token: response.data.access_token,
          });
          res.send(response.data.access_token);
        });
    })
    .catch(err => console.log(err));
});

app.post('/api/freeBusy', (req, res) => {
  const nowInt = Date.now();
  const nextWeekInt = nowInt + 2629746000;
  const nowString = new Date(nowInt).toISOString();
  const nextWeekString = new Date(nextWeekInt).toISOString();

  queries.getAccessToken(req.body.userId)
    .then((doc) => {
      const { googleAccessToken: accessToken } = doc;
      return getCalendarList(accessToken)
        .then(calList => calList.items)
        .then(calIds => getCalendarFreeBusy(nowString, nextWeekString, calIds, accessToken));
    })
    .then((freeBusyData) => {
      const busyTimes = reduceFreeBusyToTimeSpans(freeBusyData);
      res.send(busyTimes);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/api/setCalendarEvents', (req, res) => {
  const { newEvent, userIds, timeZone } = req.body;
  const event = buildGoogleCalEvent(newEvent, timeZone);
  Promise.all(refreshMultipleTokens(userIds))
    .then(() => queries.getGetAccessTokensForUsers(userIds))
    .then((results) => {
      const accessTokens = results.map(result => result.googleAccessToken);
      return Promise.all(setCalendarEventPerUser(accessTokens, event))
        .then(responses => res.send(responses));
    })
    .catch(err => res.status(400).send(err));
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
    .catch(err => console.error(err));
});

app.post('/api/deleteDeck', (req, res) => {
  deletes.deleteDeck(req.body.deckId)
    .then(() => {
      const { _id: id } = req.body;
      res.send(id);
    })
    .catch(err => console.error(err));
});

app.post('/api/flashcards', (req, res) => {
  inserts.insertFlashcard(req.body)
    .then((result) => {
      const { _id: id, front, back, deckId, userId } = result._doc;
      res.send({
        id,
        front,
        back,
        deckId,
        userId,
      });
    })
    .catch(err => console.error(err));
});

app.post('/api/deleteCard', (req, res) => {
  deletes.deleteFlashcard(req.body)
    .then(() => res.send('Deleted'))
    .catch(err => console.error(err));
});


app.get('/api/getNotes/:id', (req, res) => {
  const { id: userId } = req.params;
  queries.getNotes(userId)
    .then((notes) => { res.send(notes); })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500).end();
    });
});

app.post('/api/deleteNote/', (req, res) => {
  const { noteId } = req.body;
  deletes.deleteNote(noteId);
  res.end();
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
    .then((results) => { res.send(results.data); })
    .catch((err) => { // eslint-disable-line
      console.error('⚠️  Error searching Google');
      res.sendStatus(500).end();
    });
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
    .catch((err) => { // eslint-disable-line
      console.error('⚠️  Error searching YouTube');
      res.sendStatus(500).end();
    });
});

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
          .catch((err) => { // eslint-disable-line
            console.error('⚠️  Error searching Google');
            res.sendStatus(500).end();
          });
      } else {
        res.send(result.data);
      }
    })
    .catch((err) => { // eslint-disable-line
      console.error('⚠️  Error searching Wikipedia');
      res.sendStatus(500).end();
    });
});

app.post('/api/generatePDF', (req, res) => {
  const { currentNote,
    showDate,
    showName,
    showTitle } = req.body;
  const noteInfo = {
    noteId: currentNote, showDate, showName, showTitle,
  };
  const url = `http://${DOMAIN}/pdf/${currentNote}`;
  const pathToPDF = path.join(__dirname, `../PDFs/${currentNote}.pdf`);

  (async () => {
    function resolveAfter1Seconds() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('resolved');
        }, 1500);
      });
    }

    function logAfterPDF(/* pdfLocation */) {
      return new Promise((resolve) => {
        console.log('PDF successfully printed 🖨️  👍');
        res.end();
        resolve('PDF printed');
      });
    }
    await queries.updateNote(noteInfo).then(() => { console.log('lolzzz'); return; })
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
    await logAfterPDF(`PDFs/${currentNote}.pdf`);
    await browser.close();
  })();
});

app.post('/api/getEditorPacket', (req, res) => {
  const { noteToPrint } = req.body;
  queries.getPacket(noteToPrint)
    .then((result) => {
      const { body: packet, authorID, title, showDate, showTitle, showName } = result[0];
      queries.getUsernameById(authorID)
        .then(({ username }) => {
          res.send({
            packet, title, username, showDate, showTitle, showName,
          });
        });
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500).end();
    });
});

app.post('/api/userDecks', (req, res) => {
  const { userId } = req.body;
  queries.getDecksForUser(userId)
    .then((response) => {
      const decks = response.map((deck) => {
        const { _id: id, subject, title, userId: uid } = deck;
        return {
          id,
          subject,
          title,
          userId: uid,
        };
      });
      res.send(decks);
    })
    .catch(err => res.send(err));
});

app.post('/api/userFlashcards', (req, res) => {
  const { userId } = req.body;
  queries.getFlashcardsForUser(userId)
    .then((response) => {
      const flashcards = response.map((card) => {
        const { _id: id, front, back, deckId, userId: uid } = card;
        return {
          id,
          front,
          back,
          deckId,
          userId: uid,
        };
      });
      res.send(flashcards);
    })
    .catch(err => res.send(err));
});


app.post('/api/userFriends', (req, res) => {
  const { userId } = req.body;
  queries.getCurrentUser(userId)
    .then(response => response.friends.map(friend => friend.friendId))
    .then(friendIds => queries.getFriendsById(friendIds))
    .then((friendsInfo) => {
      const friends = friendsInfo.map((friend) => {
        const { _id: id, username, profileImage } = friend;
        return {
          id,
          username,
          profileImage,
        };
      });
      res.send(friends);
    })
    .catch(err => res.status(400).send(err));
});

app.post('/api/addFriend', (req, res) => {
  const { userId, friendId } = req.body;
  inserts.addFriend(userId, friendId)
    .then(response => res.send(response))
    .catch(err => res.status(400).send(err));
});

app.post('/api/userByUsername', (req, res) => {
  const { username } = req.body;
  queries.getUserByUsername(username)
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

/* -------- Initialize Server -------- */

server.listen(PORT, () => {
  console.info(`🌎  Server now running on port ${PORT} 🌎`);
});

// peerServer.on('connection', (id) => {
//   console.log(id);
//   console.log(server._clients);
// });
