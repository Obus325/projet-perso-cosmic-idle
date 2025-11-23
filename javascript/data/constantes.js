const nombres_entite = 
{
    particules : 
    {
        atome : 0,
        nebuleuse : 0,
        etoile : 0,
        galaxie : 100,
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

const ressources = 
{
    particules : 1,
    densite : 0,
    densitepc : 0,
    densite_max : 0,
}

const densite = 
{
    atome : 10,
    nebuleuse : 20,
    etoile : 30,
    galaxie : 40,
}

const constantes = 
{
    densite :
    {
        diviseurDensite : 1,
        alpha : 0.05,
        taille : 100,
        cap : 1,
    }

}

const evenements =
{
    menu : 
    {
        densite : true,
    },
}

const run = {running : true}

const onglet_actuel = {onglet_actuel : "contenu_particules"}