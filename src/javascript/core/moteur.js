
/*
Fonction permettant le démarage du jeu.
IN : l'êtat des variables au chargement de page (actuellement etat initial).
OUT : instancie le jeu, les variables, et remet la page prête pour reprendre le jeu.
*/ 
function Start()
{
    console.log("suivant")
    RecupererSauvegarde("save");
    CreateStar();
    statistiques.tickPrecedent = Date.now();
    setInterval(Tick, 200);
    document.getElementById("valeur_particules").innerText = ressources.particules.toString();
    console.log(onglet_actuel);
    AfficherJeu();
    AffichageEntites();
    AfficherStatistiques();
}

/*
Fonction permettant d'effectuer un achat, effectue les vérifications nécessaires.
IN : l'objet à acheter et la quantité.
OUT : met à jour la valeur de l'objet acheté et de la ressource dépensée.
*/ 
function Acheter_entite(entite, nombre)
{
    if (challenges.EnCours == 12 && (entite == 'constellation' || entite == 'galaxie'))return;
    nombres_entite.actuel.particules[entite] += nombre;
    if (nombres_entite.actuel.particules[entite] % 10 == 0)
    {
        prix_entite.actuel.particules[entite] *= prix_entite.increment.particules[entite];
    }
    AffichageEntites();
}

/*

*/
function Achat(recompense, parametres, ressource, cleRessource, prix)
{
    if (ressource[cleRessource] >= prix)
    {
        ressource[cleRessource] -= prix;
        recompense(...parametres);
    }
}

/*

*/ 
function GestionDensite()
{
    if (challenges.EnCours == 11) densiteActuelle = 0.2;
    else densiteActuelle = CalculerDensite();
    GestionDensiteMax();
    ressources.densite = densiteActuelle;
    ressources.densitepc = densiteActuelle * 100;
    variables.densite.actuel.vitesse = Math.max(variables.densite.actuel.cap - ressources.densitepc, 0);
    document.getElementById("valeur_densité").innerText = ressources.densitepc.toFixed(0).toString() + "%";
    document.getElementById('pourcent_densite').style.width = (ressources.densitepc/variables.densite.actuel.cap)*100 + '%'

}


/*

*/ 
function GestionDensiteMax()
{
    ressources.densite_max = Math.max(ressources.densite_max, densiteActuelle*variables.densite.actuel.boostDMax);
    if (!ongletsVisibles.menu.densite && densiteActuelle >= 0.5)
    {
        AfficherOnglet(ongletsVisibles.menu.densite, 'onglet_densite');
    }
    GestionPaliersDensiteMax();
}

/* 

*/
function GestionPaliersDensiteMax()
{
    AfficherPaliersDensiteMax();
}

/*

*/ 
function AugmenterPourcent(valeur, chemin, objet)
{
    chemin[objet] *= valeur;
}

/*

*/ 
function Augmenter(valeur, chemin, objet)
{
    chemin[objet] += valeur;
}

/*

 */
function GestionEvents()
{
    let events = Object.values(evenements)
    events.forEach(event =>
    {
        if (!event.unlocked && event.condition())
        {
            event.unlocked = true;
            event.recompense()
        }
    })
}