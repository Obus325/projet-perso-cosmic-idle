// Animation des étoiles scintillantes en arrière-plan
window.onresize = CreateStar;

/*

*/
function CreateStar()
{
    let fond = document.getElementById("etoiles");
    let width = window.innerWidth;
    let height = window.innerHeight;
    console.log("width :", width, "height :", height);
    let size = width * height;
    let nbStars = Math.floor(size / 1000);
    fond.innerHTML = "";
    for (let i = 0; i < nbStars; i++)
    {
        //création étoile
        const star = document.createElement("div");
        star.style.position = "absolute";
        star.style.backgroundColor = "white";

        //positionnement
        star.style.left = (Math.random() * 99) + "%";
        star.style.top = (Math.random() * 99) + "%";

        //taille
        let starSize = Math.random() * 2;
        star.style.width = starSize + "px";
        star.style.height = starSize + "px";
        star.style.borderRadius = "50%";

        //animation
        star.style.animation = `scintille ${3 + Math.random() * 3}s infinite ease-in-out`;

            
        fond.appendChild(star);
    }
}


