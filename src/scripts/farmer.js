const { isChannelConfigured } = require("./storaging");

module.exports.startRoutine = () => setInterval( () => {
	if (!isChannelConfigured()) return;

	const popUpOpened = document.getElementsByClassName( "sub-modal" ).length > 0,
		buttons = document.getElementsByClassName( "tw-button__text" );
	popUpOpened || buttons.length > 0 && buttons[ 0 ].click();
}, 3e3 );