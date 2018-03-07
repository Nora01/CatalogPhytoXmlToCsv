"use strict";

const jsftp = require("jsftp");

module.exports = ftp;

/**
 * Création de l'objet ftp, expose les fonction utilisables
 *
 * Paramètres de connexion :
 * {
 *  host: "myserver.com",
 *  port: 3331, // defaults to 21
 *  user: "user", // defaults to "anonymous"
 *  pass: "1234" // defaults to "@anonymous"
 * }
 *
 * @param infos - paramètres de connexion (cf. au dessus)
 * @return {Object} fonctions publiques utilisables
 */
function ftp(infos) {

    const s = new jsftp(infos);
    let path = "";

    /**
     * Modification du dossier distant
     *
     * @param p Chemin du dossier distant
     */
    function setPath(p) {
        path = p;
        return this;
    }

    //Envoi
    function send(file) {
        return new Promise(function(resolve, reject) {
            s.put(file, path + file, err => {
                if (!err) {
                    s.raw("QUIT");
                    resolve(file);
                } else {
                    reject(new Error(err));
                }
            });
        });
    }

    return {
        send: send,
        setPath: setPath
    }
}