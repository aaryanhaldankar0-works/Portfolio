/* ==========================================================================
   AARYAN HALDANKAR - INTRO MICRO-ANIMATIONS CONTROLLER
   3D Photo Frame Perspective Tilt, Dynamic Glow, Interactive Pillar Chips
   ========================================================================== */

(function () {
  'use strict';

  function initIntro() {
    initChips();
    initPhotoFrameTilt();
  }

  /* --- Interactive Pillar Chips --- */
  function initChips() {
    const chipGroup = document.getElementById('chipGroup') || document.getElementById('introChipGroup');
    const chipDetail = document.getElementById('chipDetail') || document.getElementById('introChipDetail');
    if (!chipGroup || !chipDetail) return;

    const chips = chipGroup.querySelectorAll('.chip, .intro-chip');
    const spans = chipDetail.querySelectorAll('span');
    const defaultSpan = chipDetail.querySelector('[data-key="_default"]');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.key;
        const alreadyActive = chip.classList.contains('active');

        // Reset all chips and text
        chips.forEach(c => c.classList.remove('active'));
        spans.forEach(s => s.classList.remove('show'));

        if (alreadyActive) {
          // Re-clicking active chip toggles back to default
          if (defaultSpan) defaultSpan.classList.add('show');
        } else {
          // Activate clicked chip
          chip.classList.add('active');
          const targetSpan = chipDetail.querySelector(`span[data-key="${key}"]`);
          if (targetSpan) {
            targetSpan.classList.add('show');
          } else if (defaultSpan) {
            defaultSpan.classList.add('show');
          }
        }
      });
    });
  }

  /* --- 3D Photo Frame Perspective Tilt & Interactive Spotlight Glow --- */
  function initPhotoFrameTilt() {
    const frame = document.getElementById('photoFrame') || document.getElementById('introPhotoFrame');
    if (!frame) return;

    const glow = frame.querySelector('.photo-glow');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;

    if (reduceMotion || !canHover) return;

    let rafId = null;

    frame.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = frame.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        // Controlled rotation: rotateX based on vertical offset, rotateY based on horizontal offset
        const rotX = (py - 0.5) * -10;
        const rotY = (px - 0.5) * 12;

        frame.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glow) {
          glow.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
          glow.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        }
      });
    });

    frame.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      frame.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }
})();
