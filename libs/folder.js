/**
 * Module de récupération des fichiers XML d'un dossier
 * @module folder
 */
"use strict";
const fs = require("fs");

/**
 * Export du module
 * @type function
 */
module.exports = folder;

/**
 * Définition du chemin du dossier à utiliser
 *
 * @param {string} dir - chemin du dossier à utiliser
 * @return {Object} fonctions publiques utilisables
 */
function folder(dir) {

    /**
     * Retourne un tableau contenant la liste des chemins vers les fichiers XML du dossier
     *
     * @return {Array<string>} liste des chemins vers les fichiers XML du dossier
     */
    let getXmls = function() {

        let dirFiles = [];
        try {
            dirFiles = fs.readdirSync(dir);
        } catch(err) {
            if (err) throw err;
        }

        //Retourne uniquement les fichiers XML
        return dirFiles.filter(file => {
            let f = file.split(".");
            if (f[1] !== undefined) {
                return f[1].toUpperCase() === "XML";
            } else {
                return false;
            }
        })
    };

    return {
        getXmls: getXmls
    }
}
