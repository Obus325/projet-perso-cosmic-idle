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
Fonction permettant d'afficher un sous onglet.
IN : le sous onglet cible.
OUT : affiche le contenu du sous onglet souhaité en masquant le précédant.
*/ 
function ChangerSousOnglet(direction)
{
    ModifierVisibilite(onglet_actuel['sous_onglet_actuel']);
    onglet_actuel['sous_onglet_actuel'] = direction;
    ModifierVisibilite(direction);
}

/*
Fonction permettant d'afficher une ressource dans le coin supérieur gauche.
IN : récupère la valeur de la ressource.
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
Fonction d'affichage des objectifs des paliers de densité
IN : l'objet "paliers"
OUT : actualise la sous page des paliers de densite
*/
function ActualiserPaliers()
{
    for (let i = 1; i < 6; i++)
    {
        document.getElementById("valeur_palier_"+i).innerText = paliers[i];
    }
}



/*
Fonction d'affichage des statistiques du crunch
IN : l'objet statistique
OUT : actualise la sous page crunch des statistiques
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