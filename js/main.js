/* ================================================================
   MAIN MODULE — App initialization & global utilities
   ================================================================ */

const App = (() => {
    'use strict';

    /* --- Back to Top --- */
    function initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- Stat number animation (count-up on scroll) --- */
    function initStatCounters() {
        const statNums = document.querySelectorAll('.stat-num');
        if (!statNums.length) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNums.forEach(num => {
            num.style.opacity = '0';
            num.style.transform = 'scale(0.8)';
            num.style.transition = 'opacity 400ms ease, transform 400ms ease';
            counterObserver.observe(num);
        });
    }

    /* --- Inject current year in footer --- */
    function initCopyrightYear() {
        const yearEl = document.querySelector('.footer-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /* --- Init --- */
    function init() {
        initCopyrightYear();
        initBackToTop();
        initStatCounters();
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
