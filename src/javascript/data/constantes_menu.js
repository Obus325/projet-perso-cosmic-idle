const statistiques =
    {
        dateCreation : 0,
        tempsEnJeu : 0,
        nombreCrunchs : 0,
        crunchsPrecedents :
            {
                0 : {duree : 0, tick :0},
                1 : {duree : 0, tick :0},
                2 : {duree : 0, tick :0},
                3 : {duree : 0, tick :0},
                4 : {duree : 0, tick :0},
                5 : {duree : 0, tick :0},
                6 : {duree : 0, tick :0},
                7 : {duree : 0, tick :0},
                8 : {duree : 0, tick :0},
                9 : {duree : 0, tick :0},
            },
        //TO DO : trouver une solution moins lourde.
        tickPrecedent : 0,
    }

const evenements =
    {
        densiteUnlock :
        {
            unlocked : false,
            condition : function() { return ressources.densite_max > 0.5; },
            recompense : function() { ongletsVisibles.menu.densite = true; AfficherOnglet(); AfficherSousOnglets('densite');},
            parametre : null,
        },

        crunchUnlock :
        {
            unlocked : false,
            condition : function() { return ressources.particules > 1000; },
            recompense : function() { UnlockCrunch(); },
            parametre : null,
        },

        firstcrunchUnlock :
        {
            unlocked : false,
            condition : function() { return statistiques.nombreCrunchs>0; },
            recompense : function() { UnlockPages(); },
            parametre : null,
        },

        crunchBreak :
        {
            unlocked : false,
            condition : function() { return statistiques.nombreCrunchs>0 && VerifierChallenges("particules");},
            recompense : function() { ongletsVisibles.sous_onglets.crunch.arbre = true; AfficherSousOnglets('crunch');},
            parametre : null,
        }
    }



const ongletsVisibles =
    {
        menu :
            {
                particules : true,
                densite : false,
                crunch : false,
                statistiques : true,
                challenges : false,
            },

        sous_onglets :
            {
                particules :
                    {
                        base : true,
                        crunch : false,
                    },
                densite :
                    {
                        densite : true,
                        progression : true,
                    },

                crunch :
                    {
                        base : true,
                        arbre : false,
                    },

                challenges :
                    {
                        particules : true,
                    },

                statistiques :
                    {
                        temps : true,
                        crunch : false,
                    },

            }
    }

const onglet_actuel = {
    onglet_actuel : "contenu_particules",
    sous_onglet_actuel : "sous_onglet_particules_base",
}