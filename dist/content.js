"use strict";

(async () => {
	// eslint-disable-next-line no-undef
	const src = chrome.runtime.getURL("bundle.min.js");
	
	const script = this.document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", src);

	const head = this.document.head 
	|| this.document.getElementsByTagName("head")[0]
	|| this.document.documentElement;

	head.insertBefore(script, head.lastChild);	
})();