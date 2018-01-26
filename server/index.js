const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

//
//var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var webpage = require('webpage');
var webshot = require('webshot');
var binPath = phantomjs.path;
//

const app = express();
app.use(bodyParser.json());
const DIST_DIR = path.join(__dirname, '../client/dist');
// const SRC_DIR = path.join(__dirname,  "../client/src/");
const port = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

/* ----------- GET Handlers --------- */

app.post('/makePDF', (req, res) => {
  console.log('received request: ', req.body.tab_url);
  var myUrl = req.body.tab_url;
  var title = JSON.stringify(Date.now());

  var options = {
    streamType: 'pdf',
    windowSize: {
      width: 1024,
      height: 786,
    },
    shotSize: {
      width: 'all',
      height: 'all',
    }
  };
  console.log('title: ', title);
  webshot(myUrl, 'PDFs/' + title + '.pdf', options, (err) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log('image successfully created');
    }
  });

  res.sendStatus(201);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


/* --------- POST Handlers ----------- */


/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
