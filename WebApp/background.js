chrome.app.runtime.onLaunched.addListener(function() {
	
	chrome.app.window.create('index.html', {
		//frame: "none",
		//state: "fullscreen",
		'outerBounds': {
      		'width': 980,
      		'height': 800
    	}
    });
    
    //window.open('index.html');
});