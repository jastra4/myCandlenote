console.log('event.js loaded!');
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log('content.js listener received: ', request.url);
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    	var xhr = new XMLHttpRequest();
			//xhr.open("GET", 'http://localhost:3000/makePDF', true);
			xhr.open("POST", 'http://localhost:3000/makePDF', true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      var testPost = JSON.stringify({ tab_url: request.url })
      console.log('testPost: ', testPost);
      xhr.send(testPost);
			//xhr.send();

      //sendResponse({farewell: 'goodbye'});
      return true;
  });
