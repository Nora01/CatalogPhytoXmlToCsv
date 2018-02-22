/**
 * Module de téléchargement d'un fichier depuis une URL
 * @module download
 */
"use strict";
const fs = require('fs');
const https = require('https');
const log = require('./log.js')

/**
 * Export du module
 * @type function
 */
module.exports = download;

/**
 * Téléchargement asynchrone d'un fichier depuis une URL vers une destination locale
 * Renvoie une promesse ES6. 
 * En savoir plus : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
 *
 * @async
 * @param {string} url - URL du fichier à télécharger
 * @param {string} dest - chemin local où le fichier sera téléchargé
 * @param {function} cb - callback
 * @return {Promise<string>} chemin local où le fichier a été téléchargé
 */
async function download (url, dest, cb){
    /**
     * Retourne le nom complet (+extension) du fichier à télécharger
     *
     * @return {string} nom complet du fichier
     */
    function getFilename() {
        let parts = url.split("/");
        if (parts.length < 1) {
            return undefined;
        }

        return parts[parts.length-1];   
    }

    return new Promise(function(resolve, reject){
        
        //Définition d'un chemin par défaut cross-plateform
        let homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
        if (dest === undefined) {
            dest = homedir + "/" + getFilename(url);
        }

        let file = fs.createWriteStream(dest);

        //Téléchargement asynchrone du fichier. 
        https.get(url, function(response) {
            response.pipe(file);

            //Fin du téléchargement, promesse acceptée
            file.on('finish', function() {
                file.close(cb);
                resolve(dest);
            },  (err) => reject(err));

        })
        //Erreur de téléchargement, suppression du fichier et rejet de la promesse
        .on('error', function(err) {
            fs.unlink(dest, (error) => reject(error));
            reject(err);
        });
    });
}