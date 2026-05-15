/*
Fonction de calcul de la production de particules
IN : l'état du jeu
OUT : la production (number)
*/
function CalculerProduction()
{
    let entites = Object.keys(nombres_entite.actuel.particules);
    let production = 0
    for (let i = 0; i < entites.length; i++)
    {
        production += nombres_entite.actuel.particules[entites[i]];

    }
    return production * CalculerGenBoost();
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
    return 1 + 4 * ressources.densite * (variables.actuel.densite.cap - ressources.densite) * variables.actuel.densite.boostEquilibrium;
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

function CalculerGenBoost()
{
    sumgens = 0;
    for (let i = 1; i <= variables.actuel.crunch.generateurs; i++)
    {
        nameGen = "gen_" + (i);
        sumgens += 0.5 * nombres_entite.actuel.generateurs[nameGen];
    }
    console.log("boost gen : " + sumgens)
    return sumgens + 1;
}