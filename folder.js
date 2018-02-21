"use strict";
const fs = require("fs");

module.exports = folder;

function folder(dir) {
    let getXmls = function() {
        return fs.readdirSync(dir).filter(file => {
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
