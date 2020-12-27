"use strict";

const getToggleId = (title) =>
    "toggle-" + title.toLowerCase().replace(/ /g, "-");

const ContactButton = (title) => {
    return `
    <div class="tw-full-width tw-relative">
        <a href="mailto:phmbalves@gmail.com"
		data-a-target="show-chat-rules-button" data-test-selector="show-chat-rules-button" class="tw-block tw-border-radius-medium tw-full-width tw-interactable tw-interactable--default tw-interactable--hover-enabled">
            <div class="tw-align-items-center tw-flex tw-pd-05 tw-relative">
                <div class="tw-flex-grow-1">${title}</div>
            </div>
        </a>
	</div>`;
};

const ReportButton = (title) => {
    return `
    <div class="tw-full-width tw-relative">
        <a href="https://forms.gle/qfz5EUVjstA73B3HA" target="_blank"
		data-a-target="show-chat-rules-button" data-test-selector="show-chat-rules-button" class="tw-block tw-border-radius-medium tw-full-width tw-interactable tw-interactable--default tw-interactable--hover-enabled">
            <div class="tw-align-items-center tw-flex tw-pd-05 tw-relative">
                <div class="tw-flex-grow-1">${title}</div>
            </div>
        </a>
	</div>`;
};

const OptionSwitch = (title) => {
    const opId = getToggleId(title);
    return `
    <div class="tw-pd-05">
		<div class="tw-align-items-center tw-flex"><label
				class="tw-drop-down-menu-input-item__label tw-flex-grow-1" for="${opId}">Ativar nesse canal</label>
			<div class="tw-toggle"><input type="checkbox"
					id="${opId}" label="Ativado nesse canal" class="tw-toggle__input"
					data-a-target="tw-toggle"><label for="${opId}" class="tw-toggle__button">
					<p class="tw-hide-accessible">${title}</p>
				</label></div>
		</div>
	</div>`;
};

module.exports.switchActivateQuery = "";

module.exports.Divider = () => {
    const divider = document.createElement("div");
    divider.classList = "tw-border-t tw-mg-t-1 tw-mg-x-05 tw-pd-b-1";
    return divider;
};

module.exports.Options = () => {
    const toggleTitle = "Ativado nesse canal";
    this.switchActivateQuery = `input[id=${getToggleId(toggleTitle)}]`;

    const optionsHTML = `
	<div class="tw-mg-y-05 tw-pd-x-05">
		<p class="tw-c-text-alt-2 tw-font-size-6 tw-strong tw-upcase">Katchin </p>
	</div>
	${OptionSwitch(toggleTitle)}
    ${ReportButton("Reportar Problema")}
    ${ContactButton("Entrar em Contato")}
	`;

    const opDiv = document.createElement("div");
    opDiv.classList = "tw-mg-y-05 tw-pd-x-05";
    opDiv.innerHTML = optionsHTML;
    return opDiv;
};
