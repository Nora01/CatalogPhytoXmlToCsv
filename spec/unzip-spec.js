"use strict";
const unzip = require('../libs/unzip');
const fs = require("fs");

describe("Le module de gestion des archives", function () {

    it("extrait correctement une archive", async function(){
        let filepath = process.cwd() + "/spec/testing/unzip/archive.zip";
        let outputpath = process.cwd() + "/spec/testing/unzip/temp/";
        let filesToFind = [ 'editable-file.txt', 'uneditable-file.txt' ];
        try {
            await unzip(filepath, outputpath);
        } catch(err) {
            throw err;
        }

        expect(fs.readdirSync(outputpath)).toEqual(filesToFind);
        fs.readdirSync(outputpath).forEach((f) => {
            fs.unlinkSync(outputpath + "/"  + f);
        });
    });

    it("affiche une erreur si le chemin de l'archive est incorrect", function(done){
        let filepath = process.cwd() + "/spec/testing/unzip/aaa.zip";
        let outputpath = process.cwd() + "/spec/testing/unzip/temp/";

        unzip(filepath, outputpath).then(function(){
            done.fail();
        }).catch(function(e){
            expect(e.message).toBe("Invalid filename");
            done();
        });
    });

    it("affiche une erreur si le chemin d'extraction est incorrect", function(done){
        let filepath = process.cwd() + "/spec/testing/unzip/archive.zip";
        let outputpath = "/system/";

        unzip(filepath, outputpath).then(function(){
            done.fail();
        }).catch(function(e){
            expect(e.message).toMatch("no such file");
            done();
        });
    })
});