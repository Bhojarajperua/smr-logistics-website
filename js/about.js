/*==========================
    COUNTER
==========================*/
// Wrap code to ensure it waits for the HTML elements to load entirely
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    // Fail-safe check in case class naming is wrong
    if (counters.length === 0) {
        console.warn("Counter Error: No elements found with class '.counter'");
        return;
    }

    const animateCounter = (counter) => {
        // Fallback to 0 if data-target attribute is missing
        const target = +(counter.getAttribute("data-target") || 0);
        let count = 0;
        
        // Dynamic speed setting
        const speedDivider = target > 5000 ? 80 : target > 500 ? 50 : 30;
        const increment = target / speedDivider;

        const update = () => {
            count += increment;
            const currentCeil = Math.ceil(count);

            if (currentCeil < target) {
                counter.innerText = currentCeil.toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };

        update();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check both properties for ultimate cross-browser support
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        // FIX: Lowered from 0.5 to 0.1 so it triggers immediately when 
        // even 10% of the item enters the viewport.
        threshold: 0.1 
    });

    counters.forEach(counter => observer.observe(counter));
});
