chrome.runtime.onMessage.addListener((req) => {
  console.log('req: ', req)
  if (req.action === 'updateNote') {
    console.log('req.payload: ', req.payload);
  }
});

fetch('http://localhost:3000/api/userid')
  .then((res) => { console.log('res from fetch: ', res) })
  .catch((e) => { console.error(e) });

chrome.cookies.getAll({ name: 'candleNote' }, (res) => {
  console.log('cookies: ', res);
  const cookie = res[0].value.slice(4).split('.')[0];
  console.log('cookie: ', cookie);
  
});