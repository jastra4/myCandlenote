const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const webshot = require('webshot');

const app = express();
const server = require('http').createServer(app); // socket stuff
const io = require('socket.io').listen(server); // socket stuff

app.use(bodyParser.json());
const DIST_DIR = path.join(__dirname, '../client/dist');
// const SRC_DIR = path.join(__dirname,  "../client/src/");

app.use(express.static(DIST_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

/* ----------- GET Handlers --------- */

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

/* ----------- Sockets ------------ */

io.sockets.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);

  socket.on('send message', (data) => {
    io.sockets.emit('new message', data);
  });

});

/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

