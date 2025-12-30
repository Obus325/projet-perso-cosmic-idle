
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
    setInterval(Tick, 1000);
    let entites = Object.keys(nombres_entite['particules']);
    for (let i = 0; i < entites.length; i++)
    {
        document.getElementById("prix_" + entites[i] ).innerText = nombres_entite['particules'][entites[i]];
        document.getElementById("barre_" + entites[i]).style.width = (nombres_entite['particules'][entites[i]] % 10) + "%";
    }
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
    if (ressources['particules'] >= nombres_entite['particules'][entite])
    {
        ressources['particules'] -= nombres_entite['particules'][entite];
        nombres_entite['particules'][entite] += nombre;
        if (nombres_entite['particules'][entite] % 10 == 0)
        {
            prix_entite['particules'][entite] *= prix_initiaux_entite['particules'][entite];
        }
        document.getElementById("nombre_" + entite ).innerText = nombres_entite['particules'][entite];
        document.getElementById("prix_" + entite).innerText = prix_entite['particules'][entite];
        AfficherRessources();
        document.getElementById("barre_" + entite).style.width = ((nombres_entite['particules'][entite] % 10) * 10) + "%";

    }
}

/*
Fonction permettant de calculer la densité du cosmos.
IN : récupère les valeurs de plusieurs objets du jeu.
OUT : met à jour la valeur de plusieurs objets liés à la densité.
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
    //console.log(densiteBrute);

    densiteActuelle = densiteBrute /** variables['densite']['alpha'] + ressources['densite'] * (1-variables['densite']['alpha'])*/;
    densiteActuelle = Math.min(densiteActuelle*100, variables['densite']['cap'])/100;


    ressources['densite_max'] = Math.max(ressources['densite_max'], /*densiteActuelle*/ressources['densite_max']*variables.densite.boostDMax);
    if (!ongletsVisibles['menu']['densite'] && densiteActuelle >= 0.5)
    {
        AfficherOnglet(ongletsVisibles['menu']['densite'], 'onglet_densite');
        document.getElementById("valeur_densité").innerText = ressources['densitepc'].toFixed(0).toString() + "%";
    }
    AfficherPaliersDensiteMax();


    ressources['densite'] = densiteActuelle;
    ressources['densitepc'] = densiteActuelle * 100;
    variables['densite']['vitesse'] = Math.max(variables['densite']['cap'] - ressources['densitepc'], 0);
    document.getElementById("valeur_densité").innerText = ressources['densitepc'].toFixed(0).toString() + "%";
    document.getElementById('pourcent_densite').style.width = (ressources['densitepc']/variables['densite']['cap'])*100 + '%'

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

function AugmenterPourcent(chemin, objet, valeur)
{
    chemin[objet] *= valeur;
}

function Augmenter(chemin, objet, valeur)
{
    chemin[objet] += valeur;
}