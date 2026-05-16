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
    save.prix = prix;
    save.ressources = ressources;
    save.variables = variables;
    save.ongletsVisibles = ongletsVisibles;
    //save.onglet_actuel = onglet_actuel;
    save.evenements = evenements;
    save.statistiques = statistiques;
    save.noeuds = noeuds;
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
        if (objetLocal.prix) Object.assign(prix, objetLocal.prix);
        if (objetLocal.ressources) Object.assign(ressources, objetLocal.ressources);
        if (objetLocal.variables) Object.assign(variables, objetLocal.variables);
        if (objetLocal.ongletsVisibles) Object.assign(ongletsVisibles, objetLocal.ongletsVisibles);
        //if (objetLocal.onglet_actuel) Object.assign(onglet_actuel, objetLocal.onglet_actuel);
        if (objetLocal.evenements) Object.assign(evenements, objetLocal.evenements);
        if (objetLocal.statistiques) Object.assign(statistiques, objetLocal.statistiques);
        if (objetLocal.noeuds) Object.assign(noeuds, objetLocal.noeuds);
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

function DemarrerSauvegarde()
{
    RecupererSauvegarde("save");
    statistiques.tickPrecedent = Date.now();
}

function GestionTick()
{
    let TickActuel = Date.now();
    statistiques.tempsEnJeu += TickActuel - statistiques.tickPrecedent;
    statistiques.tickPrecedent = TickActuel;
}