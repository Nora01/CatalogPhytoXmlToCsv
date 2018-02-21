"use strict";
const fs = require("fs");

module.exports = File;

function File (filePath) {
    function exists () {
        return fs.existsSync(filePath);
    }

    let erase = function () {
        if (exists()) {
            fs.unlinkSync(filePath, "", (err) => {
                if (err) throw err;
            });
        }
    }

    let write = function (data) {
        if (data === undefined) return;
        let fd = fs.openSync(filePath, 'a+');
        fs.appendFileSync(fd, data, 'utf8');
        try {

        } catch (err) {
            console.log("Une erreur est survenue lors de l'écriture du fichier. Données non sauvegardées.");
            if (err) throw err;
        }
    }

    return {
        erase: erase,
        write: write
    }
};