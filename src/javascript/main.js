/*
Fonction permettant de calculer un tick.
IN : les valeurs de différents objets du jeu.
OUT : met à jour la valeur de plusieurs objets du jeu et appelle les fonctions utiles.
*/ 
async function Tick(params)
{
    if(run.running)
    {
        GestionTick();

        GestionAutomates();

        GestionProduction();

        GestionDensite();

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
