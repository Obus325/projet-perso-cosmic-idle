/*

*/
function Crunch()
{
    ExitChallenge();
    Reset();
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
    ManageTimeShards();
    ResetEntites();
}

/*

*/
function ResetEntites()
{
    
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
    evenements.crunch.unlocked = false;
}