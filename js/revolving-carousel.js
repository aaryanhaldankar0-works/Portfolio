/* ==========================================================================
   REVOLVING 3D PROJECT CAROUSEL - VIRTUAL GARAGE
   Cylindrical carousel with scroll, drag, keyboard & touch support.
   Reads project data from PORTFOLIO_DATA.
   ========================================================================== */

class RevolvingCarousel {
  constructor() {
    // Ordered list of project keys (skip aliases like '01')
    this.projectKeys = [];
    this.projects = [];
    this.currentIndex = 0;
    this.anglePerCard = 0;
    this.currentAngle = 0;
    this.radius = 0;

    // Toggle panel state (hidden by default until user toggles)
    this.isDetailOpen = false;

    // Drag state
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragDeltaX = 0;
    this.dragAngleStart = 0;

    // Scroll throttle
    this.scrollCooldown = false;

    // Hint auto-hide timer
    this.hintHidden = false;

    this.init();
  }

  init() {
    this.collectProjects();
    if (this.projects.length === 0) return;

    this.anglePerCard = 360 / this.projects.length;
    this.radius = this.calculateRadius();

    this.buildCards();
    this.buildDots();
    this.bindEvents();
    this.goTo(0, false);
  }

  /* ---- Collect unique projects from PORTFOLIO_DATA ---- */
  collectProjects() {
    if (typeof PORTFOLIO_DATA === 'undefined') return;

    const seen = new Set();
    
    // Featured 1: Bharat Mobility (from Virtual Garage)
    if (PORTFOLIO_DATA.garage && PORTFOLIO_DATA.garage['bharat-mobility']) {
      const data = PORTFOLIO_DATA.garage['bharat-mobility'];
      seen.add(data.id);
      this.projectKeys.push('bharat-mobility');
      this.projects.push(data);
    }
    
    // Featured 2: EBS Tech (from Workshop Showcase)
    if (PORTFOLIO_DATA.workshop) {
      const ebsData = PORTFOLIO_DATA.workshop.find(p => p.id === 'ebs-tech');
      if (ebsData && !seen.has(ebsData.id)) {
        seen.add(ebsData.id);
        this.projectKeys.push('ebs-tech');
        this.projects.push(ebsData);
      }
    }
  }

  /* ---- Calculate optimal radius based on card width & count ---- */
  calculateRadius() {
    const cardEl = document.querySelector('.carousel-card');
    const cardWidth = cardEl ? cardEl.offsetWidth : 380;
    // Ensure cards don't visually overlap by using enough radius
    const minCircumference = this.projects.length * (cardWidth + 60);
    return Math.max(minCircumference / (2 * Math.PI), 480);
  }

  /* ---- Build card elements inside the drum ---- */
  buildCards() {
    const drum = document.getElementById('carousel-drum');
    if (!drum) return;

    drum.innerHTML = '';

    this.projects.forEach((project, i) => {
      const angle = this.anglePerCard * i;

      const card = document.createElement('div');
      card.className = 'carousel-card';
      card.dataset.index = i;
      card.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;

      const imgSrc = project.heroImage || '';

      const visualHtml = imgSrc
        ? `<img class="carousel-card__img" src="${imgSrc}" alt="${project.title}" loading="lazy" />`
        : `
          <div class="carousel-card__preview-placeholder">
            <div class="card-placeholder-mesh"></div>
            <span class="card-placeholder-badge">${project.id === 'bharat-mobility' ? '01 / GARAGE' : '02 / WORKSHOP'}</span>
            <div class="card-placeholder-title">${project.title}</div>
            <span class="card-placeholder-hint">Click card to toggle details</span>
          </div>
        `;

      card.innerHTML = `
        ${visualHtml}
        <div class="carousel-card__body">
          <span class="carousel-card__index">${String(i + 1).padStart(2, '0')} / ${String(this.projects.length).padStart(2, '0')}</span>
          <span class="carousel-card__category">${project.category || ''}</span>
          <h3 class="carousel-card__title">${project.title}</h3>
          <p class="carousel-card__tagline">${project.tagline || ''}</p>
        </div>
        <div class="carousel-card__accent"></div>
      `;

      // Click on card: if already active, toggle detail; if not active, focus it
      card.addEventListener('click', () => {
        if (!card.classList.contains('is-active')) {
          this.goTo(i);
        } else {
          this.toggleDetailPanel();
        }
      });

      drum.appendChild(card);
    });
  }

  /* ---- Build dot indicators ---- */
  buildDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    this.projects.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  /* ---- Navigate to a specific index ---- */
  goTo(index, animate = true) {
    const n = this.projects.length;
    if (n === 0) return;

    // Wrap around
    this.currentIndex = ((index % n) + n) % n;
    this.currentAngle = -(this.anglePerCard * this.currentIndex);

    const drum = document.getElementById('carousel-drum');
    if (drum) {
      if (!animate) drum.style.transition = 'none';
      drum.style.transform = `rotateY(${this.currentAngle}deg)`;
      if (!animate) {
        // Force reflow then re-enable transitions
        drum.offsetHeight; // eslint-disable-line no-unused-expressions
        drum.style.transition = '';
      }
    }

    // Update active states
    this.updateActiveCard();
    this.updateDots();
    this.updateToggleBtn();

    // If detail panel is already open by user choice, update its content to match current project
    if (this.isDetailOpen) {
      this.renderDetailPanel();
    }

    // Auto-hide hint after first interaction
    if (!this.hintHidden && animate) {
      this.hintHidden = true;
      const hint = document.getElementById('carousel-hint');
      if (hint) hint.classList.add('is-hidden');
    }
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  updateActiveCard() {
    const cards = document.querySelectorAll('.carousel-card');
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === this.currentIndex);
    });
  }

  updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.currentIndex);
    });
  }

  /* ---- Update toggle button UI state & text ---- */
  updateToggleBtn() {
    const toggleBtn = document.getElementById('carousel-toggle-btn');
    const toggleText = document.getElementById('carousel-toggle-btn-text');
    const actionLabel = document.getElementById('carousel-toggle-action-label');
    const project = this.projects[this.currentIndex];
    if (!toggleBtn || !project) return;

    toggleBtn.setAttribute('aria-expanded', this.isDetailOpen ? 'true' : 'false');

    if (this.isDetailOpen) {
      toggleBtn.classList.add('is-open');
      if (toggleText) toggleText.textContent = `Hide ${project.title} Details`;
      if (actionLabel) actionLabel.textContent = 'Collapse';
    } else {
      toggleBtn.classList.remove('is-open');
      if (toggleText) toggleText.textContent = `View ${project.title} Details`;
      if (actionLabel) actionLabel.textContent = 'Expand';
    }
  }

  /* ---- Toggle the expanded detail panel ---- */
  toggleDetailPanel(forceState) {
    if (typeof forceState === 'boolean') {
      this.isDetailOpen = forceState;
    } else {
      this.isDetailOpen = !this.isDetailOpen;
    }

    const panel = document.getElementById('carousel-detail-panel');
    const toggleBtn = document.getElementById('carousel-toggle-btn');
    const toggleText = document.getElementById('carousel-toggle-btn-text');
    const actionLabel = document.getElementById('carousel-toggle-action-label');
    const project = this.projects[this.currentIndex];

    if (!panel || !toggleBtn || !project) return;

    toggleBtn.setAttribute('aria-expanded', this.isDetailOpen ? 'true' : 'false');

    if (this.isDetailOpen) {
      toggleBtn.classList.add('is-open');
      if (toggleText) toggleText.textContent = `Hide ${project.title} Details`;
      if (actionLabel) actionLabel.textContent = 'Collapse';

      panel.classList.add('is-open');
      this.renderDetailPanel();

      // Smooth scroll gently to reveal panel if needed
      setTimeout(() => {
        const rect = panel.getBoundingClientRect();
        if (rect.top > window.innerHeight - 200) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      toggleBtn.classList.remove('is-open');
      if (toggleText) toggleText.textContent = `View ${project.title} Details`;
      if (actionLabel) actionLabel.textContent = 'Expand';

       panel.classList.remove('is-visible');
      setTimeout(() => {
        const mountRoot = document.getElementById('case-study-mount-root');
        if (mountRoot && window.CaseStudy) {
          window.CaseStudy.unmount(mountRoot);
        }
        panel.classList.remove('is-open');
        panel.innerHTML = '';
      }, 250);
    }
  }

  /* ---- Render the expanded detail panel below the carousel ---- */
  renderDetailPanel() {
    const panel = document.getElementById('carousel-detail-panel');
    if (!panel) return;

    const project = this.projects[this.currentIndex];
    if (!project) return;

    // Clean up any existing case study mount
    const prevMount = document.getElementById('case-study-mount-root');
    if (prevMount && window.CaseStudy) {
      window.CaseStudy.unmount(prevMount);
    }

    // Check if project has a native React Case Study
    if (window.CaseStudy && window.CaseStudy.has(project.id)) {
      panel.classList.remove('is-visible');
      setTimeout(() => {
        panel.innerHTML = `
          <div class="case-study-mount-wrapper">
            <div id="case-study-mount-root" data-case-study="${project.id}"></div>
          </div>
        `;
        const mountRoot = document.getElementById('case-study-mount-root');
        window.CaseStudy.mount(mountRoot, project.id);
        requestAnimationFrame(() => {
          panel.classList.add('is-visible');
        });
      }, 180);
      return;
    }

    // Build specs HTML
    let specsHtml = '';
    if (project.specs) {
      const entries = Object.entries(project.specs);
      entries.forEach(([key, val], i) => {
        const isFirst = i === 0;
        specsHtml += `
          <div class="detail-spec-card">
            <div class="detail-spec-card__label">${this.formatSpecLabel(key)}</div>
            <div class="detail-spec-card__value${isFirst ? ' is-highlight' : ''}">${val}</div>
          </div>
        `;
      });
    }

    // Build sections HTML if present (e.g. EBS Tech Case Study)
    let sectionsHtml = '';
    if (project.sections && Array.isArray(project.sections)) {
      project.sections.forEach((sec, idx) => {
        const hasVisual = Boolean(sec.image);
        sectionsHtml += `
          <div class="detail-step${!hasVisual ? ' detail-step--no-visual' : ''}">
            <div class="detail-step__number">0${idx + 1}</div>
            <div class="detail-step__content">
              <span class="detail-step__phase">${sec.phase || `Section 0${idx + 1}`}</span>
              <h4 class="detail-step__title">${sec.title}</h4>
              <p class="detail-step__desc">${sec.desc || sec.description || ''}</p>
            </div>
            ${hasVisual ? `
              <div class="detail-step__visual">
                <img src="${sec.image}" alt="${sec.title}" loading="lazy" />
              </div>
            ` : ''}
          </div>
        `;
      });
    }

    // Build stages HTML if present
    let stagesHtml = '';
    if (project.stages) {
      const stageEntries = Object.entries(project.stages);
      stageEntries.forEach(([key, stage], idx) => {
        let stageSpecsHtml = '';
        if (stage.specs) {
          stageSpecsHtml = Object.entries(stage.specs)
            .map(([sk, sv]) => `<div class="detail-stage-spec"><span class="stage-spec-key">${sk}:</span> <span class="stage-spec-val">${sv}</span></div>`)
            .join('');
        }
        stagesHtml += `
          <div class="detail-step">
            <div class="detail-step__number">0${idx + 1}</div>
            <div class="detail-step__content">
              <span class="detail-step__phase">${stage.phase || ''}</span>
              <h4 class="detail-step__title">${stage.title}</h4>
              <p class="detail-step__desc">${stage.description || ''}</p>
              ${stageSpecsHtml ? `<div class="detail-stage-specs-grid">${stageSpecsHtml}</div>` : ''}
            </div>
            ${stage.image ? `
              <div class="detail-step__visual">
                <img src="${stage.image}" alt="${stage.title}" loading="lazy" />
              </div>
            ` : ''}
          </div>
        `;
      });
    }

    // Build thought process steps HTML (only if present)
    let stepsHtml = '';
    if (project.thoughtProcess && project.thoughtProcess.length > 0) {
      project.thoughtProcess.forEach(step => {
        const tagsHtml = step.pills
          ? step.pills.map(p => `<span class="detail-step__tag">${p}</span>`).join('')
          : '';

        stepsHtml += `
          <div class="detail-step">
            <div class="detail-step__number">${step.step}</div>
            <div>
              <span class="detail-step__phase">${step.phase}</span>
              <h4 class="detail-step__title">${step.title}</h4>
              <p class="detail-step__desc">${step.desc}</p>
              <div class="detail-step__tags">${tagsHtml}</div>
            </div>
            ${step.image ? `
              <div class="detail-step__visual">
                <img src="${step.image}" alt="${step.title}" loading="lazy" />
              </div>
            ` : ''}
          </div>
        `;
      });
    }

    const targetSection = '#immersive-garage';
    const targetLabel = project.id === 'bharat-mobility' ? 'Walk to Bay 01 in Garage (3D)' : 'Walk to Bay 02 in Garage (3D)';
    const targetBay = project.id === 'bharat-mobility' ? 0 : 1;

    // Animate out, swap content, animate in
    panel.classList.remove('is-visible');

    setTimeout(() => {
      panel.innerHTML = `
        <div class="detail-header">
          <div class="detail-header__left">
            <div class="detail-header__category">${project.category || ''}</div>
            <h3 class="detail-header__title">${project.title}</h3>
            <p class="detail-header__tagline">${project.tagline || ''}</p>
          </div>
          <div class="detail-header__right">
            <a href="${targetSection}" class="btn-jump-3d">
              <span>${targetLabel}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        ${specsHtml ? `<div class="detail-specs">${specsHtml}</div>` : ''}

        ${sectionsHtml ? `
          <div class="detail-process">
            <div class="detail-process__header">
              <div>
                <div class="detail-process__title">${project.sectionsTitle || 'Case Study & Architecture'}</div>
                <div class="detail-process__subtitle">${project.sectionsSubtitle || 'Three key stages from crisis research to hardware deployment.'}</div>
              </div>
            </div>
            <div class="detail-process__steps">${sectionsHtml}</div>
          </div>
        ` : ''}

        ${stagesHtml ? `
          <div class="detail-process">
            <div class="detail-process__header">
              <div>
                <div class="detail-process__title">Development Stages</div>
                <div class="detail-process__subtitle">Physical architecture and technical execution.</div>
              </div>
            </div>
            <div class="detail-process__steps">${stagesHtml}</div>
          </div>
        ` : ''}

        ${stepsHtml ? `
          <div class="detail-process">
            <div class="detail-process__header">
              <div>
                <div class="detail-process__title">Design Process</div>
                <div class="detail-process__subtitle">From research insight to final design.</div>
              </div>
            </div>
            <div class="detail-process__steps">${stepsHtml}</div>
          </div>
        ` : ''}
      `;

      const jumpBtn = panel.querySelector('.btn-jump-3d');
      if (jumpBtn) {
        jumpBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof window.walkToStudioBay === 'function') {
            window.walkToStudioBay(targetBay);
          } else {
            const el = document.querySelector(targetSection);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // Trigger entrance animation
      requestAnimationFrame(() => {
        panel.classList.add('is-visible');
      });
    }, 180);
  }

  formatSpecLabel(key) {
    // Convert camelCase/PascalCase to spaced uppercase
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim()
      .toUpperCase();
  }

  /* ---- Event Bindings ---- */
  bindEvents() {
    // Toggle button in Section 2
    const toggleBtn = document.getElementById('carousel-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleDetailPanel());
    }

    // Arrow buttons
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    const viewport = document.getElementById('carousel-viewport');
    if (viewport) {
      // Mouse drag
      viewport.addEventListener('mousedown', (e) => this.onDragStart(e));
      window.addEventListener('mousemove', (e) => this.onDragMove(e));
      window.addEventListener('mouseup', () => this.onDragEnd());

      // Touch drag
      viewport.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
      window.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: true });
      window.addEventListener('touchend', () => this.onDragEnd());
    }

    // Keyboard arrows
    document.addEventListener('keydown', (e) => {
      const viewport = document.getElementById('carousel-viewport');
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      }
    });
  }

  /* ---- Drag (Mouse & Touch) ---- */
  onDragStart(e) {
    this.isDragging = true;
    this.dragStartX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    this.dragAngleStart = this.currentAngle;
    this.dragDeltaX = 0;

    const drum = document.getElementById('carousel-drum');
    if (drum) drum.classList.add('is-dragging');
  }

  onDragMove(e) {
    if (!this.isDragging) return;

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    this.dragDeltaX = clientX - this.dragStartX;

    const dragDeg = this.dragDeltaX * 0.25;
    const drum = document.getElementById('carousel-drum');
    if (drum) {
      drum.style.transform = `rotateY(${this.dragAngleStart + dragDeg}deg)`;
    }
  }

  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const drum = document.getElementById('carousel-drum');
    if (drum) drum.classList.remove('is-dragging');

    const threshold = 50;
    if (Math.abs(this.dragDeltaX) > threshold) {
      if (this.dragDeltaX > 0) {
        this.prev();
      } else {
        this.next();
      }
    } else {
      this.goTo(this.currentIndex);
    }
  }
}

/* ---- Initialize on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  window.revolvingCarousel = new RevolvingCarousel();
});

// React Case Study bundle sync
window.addEventListener('casestudy:ready', () => {
  if (window.revolvingCarousel && window.revolvingCarousel.isDetailOpen) {
    const project = window.revolvingCarousel.projects[window.revolvingCarousel.currentIndex];
    if (project && window.CaseStudy && window.CaseStudy.has(project.id)) {
      window.revolvingCarousel.renderDetailPanel();
    }
  }
});

