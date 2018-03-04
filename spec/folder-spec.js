"use strict";
const folder = require('../libs/folder');

describe("La fonction getXML", function () {
    it("retourne les fichiers XML du dossier", function(){
        const folderpath = process.cwd() + '/spec/testing/folder/';
        let files = folder(folderpath).getXmls();
        expect(files).toEqual(['test3.xml', 'test4.XML']);
    });

    it("retourne un tableau vide si aucun fichier XML n'est trouvé", function(){
        const folderpath = process.cwd() + '/spec/testing/';
        let files = folder(folderpath).getXmls();
        expect(files).toEqual([]);
    });

    it("retourne une erreur si le dossier est inaccessible", function(){
        const folderpath = process.cwd() + '/spec/notthere/';
        expect(function(){
            let files = folder(folderpath).getXmls();
        }).toThrow();
    });
});