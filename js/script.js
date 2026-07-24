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
