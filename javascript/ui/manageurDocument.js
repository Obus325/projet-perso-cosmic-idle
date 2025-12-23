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

function AfficherPaliersDensiteMax()
{
    
}




