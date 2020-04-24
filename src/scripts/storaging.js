const lsKeys = {
	"channels": "katchin-channels"
};

const getCurrentChannelsArr = () => {
	const currentChannels = localStorage[lsKeys.channels] || "";
	return currentChannels !== "" ? 
		currentChannels.split(",").filter(val => val != "") : [];
};

module.exports.isChannelConfigured = () => {
	const url = window.location.href;
	return getCurrentChannelsArr().includes(url);
};

module.exports.addChannelToConfig = () => {
	const url = window.location.href;
    
	const currentChannelsArr = getCurrentChannelsArr();
	currentChannelsArr.push(url);
    
	localStorage[lsKeys.channels] = currentChannelsArr;
};

module.exports.removeChannelFromConfig = () => {
	const url = window.location.href;

	const currentChannelsArr = getCurrentChannelsArr();
	localStorage[lsKeys.channels] = currentChannelsArr.filter(val => val !== url);
};