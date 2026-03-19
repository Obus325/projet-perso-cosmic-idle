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

const prix =
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

                densite :
                    {
                        taille : 10,
                        diviseurMassique : 10,
                        cap : 10,
                        automate : 10,
                        equilibrium : 10,
                        max : 10,
                        boostEquilibrium : 10,
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

                densite :
                    {
                        taille : 10,
                        diviseurMassique : 10,
                        cap : 10,
                        automate : 10,
                        equilibrium : 10,
                        max : 10,
                        boostEquilibrium : 10,
                    },
            },

        initial :
            {
                particules :
                    {
                        atome : 10,
                        nebuleuse : 10,
                        etoile : 100,
                        constellation : 1000,
                        galaxie : 10000,
                    },

                densite :
                    {
                        taille : 1,
                        diviseurMassique : 10,
                        cap : 10,
                        automate : 10,
                        equilibrium : 10,
                        max : 10,
                        boostEquilibrium : 10,
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
    densite_max : 0,
    equilibrium : 10,
    timeShards : 0,
}


//variables comportant l'ensemble des valeur 'fixes' permettants les calculs
//ces variables sont modifiables sous des conditions précises
const variables = 
{
    actuel :
        {
            densite :
                {
                    diviseurMassique: 1,
                    alpha: 0.05,
                    taille: 100,
                    cap: 1,
                    vitesse: 0,
                    boostDMax: 1,
                    boostEquilibrium: 1,
                },
        },

    initial :
        {
            densite :
                {
                    diviseurMassique: 1,
                    alpha: 0.05,
                    taille: 100,
                    cap: 1,
                    vitesse: 0,
                    boostDMax: 1,
                    boostEquilibrium: 1,
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

//constante permettant de mettre sur pause
const run = {running : true}


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
