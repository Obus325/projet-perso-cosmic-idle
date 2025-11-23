
/*
Fonction permettant le démarage du jeu.
IN : l'êtat des variables au chargement de page (actuellement etat initial).
OUT : instancie le jeu, les variables, et remet la page prête pour reprendre le jeu.
*/ 
function Start()
{
    CreateStar();
    setInterval(Tick, 1000);
    let entites = Object.keys(nombres_entite['particules']);
    for (let i = 0; i < entites.length; i++)
    {
        document.getElementById("prix_" + entites[i] ).innerText = nombres_entite['particules'][entites[i]];
        document.getElementById("barre_" + entites[i]).style.width = (nombres_entite['particules'][entites[i]] % 10) + "%";
    }
    document.getElementById("valeur_particules").innerText = ressources['particules'].toString();

    let onglets = Object.keys(evenements['menu']);
    console.log(onglets);
    for (let i = 0; i < onglets.length; i++)
    {
        console.log(i, onglets[i]);
        if (onglets[i])
        {
            AfficherOnglet("onglet_" + onglets[i])
        }
    }

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
            nombres_entite['particules'][entite] *= nombres_entite['particules'][entite];
        }
        document.getElementById("nombre_" + entite ).innerText = nombres_entite['particules'][entite];
        document.getElementById("prix_" + entite).innerText = nombres_entite['particules'][entite];
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
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
        masse += (densite[entites[i]]*nombres_entite['particules'][entites[i]])/constantes['densite']['diviseurDensite'];
    }

    masse *= constantes['densite']['alpha'];
    densiteBrute = masse / constantes['densite']['taille'];

    densiteActuelle = densiteBrute * 0.05 + ressources['densite'] * 0.95;
    densiteActuelle = Math.min(densiteActuelle, constantes['densite']['cap']);

    if (densiteActuelle > ressources['densite_max'])
    {
        ressources['densite_max'] = densiteActuelle;
        if (!evenements['menu']['densite'] && densiteActuelle >= 100)
        {
            AfficherOnglet('onglet_densite');
        }
    }
    ressources['densite'] = densiteActuelle;
    ressources['densitepc'] = densiteActuelle * 100;

}


