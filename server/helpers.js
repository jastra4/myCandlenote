const axios = require('axios');
const Promise = require('promise');
const { GOOGLE_NL_API_KEY } = require('./config');
const webshot = require('webshot');
const gCal = require('google-calendar');

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

const getCalendarList = accessToken => new Promise((resolve, reject) => {
  console.log('access token:', accessToken);
  const googleCalendar = new gCal.GoogleCalendar(accessToken);
  googleCalendar.calendarList.list((err, calendarList) => {
    if (err) reject(err);
    else resolve(calendarList);
  });
});

const getCalendarFreeBusy = (timeMin, timeMax, calList, accessToken) =>
  new Promise((resolve, reject) => {
    console.log('CallList:', calList);
    const googleCalendar = new gCal.GoogleCalendar(accessToken);
    googleCalendar.freebusy.query({
      timeMin,
      timeMax,
      items: calList,
    }, { resource: {
      items: calList,
      timeZone: 'Asia/Colombo',
    } }, (err, freeBusyList) => {
      if (err) reject(err);
      else resolve(freeBusyList);
    });
  });

const reduceFreeBusyToTimeSpans = (freeBusyData) => {
  const busyTimes = Object.keys(freeBusyData.calendars).reduce((times, calendarId) => {
    let { busy } = freeBusyData.calendars[calendarId];
    if (busy.length) {
      busy = busy.map(info => ({
        ...info,
        title: calendarId,
      }));
    }
    return times.concat(busy);
  }, []);
  return busyTimes;
};

module.exports = {
  parseMeaningWithGoogleAPI,
  makePDF,
  getCalendarList,
  getCalendarFreeBusy,
  reduceFreeBusyToTimeSpans,
};
