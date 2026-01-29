
/*
Fonction permettant le démarage du jeu.
IN : l'êtat des variables au chargement de page (actuellement etat initial).
OUT : instancie le jeu, les variables, et remet la page prête pour reprendre le jeu.
*/ 
function Start()
{
    RecupererSauvegarde("save");
    CreateStar();
    statistiques.tickPrecedent = Date.now();
    setInterval(Tick, 200);
    AffichageEntites();
    document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
    AfficherJeu();
}


/*
Fonction permettant d'effectuer un achat, effectue les vérifications nécessaires.
IN : l'objet à acheter et la quantité.
OUT : met à jour la valeur de l'objet acheté et de la ressource dépensée.
*/ 
function Acheter(entite, nombre)
{
    if (challenges.EnCours == 12 && (entite == 'constellation' || entite == 'galaxie'))return;
    if (ressources['particules'] >= prix_entite['particules'][entite])
    {
        ressources['particules'] -= prix_entite['particules'][entite];
        nombres_entite['particules'][entite] += nombre;
        if (nombres_entite['particules'][entite] % 10 == 0)
        {
            prix_entite['particules'][entite] *= prix_initiaux_entite['particules'][entite];
        }
        AffichageEntites();
    }
}

/*

*/ 
function GestionDensite()
{
    if (challenges.EnCours == 11) densiteActuelle = 0.2;
    else densiteActuelle = CalculerDensite();
    GestionDensiteMax();
    ressources['densite'] = densiteActuelle;
    ressources['densitepc'] = densiteActuelle * 100;
    variables['densite']['vitesse'] = Math.max(variables['densite']['cap'] - ressources['densitepc'], 0);
    document.getElementById("valeur_densité").innerText = ressources['densitepc'].toFixed(0).toString() + "%";
    document.getElementById('pourcent_densite').style.width = (ressources['densitepc']/variables['densite']['cap'])*100 + '%'

}

/*

*/ 
function CalculerDensite()
{
    let entites = Object.keys(densite);
    masse = 0;
    for (let i = 0; i < entites.length; i++)
    {
        masse += (densite[entites[i]]*nombres_entite['particules'][entites[i]]);
    }

    masse /= variables['densite']['diviseurMassique'];
    densiteBrute = masse / variables['densite']['taille'];

    densiteActuelle = densiteBrute /** variables['densite']['alpha'] + ressources['densite'] * (1-variables['densite']['alpha'])*/;
    densiteActuelle = Math.min(densiteActuelle*100, variables['densite']['cap'])/100;
    return densiteActuelle;
}

/*

*/ 
function GestionDensiteMax()
{
    ressources['densite_max'] = Math.max(ressources['densite_max'], densiteActuelle*variables.densite.boostDMax);
    if (!ongletsVisibles['menu']['densite'] && densiteActuelle >= 0.5)
    {
        AfficherOnglet(ongletsVisibles['menu']['densite'], 'onglet_densite');
    }
    GestionPaliersDensiteMax();
}

/* 

*/
function GestionPaliersDensiteMax()
{
    AfficherPaliersDensiteMax();
}

/*
Fonction permettant d'appeler la fonction d'un bouton d'amélioration.
IN : le type d'amélioration (string) et sa valeur (float).
OUT : appelle la fonction nécessaire
*/ 

function Amelioration(type, valeur, chemin, objet)
{
    switch (type)
    {
        case "augmenterpc" :
            AugmenterPourcent(chemin, objet, valeur);
            break;
        case "augmenter" :
            Augmenter(chemin, objet, valeur)
            break;
    }
}

/*

*/ 
function AugmenterPourcent(chemin, objet, valeur)
{
    chemin[objet] *= valeur;
}

/*

*/ 
function Augmenter(chemin, objet, valeur)
{
    chemin[objet] += valeur;
}


function StartChallenge(challenge)
{
    if (challenges.EnCours != 0) ExitChallenge();
    challenges.EnCours = challenge;

    if (challenge == 14) 
    {
        for (let i = 1; i < 6; i++)
        {
            paliers[i] *= 2;
        }
        ActualiserPaliers();
    }
    
    document.getElementById('challenge_actuel').innerText = challenge;

}

function ExitChallenge()
{

    if (challenges.EnCours == 14) 
    {
        for (let i = 1; i < 6; i++)
        {
            paliers[i] /= 2;
        }
        ActualiserPaliers();
    }

    challenges.EnCours = 0;
    document.getElementById('challenge_actuel').innerText = 0;
}