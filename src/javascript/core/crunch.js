/*
Fonction de gestion de l'entièreté du crunch
IN : rien
OUT : rien
*/
function Crunch()
{
    ExitChallenge();
    ManageTimeShards();
    Reset();
    GestionStatistiques();
    LockCrunch();

}

/*
Fonction qui modifie la ressource time shards
IN : rien
OUT : modifie le nombre de time shards
*/
function ManageTimeShards()
{
    ressources.timeShards += TimeShardsGain()
}

/*
Fonction qui renvoie le nombre de time shards obtenues en un crunch
IN : rien
OUT : le nombre de time shards à attribuer (int)
*/
function TimeShardsGain()
{
    return variables.actuel.crunch.timeShardsBoost * (Math.floor(ressources.particules/1000)+1);
}

/*
Fonction qui appelle les remises à zéros
IN : rien
OUT : rien
*/
function Reset()
{
    ResetRessources();
    ResetEntites();
    ResetVariable()
}

/*
Fonction qui réinitialise les objets liés aux entités
IN : l'état du jeu
OUT : remet les objets liés aux entités à leurs valeurs initiales
*/
function ResetEntites()
{
    Object.keys(nombres_entite.actuel.particules).forEach(entite =>
    {
        nombres_entite.actuel.particules[entite] = nombres_entite.initial.particules[entite]
        prix.actuel.particules[entite] = prix.initial.particules[entite]
    })
    AffichageEntites('particules');

}

/*
Fonction qui réinitialise les objets liés aux ressources
IN : l'état du jeu
OUT : remet les objets liés aux ressources à leurs valeurs initiales
*/
function ResetRessources()
{
    ressources.particules = 1


    ResetDensite();
}

/*
Fonction qui réinitialise les objets liés à l'équilibre
IN : l'état du jeu
OUT : remet les objets liés à l'équilibre à leurs valeurs initiales
*/
function ResetDensite()
{
    ressources.densite = 0;
    ressources.equilibrium = 10;
}

/*
Fonction qui réinitialise les objets liés aux variables de jeu
IN : l'état du jeu
OUT : remet les objets liés aux variables de jeu à leurs valeurs initiales
 */
function ResetVariable()
{
    Object.keys(variables.actuel.densite).forEach(variable =>
    {
        variables.actuel.densite[variable] = variables.actuel.densite[variable];
    })


}

/*
Fonction de gestion de l'onglet des statistiques
IN : rien
OUT : actualise la page des statistiques
*/
function GestionStatistiques()
{
    GestionTempsCrunch();
    statistiques.nombreCrunchs++;
}

/*
Fonction de gestion du temps de réalisation des 10 derniers crunchs
IN : utilise l'objet des statistiques
OUT : actualise l'objet des statistiques
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
Fonction déverrouille le bouton pour cruncher
IN : rien
OUT : rien
 */
function UnlockCrunch()
{
    document.getElementById("bouton_crunch").hidden = false;
}

/*
Fonction déverrouille le bouton pour cruncher
IN : rien
OUT : rien
 */
function LockCrunch()
{
    document.getElementById("bouton_crunch").hidden = true;
    evenements.crunchUnlock.unlocked = false;
}


function DebloquerGenerateur() {
    if (variables.actuel.crunch.generateurs < 5) {
        variables.actuel.crunch.generateurs++;
        var gen = variables.actuel.crunch.generateurs;
        
        document.getElementById("sous_onglet_particules_crunch").innerHTML += 
        "<div class = \"barre_achat\" id = \"gen_" + gen + "\" hidden> <span class=\"text_progress\">générateur " + gen + " (<span id =\"nombre_gen_" + gen + "\">0</span>)</span> <div class=\"progress\"> <div class=\"progress_bar\" id=\"barre_gen_" + gen + "\"></div> <button class=\"buy_button\" id=\"buy_gen_" + gen + "\" onclick=\"Achat(Acheter_entite, ['generateurs', 'generateurs', 'gen_" + gen + "', 1], ressources, 'timeShards', 'generateurs', 'gen_" + gen + "') \"> <span id=\"prix_gen_" + gen + "\">0</span> timeshards </button> </div> </div>"
        AffichageEntite('generateurs', 'gen_' + gen);
    }
    else 
    {
        console.log("Tous les générateurs sont débloqués")
    }
}