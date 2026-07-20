/*==========================
    Counter Animation
==========================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let count = 0;
        const speed = target / 100;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target.toLocaleString() + "+";

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));