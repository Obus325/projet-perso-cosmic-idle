const noeuds = {
    101 : {
        nom : "noeud_1",
        nom_affichage : "101",
        description : "Le premier noeud, il est très simple et ne fait pas grand chose.",
        effet : "Augmente la production de particules de 1%",
        debloque : false,
        parent : [],
        prix : 1,
        recompense : function() {console.log("Noeud 101 débloqué !")},
    },
}