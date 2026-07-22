/**
 * Leadership Philosophy — Scroll-driven Process Animation
 * GPU-accelerated · Reduced-motion aware · 60fps
 */
(function () {
    'use strict';

    const track = document.getElementById('processTrack');
    const lineFill = document.getElementById('processLineFill');
    const loopIndicator = document.getElementById('processLoop');
    if (!track || !lineFill) return;

    const steps = Array.from(track.querySelectorAll('.process-step'));
    if (steps.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------------
     * CACHED RECTS — avoid layout thrashing on every scroll frame
     * ------------------------------------------------------------------ */
    let stepRects = [];

    function cacheStepRects() {
        stepRects = steps.map(function (step) {
            return step.getBoundingClientRect();
        });
    }

    window.addEventListener('resize', cacheStepRects, { passive: true });

    /* ------------------------------------------------------------------
     * REVEAL ON SCROLL — fade in + slide up when entering viewport
     * ------------------------------------------------------------------ */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    steps.forEach(function (step) {
        observer.observe(step);
    });

    /* ------------------------------------------------------------------
     * ACTIVE STEP DETECTION — find which step is closest to viewport center
     * Uses cached rects to avoid layout thrashing during scroll.
     * ------------------------------------------------------------------ */
    function getActiveIndex() {
        const viewportCenter = window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        steps.forEach(function (step, i) {
            const rect = stepRects[i] || step.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const distance = Math.abs(stepCenter - viewportCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        return closestIndex;
    }

    /* ------------------------------------------------------------------
     * UPDATE — apply active/dimmed classes + progress line
     * ------------------------------------------------------------------ */
    function update() {
        if (prefersReducedMotion) {
            // In reduced-motion mode, just reveal all and show full line
            steps.forEach(function (s) { s.classList.add('revealed'); });
            lineFill.style.transform = 'scaleY(1)';
            if (loopIndicator) loopIndicator.classList.add('visible');
            return;
        }

        const activeIndex = getActiveIndex();

        steps.forEach(function (step, i) {
            step.classList.remove('active', 'dimmed');
            if (i < activeIndex) {
                step.classList.add('dimmed');
            } else if (i === activeIndex) {
                step.classList.add('active');
            }
            // Future steps: keep default opacity (no class)
        });

        // Progress line: fill proportionally to active step
        // Each step occupies 1/steps.length of the track
        // When activeIndex is the last step, fill to 100%
        const totalSteps = steps.length;
        const progress = Math.min((activeIndex + 1) / totalSteps, 1);
        lineFill.style.transform = 'scaleY(' + progress + ')';

        // Show loop indicator when last step is active
        if (loopIndicator) {
            if (activeIndex === totalSteps - 1) {
                loopIndicator.classList.add('visible');
            } else {
                loopIndicator.classList.remove('visible');
            }
        }
    }

    /* ------------------------------------------------------------------
     * SCROLL HANDLER — throttled with rAF
     * ------------------------------------------------------------------ */
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                update();
                ticking = false;
            });
            ticking = true;
        }
    }

    /* ------------------------------------------------------------------
     * INIT
     * ------------------------------------------------------------------ */
    // Cache initial positions
    cacheStepRects();
    // Initial run
    update();

    // Listen for scroll
    window.addEventListener('scroll', onScroll, { passive: true });

    // Recalculate on resize
    window.addEventListener('resize', update, { passive: true });

    // Listen for reduced-motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
        if (e.matches) {
            steps.forEach(function (s) { s.classList.add('revealed'); });
            lineFill.style.transform = 'scaleY(1)';
            if (loopIndicator) loopIndicator.classList.add('visible');
        }
    });

})();
