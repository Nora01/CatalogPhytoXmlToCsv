"use strict"
const fs = require('fs');
const parseString = require('xml2js').parseString;

module.exports = XmlToCsv;

function XmlToCsv (filePath) {

    const types = [
        {"type": "PPPs", "key": "PPP"},
        {"type": "MFSCs", "key": "MFSC"},
        {"type": "adjuvants", "key": "adjuvant"},
        {"type": "produit-mixtes", "key": "produit-mixte"},
        {"type": "melanges", "key": "melange"}
    ];

    let parse = function () {
        let csvData = "", xml = "";

        try {
            xml = fs.readFileSync(filePath, 'utf8');
        } catch (err) {
            console.log("Impossible d'ouvrir le fichier " + filePath);
            process.exit();
        }

        console.log("Traitement du fichier "  + filePath + "...");
        parseString(xml, (err, result) => {
            result.reponse.intrants.forEach(element => {
                types.forEach(t => {
                    if (element[t.type] === undefined) return;

                    element[t.type][0][t.key].forEach(p => {
                        let currentProduct = "";
                        currentProduct += getFlatProperty(p, "type-produit") + ";"
                            + getFlatProperty(p, "numero-AMM") + ";"
                            + getFlatProperty(p, "nom-produit") + ";"
                            + getNestedProperty(p["autres-noms"], "nom") + ";"
                            + getNestedProperty(p["titulaire"], "_") + ";"
                            + getNestedProperty(p["type-commercial"], "_") + ";"
                            + getNestedProperty(p["gamme-usage"], "_") + ";"
                            + getNestedProperty(p["composition-integrale"], "nom")+ " (" + getNestedProperty(p["composition-integrale"], "_").split(" | ")[0] + ")" + ";"
                            + getNestedProperty(p["fonctions"], "_") + ";"
                            + getNestedProperty(p["type-formulations"], "_") + ";";

                        if (p["usages"] !== undefined && p["usages"][0]["usage"] !== undefined) {
                            p["usages"][0]["usage"].forEach(u => {
                                csvData = csvData + currentProduct
                                    + getNestedProperty(u, "lib-court") + ";"
                                    + getNestedProperty(u["identifiant-usage"], "_") + ";"
                                    + getNestedProperty(u, "date-decision") + ";"
                                    + getNestedProperty(u["stade-cultural-min"], "_") + ";"
                                    + getNestedProperty(u["stade-cultural-max"], "_") + ";"
                                    + getNestedProperty(u["etat-usage"], "_") + ";"
                                    + getNestedProperty(u["dose-retenue"], "_") + ";"
                                    + getNestedProperty(u["dose-retenue"], "unite") + ";"
                                    + getNestedProperty(u, "delai-avant-recolte-jour") + ";"
                                    + getNestedProperty(u, "delai-avant-recolte-bbch") + ";"
                                    + getNestedProperty(u, "nombre-apport-max") + ";"
                                    + getNestedProperty(u, "date-fin-distribution") + ";"
                                    + getNestedProperty(u, "date-fin-utilisation") + ";"
                                    + getNestedProperty(u, "condition-emploi") + ";"
                                    + getNestedProperty(u["ZNT-aquatique"], "_") + ";"
                                    + getNestedProperty(u["ZNT-arthropodes-non-cibles"], "_") + ";"
                                    + getNestedProperty(u["ZNT-plantes-non-cibles"], "_") + ";"
                                    + getNestedProperty(u["mentions-autorisees"], "_") + ";"

                                    + "\n";
                            });

                        }else {
                            csvData = csvData + currentProduct + ";;;;;;;;;;;;;;;;;;" + "\n";
                        }
                    });
                });
            });
        });
        return csvData;
    }

    function flatten (arr) {
        return [].concat.apply(arr);
    }

    function getNestedProperty(obj, key, out) {
        let i,
            proto = Object.prototype,
            ts = proto.toString,
            hasOwn = proto.hasOwnProperty.bind(obj);

        if ('[object Array]' !== ts.call(out)) out = [];

        for (i in obj) {
            if (hasOwn(i)) {
                if (i === key) {
                    out.push(obj[i]);
                } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                    getNestedProperty(obj[i], key, out);
                }
            }
        }

        out =  flatten(out);
        return out.join(" | ");
    }

    function getFlatProperty(data, property) {
        return data[property];
    }

    return parse();
};
