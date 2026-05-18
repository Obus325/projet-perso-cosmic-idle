/*
Fonction de calcul de la production de particules
IN : l'état du jeu
OUT : la production (number)
*/
function CalculerProduction(deltaTicks)
{
    let production = 0
    for (entite in nombres_entite.actuel.particules)
    {
        production += nombres_entite.actuel.particules[entite] * poids_entite.actuel.particules[entite];

    }
    return production * CalculerGenBoost() * deltaTicks;
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

        let densiteActuelle = (CalculerMasse() / variables.actuel.densite.taille) * 0.05 + ressources.densite * (1 - 0.05);
        densiteActuelle = Math.min(densiteActuelle, variables.actuel.densite.cap);
        return densiteActuelle;
    }
}
function CalculerMasse()
{
    let masse = 0;
    for (entite in poids_entite.actuel.densite) {
        masse += (poids_entite.actuel.densite[entite] * nombres_entite.actuel.particules[entite]);
    }

    masse /= variables.actuel.densite.diviseurMassique;
    return masse;
}

function CalculerVitesse()
{
    return Math.max(variables.actuel.densite.cap - ressources.densite, 0);
}

function CalculEquilibrium(deltaTicks)
{
    return 1 + 4 * ressources.densite * (variables.actuel.densite.cap - ressources.densite) * variables.actuel.densite.boostEquilibrium * deltaTicks;

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
        sumgens += 0.5 * nombres_entite.actuel.generateurs["gen_" + (i)] * (i);
    }
    return sumgens + 1;
}