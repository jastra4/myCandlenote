const axios = require('axios');
const { GOOGLE_NL_API_KEY } = require('./config');
const webshot = require('webshot');

const parseMeaningWithGoogleAPI = content => (
  axios.post(
    `https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_NL_API_KEY}`,
    { document: {
      type: 'PLAIN_TEXT',
      content,
    } } // eslint-disable-line
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
  // const finalOptions = {
  //   // ...defaultOptions,
  //   // ...options,
  // };

  const finalOptions = Object.assign(defaultOptions, options);
  const filePath = `PDFs/${fileName}.pdf`;
  webshot(url, filePath, finalOptions, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  });
};

const getCalendarList = (accessToken) => {
  console.log('access token:', accessToken);
  return axios({
    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    method: 'post',
    params: {
      access_token: accessToken,
      showHidden: true,
    },
    resource: {},
  });
};

const getCalendarFreeBusy = (timeMin, timeMax, accessToken) => {
  return axios({
    url: 'https://www.googleapis.com/calendar/v3/freeBusy',
    method: 'post',
    params: { access_token: accessToken },
    data: {
      timeMin,
      timeMax,
    },
  });
};

module.exports = {
  parseMeaningWithGoogleAPI,
  makePDF,
  getCalendarList,
  getCalendarFreeBusy,
};
