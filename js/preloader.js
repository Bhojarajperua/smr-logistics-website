document.body.classList.add("loading");

const fill = document.querySelector(".progress-fill");
const preloader = document.getElementById("preloader");

let progress = 0;

const loader = setInterval(() => {

    progress++;

    fill.style.width = progress + "%";

    if(progress >= 100){

        clearInterval(loader);

        setTimeout(() => {

            preloader.classList.add("hide");

            document.body.classList.remove("loading");

        },600);

    }

},35);