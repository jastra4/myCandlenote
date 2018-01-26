 console.log('popup.js loaded!', chrome)

function myFunction() {
  console.log('test')
}

 function popup() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    console.log(activeTab.url);
    //chrome.pageCapture.saveAsMHTML({ tabId: activeTab.id }, function(mhtml) {console.log('callback ran: ', mhtml)});
    //chrome.tabs.sendMessage(activeTab.id, {'message': activeTab.url});
    //chrome.runtime.sendMessage(activeTab.id, {'message': activeTab.url});
    console.log('activeTab: ', activeTab);
    chrome.runtime.sendMessage({url: activeTab.url}, function(response) {
  		//console.log(response.farewell);
  		console.log('done');
		});
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveArticle').addEventListener('click', popup);
});