/*
Fonction de calcul de la production de particules
IN : l'état du jeu
OUT : la production (number)
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
Fonction de calcul de la densité
IN : l'état du jeu
OUT : la densité actuelle (number)
*/
function CalculerDensite()
{
    if (challenges.EnCours == 11) return 0.2;
    else {
        let entites = Object.keys(densite);
        let masse = 0;
        for (let i = 0; i < entites.length; i++) {
            masse += (densite[entites[i]] * nombres_entite.actuel.particules[entites[i]]);
        }

        masse /= variables.actuel.densite.diviseurMassique;
        let densiteBrute = masse / variables.actuel.densite.taille;

        let densiteActuelle = densiteBrute * variables.actuel.densite.alpha + ressources.densite * (1 - variables.actuel.densite.alpha);
        densiteActuelle = Math.min(densiteActuelle, variables.actuel.densite.cap);
        return densiteActuelle;
    }
}

function CalculEquilibrium()
{
    let equi = 4*ressources.densite*(variables.actuel.densite.cap-ressources.densite)*variables.actuel.densite.boostEquilibrium
    console.log(equi)
    return equi;
}

/*
Fonction de calcul du palier atteint le plus haut
IN : l'état du jeu
OUT : palier le plus haut (int)
*/
function DernierPalierAtteint()
{
    let palierActuel = 0;
    for (let i = 0; i < Object.keys(paliers).length; i++)
    {
        if (ressources['densite_max'] >= paliers[i])
        {
            palierActuel = i;
        }
    }
    return palierActuel;

}