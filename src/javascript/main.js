/*
Fonction permettant de calculer un tick.
IN : les valeurs de différents objets du jeu.
OUT : met à jour la valeur de plusieurs objets du jeu et appelle les fonctions utiles.
*/ 
async function Tick(params)
{
    if(run.running)
    {
        TickActuel = Date.now();
        statistiques.tempsEnJeu += TickActuel - statistiques.tickPrecedent;
        statistiques.tickPrecedent = TickActuel;

        production = CalculerProduction();
        if (challenges.EnCours == 15) ressources['particules'] += Math.sqrt((variables['densite']['vitesse'] * ressources['densitepc']) * production *0.01);
        else ressources['particules'] += (variables['densite']['vitesse'] * ressources['densitepc']) * production *0.01;
        
        
        GestionDensite();
        AfficherPaliersDensiteMax();
        AfficherRessources();
        if (onglet_actuel.onglet_actuel == 'contenu_statistiques')
        {
            AfficherStatistiques();
        }
        

    }
}

/*

*/
function CalculerProduction()
{
    let entites = Object.keys(nombres_entite['actuel']['particules']);
    production = 0
    for (let i = 0; i < entites.length; i++)
    {
        production += nombres_entite['actuel']['particules'][entites[i]];

    }
    return production
}

/*
Fonction permettant de mettre en pause le jeu ou de reprendre.
IN : aucun.
OUT : le jeu passe dans l'êtat qu'il n'avait pas.
*/ 
function Stop()
{
    run.running = !run.running;
}

window.onload = Start;
