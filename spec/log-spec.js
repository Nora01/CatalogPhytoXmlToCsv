"use strict";
let log = require('../libs/log');

describe("L'affichage des logs", function () {

    it("affiche correctement un message info", function(){
        expect(log("TEST INFO").toInfo()).toContain("[INFO] TEST INFO");
    });

    it("affiche correctement un message d'erreur", function(){
        expect(log("TEST INFO").toError()).toContain("[ERREUR] TEST INFO");
    });

    it("n'affiche rien si aucun message n'est passé 1", function(){
        expect(log().toInfo()).toBe("");
    });

    it("n'affiche rien si aucun message n'est passé 2", function(){
        expect(log().toInfo()).toBe("");
    });

    it("affiche une date correcte", function(){
        expect(log("test").toInfo()).toContain(String(new Date(Date.now()).toLocaleDateString("fr-FR")));
    });

});