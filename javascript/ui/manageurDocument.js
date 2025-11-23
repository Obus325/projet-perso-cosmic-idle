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
    document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
    if (evenements['menu']['densite'])
    {
        document.getElementById("valeur_densité").innerText = ressources['densite'].toString();
    }
    
}

/*
Fonction permettant d'afficher dans le menu le bouton d'un onglet nouvellement débloqué.
IN : le bouton à afficher.
OUT : le bouton est affiché et marqué comme tel en variable.
*/ 
function AfficherOnglet(onglet)
{
    console.log(onglet);
    document.getElementById(onglet).hidden = false;
    evenements['menu'][onglet] = true;
}


