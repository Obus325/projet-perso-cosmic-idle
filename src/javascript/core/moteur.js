
/*
Fonction permettant le démarage du jeu.
IN : l'êtat des variables au chargement de page (actuellement etat initial).
OUT : instancie le jeu, les variables, et remet la page prête pour reprendre le jeu.
*/ 
function Start()
{
    DemarrerSauvegarde();

    AffichageInitial();

    setInterval(Tick, 200);


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
Fonction de gestion des achats
IN : recompense (fonction), parametres (liste), ressource (objet ressource sans la cle), cleRessource (string pour appeler l'objet), prix (number)
OUT : appelle la récompense si la condition est remplie
*/
function Achat(recompense, parametres, ressource, cleRessource, groupePrix, cleprix)
{
    if (ressource[cleRessource] >= prix.actuel[groupePrix][cleprix])
    {
        ressource[cleRessource] -= prix.actuel[groupePrix][cleprix];
        recompense(...parametres);
        return true;
    }
}

function GestionProduction()
{
    let production = CalculerProduction();
    if (challenges.EnCours == 15) ressources.particules += Math.sqrt(variables.actuel.densite.vitesse * ressources.densite * production);
    else ressources.particules += variables.actuel.densite.vitesse * ressources.densite * production;
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


}

function ActualisationConstantes(densiteActuelle, GainEquilibrium)
{
    ressources.densite = densiteActuelle;
    ressources.equilibrium += GainEquilibrium;
    variables.actuel.densite.vitesse = Math.max(variables.actuel.densite.cap - ressources.densite, 0);
}


/*
Fonction de gestion de la densité maximale atteinte
IN : rien
OUT : rien
*/ 
function GestionDensiteMax(densiteActuelle)
{
    ressources.densite_max = Math.max(ressources.densite_max, densiteActuelle*variables.actuel.densite.boostDMax);
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


/*
Fonction de gestion des automates
IN : rien
OUT : joue au jeu
 */
function GestionAutomates()
{
    for (i = 0; i < variables.actuel.densite.automate; i++)
    {
        let entite = Object.keys(nombres_entite.actuel.particules)[i];
        Achat(Acheter_entite, [entite, 1], ressources, 'particules', 'particules', entite)
    }
}

