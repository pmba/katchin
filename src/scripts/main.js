"use strict";

const { introduction, kLog, pass } = require("./utils");
const { Divider, Options } = require("./components");

introduction();

const configSettings = (wrapper) => {
	const lastSettingOp = wrapper.children[0]
		.children[0].children[1].children[2]
		.children[0].children[0].children[0];
		
	lastSettingOp.appendChild(Divider());
	lastSettingOp.appendChild(Options());
};

window.addEventListener("load", function() {
	kLog("[+] Adicionando Observer");

	const popoverAttr = "chat-settings-balloon";
	const targetNode = this.document.querySelector("div[data-test-selector=\"chat-input-buttons-container\"]");
	const nodeConfig = { attributes: false, childList: true, subtree: true };

	const callback = function(mutationsList) {
		try {
			mutationsList.forEach(mutation => {
				var { type, addedNodes } = mutation;
				if (type === "childList" && addedNodes.length > 0) {
                    
					addedNodes.forEach(node => {

						if (node.getAttribute("data-a-target") === popoverAttr) {
							return configSettings(node); 
						}
					});
				}
			});
		} catch (err) { pass(); }
	};
	
	const observer = new MutationObserver(callback);
	observer.observe(targetNode, nodeConfig);
}, false);