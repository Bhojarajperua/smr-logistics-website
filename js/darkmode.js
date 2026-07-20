// ==========================
// DARK MODE
// ==========================

const toggle = document.querySelector(".dark-toggle");

if(localStorage.getItem("theme")=="dark"){

    document.body.classList.add("dark-mode");

}

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

});