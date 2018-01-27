const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const webshot = require('webshot');


const app = express();
const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
var io = require('socket.io').listen(server);
// const http = require('http').Server(app); // socket stuff
// const io = require('socket.io')(http); // socket stuff

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

io.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);
});

/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */


