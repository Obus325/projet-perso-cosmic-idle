/*
inverse la valeur de hidden de l'objet selectionné
IN : l'objet HTML à modifier
OUT : l'objet est masué/affiché
*/
function ModifierVisibilite(objet){
    document.getElementById(objet).hidden = !document.getElementById(objet).hidden;
}

/*
Fonction permettant d'afficher un onglet.
IN : l'onglet cible.
OUT : affiche le contenu de l'onglet souhaité en masquant le précédant.
*/ 
function ChangerOnglet(direction)
{
    ModifierVisibilite(onglet_actuel['onglet_actuel']);
    onglet_actuel['onglet_actuel'] = direction;
    ModifierVisibilite(direction);
}

/*

*/ 
function ChangerSousOnglet(direction)
{
    ModifierVisibilite(onglet_actuel['sous_onglet_actuel']);
    onglet_actuel['sous_onglet_actuel'] = direction;
    ModifierVisibilite(direction);
}

/*
Fonction permettant d'afficher une ressource dans le coin supérieur gauche.
IN : récupère la valeur de la ressources.
OUT : met à jour le coin supérieur gauche.
*/ 
function ChangerRessource()
{
    cles = Object.keys(ressources);
    cle = cles.indexOf(document.getElementById("monnaie_globale").innerText);
    cle = ++cle % cles.length;
    document.getElementById("monnaie_globale").innerText = cles[cle];
    AfficherRessourceGlobale(cles[cle]);
}


/*

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

/*

*/
function ActualiserPaliers()
{
    for (let i = 1; i < 6; i++)
    {
        document.getElementById("valeur_palier_"+i).innerText = paliers[i];
    }
}



/*

*/
function AfficherStatistiquesCrunch()
{
    document.getElementById("nombreCrunchs").innerText = statistiques.nombreCrunchs;
    for (let i = 0; i <10; i++)
    {
        if (statistiques["crunchsPrecedents"][i]["tick"] == 0)
        {
            document.getElementById("crunch-"+(i+1)).innerText = "non realise";
        }
        else
        {
            TempsEnTexte("crunch-"+(i+1), statistiques["crunchsPrecedents"][i]["duree"]);
        }
    }
}

/*
Fonction qui transforme une différence entre deux dates (int en JS) en une chaîne de caractères.
IN : l'id de l'objet HTML à modifier (string), écart de temps entre deux dates (int).
OUT : met à jour l'objet HTML indiqué.
*/ 
function TempsEnTexte(idCible, Temps)
{
    tempsAConvertir = Temps
    Annees = Math.floor(tempsAConvertir/(365 * 24 * 60 * 60 * 1000));
    tempsAConvertir = tempsAConvertir%(365 * 24 * 60 * 60 * 1000);

    Jours = Math.floor(tempsAConvertir/(24 * 60 * 60 * 1000));
    tempsAConvertir = tempsAConvertir%(24 * 60 * 60 * 1000);

    Heures = Math.floor(tempsAConvertir/(60 * 60 * 1000));
    tempsAConvertir = tempsAConvertir%(60 * 60 * 1000);

    Minutes = Math.floor(tempsAConvertir/(60 * 1000));
    tempsAConvertir = tempsAConvertir%(60 * 1000);

    Secondes = Math.floor(tempsAConvertir/(1000));
    tempsAConvertir = tempsAConvertir%(1000);

    texteAInserer = tempsAConvertir + ' Millisecondes.';
    if (Secondes > 0 || Minutes > 0) {texteAInserer = Secondes + ' Secondes, ' + texteAInserer}
    if (Minutes > 0 || Heures > 0) {texteAInserer = Minutes + ' Minutes, ' + texteAInserer}
    if (Heures > 0 || Jours > 0) {texteAInserer = Heures + ' Heures, ' + texteAInserer}
    if (Jours > 0 || Annees > 0) {texteAInserer = Jours + ' Jours, ' + texteAInserer}
    if (Annees > 0) {texteAInserer = Annees + ' Années, ' + texteAInserer}
    document.getElementById(idCible).innerText = texteAInserer;
}


/*
Fonction qui crée une sauvegarde et l'enregistre sur le stockage local.
IN : toutes les informations qu'il est important de conserver.
OUT : crée un objet sur le stockage local.
*/ 
function Sauvegarder()
{
    // création de l'objet save avec toutes les informations à enregistrer
    let save = {}
    save.nombres_entite = nombres_entite;
    save.prix_entite = prix_entite;
    save.ressources = ressources;
    save.variables = variables;
    save.ongletsVisibles = ongletsVisibles;
    //save.onglet_actuel = onglet_actuel;
    save.statistiques = statistiques;
    save.challenges = challenges;
    

    saveJSON = JSON.stringify(save);
    localStorage.setItem("save", saveJSON);
}


/*
Fonction qui recupère une sauvegarde sur le stockage local et la répercute sur le jeu.
IN : sauvergarde(str) le nom de la clé de sauvegarde.
OUT : modifie les valeurs du jeu afin de restaurer la sauvergarde.
*/ 
function RecupererSauvegarde(sauvegarde)
{
    let sauvegardeLocale = localStorage.getItem(sauvegarde);
    
    if (sauvegardeLocale != null)
    {
        let objetLocal;
        try {
            objetLocal = JSON.parse(sauvegardeLocale);
        } catch(erreur) {
            console.warn("Save corrompue ou invalide :", erreur);
            return;
        }

        if (objetLocal.nombres_entite) Object.assign(nombres_entite, objetLocal.nombres_entite);
        if (objetLocal.prix_entite) Object.assign(prix_entite, objetLocal.prix_entite);
        if (objetLocal.ressources) Object.assign(ressources, objetLocal.ressources);
        if (objetLocal.variables) Object.assign(variables, objetLocal.variables);
        if (objetLocal.ongletsVisibles) Object.assign(ongletsVisibles, objetLocal.ongletsVisibles);
        //if (objetLocal.onglet_actuel) Object.assign(onglet_actuel, objetLocal.onglet_actuel)
        if (objetLocal.statistiques) Object.assign(statistiques, objetLocal.statistiques);
        if (objetLocal.challenges) Object.assign(challenges, objetLocal.challenges);
    }

    if (statistiques.dateCreation == 0)
    {
        statistiques.dateCreation = Date.now();
    }
}


/*
Fonction qui supprime une sauvegarde sur le stockage local.
IN : sauvergarde(str) le nom de la clé de sauvegarde.
OUT : supprime la sauvergarde.
*/ 
function SupprimerSauvegarde(sauvegarde)
{
    localStorage.removeItem(sauvegarde);
}


/*

 */
function ChargerFichiersHTML()
{
    ChargerHTML("contenus_onglets", "HTML/contenu_entites.html");
    ChargerHTML("contenus_onglets", "HTML/contenu_equilibre.html");
    ChargerHTML("contenus_onglets", "HTML/contenu_crunch.html");
    ChargerHTML("contenus_onglets", "HTML/contenu_challenges.html");
    ChargerHTML("contenus_onglets", "HTML/contenu_statistiques.html");
    console.log("fini")
}