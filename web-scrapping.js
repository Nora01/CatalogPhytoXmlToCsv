/**
 * Module de récupération du lien de l'archive contenant les fichiers phyto xml
 * @module web-scrapping
 */
"use strict";
const rq = require("request");
const cheerio = require("cheerio");

/**
 * Export du module
 * @type function
 */
module.exports = url;

/**
 * URL de la page sur laquelle va s'effectuer le scrapping
 * Renvoie les fonctions publiques utilisables sur cet objet. 
 *
 * @param {string} url - URL de la page sur laquelle va s'effectuer le scrapping
 * @return {Object} fonctions publiques utilisables
 */
function url (url) {

    /**
     * Retourne l'URL de l'archive
     *
     * @async
     * @return {string} URL de l'archive 
     */
    async function getFile() {
       let html = await processHtml();
       return getLink(html);
    }

    /**
     * Parsing du HTML pour extraire le lien de l'archive
     * Dans tous les liens trouvés, utilise la regex suivante pour récupérer le bon lien : /^http.+decisionAMM.+zip/g
     *
     * @param {string} html - contenu HTML de la page à analyser
     * @return {string} URL de l'archive 
     */
    function getLink(html) {

        try {
            let $ = cheerio.load(html);
        } catch (err) {
            if (err) throw new Error(err);
        }
        
        let $ = cheerio.load(html);
        let links = $('a');
        let downloadLink = links.filter((i, l) => {
            return /^http.+decisionAMM.+zip/g.test($(l).attr('href'));
        });
        let link = $(downloadLink).attr("href");

        if (link !== undefined) {
            return link;
        } else {
            throw new Error("aucun lien vers les fichiers phyto trouvés dans la page.");
        }
        
    }

    /**
     * Connexion et parsing de la page.
     * Renvoie une promesse ES6. 
     * En savoir plus : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise

     * @return {Promise<string>} contenu de la page 
     */
    async function processHtml() {
        return new Promise(
            function (resolve, reject) {
                rq(url, function (error, response, html) {
                    if (!error && response.statusCode === 200) {
                        resolve(html);
                    } else if (statusCode !== 200) {
                        throw new Error("Code réponse de page : " + response.statusCode);
                        reject();
                    } else {
                        throw new Error(error);
                        reject();
                    }
                })}
        );
    }

    return {
        getFile: getFile
    }
}