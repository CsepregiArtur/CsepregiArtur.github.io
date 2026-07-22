/**
 * Navigation — Mobile menu toggle, scroll header, active link tracking
 * Reduced-motion aware · No dependencies
 */
(function () {
    'use strict';

    var header = document.getElementById('header');
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    var closeBtn = document.getElementById('closeMenu');
    if (!hamburger || !mobileMenu || !closeBtn) return;

    /* ------------------------------------------------------------------
     * MOBILE MENU TOGGLE — iOS-safe scroll lock
     * Uses position:fixed instead of overflow:hidden to preserve
     * scroll position on iOS Safari.
     * ------------------------------------------------------------------ */
    function openMenu() {
        var scrollY = window.scrollY;
        mobileMenu.classList.add('open');
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollY + 'px';
        document.body.style.width = '100%';
        document.body.style.left = '0';
        document.body.dataset.scrollY = scrollY;
    }

    function closeMenu() {
        var scrollY = parseInt(document.body.dataset.scrollY || '0');
        mobileMenu.classList.remove('open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.left = '';
        window.scrollTo(0, isNaN(scrollY) ? 0 : scrollY);
        delete document.body.dataset.scrollY;
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when tapping backdrop (outside menu content)
    mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Close menu when a nav link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    /* ------------------------------------------------------------------
     * SMOOTH SCROLL — anchor links with header offset
     * ------------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            var headerHeight = header ? header.offsetHeight : 72;
            var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
    });

    /* ------------------------------------------------------------------
     * HEADER SCROLL BEHAVIOR
     * ------------------------------------------------------------------ */
    function updateHeader() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Throttled with requestAnimationFrame
    var ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeader(); // Initial check

})();
