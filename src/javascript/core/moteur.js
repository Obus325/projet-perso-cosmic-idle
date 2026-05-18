/*
Fonction permettant d'effectuer un achat, effectue les vérifications nécessaires.
IN : l'objet à acheter et la quantité.
OUT : met à jour la valeur de l'objet acheté et de la ressource dépensée.
*/ 
function Acheter_entite(groupeEntite, groupePrix, entite, nombre)
{
    if (challenges.EnCours == 12 && (entite == 'constellation' || entite == 'galaxie'))return;
    nombres_entite.actuel[groupeEntite][entite] += nombre;
    if (nombres_entite.actuel[groupeEntite][entite] % 10 == 0)
    {
        prix.actuel[groupePrix][entite] *= prix.increment[groupePrix][entite];
    }
    AffichageEntite(groupeEntite, entite);
    AfficherRessources();
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

function GestionProduction(deltaTicks)
{
    let production = CalculerProduction(deltaTicks);
    
    if (challenges.EnCours == 15) ressources.particules += Math.sqrt(CalculerVitesse() * ressources.densite * production);
    else ressources.particules += CalculerVitesse() * ressources.densite * production;
}


/*
Fonction d'augmentation par multiplication
IN : valeur (number), chemin (objet sans sa cle), objet (string cle d'appel)
OUT : modifie la valeur de l'objet
*/ 
function Multiplier(valeur, chemin, objet)
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
    for (event in evenements)
    {
        if (!evenements[event].unlocked && evenements[event].condition())
        {
            evenements[event].unlocked = true;
            evenements[event].recompense()
        }
    }
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
        Achat(Acheter_entite, ['particules', 'particules', entite, 1], ressources, 'particules', 'particules', entite)
    }
}

function AcheterAutomate()
{
    if (variables.actuel.densite.automate >= 5) return;
    variables.actuel.densite.automate += 1;
}