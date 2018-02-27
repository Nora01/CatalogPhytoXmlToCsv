#!/usr/bin/env node
"use strict";

//Initialisation des modules requis
const config = require('./config/config.json');
const xmlToCsv = require('./libs/xml-to-csv.js');
const download = require('./libs/download.js');
const File = require('./libs/file.js');
const folder = require('./libs/folder.js');
const scrapper = require('./libs/web-scrapping.js');
const unzip = require('./libs/unzip.js');
const log = require('./libs/log.js');

/**
 * Traitement principal. Effecue les actions suivantes :
 * 1) Récupération de l'URL du fichier .zip contenant les fichiers xml par scrapping
 * 2) Téléchargemement du .zip
 * 3) Extraction du fichier dans un dossier temporaire
 * 4) Conversion xml vers csv de tous les fichiers xml trouvés dans le dossier
 *
 * Utilisation de async/await pour écriture synchrone de ce traitement asynchrone
 * En savoir plus : https://blog.xebia.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/
 *
 * Fonction IIFE
 * En savoir plus : https://fr.wikipedia.org/wiki/JavaScript#Expressions_de_fonctions_imm%C3%A9diatement_invoqu%C3%A9es
 *
 */
(async () => {
    try {
        log("DEBUT").toInfo();
        //1) Récupération de l'URL du fichier .zip contenant les fichiers xml par scrapping
        log("Analyse de la page " + config.url + "...").toInfo();
        const zipfile = await scrapper(config.url).getFile();

        //2) Téléchargemement du .zip
        log("Téléchargement du fichier " + zipfile + "...").toInfo();
        const ziplink = await download(zipfile);

        //3) Extraction du fichier dans un dossier temporaire
        log("Extraction du fichier " + ziplink + "...").toInfo();
        const dir = await unzip(ziplink, "");

        //4) Conversion xml vers csv de tous les fichiers xml trouvés dans le dossier
        log("Conversion des fichiers...").toInfo();
        File(config.chemin_sortie_csv).erase();
        folder(dir).getXmls().forEach(file => {
            log("Conversion du fichier "  + file + "...").toInfo();
            let data = xmlToCsv(dir + file);
            File(config.chemin_sortie_csv).write(data);
        });
        log("FIN").toInfo();
    } catch (err) {
        if (err) {
            log(err).toError();
            log("ERREUR DU SCRIPT. ARRET.").toError();
            log("FIN").toError();
            throw new Error(err);
        }
    }

})();