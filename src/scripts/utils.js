"use strict";

module.exports.pass = () => {};

module.exports.kLog = (message, color = "#e6e6e6") => {
	return console.log(`%c${message}`, `background: #222222; color: ${color}`);
};

module.exports.introduction = () => {
	this.kLog("\n");
	this.kLog("⛏️ Minerador está ativo...", "#83d130");
	this.kLog("💻 Desenvolvido por Phyllipe Bezerra", "#ffdd1f");
	this.kLog("\t  Github: https://github.com/pmba", "#e6e6e6");
	this.kLog("\t Twitter: https://twitter.com/phipslon", "#1fc0ff");
	this.kLog("😎 Use e abuse!", "#ffdd1f");
	this.kLog("\n");
};

