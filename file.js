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
module.exports = file;

/**
 * Définition du chemin du fichier à utiliser
 * Renvoie les fonctions publiques utilisables sur cet objet. 
 *
 * @param {string} filepath - chemin du fichier
 * @return {Object} fonctions publiques utilisables
 */
function file (filePath) {

    /**
     * Vérification de l'existence du fichier 
     *
     * @return {boolean} existence du fichier
     */
    function exists () {
        return fs.existsSync(filePath);
    }

    /**
     * Suppression du fichier
     */
    let erase = function () {
        if (exists()) {
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                if (err) throw err;
            }
            
        }
    }

    /**
     * Ecriture de données dans le fichier  (a+ - Open file for reading and appending. The file is created if it does not exist.)
     */
    let write = function (data) {
        if (data === undefined) return;
        try {
            let fd = fs.openSync(filePath, 'a+');
            fs.appendFileSync(fd, data, 'utf8');
        } catch (err) {
            if (err) throw err;
        }
    }

    return {
        erase: erase,
        write: write
    }
};