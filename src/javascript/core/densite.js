/*
Fonction de gestion de la densité
IN : rien
OUT : rien
*/ 
function GestionDensite(deltaTicks)
{
    let GainEquilibrium = CalculEquilibrium(deltaTicks);
    let densiteActuelle = CalculerDensite();
    ActualisationConstantes(densiteActuelle, GainEquilibrium);
    GestionDensiteMax(densiteActuelle);


}

function ActualisationConstantes(densiteActuelle, GainEquilibrium)
{
    ressources.densite = densiteActuelle;
    if (ongletsVisibles.menu.densite == true) ressources.equilibrium += GainEquilibrium;
}


/*
Fonction de gestion de la densité maximale atteinte
IN : rien
OUT : rien
*/ 
function GestionDensiteMax(densiteActuelle)
{
    ressources.densite_max = Math.max(ressources.densite_max, densiteActuelle*variables.actuel.densite.boostDMax);
    GestionPaliersDensiteMax();
}

/* 
Fonction en travaux
IN : rien
OUT : rien
*/
function GestionPaliersDensiteMax()
{
    AfficherPaliersDensiteMax();
}
