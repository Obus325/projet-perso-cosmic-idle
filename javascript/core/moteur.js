function Start()
{
    CreateStar();
    setInterval(Tick, 1000);
    let entites = Object.keys(nombres_entite);
        for (let i = 0; i < entites.length; i++)
        {
            document.getElementById("prix_" + entites[i] ).innerText = prix_entite[entites[i]];
            document.getElementById("barre_" + entites[i]).style.width = (nombres_entite[entites[i]] % 10) + "%";
        }
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
}

function Acheter(entite, nombre)
{
    if (ressources['particules'] >= prix_entite[entite])
    {
        ressources['particules'] -= prix_entite[entite];
        nombres_entite[entite] += nombre;
        if (nombres_entite[entite] % 10 == 0)
        {
            prix_entite[entite] *= prix_initiaux_entite[entite];
        }
        document.getElementById("nombre_" + entite ).innerText = nombres_entite[entite];
        document.getElementById("prix_" + entite).innerText = prix_entite[entite];
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
        document.getElementById("barre_" + entite).style.width = ((nombres_entite[entite] % 10) * 10) + "%";

    }
}



