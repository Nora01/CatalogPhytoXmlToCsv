"use strict";
let file = require('../libs/file');
const fs = require("fs");


describe("La fonction File(filepath).write(data)", function() {
    it("peut créer un fichier", function() {
        let filepath = process.cwd() + "/spec/testing/test.txt";
        file(filepath).write("test");
        expect(fs.existsSync(filepath)).toEqual(true);
        fs.unlinkSync(filepath);
    });

    it("affiche une erreur sur impossibité de création / écriture", function() {
        let filepath = process.cwd() + "/spec/toto/test1.txt";

        expect(function(){
            file(filepath).write("test")
        }).toThrow();
    });

    it("peut écrire dans un fichier", function() {
        let filepath = process.cwd() + "/spec/testing/test5.txt";
        file(filepath).write("test");
        let buf = fs.readFileSync(filepath, "utf8");
        expect(buf).toEqual("test");
        fs.unlinkSync(filepath);
    });

    it("ajoute les données à celle existantes", function() {
        let filepath = process.cwd() + "/spec/testing/test5.txt";
        file(filepath).write("test");
        file(filepath).write("test2");
        let buf = fs.readFileSync(filepath, "utf8");
        expect(buf).toEqual("testtest2");
        fs.unlinkSync(filepath);
    });

    it("ne créé pas de fichier si pas de données à écrire", function() {
        let filepath = process.cwd() + "/spec/testing/test2.txt";
        file(filepath).write("");

        let accessible = true;
        try {
            fs.accessSync(filepath, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            accessible = false;
        }

        expect(accessible).toEqual(false);
    });
});

describe("La fonction File(filepath).erase()", function() {
    it("peut supprimer un fichier", function(){
        let filepath = process.cwd() + "/spec/testing/test3.txt";
        file(filepath).write("test");
        file(filepath).erase();
        let accessible = true;
        try {
            fs.accessSync(filepath, fs.constants.R_OK);
        } catch (err) {
            accessible = false;
        }

        expect(accessible).toEqual(false);
    });

    it("n'affiche pas d'erreur si le fichier à supprimer n'existe pas", function(){
        let filepath = process.cwd() + "/spec/testing/toto.txt";

        expect(function(){
            file(filepath).erase()
        }).not.toThrow();
    });
});
