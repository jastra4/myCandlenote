console.log('event.js loaded!');

// Variables used in animateIcon
const min = 1;
const max = 2;
let current = min;
let makingPDF = false;

// Input: none
// Result: toggles chrome extension icon in browser
function animateIcon() {
  if (makingPDF) {
    chrome.browserAction.setIcon({ path: `images/animateIcon${current}.png` });
    current += 1;
    if (current > max) {
      current = min;
    }
    window.setTimeout(animateIcon, 300);
  } else {
    chrome.browserAction.setIcon({ path: 'images/defaultIcon.png' });
  }
}

// Input: an object with a url property (request.url)
// Result: sends url to server and handles animateIcon invokation
chrome.runtime.onMessage.addListener((request, sender) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/makePDF', true);
  makingPDF = true;
  animateIcon();
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  const toPDF = JSON.stringify({ tab_url: request.url });
  xhr.onload = () => {
    makingPDF = false;
    animateIcon();
  };
  xhr.send(toPDF);
});
