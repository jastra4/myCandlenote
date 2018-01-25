console.log('content.js loaded!');

chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log('content.js listener received: ', request.message);
        //console.log('chrome: ', chrome)
			  // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
			    // var activeTab = tabs[0];
			    // chrome.pageCapture.saveAsMHTML({ tabId: activeTab.id }, function(mhtml) {console.log('callback ran')});
			  // });
      }
    );

