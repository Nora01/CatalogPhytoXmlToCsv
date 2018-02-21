#!/usr/bin/env node
"use strict";

const xmlToCsv = require('./xmlToCsv.js');
const download = require('./download.js');
const File = require('./file.js');
const folder = require('./folder.js');
const scrapper = require('./web-scrapping.js');
const unzip = require('./unzip.js');

const url = "http://www.data.gouv.fr/fr/datasets/donnees-ouvertes-du-catalogue-des-produits-phytopharmaceutiques-adjuvants-matieres-fertilisantes-et-support-de-culture-produits-mixtes-et-melanges-e-phy/";
const outputPath = 'output.txt';
let fileHandle = File(outputPath).erase();
//const dir = "decisionAMM_intrant_format_xml/";
console.log("URL de sortie du fichier CSV : " + outputPath);
process();


async function process () {
    const zipfile = await scrapper(url).getFile();
    const ziplink = await download(zipfile);
    const dir = await unzip(ziplink, "");

    File(outputPath).erase();

    folder(dir).getXmls().forEach(file => {
        let data = xmlToCsv(dir + file);
        File(outputPath).write(data);
    });

}




//const inputPath = 'decisionAMM_intrant_format_xml/decision_intrant_20180206_1517910744590.xml';




//fs.createReadStream('/users/nora/temp.zip').pipe(unzip.Extract({ path: '/users/nora/' }));





