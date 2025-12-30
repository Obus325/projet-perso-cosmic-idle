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

        let entites = Object.keys(nombres_entite['particules']);
        production = 0
        for (let i = 0; i < entites.length; i++)
        {
            production += nombres_entite['particules'][entites[i]];

        }
        
        ressources['particules'] += (variables['densite']['vitesse'] * ressources['densitepc']) * production;
        
        
        CalculerDensite();
        AfficherPaliersDensiteMax();
        AfficherRessources();
        if (onglet_actuel.onglet_actuel == 'contenu_statistiques')
        {
            AfficherStatistiques();
        }
        

    }
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
