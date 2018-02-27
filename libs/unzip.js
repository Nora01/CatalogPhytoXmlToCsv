/**
 * Module d'extraction d'une archive (.zip)
 * @module unzip
 */
"use strict";
const uz = require('adm-zip');

/**
 * Export du module
 * @type function
 */
module.exports = unzip;

/**
 * Extraction du fichier donné dans le repertoire /temp
 * Renvoie une promesse ES6. 
 * En savoir plus : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
 *
 * @async
 * @param {string} file - Chemin vers le .zip à extraire
 * @return {Promise<string>} chemin vers le dossier
 */
function unzip(file) {
    return new Promise(function(resolve, reject){
       //Définition d'un chemin par défaut cross-plateform
        let homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;

        //extraction
        try {
            new uz(file).extractAllTo(homedir + "/temp", true);
        } catch(err) {
            reject();
        }

        resolve(homedir + "/temp/");
    });
}