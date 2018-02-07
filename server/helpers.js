const axios = require('axios');
const Promise = require('promise');
const { GOOGLE_NL_API_KEY } = require('./config');
const webshot = require('webshot');
const gCal = require('google-calendar');
const queries = require('../database/queries');
const inserts = require('../database/inserts');
const keys = require('./config/keys');

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

// Google Calendar Helpers

const getCalendarList = accessToken => new Promise((resolve, reject) => {
  const googleCalendar = new gCal.GoogleCalendar(accessToken);
  googleCalendar.calendarList.list((err, calendarList) => {
    if (err) reject(err);
    else resolve(calendarList);
  });
});

const getCalendarFreeBusy = (timeMin, timeMax, calList, accessToken) =>
  new Promise((resolve, reject) => {
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
      busy = busy.map(info => Object.assign({ title: calendarId }, info));
    }
    return times.concat(busy);
  }, []);
  return busyTimes;
};

const buildGoogleCalEvent = (eventInfo, timeZone) => ({
  summary: eventInfo.title,
  description: eventInfo.description,
  start: {
    dateTime: new Date(eventInfo.start).toISOString(),
    timeZone,
  },
  end: {
    dateTime: new Date(eventInfo.end).toISOString(),
    timeZone,
  },
  reminders: {},
  attendees: [],
  attachments: [],
});

const setCalendarEventPerUser = (accessTokens, event) => {
  const eventPromises = accessTokens.map(token => new Promise((resolve, reject) => {
    const googleCalendar = new gCal.GoogleCalendar(token);
    googleCalendar.events.insert('primary', event, {}, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  }));
  return eventPromises;
};

const refreshMultipleTokens = (userIds) => {
  const refreshPromises = userIds.map(userId =>
    queries.getRefreshToken(userId)
      .then((data) => {
        const { googleRefreshToken } = data;
        return axios({
          url: 'https://www.googleapis.com/oauth2/v4/token',
          method: 'post',
          params: {
            client_id: keys.google.clientID,
            client_secret: keys.google.clientSecret,
            refresh_token: googleRefreshToken,
            grant_type: 'refresh_token',
          },
        });
      })
      .then((tokenInfo) => {
        inserts.saveAccessToken({
          userId,
          token: tokenInfo.data.access_token,
        });
        return tokenInfo.data.access_token;
      }));


  return refreshPromises;
};

module.exports = {
  parseMeaningWithGoogleAPI,
  makePDF,
  getCalendarList,
  getCalendarFreeBusy,
  reduceFreeBusyToTimeSpans,
  buildGoogleCalEvent,
  setCalendarEventPerUser,
  refreshMultipleTokens,
};
