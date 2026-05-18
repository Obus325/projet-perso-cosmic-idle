function GestionAffichages()
{
    AfficherPaliersDensiteMax();
    AfficherRessources();
    AffichageDensite();
    AfficherStatistiquesTemps();

}


/*
Fonction permettant d'afficher la valeur des ressources aux endroits prévus.
IN : récupère la valeur des ressources.
OUT : met à jour la valeur des ressources visibles.
*/
function AfficherRessources()
{
    document.getElementById("valeur_particules").innerText = Math.floor(ressources['particules']).toString();
    AfficherRessourceGlobale(document.getElementById("monnaie_globale").innerText);
}

/*
Fonction affichant la valeur de la ressource épinglée (en coin)
IN : le nom de la ressource épinglée
OUT : met à jour l'affichage
 */
function AfficherRessourceGlobale(nomRessource)
{
    let decimales = 0;
    if (nomRessource.includes("densite")) decimales = 2;
    if (decimales == 0) document.getElementById("valeur_globale").innerText = Math.floor(ressources[nomRessource]).toString();
    else document.getElementById("valeur_globale").innerText = ressources[nomRessource].toFixed(decimales).toString();
}

/*
Fonction permettant d'afficher les informations des entites de base.
IN : rien.
OUT : met à jour l'affichage.
*/
function AffichageEntites(groupeEntite)
{
    for (entite in nombres_entite.actuel[groupeEntite])
    {
        document.getElementById("nombre_" + entite ).innerText = nombres_entite.actuel[groupeEntite][entite];
        document.getElementById("prix_" + entite).innerText = prix.actuel[groupeEntite][entite];
        document.getElementById("barre_" + entite).style.width = ((nombres_entite.actuel[groupeEntite][entite] % 10) * 10) + "%";
    }
}

/*
Fonction permettant d'afficher les informations des entites de base.
IN : rien.
OUT : met à jour l'affichage.
*/
function AffichageEntite(groupeEntite, entite)
{

    document.getElementById("nombre_" + entite ).innerText = nombres_entite.actuel[groupeEntite][entite];
    document.getElementById("prix_" + entite).innerText = prix.actuel[groupeEntite][entite];
    document.getElementById("barre_" + entite).style.width = ((nombres_entite['actuel'][groupeEntite][entite] % 10) * 10) + "%";
}

/*
Fonction affichant les informations sur la page de densité
IN : rien
OUT : met à jour l'affichage
 */
function AffichageDensite()
{
    document.getElementById("valeur_densité").innerText = (ressources.densite*100).toFixed(0).toString() + "%";
    document.getElementById('pourcent_densite').style.width = (ressources.densite/variables.actuel.densite.cap)*100 + '%'
    
    for (variable in variables.actuel.densite)
    {
        document.getElementById("valeur_" + variable).innerText = variables.actuel.densite[variable].toFixed(2).toString();
        document.getElementById("prix_" + variable).innerText = prix.actuel.densite[variable].toFixed(0).toString();
    }
}

/*
Fonction permettant d'afficher dans le menu le bouton d'un onglet nouvellement débloqué.
IN : le bouton à afficher (onglet) ainsi que son chemin dans la constante 'ongletsVisibles'.
OUT : le bouton est affiché et marqué comme tel en variable.
*/
function AfficherOnglet()
{
    for (onglet in ongletsVisibles.menu)
    {
        document.getElementById("onglet_" + onglet).hidden = !ongletsVisibles.menu[onglet];
    }
}

/*
Fonction permettant d'afficher dans un onglet le bouton d'un sous onglet nouvellement débloqué
IN : le bouton à afficher (onglet)
OUT : modifie la page
*/
function AfficherSousOnglets(onglet)
{
    for (sousOnglet in ongletsVisibles.sous_onglets[onglet])
    {
        document.getElementById("bouton_sous_onglet_"+ onglet +"_"+ sousOnglet).hidden = !ongletsVisibles.sous_onglets[onglet][sousOnglet];
    }
}

/*
Fonction permettant d'afficher tous les onglets et sous onglets disponibles (utilisée au lancement du jeu).
IN : utilise la constante : ongletsVisibles.
OUT : execute la fonction AfficherOnglet sur tous les élements à afficher.
*/
function AfficherMenu()
{
    AfficherOnglet();
    for (onglet in ongletsVisibles.sous_onglets)
    {
        AfficherSousOnglets(onglet);
    }

}

/*
Fonction d'affichage des paliers de densité
IN : rien
OUT : met à jour la page
*/
function AfficherPaliersDensiteMax()
{
    let palier = DernierPalierAtteint();

    let resultat = Math.min(500, (Math.abs(ressources['densite_max'] - paliers[palier]) / (paliers[palier+1] - paliers[palier])));

    document.getElementById('barre_paliers').style.height = resultat*100 + palier*102 + "%";
}

/*
Fonction de gestion de l'affichage des statistiques
IN : rien
OUT : rien
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
    let dateActuelle = Date.now();
    let tempsDepuisCreation = dateActuelle - statistiques.dateCreation;
    TempsEnTexte('tempsDepuisCreation', tempsDepuisCreation);

    TempsEnTexte('tempsEnJeu', statistiques.tempsEnJeu);
}

function AfficherStatistiquesCrunch()
{
    document.getElementById('nombreCrunchs').innerText = statistiques.nombreCrunchs;
    for (let i = 0; i < statistiques.crunchsPrecedents.length; i++)    {
        TempsEnTexte('crunch'+i, statistiques.crunchsPrecedents[i].duree);
    }
}

/*
Fonction d'affichage des variables dans les boutons de densité
IN : rien
OUT : met à jour la page
 */
function AfficherVariable(groupeprix, lieu, valeur)
{
    document.getElementById('valeur_'+lieu).innerText = valeur
    document.getElementById('prix_'+lieu).innerText = prix.actuel[groupeprix][lieu]
}

/*
Fonction pour récupérer les fichiers HTML des composants
IN : le container der réception (id), et le composant (fichier)
OUT : ajoute l'HTML du composant dans le container et le renvoie
 */
function ChargerHTML(idContainer, fichier) {
    return fetch(fichier)
        .then(response => response.text())
        .then(html => {
            document.getElementById(idContainer).innerHTML += html;
        });
}

function AffichageInitial()
{
    CreateStar();
    document.getElementById("valeur_particules").innerText = ressources.particules.toString();
    AfficherMenu();
    AffichageEntites('particules');
    AffichageDensite();
    AfficherStatistiques();
    ChargerArbre();
}