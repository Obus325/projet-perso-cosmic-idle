function GestionAffichages()
{
    AfficherPaliersDensiteMax();
    AfficherRessources();
    AffichageDensite();
    if (onglet_actuel.onglet_actuel == 'contenu_statistiques')
    {
        AfficherStatistiquesTemps();
    }
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
    document.getElementById("valeur_globale").innerText = ressources[nomRessource].toFixed(decimales).toString();
}

/*
Fonction permettant d'afficher les informations des entites de base.
IN : rien.
OUT : met à jour l'affichage.
*/
function AffichageEntites(groupeEntite)
{
    let entites = Object.keys(nombres_entite['actuel'][groupeEntite]);
    for (let i = 0; i < entites.length; i++)
    {
        console.log(entites[i])
        document.getElementById("nombre_" + entites[i] ).innerText = nombres_entite.actuel[groupeEntite][entites[i]];
        document.getElementById("prix_" + entites[i]).innerText = prix.actuel[groupeEntite][entites[i]];
        document.getElementById("barre_" + entites[i]).style.width = ((nombres_entite['actuel'][groupeEntite][entites[i]] % 10) * 10) + "%";
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
Fonction permettant d'afficher dans un onglet le bouton d'un sous onglet nouvellement débloqué
IN : le bouton à afficher (onglet)
OUT : modifie la page
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
function AfficherMenu()
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
}