/**
 * Module de récupération du lien de l'archive contenant les fichiers phyto xml
 * @module xml-to-csv
 */
"use strict"
const fs = require('fs');
const parseString = require('xml2js').parseString;

/**
 * Export du module
 * @type function
 */
module.exports = XmlToCsv;


/**
 * Définition du fichier xml à convertir
 *
 * @param {string} filePath - chemin du fichier xml
 * @return {string} Données du fichier xml converties au format csv
 */
function XmlToCsv (filePath) {

    /**
     * Noeuds concernés par la conversion
     */
    const types = [
        {"type": "PPPs", "key": "PPP"},
        {"type": "MFSCs", "key": "MFSC"},
        {"type": "adjuvants", "key": "adjuvant"},
        {"type": "produit-mixtes", "key": "produit-mixte"},
        {"type": "melanges", "key": "melange"}
    ];

    /**
     * Conversion du fichier
     *
     * @return {string} Données du fichier xml converties au format csv
     */
    let parse = function () {
        let csvData = "", xml = "";

        try {
            xml = fs.readFileSync(filePath, 'utf8');
        } catch (err) {
            throw new Error(err);
        }
        
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

    /**
     * Mise à plat d'un tableau nesté
     *
     * @param {array} arr tableau à mettre à plat
     * @return {array} tableau mis à plat
     */
    function flatten (arr) {
        return [].concat.apply(arr);
    }

    /*
     * Récupèration de la valeur d'un noeud ou d'un attribut nesté
     * L'utilisation de cette fonction n'est pas très intuitive.
     * Il faut donner en premier paramètre l'objet représentant le noeud de premier niveau, 
     * puis en second paramètre le nom du noeud (s'il ne contient pas d'attribut), ou "_" (si le noeud contient des attributs)
     * 
     * @todo : fonction à réécrire pour simplification
     *
     * @param {object} obj noeud niveau 1
     * @param {object} key clé à chercher
     * @param {array} out sortie
     * @return {string} valeur
     */
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

    /*
     * Récupèration de la valeur d'un noeud

     * @param {object} obj noeud
     * @param {string} property propriété
     * @return {string} valeur
     */
    function getFlatProperty(data, property) {
        return data[property];
    }

    return parse();
};
