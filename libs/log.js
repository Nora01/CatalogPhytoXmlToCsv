/**
 * Module d'affichage de logs
 * @module log
 */
"use strict";

/**
 * Export du module
 * @type function
 */
module.exports = log;

function log(message) {
	let event = new Date(Date.now());

	function toInfo () {
		if (message === undefined) return "";
		let formatting = "[" + event.toLocaleDateString('fr-FR') + " " + event.toLocaleTimeString() + "][INFO] " + message;
		display(formatting);
		return formatting;
	}

	function toError () {
        if (message === undefined) return "";
		let formatting = "[" + event.toLocaleDateString('fr-FR') + " " + event.toLocaleTimeString() + "][ERREUR] " + message;
		display(formatting);
		return formatting
	}

	function display(formatting) {
		console.log(formatting);
	}

	return {
		toInfo: toInfo, 
		toError: toError
	}
}
