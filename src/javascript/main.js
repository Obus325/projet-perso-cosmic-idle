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
        if (challenges.EnCours == 15) ressources.particules += Math.sqrt((variables.densite.actuel.vitesse * ressources.densitepc) * production *0.01);
        else ressources.particules += (variables.densite.actuel.vitesse * ressources.densitepc) * production *0.01;
        
        
        GestionDensite();
        AfficherPaliersDensiteMax();
        AfficherRessources();
        if (onglet_actuel.onglet_actuel == 'contenu_statistiques')
        {
            AfficherStatistiquesTemps();
        }

        GestionEvents();

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

window.onload = function()
{

    Promise.all([
        ChargerHTML("contenus_onglets", "HTML/contenu_entites.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_equilibre.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_crunch.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_challenges.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_statistiques.html")
    ]).then(() => {
        Start(); // maintenant le DOM existe vraiment
    });

};
