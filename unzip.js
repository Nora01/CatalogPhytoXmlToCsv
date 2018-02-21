"use strict";
const uz = require('adm-zip');
const fs = require("fs");

module.exports = unzip;
function unzip(file) {
    return new Promise(function(resolve, reject){
        let homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
        console.log("Extraction de "+file+"...");
        try {
            new uz(file).extractAllTo(homedir + "/temp", true);
        } catch(err) {
            console.log(err);
            reject();
        }

        resolve(homedir + "/temp/");
    });
}