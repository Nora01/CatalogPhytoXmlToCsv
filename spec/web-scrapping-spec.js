'use strict';
const scrapping = require('../libs/web-scrapping');

describe("Le module de scrapping", function(){

    it("renvoie le lien vers le bon fichier", function(done){
        const url = "http://www.api-agro.fr/";
        const regex = "logoapi";

        scrapping(url).getFile(regex).then(function(file){
            console.log(file);
            done();
        }).catch(function(e){
            done.fail();
        });
    });

    it("affiche une erreur si l'URL est inaccessible", function(){

    });

    it("Affiche une erreur si aucun fichier n'est trouvé", function(){

    });

});
