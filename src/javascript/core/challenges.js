/*
Fonction pour démarrer un challenge
IN : le numéro du challenge (int)
OUT : modifie le challenge en cours
*/
function StartChallenge(challenge)
{
    Crunch()
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

/*
Fonction de sortie du challenge
IN : rien
OUT : modifie le challenge en cours à 0
*/
function ExitChallenge()
{
    if (challenges.EnCours == 0) return;

    if (challenges.EnCours == 14)
    {
        for (let i = 1; i < 6; i++)
        {
            paliers[i] /= 2;
        }
        ActualiserPaliers();
    }

    ValiderChallenge();

    challenges.EnCours = 0;
    document.getElementById('challenge_actuel').innerText = "aucun";
}

/*
Fonction de validation d'un challenge
IN : rien
OUT : modifie l'objet lié au challenge en cours
*/
function ValiderChallenge()
{
    switch (Math.floor(challenges.EnCours/10))
    {
        case 1 :
            console.log("oui")
            if (challenges.particules.defis[challenges.EnCours].condition()) challenges.particules.defis[challenges.EnCours].reussi = true

        //ajouter le case default
    }
}

/*
Fonction qui vérifie si un ensemble de challenges est completé
IN : l'étape actuelle (int) qui correspond à l'ensemble de challenges à observer
OUT : booléen vrai si tous les challenges de l'étape sont à vrai
*/
function VerifierChallenges(etape)
{
    let res = true
    Object.values(challenges[etape].defis).forEach(defi =>
    {
        if (defi.reussi == false)
        {
            res = false;
        }
    });
    return res
}