import axios from 'axios';

const DOMAIN = 'http://localhost:3000';

let authorID = window.localStorage.getItem('authorID');
let currentNote;

chrome.cookies.getAll({ name: 'candleNote' }, (res) => {
  const cookie = res[0].value.slice(4).split('.')[0];
  console.log('cookie: ', cookie);
  axios.get(`${DOMAIN}/api/getUserByCookie/${cookie}`)
    .then(({ data: { user } }) => { 
      if (user) {
        authorID = user;
        window.localStorage.getItem('authorID');
        console.log('authorID updated to: ', authorID);
      }
    })
    .catch((e) => { console.error(e) });
});

// TODO: Listen to cookie
chrome.runtime.onMessage.addListener((req) => {
  console.log('req: ', req);
  console.log('authorid: ', authorID);
  if (authorID && (req.action === 'updateNote')) {
    const noteInfo = {
      authorID,
      body: req.payload.body,
      title: req.payload.title,
    }
    if (currentNote) {
      axios.post(`${DOMAIN}/api/editNote`, { ...noteInfo, currentNote } )
        .then((res) => {
          console.log('res from updateNote: ', res);
        })
        .catch((e) => { console.error(e); });
    } else {
      axios.post(`${DOMAIN}/api/createNote`, noteInfo)
        .then((res) => {
          console.log('res from createNote: ', res);
        })
        .catch((e) => { console.error(e); });
    }

  }
});

