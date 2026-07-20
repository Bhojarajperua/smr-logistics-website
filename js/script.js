/*==============================
      COUNTER ANIMATION
==============================*/

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 120;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    });

};

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver((entries) => {

    if(entries[0].isIntersecting){

        startCounter();

        observer.disconnect();

    }

});

observer.observe(statsSection);

/*==============================
      PRELOADER
==============================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("preloader");

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},1800);

});

/*===========================
          FAQ
===========================*/

const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(item=>{

const question=item.querySelector(".faq-question");

question.addEventListener("click",()=>{

const answer=item.querySelector(".faq-answer");

const icon=question.querySelector("span");

if(answer.style.maxHeight){

answer.style.maxHeight=null;

icon.innerHTML="+";

}

else{

document.querySelectorAll(".faq-answer").forEach(a=>a.style.maxHeight=null);

document.querySelectorAll(".faq-question span").forEach(i=>i.innerHTML="+");

answer.style.maxHeight=answer.scrollHeight+"px";

icon.innerHTML="−";

}

});

});

/*=============================
      SCROLL PROGRESS
=============================*/

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});
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
/*==========================
      Gallery Lightbox
==========================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeLightbox = document.querySelector(".close-lightbox");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

let currentImage = 0;

galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentImage=index;

        showImage();

    });

});

function showImage(){

    lightbox.classList.add("active");

    lightboxImage.src=galleryImages[currentImage].src;

}

closeLightbox.onclick=()=>{

    lightbox.classList.remove("active");

}

nextBtn.onclick=()=>{

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    showImage();

}

prevBtn.onclick=()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    showImage();

}

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape"){

        lightbox.classList.remove("active");

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});
/*==========================
      Video Play
==========================*/

document.querySelectorAll(".video-card").forEach(card=>{

const video=card.querySelector("video");

const button=card.querySelector(".play-btn");

button.onclick=()=>{

if(video.paused){

video.play();

button.style.display="none";

}else{

video.pause();

button.style.display="block";

}

}

video.onclick=()=>{

if(video.paused){

video.play();

button.style.display="none";

}else{

video.pause();

button.style.display="block";

}

}

});