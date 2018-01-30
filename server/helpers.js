const axios = require('axios');
const { GOOGLE_NL_API_KEY } = require('./config');
const webshot = require('webshot');

const parseMeaningWithGoogleAPI = content => (
  axios.post(
    `https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_NL_API_KEY}`,
    { document: {
      type: 'PLAIN_TEXT',
      content,
    } },
  )
    .then(({ data: { entities } }) => (
      entities.slice(0, 5).reduce((tv, cv) => tv.concat(' ', cv.name), '')
    ))
);


const defaultOptions = {
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

const makePDF = (url, filePath, callback, options = defaultOptions) => (
  webshot(url, `PDFs/${title}.pdf`, options, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  })
);

module.exports = {
  parseMeaningWithGoogleAPI,
  makePDF,
};
