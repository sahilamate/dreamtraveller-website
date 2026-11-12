/**
 * Dream Travelkar - Luxury 2D Cursor System
 * Smooth, hardware-accelerated trailing cursor with interactive states for links and buttons.
 * Automatically disabled on touch/mobile devices and when prefers-reduced-motion is active.
 */

(function () {
    'use strict';

    // Touch device & reduced motion guard
    const isTouch = ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0) || 
                    (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
        return; // Do not initialize on mobile or touchscreens
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Create cursor elements
        const dot = document.createElement('div');
        dot.className = 'dt-cursor-dot';
        dot.id = 'dt-cursor-dot';
        dot.setAttribute('aria-hidden', 'true');

        const ring = document.createElement('div');
        ring.className = 'dt-cursor-ring';
        ring.id = 'dt-cursor-ring';
        ring.setAttribute('aria-hidden', 'true');

        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let isVisible = false;
        let isHovered = false;
        let isClicking = false;

        // Track mouse movement
        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isVisible) {
                isVisible = true;
                dot.style.opacity = '1';
                ring.style.opacity = '1';
                ringX = mouseX;
                ringY = mouseY;
            }
        }, { passive: true });

        // Hide when mouse leaves window
        document.addEventListener('mouseleave', function () {
            isVisible = false;
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        });

        document.addEventListener('mouseenter', function () {
            isVisible = true;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        });

        // Click state
        window.addEventListener('mousedown', function () {
            isClicking = true;
            ring.classList.add('is-clicking');
            dot.classList.add('is-clicking');
        });

        window.addEventListener('mouseup', function () {
            isClicking = false;
            ring.classList.remove('is-clicking');
            dot.classList.remove('is-clicking');
        });

        // Interactive hover states via event delegation
        document.addEventListener('mouseover', function (e) {
            const target = e.target;
            if (!target) return;

            const interactive = target.closest('a, button, .btn, input, select, textarea, label, [role="button"], .pkg-card, .dest-card, .clickable');
            if (interactive) {
                isHovered = true;
                ring.classList.add('is-hovering');
                dot.classList.add('is-hovering');
            }
        }, { passive: true });

        document.addEventListener('mouseout', function (e) {
            const target = e.target;
            if (!target) return;

            const interactive = target.closest('a, button, .btn, input, select, textarea, label, [role="button"], .pkg-card, .dest-card, .clickable');
            if (interactive) {
                isHovered = false;
                ring.classList.remove('is-hovering');
                dot.classList.remove('is-hovering');
            }
        }, { passive: true });

        // Smooth 60fps render loop with lerp
        function renderCursor() {
            if (isVisible) {
                // Immediate dot position
                dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

                // Smooth trailing ring position (lerp factor 0.18)
                ringX += (mouseX - ringX) * 0.18;
                ringY += (mouseY - ringY) * 0.18;
                ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }

            requestAnimationFrame(renderCursor);
        }

        requestAnimationFrame(renderCursor);
    });
})();
