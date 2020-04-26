"use strict";

/** @license
 * Copyright (c) 2020 Phyllipe Bezerra
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of software and associated documentation files (the "Software"), to deal
 * in the Software without limitation of the rights to use, copy, modify, merge,
 * and/or publish copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice, any copyright notices herein, and this permission
 * notice shall be included in all copies or substantial portions of the Software,
 * the Software, or portions of the Software, may not be sold for profit, and the
 * Software may not be distributed nor sub-licensed without explicit permission
 * from the copyright owner.
 * 
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * Should any questions arise concerning your usage of this Software, or to
 * request permission to distribute this Software, please contact the copyright
 * holder at phmbalves@gmail.com
 * 
 * ---------------------------------
 * 
 *   Unofficial TLDR:
 * 
 *   Free to modify for personal use
 *   Need permission to distribute the code
 *   Can't sell addon or features of the addon
 * 
 */

const { introduction, pass } = require("./utils");
const { Divider, Options } = require("./components");
const { 
	addChannelToConfig, 
	removeChannelFromConfig, 
	isChannelConfigured
} = require("./storaging");
const { startRoutine } = require("./farmer");

let pointsWrapperLoaded = false;

const setupPointsWrapper = () => {
	const active = isChannelConfigured();
	const pointsWrapper = document.querySelector("div[data-test-selector=\"community-points-summary\"]");

	if (!pointsWrapper) return;

	// Remove if already exists one
	const existentIndicator = document.getElementById("katchin-status-dot-indicator");
	if (existentIndicator) pointsWrapper.removeChild(existentIndicator);

	const statusIndicator = document.createElement("div");
	const colorRGB = active ? "0, 255, 127" : "255, 0, 0";
	statusIndicator.id = "katchin-status-dot-indicator";
	statusIndicator.style = `left: 6px;bottom: 4px;height: 10px;width: 10px;background-color: rgba(${colorRGB});border-radius: 6px;position: absolute;box-shadow: 0px 0px 5px 1px rgba(${colorRGB}, 0.5);`;
	pointsWrapper.appendChild(statusIndicator);
};

const configSettings = (wrapper) => {
	const lastSettingOp = wrapper.children[0]
		.children[0].children[1].children[2]
		.children[0].children[0].children[0];
		
	lastSettingOp.appendChild(Divider());
	lastSettingOp.appendChild(Options());

	const switchQuery = require("./components").switchActivateQuery;	
	const activateSwitch = document.querySelector(switchQuery);

	const isConfigured = isChannelConfigured();
	activateSwitch.checked = isConfigured;

	activateSwitch.addEventListener("change", function() {		
		if (this.checked) addChannelToConfig();
		else removeChannelFromConfig();

		setupPointsWrapper();
	});
};

const setup = () => {
	const popoverAttr = "chat-settings-balloon";
	const pointsAttr = "community-points-summary";

	let targetNode = document.querySelector("div[data-test-selector=\"chat-input-buttons-container\"]");
	const nodeConfig = { attributes: false, childList: true, subtree: true };

	const callback = function(mutationsList) {
		try {
			mutationsList.forEach(mutation => {
				var { type, addedNodes } = mutation;
				if (type === "childList" && addedNodes.length > 0) {
                    
					addedNodes.forEach(node => {
						if (node.getAttribute("data-a-target") === popoverAttr) {
							configSettings(node); 
						} else if (
							!pointsWrapperLoaded && 
							node.children && 
							node.children.length > 0
						) {
							const pointsMaybe = node.children[0];
							if (pointsMaybe.getAttribute("data-test-selector") == pointsAttr) {
								pointsWrapperLoaded = true;
								setupPointsWrapper();
							}
						}
					});
				}
			});
		} catch (err) { pass(); }
	};

	const startObserver = () => {
		const observer = new MutationObserver(callback);
		observer.observe(targetNode, nodeConfig);
	
		setTimeout(() => {
			startRoutine();
			setupPointsWrapper();
			introduction();
		}, 500);
	};
	
	const checkConfigState = setInterval(() => {
		targetNode = document.querySelector("div[data-test-selector=\"chat-input-buttons-container\"]");
		
		if (targetNode) {
			clearInterval(checkConfigState);
			startObserver();
		}
	}, 500);
}; 

setup();