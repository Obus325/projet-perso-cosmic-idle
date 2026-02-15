/*

*/
function Crunch()
{
    ExitChallenge();
    Reset();
    ManageTimeShards();
    GestionStatistiques();
    LockCrunch();

}

/*

*/
function ManageTimeShards()
{
    ressources.timeShards += TimeShardsGain()
}

/*

*/
function TimeShardsGain()
{
    return 1;
}

/*

*/
function Reset()
{
    ResetRessources();
    ResetEntites();
    ResetVariable()
}

/*

*/
function ResetEntites()
{
    Object.keys(nombres_entite.actuel.particules).forEach(entite =>
    {
        nombres_entite.actuel.particules[entite] = nombres_entite.initial.particules[entite]
        prix_entite.actuel.particules[entite] = prix_entite.initial.particules[entite]
    })

    AffichageEntites();
}

/*

*/
function ResetRessources()
{
    ressources.particules = 1


    ResetDensite();

    AfficherRessources();
}

/*

*/
function ResetDensite()
{
    ressources.densite = 0;
}

/*

 */
function ResetVariable()
{
    Object.keys(variables.densite.actuel).forEach(variable =>
    {
        variables.densite.actuel[variable] = variables.densite.initial[variable];
    })

    AfficherVariables();

}

/*

*/
function GestionStatistiques()
{
    GestionTempsCrunch();
    statistiques.nombreCrunchs++;
    AfficherStatistiquesCrunch();
}

/*

 */
function GestionTempsCrunch()
{
    for (let i = 9; i > 0; i--)
    {
        statistiques["crunchsPrecedents"][i]["tick"] = statistiques["crunchsPrecedents"][i-1]["tick"]
        statistiques["crunchsPrecedents"][i]["duree"] = statistiques["crunchsPrecedents"][i-1]["duree"]
    }
    statistiques["crunchsPrecedents"][0]["tick"] = Date.now()
    if (statistiques.nombreCrunchs == 0)
    {
        statistiques["crunchsPrecedents"][0]["duree"] = statistiques["crunchsPrecedents"][0]["tick"] - statistiques.dateCreation
    }
    else
    {
        statistiques["crunchsPrecedents"][0]["duree"] = statistiques["crunchsPrecedents"][0]["tick"] - statistiques["crunchsPrecedents"][1]["tick"]
    }
    console.log((statistiques.crunchsPrecedents))
}

/*

 */
function UnlockCrunch()
{
    document.getElementById("bouton_crunch").hidden = false;
}

function LockCrunch()
{
    document.getElementById("bouton_crunch").hidden = true;
    evenements.crunchUnlock.unlocked = false;
}