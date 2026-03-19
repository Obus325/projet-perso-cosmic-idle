
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
        prix.actuel.particules[entite] *= prix.increment.particules[entite];
    }
    AffichageEntites();
}

/*
Fonction permettant d'effectuer un achat, effectue les vérifications nécessaires.
IN : l'objet à acheter et la quantité.
OUT : met à jour la valeur de l'objet acheté et de la ressource dépensée.
*/
function Acheter_amelioration(entite, nombre)
{

    AffichageEntites();
}

/*function GestionPrix(ressource, cleRessource, groupePrix, cleprix)
{
    ressource[cleRessource] -= prix.actuel[groupePrix][cleprix];
    prix.actuel[groupePrix][cleprix] += prix.increment[groupePrix][cleprix]
}*/

/*
Fonction de gestion des achats
IN : recompense (fonction), parametres (liste), ressource (objet ressource sans la cle), cleRessource (string pour appeler l'objet), prix (number)
OUT : appelle la récompense si la condition est remplie
*/
function Achat(recompense, parametres, ressource, cleRessource, groupePrix, cleprix)
{
    console.log(ressource[cleRessource] >= prix.actuel[groupePrix][cleprix], ressource[cleRessource], prix.actuel[groupePrix][cleprix])
    if (ressource[cleRessource] >= prix.actuel[groupePrix][cleprix])
    {
        ressource[cleRessource] -= prix.actuel[groupePrix][cleprix];
        recompense(...parametres);
        return true;
    }
}

/*
Fonction de gestion de la densité
IN : rien
OUT : rien
*/ 
function GestionDensite()
{
    let GainEquilibrium = CalculEquilibrium();
    let densiteActuelle = CalculerDensite();
    ActualisationConstantes(densiteActuelle, GainEquilibrium);
    GestionDensiteMax(densiteActuelle);
    AffichageDensite();

}

function ActualisationConstantes(densiteActuelle, GainEquilibrium)
{
    ressources.densite = densiteActuelle;
    ressources.equilibrium += GainEquilibrium;
    variables.densite.actuel.vitesse = Math.max(variables.densite.actuel.cap - ressources.densite, 0);
}


/*
Fonction de gestion de la densité maximale atteinte
IN : rien
OUT : rien
*/ 
function GestionDensiteMax(densiteActuelle)
{
    ressources.densite_max = Math.max(ressources.densite_max, densiteActuelle*variables.densite.actuel.boostDMax);
    if (!ongletsVisibles.menu.densite && densiteActuelle >= 0.5)
    {
        AfficherOnglet(ongletsVisibles.menu.densite, 'onglet_densite');
    }
    GestionPaliersDensiteMax();
}

/* 
Fonction en travaux
IN : rien
OUT : rien
*/
function GestionPaliersDensiteMax()
{
    AfficherPaliersDensiteMax();
}

/*
Fonction d'augmentation par multiplication
IN : valeur (number), chemin (objet sans sa cle), objet (string cle d'appel)
OUT : modifie la valeur de l'objet
*/ 
function AugmenterPourcent(valeur, chemin, objet)
{
    chemin[objet] *= valeur;
}

/*
Fonction d'augmentation par addition
IN : valeur (number), chemin (objet sans sa cle), objet (string cle d'appel)
OUT : modifie la valeur de l'objet
*/ 
function Augmenter(valeur, chemin, objet)
{
    chemin[objet] += valeur;
}

/*
Fonction de vérification de tous les "évènements" (de l'objet évènement) probables
IN : rien
OUT : rien
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