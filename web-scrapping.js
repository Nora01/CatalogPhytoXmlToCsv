"use strict";

const rq = require("request");
const cheerio = require("cheerio");

module.exports = url;

function url (url) {
    async function getFile() {
       let link = await processHtml();
       return link;
    }

    function getLink(html) {
        if (html !== undefined) {
            let $ = cheerio.load(html);
            let links = $('a');
            let downloadLink = links.filter((i, l) => {
                return /^http.+decisionAMM.+zip/g.test($(l).attr('href'));
            });
            let link = $(downloadLink).attr("href");

            if (link !== undefined) {
                return link;
            } else {
                console.log("ERREUR : aucun lien n'a été trouvé.");
                return undefined;
            }
        } else {
            console.log("ERREUR : impossible de charger les données");
        }
    }

    async function processHtml() {
        return new Promise(
            function (resolve, reject) {
                rq(url, function (error, response, html) {
                    if (!error && response.statusCode === 200) {
                        resolve(getLink(html));
                    } else if (statusCode !== 200) {
                        console.log("Erreur : code réponse de page : " + response.statusCode);
                        resolve(undefined);
                    } else {
                        console.log(error);
                        resolve(undefined);
                    }
                })}
        );
    }

    return {
        getFile: getFile
    }
}