/*
Fonction permettant de calculer un tick.
IN : les valeurs de différents objets du jeu.
OUT : met à jour la valeur de plusieurs objets du jeu et appelle les fonctions utiles.
*/ 
async function Simulation(deltaTicks)
{
    if(run.running)
    {
        GestionAutomates();

        GestionProduction(deltaTicks);

        GestionDensite(deltaTicks);

        GestionEvents();

        GestionAffichages();
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


/*
création de la page au chargement
 */
window.onload = function()
{
    Promise.all([
        ChargerHTML("contenus_onglets", "HTML/contenu_entites.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_equilibre.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_crunch.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_challenges.html"),
        ChargerHTML("contenus_onglets", "HTML/contenu_statistiques.html")
    ]).then(() => {
        Start();
    });

};


/*
Fonction permettant le démarage du jeu.
IN : l'êtat des variables au chargement de page (actuellement etat initial).
OUT : instancie le jeu, les variables, et remet la page prête pour reprendre le jeu.
*/ 
function Start()
{
    DemarrerSauvegarde();

    AffichageInitial();

    statistiques.tickPrecedent = Date.now();

    setInterval(() =>
    {
        let maintenant = Date.now();

        let deltaTemps = maintenant - statistiques.tickPrecedent;
        statistiques.tempsEnJeu += deltaTemps;

        statistiques.tickPrecedent = maintenant;

        
        let deltaTicks =
            (deltaTemps / 1000) * variables.actuel.crunch.tickSpeedCrunch * variables.actuel.densite.tickSpeedDensite;

        if (challenges.EnCours == 13) deltaTicks /= 4;

        Simulation(deltaTicks);

    }, 16);
}