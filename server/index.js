const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();

const DIST_DIR = path.join(__dirname, '../client/dist');
// const SRC_DIR = path.join(__dirname,  "../client/src/");
const port = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

/* ----------- GET Handlers --------- */

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


/* --------- POST Handlers ----------- */


/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */

app.listen(port, () => {
  console.info(`>>> 🌎 Server now running on port ${port}.`);
});
