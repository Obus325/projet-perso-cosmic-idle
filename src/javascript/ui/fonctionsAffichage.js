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
    AfficherRessourceGlobale(document.getElementById("monnaie_globale").innerText);
}

/*

 */
function AfficherRessourceGlobale(nomRessource)
{
    let decimales = 0;
    if (nomRessource.includes("densite")) decimales = 2;
    document.getElementById("valeur_globale").innerText = ressources[nomRessource].toFixed(decimales).toString();
}

/*
Fonction permettant d'afficher les informations des entites de base.
IN : none.
OUT : met à jour l'affichage.
*/
function AffichageEntites()
{
    let entites = Object.keys(nombres_entite['actuel']['particules']);
    for (let i = 0; i < entites.length; i++)
    {
        document.getElementById("nombre_" + entites[i] ).innerText = nombres_entite['actuel']['particules'][entites[i]];
        document.getElementById("prix_" + entites[i]).innerText = prix_entite['actuel']['particules'][entites[i]];
        AfficherRessources();
        document.getElementById("barre_" + entites[i]).style.width = ((nombres_entite['actuel']['particules'][entites[i]] % 10) * 10) + "%";
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
        ModifierVisibilite(onglet);
    }
    chemin = true;
}

/*

*/
function AfficherSousOnglets(onglet)
{
    let sousOnglets = Object.keys(ongletsVisibles['sous_onglets'][onglet]);
    for (let j = 0; j < sousOnglets.length; j++)
    {
        if (ongletsVisibles['sous_onglets'][onglet][sousOnglets[j]])
        {

            AfficherOnglet(ongletsVisibles['sous_onglets'][onglet][sousOnglets[j]], "bouton_sous_onglet_"+ onglet +"_"+ sousOnglets[j])
        }
    }
}

/*
Fonction permettant d'afficher tous les onglets et sous onglets disponibles (utilisée au lancement du jeu).
IN : utilise la constante : ongletsVisibles.
OUT : execute la fonction AfficherOnglet sur tous les élements à afficher.
*/
function AfficherJeu()
{
    let onglets = Object.keys(ongletsVisibles['menu']);
    for (let i = 0; i < onglets.length; i++)
    {
        if (ongletsVisibles['menu'][onglets[i]])
        {
            AfficherOnglet(ongletsVisibles['menu'][onglets[i]], "onglet_" + onglets[i])
            AfficherSousOnglets(onglets[i]);
        }
    }
}

/*

*/
function AfficherPaliersDensiteMax()
{
    let palier = DernierPalierAtteint();

    let resultat = Math.min(500, (Math.abs(ressources['densite_max'] - paliers[palier]) / (paliers[palier+1] - paliers[palier])));

    document.getElementById('barre_paliers').style.height = resultat*100 + palier*102 + "%";
}

/*

*/
function AfficherStatistiques()
{
    AfficherStatistiquesTemps();
    AfficherStatistiquesCrunch();
}

/*
Fonction permettant d'actualiser les statistiques.
IN : récupère la valeur de certains objets.
OUT : met à jour l'onglet statistique.
*/
function AfficherStatistiquesTemps()
{
    //console.log('stats')
    dateActuelle = Date.now();
    tempsDepuisCreation = dateActuelle - statistiques.dateCreation;
    TempsEnTexte('tempsDepuisCreation', tempsDepuisCreation);

    TempsEnTexte('tempsEnJeu', statistiques.tempsEnJeu);

}

/*

 */
function AfficherVariables()
{
    document.getElementById('valeur_taille').innerText = variables.densite.actuel['taille'].toFixed(0).toString() + '%';
    document.getElementById('valeur_diviseurMassique').innerText = variables.densite.actuel['diviseurMassique'].toFixed(2).toString() + '%';
    document.getElementById('valeur_cap').innerText = variables.densite.actuel['cap'].toFixed(0).toString();
    document.getElementById('valeur_densite_max').innerText = 'x' + variables.densite.actuel['boostDMax'].toFixed(2).toString();
}