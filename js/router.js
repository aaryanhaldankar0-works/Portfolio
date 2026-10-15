/* ==========================================================================
   ROUTER & SELECTED WORK CONTROLLER — AARYAN HALDANKAR PORTFOLIO
   Dedicated Case-Study Routes (/work/:slug) & Minimal Editorial Gallery
   ========================================================================== */

(function () {
  'use strict';

  // Slug aliases to map URLs to project IDs
  const SLUG_TO_ID = {
    'bharat-mobility-pod': 'bharat-mobility',
    'bharat-mobility': 'bharat-mobility',
    'ebs-guardian': 'ebs-tech',
    'ebs-tech': 'ebs-tech'
  };

  const ID_TO_SLUG = {
    'bharat-mobility': 'bharat-mobility-pod',
    'ebs-tech': 'ebs-guardian'
  };

  const ID_TO_BAY = {
    'bharat-mobility': 0,
    'ebs-tech': 1
  };

  const DEFAULT_TITLE = 'Aaryan Haldankar | Mobility & Vehicle Design';

  class PortfolioRouter {
    constructor() {
      this.currentSlug = null;
      this.currentProjectId = null;
      this.isTransitioning = false;
      this.homepageView = null;
      this.projectView = null;
      this.mountRoot = null;

      // Bind methods
      this.handlePopState = this.handlePopState.bind(this);
      this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }

    init() {
      this.homepageView = document.getElementById('homepage-view');
      this.projectView = document.getElementById('project-view');
      this.mountRoot = document.getElementById('project-case-study-root');

      this.renderSelectedWorkGallery();
      this.bindEvents();

      // Listen for CaseStudy ready event if React bundle loads asynchronously
      window.addEventListener('casestudy:ready', () => {
        if (this.currentProjectId && this.mountRoot && !this.mountRoot.dataset.mounted) {
          this.mountCurrentProject();
        }
      });

      // Handle initial route on page load
      this.resolveRoute();
    }

    /* ---- Render Minimal Editorial Gallery (Step 3, 4, 8) ---- */
    renderSelectedWorkGallery() {
      const gallery = document.getElementById('selected-work-gallery');
      if (!gallery) return;

      if (typeof PORTFOLIO_DATA === 'undefined' || !PORTFOLIO_DATA.getFeaturedProjects) {
        return;
      }

      const featured = PORTFOLIO_DATA.getFeaturedProjects();
      gallery.innerHTML = featured
        .map((proj) => {
          const number = proj.number || '01';
          const title = proj.title;
          const desc = proj.subtitle || proj.description || '';
          const category = proj.category || '';
          const previewImg = proj.previewImage || proj.heroImage || '';
          const route = proj.route || `/work/${proj.slug}`;

          return `
            <a href="${route}" class="project-card" data-project-slug="${proj.slug}" data-project-id="${proj.id}">
              <div class="project-card-media">
                <img src="${previewImg}" alt="${title}" class="project-card-img" loading="eager" />
              </div>
              <div class="project-card-meta">
                <div class="project-card-info">
                  <div class="project-card-header">
                    <span class="project-card-num">${number}</span>
                    <span class="project-card-sep">/</span>
                    <span class="project-card-cat">${category}</span>
                  </div>
                  <h3 class="project-card-title">${title}</h3>
                  <p class="project-card-desc">${desc}</p>
                </div>
                <div class="project-card-arrow-wrap" aria-hidden="true">
                  <svg class="project-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          `;
        })
        .join('');
    }

    /* ---- Event Listeners ---- */
    bindEvents() {
      window.addEventListener('popstate', this.handlePopState);
      document.addEventListener('click', this.handleGlobalClick);

      // Back to Projects button in project top-bar
      const backBtn = document.getElementById('project-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigate('/', { scrollToProjects: true });
        });
      }

      // View 3D in Garage link in project top-bar
      const garageLink = document.getElementById('project-garage-link');
      if (garageLink) {
        garageLink.addEventListener('click', (e) => {
          e.preventDefault();
          const bay = ID_TO_BAY[this.currentProjectId] ?? 0;
          this.navigate('/#immersive-garage', { targetBay: bay });
        });
      }
    }

    /* ---- Intercept Clicks on Project Links & Navigation ---- */
    handleGlobalClick(e) {
      // Find closest anchor tag
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Handle dedicated project routes /work/*
      if (href.startsWith('/work/') || link.hasAttribute('data-project-slug')) {
        e.preventDefault();
        const route = href.startsWith('/work/') ? href : `/work/${link.getAttribute('data-project-slug')}`;
        this.navigate(route);
        return;
      }

      // Handle "Back to Projects" links elsewhere
      if (link.classList.contains('back-to-projects-link') || link.classList.contains('back-to-work-link')) {
        e.preventDefault();
        this.navigate('/', { scrollToProjects: true });
      }
    }

    /* ---- Handle PopState (Back / Forward Button) ---- */
    handlePopState() {
      this.resolveRoute(false);
    }

    /* ---- Navigate Programmatically ---- */
    navigate(url, options = {}) {
      if (window.location.pathname === url && !url.includes('#')) return;

      window.history.pushState(null, '', url);
      this.resolveRoute(true, options);
    }

    /* ---- Resolve Current URL & Route ---- */
    resolveRoute(push = false, options = {}) {
      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      const hash = window.location.hash;

      // Check if URL matches /work/:slug
      const workMatch = pathname.match(/^\/work\/([a-zA-Z0-9_-]+)/);

      if (workMatch) {
        const slug = workMatch[1];
        const projectId = SLUG_TO_ID[slug] || slug;
        this.showProjectView(slug, projectId, options);
      } else {
        this.showHomepageView(options);
      }
    }

    /* ---- Switch to Dedicated Project Page Route ---- */
    showProjectView(slug, projectId, options = {}) {
      this.currentSlug = slug;
      this.currentProjectId = projectId;

      if (!this.projectView || !this.homepageView) {
        this.homepageView = document.getElementById('homepage-view');
        this.projectView = document.getElementById('project-view');
        this.mountRoot = document.getElementById('project-case-study-root');
      }

      // Get project metadata from data store
      let project = null;
      if (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.getProjectBySlug) {
        project = PORTFOLIO_DATA.getProjectBySlug(slug) || PORTFOLIO_DATA.getProjectById(projectId);
      }

      // Update dedicated top bar
      const topBarKicker = document.getElementById('project-top-bar-kicker');
      const topBarTitle = document.getElementById('project-top-bar-title');
      const garageLink = document.getElementById('project-garage-link');

      if (topBarKicker) {
        topBarKicker.textContent = project ? `${project.number} / ${project.category}` : '02 / PROJECTS';
      }
      if (topBarTitle) {
        topBarTitle.textContent = project ? project.title : 'Project Details';
      }

      const bayIndex = ID_TO_BAY[projectId] ?? 0;
      if (garageLink) {
        garageLink.title = `Explore ${project ? project.title : 'prototype'} in 3D Garage`;
      }

      // Update Browser Title
      document.title = project ? `${project.title} — Aaryan Haldankar` : DEFAULT_TITLE;

      // Transition Views: Hide Homepage, Show Dedicated Project View
      this.homepageView.style.display = 'none';
      this.projectView.removeAttribute('hidden');
      this.projectView.style.display = 'block';

      // Hide site header on dedicated project page for distraction-free reading
      const siteHeader = document.getElementById('site-header');
      if (siteHeader) siteHeader.style.display = 'none';

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Animate entry (< 800ms)
      requestAnimationFrame(() => {
        this.projectView.classList.add('is-active');
      });

      // Mount Case Study
      this.mountCurrentProject();
    }

    mountCurrentProject() {
      if (!this.mountRoot || !this.currentProjectId) return;

      if (window.CaseStudy && typeof window.CaseStudy.mount === 'function') {
        window.CaseStudy.mount(this.mountRoot, this.currentProjectId);
      }
    }

    /* ---- Switch to Homepage View ---- */
    showHomepageView(options = {}) {
      this.currentSlug = null;
      this.currentProjectId = null;

      if (!this.projectView || !this.homepageView) {
        this.homepageView = document.getElementById('homepage-view');
        this.projectView = document.getElementById('project-view');
        this.mountRoot = document.getElementById('project-case-study-root');
      }

      document.title = DEFAULT_TITLE;

      // Unmount case study to preserve memory and clean up observers
      if (this.mountRoot && window.CaseStudy && typeof window.CaseStudy.unmount === 'function') {
        window.CaseStudy.unmount(this.mountRoot);
      }

      // Hide Project View, Show Homepage View
      if (this.projectView) {
        this.projectView.classList.remove('is-active');
        this.projectView.style.display = 'none';
        this.projectView.setAttribute('hidden', '');
      }

      if (this.homepageView) {
        this.homepageView.style.display = 'block';
      }

      // Restore site header
      const siteHeader = document.getElementById('site-header');
      if (siteHeader) siteHeader.style.display = '';

      // Handle specific destination options
      if (options.scrollToProjects || options.scrollToFeatured) {
        requestAnimationFrame(() => {
          const target = document.getElementById('projects') || document.getElementById('featured');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      } else if (options.targetBay !== undefined) {
        requestAnimationFrame(() => {
          const garage = document.getElementById('immersive-garage');
          if (garage) {
            garage.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          if (typeof window.walkToStudioBay === 'function') {
            setTimeout(() => {
              window.walkToStudioBay(options.targetBay);
            }, 500);
          }
        });
      } else if (window.location.hash) {
        requestAnimationFrame(() => {
          const target = document.querySelector(window.location.hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }
  }

  // Expose Router instance globally
  window.PortfolioRouter = PortfolioRouter;
  window.router = new PortfolioRouter();

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.router.init());
  } else {
    window.router.init();
  }
})();
