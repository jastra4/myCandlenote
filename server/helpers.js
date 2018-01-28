import axios from 'axios';
import { GOOGLE_NL_API_KEY } from './config';

const parseMeaningWithGoogleAPI = (content) => {
  axios.post(
    `https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_NL_API_KEY}`,
    { document: {
      type: 'PLAIN_TEXT',
      content,
    } },
  )
    .then(({ entities }) => entities.slice(0, 4).reduce((tv, cv) => tv.concat(' ', cv.name), ''));
};


module.exports = { parseMeaningWithGoogleAPI };
