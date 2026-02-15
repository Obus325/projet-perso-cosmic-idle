/*

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

 */
function ValiderChallenge()
{
    console.log("v", Math.floor(challenges.EnCours/10))
    switch (Math.floor(challenges.EnCours/10))
    {
        case 1 :
            console.log("oui")
            if (challenges.particules.defis[challenges.EnCours].condition()) challenges.particules.defis[challenges.EnCours].reussi = true
    }
}

/*

 */
function VerifierChallenges(etape)
{
    console.log("r")
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