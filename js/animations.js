/* ================================================================
   ANIMATIONS MODULE — Scroll-triggered fade + slide-up
   ================================================================ */

const Animations = (() => {
    'use strict';

    const config = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    let observer = null;

    function init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Make all elements visible immediately
            document.querySelectorAll('.animate').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, config);

        document.querySelectorAll('.animate').forEach(el => {
            observer.observe(el);
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', Animations.init);
