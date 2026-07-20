// Sticky Navbar

const header = document.getElementById("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});

// Mobile Menu

const menuBtn=document.getElementById("menuBtn");

const nav=document.getElementById("navMenu");

menuBtn.addEventListener("click",()=>{

    menuBtn.classList.toggle("active");

    nav.classList.toggle("active");

});