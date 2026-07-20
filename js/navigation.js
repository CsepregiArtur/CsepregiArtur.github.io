/* ================================================================
   NAVIGATION MODULE — Header, Mobile Menu, Smooth Scroll
   ================================================================ */

const Navigation = (() => {
    'use strict';

    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    let lastScrollY = 0;

    /* --- Header: transparent → solid on scroll --- */
    function handleHeaderScroll() {
        const currentScroll = window.scrollY;

        // Toggle scrolled class at 80px
        header.classList.toggle('scrolled', currentScroll > 80);

        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScrollY && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScroll;
    }

    /* --- Active nav link highlighting --- */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');
        const scrollPos = window.scrollY + 120;

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            if (scrollPos >= top) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    /* --- Mobile menu --- */
    function openMobileMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* --- Smooth scroll for anchor links --- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    closeMobileMenu();
                }
            });
        });
    }

    /* --- Init --- */
    function init() {
        window.addEventListener('scroll', () => {
            handleHeaderScroll();
            updateActiveNavLink();
        });

        if (hamburger) hamburger.addEventListener('click', openMobileMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

        // Close mobile menu on link click
        if (mobileMenu) {
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }

        initSmoothScroll();
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', Navigation.init);
