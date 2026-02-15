/*

*/
function CalculerProduction()
{
    let entites = Object.keys(nombres_entite.actuel.particules);
    production = 0
    for (let i = 0; i < entites.length; i++)
    {
        production += nombres_entite.actuel.particules[entites[i]];

    }
    return production
}

/*

*/
function CalculerDensite()
{
    let entites = Object.keys(densite);
    let masse = 0;
    for (let i = 0; i < entites.length; i++)
    {
        masse += (densite[entites[i]]*nombres_entite.actuel.particules[entites[i]]);
    }

    masse /= variables.densite.actuel.diviseurMassique;
    let densiteBrute = masse / variables.densite.actuel.taille;

    let densiteActuelle = densiteBrute * variables.densite.actuel.alpha + ressources.densite * (1-variables.densite.actuel.alpha);
    densiteActuelle = Math.min(densiteActuelle*100, variables.densite.actuel.cap)/100;
    return densiteActuelle;
}