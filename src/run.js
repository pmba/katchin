const showIntrocution = () => {
	console.log("\n");
	console.log("%c ⛏️ Minerador está ativo...", "background: #222; color: #83d130");
	console.log("%c 💻 Desenvolvido por Phyllipe Bezerra", "background: #222; color: #ffdd1f");
	console.log("%c \t  Github: https://github.com/pmba", "background: #222; color: #e6e6e6");
	console.log("%c \t Twitter: https://twitter.com/phipslon", "background: #222; color: #1fc0ff");
	console.log("%c 😎 Use e abuse!", "background: #222; color: #ffdd1f");
	console.log("\n");
};

const divider = () => {
	const divider = document.createElement("div");
	divider.classList = "tw-border-t tw-mg-t-1 tw-mg-x-05 tw-pd-b-1";
	return divider;
};

const getFarmerOptions = () => {
	const optionsHTML = `
	<div class="tw-mg-y-05 tw-pd-x-05">
		<p class="tw-c-text-alt-2 tw-font-size-6 tw-strong tw-upcase">Katchin </p>
	</div>
	<div class="tw-pd-05">
		<div class="tw-align-items-center tw-flex"><label
				class="tw-drop-down-menu-input-item__label tw-flex-grow-1" for="toggle-katchin">Ativar nesse canal</label>
			<div class="tw-toggle"><input type="checkbox"
					id="toggle-katchin" label="Ativado nesse canal" class="tw-toggle__input"
					data-a-target="tw-toggle"><label for="toggle-katchin" class="tw-toggle__button">
					<p class="tw-hide-accessible">Ativado nesse canal</p>
				</label></div>
		</div>
	</div>
	<div class="tw-full-width tw-relative">
        <button
            class="tw-block tw-border-radius-medium tw-full-width tw-interactable tw-interactable--alpha tw-interactable--hover-enabled tw-interactive">
            <div class="tw-align-items-center tw-flex tw-pd-05 tw-relative">
                <div class="tw-flex-grow-1">Reportar Problema</div>
            </div>
        </button>
	</div>
	<div class="tw-full-width tw-relative">
        <button
            class="tw-block tw-border-radius-medium tw-full-width tw-interactable tw-interactable--alpha tw-interactable--hover-enabled tw-interactive">
            <div class="tw-align-items-center tw-flex tw-pd-05 tw-relative">
                <div class="tw-flex-grow-1">Meu Twitter</div>
            </div>
        </button>
    </div>`;

	const opDiv = document.createElement("div");
	opDiv.innerHTML = optionsHTML;
	return opDiv;
};

const configSettings = (wrapper) => {
	const lastSettingOp = wrapper.children[0]
		.children[0].children[1].children[2]
		.children[0].children[0].children[0];
		
	lastSettingOp.appendChild(divider());
	lastSettingOp.appendChild(getFarmerOptions());
};

const ignore = () => {};

window.addEventListener("load", function() {
	showIntrocution();

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
		} catch (err) { ignore(); }
	};
	
	const observer = new MutationObserver(callback);
	observer.observe(targetNode, nodeConfig);
	// observer.disconnect();
    
	// var settingsButton = document.querySelector("button[data-a-target=\"chat-settings\"]");
	// settingsButton.setAttribute("onclick", "configSettings()");

	// injectMenuConfig();
}, false);