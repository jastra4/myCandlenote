console.log('popup.js loaded!');

// Input: none
// Result: sends current url to event.js
function popup() {
  chrome.tabs.query({
    currentWindow: true, active: true,
  }, (tabs) => {
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ url: activeTab.url });
  });
}

// Input: none
// Result: invokes popup when users click "save PDF" in chrome extension
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('saveArticle').addEventListener('click', popup);
});
