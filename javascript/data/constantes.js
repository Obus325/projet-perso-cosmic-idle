const nombres_entite = 
{
    particules : 
    {
        atome : 0,
        nebuleuse : 0,
        etoile : 0,
        galaxie : 0,
    }
    
}

const prix_entite = 
{
    particules :
    {
        atome : 1,
        nebuleuse : 10,
        etoile : 100,
        galaxie : 1000,
    }
}

const prix_initiaux_entite = 
{
    particules :
    {
        atome : 10,
        nebuleuse : 100,
        etoile : 1000,
        galaxie : 10000,
    }
}



const densite = 
{
    atome : 10,
    nebuleuse : 20,
    etoile : 30,
    galaxie : 40,
}


//ensemble des ressources du joueur (mal rangé)
const ressources = 
{
    particules : 1,
    densite : 0,
    densitepc : 0,
    densite_max : 0,
}
//constante comportant l'ensemble des valeur 'fixes' permettants les calculs
//ces constantes sont modifiables sous des conditions précises
const constantes = 
{
    densite :
    {
        diviseurMassique : 1,
        alpha : 0.05,
        taille : 100,
        cap : 100,
        vitesse : 0,
    }

}

//constante des differents paliers de densite max
const paliers = 
{
    
}



//constantes sur les onglets pour la gestion dynamique
const ongletsVisibles =
{
    menu : 
    {
        particules : true,
        densite : true,
        statistiques : true,
    },

    sous_onglets :
    {
        particules :
        {
            base : true,
            p1 : false,
            p2 : true,
        },
        densite : 
        {
            densite : true,
            progression : true,
        },
        statistiques :
        {
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

