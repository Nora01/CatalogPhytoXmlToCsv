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
	let event = new Date(Date.now())

	function toInfo () {
		console.log("[" + event.toLocaleDateString('fr-FR') + " " + event.toLocaleTimeString() + "][INFO] " + message);
	}

	function toError () {
		console.log("[" + event.toLocaleDateString('fr-FR') + " " + event.toLocaleTimeString() + "][ERREUR] " + message);
	}

	function toWarning () {
		console.log("[" + event.toLocaleDateString('fr-FR') + " " + event.toLocaleTimeString() + "][WARNING] " + message);
	}
	
	return {
		toInfo: toInfo, 
		toError: toError,
		toWarning: toWarning
	}
}
