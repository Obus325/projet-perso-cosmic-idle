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

function ChargerArbre()
{
    console.log("Chargement de l'arbre de compétences")
    Object.keys(noeuds).forEach(clé =>
    {
        let entite = noeuds[clé];
        let arbre = document.getElementById("arbre")
        document.getElementById("arbre").style.minHeight = (entite.y + 100).toString() + "px";
        arbre.innerHTML += "<div class=\"noeud\" id=\"" + entite.nom + "\" style=\"left: " + entite.x + "px; top: " + entite.y + "px;\"> <button class=\"noeud_button\" id=\"button_" + entite.nom + "\" onclick=\"DebloquerNoeud('" + clé + "')\">" + entite.nom_affichage + "</button> </div>"
        for (let i = 0; i < entite.parent.length; i++)
        {
            console.log("Ligne entre " + entite.nom + " et " + noeuds[entite.parent[i]].nom)
            créerLigne(entite.parent[i], clé);
        }
    })
}

function créerLigne(parent, enfant)
{
    let svg = document.getElementById("lignes")
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", noeuds[parent].x+20);
    line.setAttribute("y1", noeuds[parent].y+5);
    line.setAttribute("x2", noeuds[enfant].x+20);
    line.setAttribute("y2", noeuds[enfant].y+5);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");

    svg.appendChild(line);
}

function DebloquerNoeud(clé)
{
    let Noeud = noeuds[clé];
    console.log("Tentative de déblocage du noeud " + Noeud.nom)
    if (Deblocable(clé) && ressources.timeShards >= Noeud.prix)
    {
        Noeud.recompense();
        ressources.timeShards -= Noeud.prix;
        Noeud.debloque = true;
        let button = document.getElementById("button_" + Noeud.nom);
        button.disabled = true;
        document.getElementById("button_" + Noeud.nom).style.backgroundColor = "green";
        document.getElementById("button_" + Noeud.nom).disabled = true;
        // AffichageRessource('timeShards');
        console.log("Noeud " + Noeud.nom + " débloqué !")
    }
    else
    {
        console.log("Impossible de débloquer le noeud " + Noeud.nom)
    }
}

function Deblocable(clé)
{
    let deblocable = true;
    let Noeud = noeuds[clé];
    console.log("Vérification du déblocage du noeud " + Noeud.nom)
    console.log(Noeud.parent)
    if (Noeud.parent.length == 0) return true;
    Noeud.parent.forEach(parent => {
        if (!noeuds[parent].debloque)deblocable = false;
    })
    return deblocable;
}
