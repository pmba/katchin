"use strict";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	const { id } = request

	switch (id) {
		case 'katchin-load-script':
			loadScript()
			break;
		default:
			break;
	}
});

const loadScript = () => {
	const src = chrome.runtime.getURL("bundle.min.js");
	
	const script = this.document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", src);

	const head = this.document.head 
	|| this.document.getElementsByTagName("head")[0]
	|| this.document.documentElement;

	head.insertBefore(script, head.lastChild);	
}

loadScript()