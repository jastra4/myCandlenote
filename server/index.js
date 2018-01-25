const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

//
//var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var webpage = require('webpage');
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

// app.get('/makePDF', (req, res) => {
//   console.log('received request');
//   res.sendStatus(200);
// })

app.post('/makePDF', (req, res) => {
  console.log('received request: ', req.body);
  res.sendStatus(201);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


/* --------- POST Handlers ----------- */

// phantomjs.create(function( error, ph) {
//   ph.createPage(function(err, page) {
//     page.open(url, function(err, status) {
// 		  console.log('Status: ' + status);
// 		  if (status === 'success') {
// 		    page.render('example.png');
// 		  }
//     });
//   });
// });

/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
