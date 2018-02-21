"use strict";

const fs = require("fs");
const https = require("https");

module.exports = download;

async function download (url, dest, cb){

    return new Promise(function(resolve, reject){
        let homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
        if (dest === undefined) {
            dest = homedir + "/temp.zip";
        }
        console.log("URL de sortie du fichier ZIP : " + dest);
        let file = fs.createWriteStream(dest);

        https.get(url, function(response) {
            console.log("Téléchargement du fichier...");
            response.pipe(file);
            file.on('finish', function() {
                file.close(cb);
                resolve(dest);
            },  (error) => { console.log("ERREUR : " + error); });

        }).on('error', function(err) {
            fs.unlink(dest, (error) => { console.log("ERREUR lors de la suppression du fichier temporaire"); } );
            console.log("ERREUR : " + err);
            reject();
        });
    });

}