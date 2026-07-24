/*==========================
      Gallery Filter
==========================*/

const filterBtns = document.querySelectorAll(".gallery-filter button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterBtns.forEach(button=>button.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.dataset.filter;

        galleryItems.forEach(item=>{

            if(filter==="all"){

                item.classList.remove("hide");

                item.classList.add("show");

            }

            else if(item.classList.contains(filter)){

                item.classList.remove("hide");

                item.classList.add("show");

            }

            else{

                item.classList.remove("show");

                item.classList.add("hide");

            }

        });

    });

});
/*==============================
        LIGHTBOX
==============================*/

const images = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close-lightbox");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

let current = 0;

images.forEach((img,index)=>{

img.addEventListener("click",()=>{

current=index;

lightbox.classList.add("active");

lightboxImage.src=img.src;

});

});

nextBtn.onclick=()=>{

current++;

if(current>=images.length){

current=0;

}

lightboxImage.src=images[current].src;

}

prevBtn.onclick=()=>{

current--;

if(current<0){

current=images.length-1;

}

lightboxImage.src=images[current].src;

}

closeBtn.onclick=()=>{

lightbox.classList.remove("active");

}

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.classList.remove("active");

}

}
/*==========================
      VIDEO PLAY
==========================*/

document.querySelectorAll(".video-card").forEach(card => {

    const video = card.querySelector("video");
    const button = card.querySelector(".play-btn");

    button.addEventListener("click", function (e) {

        e.stopPropagation();

        if (video.paused) {

            video.play();

        } else {

            video.pause();

        }

    });

    video.addEventListener("play", function () {

        button.style.display = "none";

    });

    video.addEventListener("pause", function () {

        button.style.display = "flex";

    });

    video.addEventListener("ended", function () {

        button.style.display = "flex";

        video.currentTime = 0;

    });

});