import axios from 'axios';

const DOMAIN = 'http://localhost:3000';

let authorID;

chrome.cookies.getAll({ name: 'candleNote' }, (res) => {
  const cookie = res[0].value.slice(4).split('.')[0];
  console.log('cookie: ', cookie);
  axios.get(`${DOMAIN}/api/getUserByCookie/${cookie}`)
    .then(({ data: { user } }) => { 
      authorID = user;
      console.log('authorID updated to: ', authorID);
    })
    .catch((e) => { console.error(e) });
});
// TODO: Listen to cookie
chrome.runtime.onMessage.addListener((req) => {
  console.log('req: ', req)
  if (currentUser && (req.action === 'updateNote')) {
    const noteInfo = {
      authorID,
      body: req.payload.packet,
      title: 'Default Title :)',
    }
    currentUser && axios.post(`${DOMAIN}/api/editNote`, noteInfo)
      .then((res) => {
        console.log('res from updateNote: ', res);
      })
      .catch((e) => { console.error(e); });
  }
});

