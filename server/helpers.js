const axios = require('axios');
const { GOOGLE_NL_API_KEY } = require('./config');
const webshot = require('webshot');
const path = require('path');

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

const makePDF = (url, fileName, callback, options = {}) => {
  console.log('makepdf invoked')
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };
  const filePath = `PDFs/${fileName}.pdf`;
  console.log('url: ', url);
  console.log('options: ', finalOptions);
  console.log('callback: ', callback);
  console.log('filePath: ', filePath);
  webshot(url, filePath, finalOptions, (err) => {
    console.log('filePath: ', filePath);
    if (err) {
      console.log('PDF NOT Saved!!!')
      callback(err, null);
    } else {
      console.log('PDF Saved!', filePath)
      callback(null, err);
    }
  })
};

module.exports = {
  parseMeaningWithGoogleAPI,
  makePDF,
};
