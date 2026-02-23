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
        //recherche d'une meilleure solution en cours.
        tickPrecedent : 0,
    }

const evenements =
    {
        crunchUnlock :
            {
                unlocked : false,
                condition : function() { return ressources.particules > 1000; },
                recompense : UnlockCrunch,
                parametre : null,
            },

        crunchBreak :
            {
                unlocked : false,
                condition : function() { return statistiques.nombreCrunchs>0 && VerifierChallenges("particules");},
                recompense : UnlockCrunch,
                parametre : null,
            }
    }



const ongletsVisibles =
    {
        menu :
            {
                particules : true,
                densite : true,
                crunch : true,
                statistiques : true,
                challenges : true,
            },

        sous_onglets :
            {
                particules :
                    {
                        base : true,
                        crunch : false,
                        p2 : true,
                    },
                densite :
                    {
                        densite : true,
                        progression : true,
                    },

                crunch :
                    {
                        base : true,
                    },

                challenges :
                    {
                        particules : true,
                        crunch : true,
                    },

                statistiques :
                    {
                        temps : true,
                        crunch : true,
                    },

            }
    }

const onglet_actuel = {
    onglet_actuel : "contenu_particules",
    sous_onglet_actuel : "sous_onglet_particules_base",
}