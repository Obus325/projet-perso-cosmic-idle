const nombres_entite = {
    atome : 0,
    nebuleuse : 0,
    etoile : 0,
    galaxie : 0,
}

const prix_entite = {
    atome : 1,
    nebuleuse : 10,
    etoile : 100,
    galaxie : 1000,
}

const prix_initiaux_entite = {
    atome : 1,
    nebuleuse : 10,
    etoile : 100,
    galaxie : 1000,
}

const ressources = {
    particules : 1,
}

const run = {running : true}

function start(){
    let entites = Object.keys(nombres_entite);
        for (let i = 0; i < entites.length; i++){
            document.getElementById("prix_" + entites[i] ).innerText = prix_entite[entites[i]];
        }
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
}

function acheter(entite, nombre){
    if (ressources['particules']>=prix_entite[entite]){
        ressources['particules'] -= prix_entite[entite]
        nombres_entite[entite] += nombre;
        prix_entite[entite] += prix_initiaux_entite[entite];
        document.getElementById("nombre_" + entite ).innerText = nombres_entite[entite];
        document.getElementById("prix_" + entite).innerText = prix_entite[entite];
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();

    }
}

async function tick(params) {

    if(run.running){
        let entites = Object.keys(nombres_entite);
        for (let i = 1; i < entites.length; i++){
            nombres_entite[entites[i-1]] += nombres_entite[entites[i]];
            document.getElementById("nombre_" + entites[i-1] ).innerText = nombres_entite[entites[i-1]];
        }
        
        ressources['particules'] += nombres_entite['atome'];
        document.getElementById("valeur_particules").innerText = ressources['particules'].toString();
    }
    
}

function stop(){
    run.running = !run.running;
}

setInterval(tick, 1000);
