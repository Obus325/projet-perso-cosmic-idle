/*
Fonction permettant d'afficher un onglet.
IN : l'onglet cible.
OUT : affiche le contenu de l'onglet souhaité en masquant le précédant.
*/ 
function ChangerOnglet(direction)
{
    document.getElementById(onglet_actuel['onglet_actuel']).hidden = true;
    onglet_actuel['onglet_actuel'] = direction;
    document.getElementById(direction).hidden = false;
}

function ChangerSousOnglet(direction)
{
    document.getElementById(onglet_actuel['sous_onglet_actuel']).hidden = true;
    onglet_actuel['sous_onglet_actuel'] = direction;
    document.getElementById(direction).hidden = false;
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
    document.getElementById("valeur_globale").innerText = ressources[cles[cle]]

}

/*
Fonction permettant d'afficher la valeur des ressources aux endroits prévus.
IN : récupère la valeur des ressources.
OUT : met à jour la valeur des ressources visibles.
*/ 
function AfficherRessources()
{
    document.getElementById("valeur_particules").innerText = ressources['particules'].toFixed(0).toString();
    if (ongletsVisibles['menu']['densite'])
    {
        document.getElementById("valeur_densité").innerText = ressources['densitepc'].toFixed(0).toString() + "%";
    }
    
}

/*
Fonction permettant d'afficher dans le menu le bouton d'un onglet nouvellement débloqué.
IN : le bouton à afficher (onglet) ainsi que son chemin dans la constante 'ongletsVisibles'.
OUT : le bouton est affiché et marqué comme tel en variable.
*/ 
function AfficherOnglet(chemin, onglet)
{
    if (document.getElementById(onglet).hidden)
    {
        document.getElementById(onglet).hidden = false;
    }
    chemin = true;
}


/*
Fonction permettant d'afficher tous les onglets et sous onglets disponibles (utilisée au lancement du jeu).
IN : utilise la constante : ongletsVisibles.
OUT : execute la fonction AfficherOnglet sur tous les élements à afficher.
*/ 
function AfficherJeu()
{
    let onglets = Object.keys(ongletsVisibles['menu']);
    console.log(onglets);
    for (let i = 0; i < onglets.length; i++)
    {
        if (ongletsVisibles['menu'][onglets[i]])
        {
            AfficherOnglet(ongletsVisibles['menu'][onglets[i]], "onglet_" + onglets[i])

            let sousOnglets = Object.keys(ongletsVisibles['sous_onglets'][onglets[i]]);
            for (let j = 0; j < sousOnglets.length; j++)
            {
                if (ongletsVisibles['sous_onglets'][onglets[i]][sousOnglets[j]])
                {
                    console.log(ongletsVisibles['sous_onglets'][onglets[i]][sousOnglets[j]], "bouton_sous_onglet_"+ onglets[i] +"_"+ sousOnglets[j])
                    AfficherOnglet(ongletsVisibles['sous_onglets'][onglets[i]][sousOnglets[j]], "bouton_sous_onglet_"+ onglets[i] +"_"+ sousOnglets[j])  
                }
            }
        }
    }
}

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

function AfficherPaliersDensiteMax()
{
    let precedent = DernierPalierAtteint();
    let suivant = DernierPalierAtteint()+1;

    let resultat = Math.min(500, ((ressources['densite_max'] - paliers[precedent]) / (paliers[suivant] - paliers[precedent])) + precedent);
    
    document.getElementById('barre_paliers').style.height = resultat*100 + suivant + 1 + "%";
    return (ressources['densite_max'] + " . " + resultat + " . " + paliers[precedent] + " . " + paliers[suivant]);
}

/*
Fonction permettant d'actualiser les statistiques.
IN : récupère la valeur de certains objets.
OUT : met à jour l'onglet statistique.
*/ 
function AfficherStatistiques()
{
    //console.log('stats')
    dateActuelle = Date.now();
    tempsDepuisCreation = dateActuelle - statistiques.dateCreation;
    TempsEnTexte('tempsDepuisCreation', tempsDepuisCreation);

    TempsEnTexte('tempsEnJeu', statistiques.tempsEnJeu);
    
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
    save.statistiques = statistiques;
    

    saveJSON = JSON.stringify(save);
    console.log(save + "\n\n" + saveJSON);
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
    console.log(sauvegardeLocale);
    
    if (sauvegardeLocale != null)
    {
        let objetLocal;
        try {
            objetLocal = JSON.parse(sauvegardeLocale);
            console.log(objetLocal);
        } catch(erreur) {
            console.warn("Save corrompue ou invalide, on l'ignore :", erreur);
            return;
        }

        if (objetLocal.nombres_entite) Object.assign(nombres_entite, objetLocal.nombres_entite);
        if (objetLocal.prix_entite) Object.assign(prix_entite, objetLocal.prix_entite);
        if (objetLocal.ressources) Object.assign(ressources, objetLocal.ressources);
        if (objetLocal.variables) Object.assign(variables, objetLocal.variables);
        if (objetLocal.ongletsVisibles) Object.assign(ongletsVisibles, objetLocal.ongletsVisibles);
        if (objetLocal.statistiques) Object.assign(statistiques, objetLocal.statistiques);
    }

    if (statistiques.dateCreation == 0)
    {
        statistiques.dateCreation = Date.now();
    }
}
