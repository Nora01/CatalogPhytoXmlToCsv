"use strict";

const download = require('../libs/download');
const fs = require('fs');

describe("Le module de téléchargement", function(){
    it("télécharge correctement un fichier", function(done){
        const outputpath = process.cwd() + '/spec/testing/google.png';
        const fileToBeDownloaded = 'https://www.google.fr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

        download(fileToBeDownloaded, outputpath).then(function(){
            expect(fs.existsSync(outputpath)).toEqual(true);
            done();
        }).catch(function(e){
            done.fail();
        });
    });

    it("affiche une erreur si le fichier est inaccessible", function(done){
        const outputpath = process.cwd() + '/spec/testing/google.png';
        const fileToBeDownloaded = 'https://localhost/notthere.png';

        download(fileToBeDownloaded, outputpath).then(function(){
            done.fail();
        }).catch(function(e){
            done();
        });
    });

    it("affiche une erreur si le chemin de destination est inaccessible", function(done){
        const outputpath = process.cwd() + '/spec/testing/notthere/google.png';
        const fileToBeDownloaded = 'https://www.google.fr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

        download(fileToBeDownloaded, outputpath).then(function(){
            done.fail();
        }).catch(function(e){
            done();
        });
    });
});