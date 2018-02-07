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

app.get('/api/pdf/:id', (req, res) => {
  const { id: fileName } = req.params;
  console.log('fileName: ', fileName);
  res.sendFile(path.join(__dirname, `../PDFs/${fileName}.pdf`));
});

app.get('/userProfile', (req, res) => {
  queries.getCurrentUser(req.user)
    .then((response) => {
      const { _id: userId, username, googleId, profileImage } = response;
      const dateJoined = response._id.getTimestamp();
      res.send({
        userId,
        username,
        googleId,
        profileImage,
        dateJoined,
      });
    })
    .catch((err) => {
      res.write(err);
      res.sendStatus(400);
    });
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

/* ----------- Sockets ------------ */

const allSockets = {};

io.sockets.on('connection', (socket) => {
  console.log(`socket connected: ${socket.id}`);
  allSockets[socket.id] = socket;

  // App > PrivateChat
  socket.on('sign on', (data) => {
    console.log(`sign on ${data.username}`);
    allSockets[data.username].status = 'away';
    allSockets[data.username].broadcast.emit(`${data.username} signed on`, data.username);
  });

  // PrivateChat > PrivateChat
  socket.on('acknowledge', (data) => {
    console.log(`acknowledge ${data.to} by ${data.username}`);
    if (data.to in allSockets) {
      allSockets[data.to].emit('acknowledged', data.username, data.status);
    }
  });

  // ChatBox > PrivateChat
  socket.on('available', (data) => {
    console.log(`available ${data.username}`);
    allSockets[data.username].status = 'available';
    allSockets[data.username].broadcast.emit('is available', data.username);
  });

  // ChatBox > PrivateChat
  socket.on('friend ping', (data) => {
    console.log(`ping ${data.username} to ${data.to}`);
    if (data.to in allSockets) {
      allSockets[data.username].emit(`sent ping ${data.to}`, allSockets[data.to].status);
    }
  });

  // ChatBox > PrivateChat
  socket.on('away', (data) => {
    console.log(`away ${data.username}`);
    allSockets[data.username].status = 'away';
    allSockets[data.username].broadcast.emit('is away', data.username);
  });

  app.post('/openChat', (req, res) => {
    const { username, chatname, type } = req.body;
    if (type === '/c ') {
      console.log('/openChat create group ', username, ' ', chatname, ' ', type);
      inserts.createGroup(chatname, username, (bool, group) => {
        if (bool) {
          console.log('group: ', group);
          res.send({
            groupname: chatname,
            members: [{ username }],
          });
        } else {
          res.send({ error: 'Group already exists' });
        }
      });
    } else if (type === '/j ') {
      console.log('/openChat join group ', username, ' ', chatname, ' ', type);
      inserts.addGroupMember(chatname, username, (bool, group) => {
        if (bool) {
          console.log('group: ', group);
          res.send({
            groupname: chatname,
            members: group.members,
          });
        } else {
          res.send({ error: 'Group does not exist' });
        }
      });
    } else {
      console.log('/openChat private ', username, ' ', chatname, ' ', type);
      inserts.openPrivateChat(username, chatname, (bool) => {
        if (bool) {
          let status = 'offline';
          if (chatname in allSockets) {
            status = allSockets[chatname].status;
          }
          res.send({
            username: chatname,
            status,
          });
        } else {
          res.send({ error: 'User does not exist' });
        }
      });
    }
  });

  // PrivateChat > PrivateChatList
  socket.on('close private chat', (data) => {
    console.log(`close private chat ${data.username} with ${data.otheruser}`);
    deletes.closePrivateChat(data.username, data.otheruser, (bool) => {
      console.log(`closePrivateChat ${bool}`);
    });
  });

  // Search > GroupChatList
  socket.on('create group chat', (data) => {
    console.log(`create group ${data.username} created ${data.groupname}`);
    inserts.createGroup(data.groupname, data.username, (bool) => {
      console.log(`createGroup ${bool}`);
    });
  });

  // Search > GroupChatList
  // socket.on('delete group chat', (data) => {
  //   console.log(`delete group ${data.username} deleted ${data.groupname}`);
  //   allSockets[data.username].emit('deleted group', data.groupname);
  // });

  // Search > GroupChatList
  socket.on('join group chat', (data) => {
    console.log(`join group ${data.groupname} by ${data.username}`);
    inserts.addGroupMember(data.groupname, data.username, (bool) => {
      if (bool) {
        allSockets[data.username].emit('joined group', { groupname: data.groupname });
      }
    });
  });

  // Group > GroupChatList
  socket.on('leave group chat', (data) => {
    console.log(`leave group ${data.username} left ${data.groupname}`);
    deletes.removeGroupMember(data.groupname, data.username, (bool) => {
      if (bool) {
        console.log('removeGroupMember: ', bool);
        allSockets[data.username].emit('closed group chat', data.groupname);
      }
    });
  });

  // ChatBox > ChatBox
  socket.on('submit message', (message) => {
    console.log(`submit message ${message.sentBy} to ${message.to}`);
    message.timeStamp = dateFormat(new Date(), 'dddd, mmm dS, h:MM TT');
    inserts.saveMessage(message);
    if (message.type === 'private') {
      allSockets[message.sentBy].emit('submitted message', message);
      if (message.to in allSockets) {
        allSockets[message.to].emit(`submitted message ${message.sentBy}`, message);
      }
    } else {
      io.sockets.emit(`submitted message ${message.to}`, message);
    }
  });

  // auto > PrivateChat
  socket.on('disconnect', () => {
    console.log(socket.username, ' disconnected');
    allSockets[socket.username].broadcast.emit('signed off', allSockets[socket.username].username);
    delete allSockets[socket.username];
  });
});

/* ----------- Sockets Relateted ------------ */

// called by app.js
app.get('/identifyUser', (req, res) => {
  const userid = req.session.passport.user;
  queries.getUserName(userid, (username) => {
    res.send({ username });
  });
});

// called by app.js
app.post('/assignUsername', (req, res) => {
  const { username, id } = req.body;
  allSockets[id].username = username;
  allSockets[id].status = null;
  allSockets[username] = allSockets[id];
  delete allSockets[id];
  res.sendStatus(200);
});

// called by PrivateChats.js
app.get('/loadPrivateChats', (req, res) => {
  const { currentUser } = req.query;
  queries.loadPrivateChats(currentUser, (friends) => {
    res.send(friends);
  });
});

// called by GroupsList.js
app.get('/loadGroupChats', (req, res) => {
  const { currentUser } = req.query;
  queries.loadGroupChats(currentUser, (groups) => {
    res.send(groups);
  });
});

app.get('/loadChatHistory', (req, res) => {
  const { sentBy, sentTo, type } = req.query;
  if (type === 'group') {
    queries.loadGroupChatHistory(sentTo, (docs) => {
      res.send(docs);
    });
  } else {
    queries.loadChatHistory(sentBy, sentTo, (docs) => {
      res.send(docs);
    });
  }
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
      const { _id: id, front, back, deckId, userId } = result._doc;
      res.send({
        id,
        front,
        back,
        deckId,
        userId,
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
    .then(results => res.send(results.data))
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

/* -------- Initialize Server -------- */

server.listen(PORT, () => {
  console.info(`🌎  Server now running on port ${PORT}.  🌎`);
});

// peerServer.on('connection', (id) => {
//   console.log(id);
//   console.log(server._clients);
// });
