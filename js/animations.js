/**
 * Scroll-triggered reveal for .animate elements
 * Adds .visible class when elements enter the viewport.
 * Elements already visible on load are revealed immediately.
 * Reduced-motion aware — CSS handles the visual, JS adds .visible for state.
 */
(function () {
    'use strict';

    var animateElements = document.querySelectorAll('.animate');
    if (animateElements.length === 0) return;

    var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------------
     * REVEAL ON SCROLL — fade in + slide up when entering viewport
     * ------------------------------------------------------------------ */
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    /* ------------------------------------------------------------------
     * Check each element — reveal immediately if visible, else observe
     * ------------------------------------------------------------------ */
    animateElements.forEach(function (el) {
        // In reduced-motion mode the CSS sets opacity:1 directly.
        // We still add .visible so downstream code can check state.
        if (isReducedMotion) {
            el.classList.add('visible');
            return;
        }

        var rect = el.getBoundingClientRect();
        var viewportHeight = window.innerHeight;

        // If the element is already in or above the viewport, reveal now
        if (rect.top < viewportHeight - 40) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    });

})();
