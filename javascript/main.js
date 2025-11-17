async function Tick(params)
{

    if(run.running)
    {
        let entites = Object.keys(nombres_entite);
        for (let i = 0; i < entites.length; i++)
        {
            ressources['particules'] += nombres_entite[entites[i]]
        }
        
        
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
    }
    
}

function Stop()
{
    run.running = !run.running;
}

window.onload = Start;
