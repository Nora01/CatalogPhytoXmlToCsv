/**
 * Module d'écriture de données dans un fichier
 * @module file
 */
"use strict";
const fs = require("fs");

/**
 * Export du module
 * @type function
 */
module.exports = File;

/**
 * Définition du chemin du fichier à utiliser
 * Renvoie les fonctions publiques utilisables sur cet objet.
 *
 * @param {string} filePath - chemin du fichier
 * @return {Object} fonctions publiques utilisables
 */
function File (filePath) {

    /**
     * Vérification de l'existence du fichier
     *
     * @return {boolean} existence du fichier
     */
    function exists () {
        try {
            fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Suppression du fichier
     */
    let erase = function () {
        if (exists()) {
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                throw new Error(err);
            }
        }
    };

    /**
     * Ecriture de données dans le fichier  (a+ - Open file for reading and appending. The file is created if it does not exist.)
     */
    let write = function (data) {
        if (data === undefined || data === "") return;
        try {
            let fd = fs.openSync(filePath, 'a+');
            fs.appendFileSync(fd, data, 'utf8');
        } catch (err) {
            throw new Error(err);
        }
    };

    return {
        erase: erase,
        write: write
    }
}
