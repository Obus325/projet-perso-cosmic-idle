const nombres_entite = 
{
    actuel:
    {
        particules :
        {
            atome : 0,
            nebuleuse : 0,
            etoile : 0,
            constellation : 0,
            galaxie : 0,
        },
    },

    initial :
    {
        particules :
        {
            atome : 0,
            nebuleuse : 0,
            etoile : 0,
            constellation : 0,
            galaxie : 0,
        },
    },

    
}

const prix_entite =
    {
        actuel :
        {
            particules :
            {
                atome : 1,
                nebuleuse : 10,
                etoile : 100,
                constellation : 1000,
                galaxie : 10000,
            },
        },

        increment :
        {
            particules :
            {
                atome : 10,
                nebuleuse : 100,
                etoile : 1000,
                constellation : 10000,
                galaxie : 100000,
            },
        },

        initial :
        {
            particules :
            {
                atome : 1,
                nebuleuse : 10,
                etoile : 100,
                constellation : 1000,
                galaxie : 10000,
            },
        }

    }

const densite = 
{
    atome : 10,
    nebuleuse : 20,
    etoile : 30,
    constellation : 40,
    galaxie : 50,
}


//ensemble des ressources du joueur (mal rangé)
const ressources = 
{
    particules : 1,
    densite : 0,
    densitepc : 0,
    densite_max : 0,
    timeShards : 0,
}


//variables comportant l'ensemble des valeur 'fixes' permettants les calculs
//ces variables sont modifiables sous des conditions précises
const variables = 
{
    densite :
    {
        actuel :
        {
            diviseurMassique : 1,
            alpha : 0.05,
            taille : 100,
            cap : 100,
            vitesse : 0,
            boostDMax : 1,
        },

        initial :
        {
            diviseurMassique : 1,
            alpha : 0.05,
            taille : 100,
            cap : 100,
            vitesse : 0,
            boostDMax : 1,
        },
    },

}

//valeur cibles des differents paliers de densite max
const paliers = 
{
    0 : 0,
    1 : 3,
    2 : 10,
    3 : 35,
    4 : 140,
    5 : 700,
    6 : Infinity,
}



//constantes sur les onglets pour la gestion dynamique
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
//fin des constantes sur les onglets


//constante permettant de mettre sur pause
const run = {running : true}


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

const challenges = 
{
    EnCours : 0,
    particules : 
    {
        debloque : true,
        defis :
        {
            11 : 
            {
                reussi : false,
                informations : "la densité est fixée à 20%",
                condition : function () {return ressources.particules > 1000;},
            },
            12 : 
            {
                reussi : false,
                informations : "il est impossible de dépasser les étoiles",
                condition : function () {return ressources.particules > 1000;},
            },
            13 : 
            {
                reussi : false,
                informations : "la vitesse du jeu est réduite : ticks / 4",
                condition : function () {return ressources.particules > 1000;},
            },
            14 : 
            {
                reussi : false,
                informations : "les paliers de densité sont multipliés par 2",
                condition : function () {return ressources.particules > 1000;},
            },
            15 : 
            {
                reussi : false,
                informations : "la production est réduite à sa racine carrée",
                condition : function () {return ressources.particules > 1000;},
            },
        },
    },
    
    crunch : 
    {
        debloque : false,
        defis :
        {
            11 : 
            {
                debloque : false
            }
        },
    }
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