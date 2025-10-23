async function tick(params) {
    let particules = document.getElementById("valeur-particules");
    particules.innerText = (Number(particules.innerText) + 1).toString();
}

//setInterval(tick, 1000);