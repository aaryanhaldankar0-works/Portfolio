/* ==========================================================================
   MAIN APPLICATION CONTROLLER - AARYAN HALDANKAR PORTFOLIO
   Theme toggle, Navigation active tracking, Case Study Modal, and Micro-interactions
   ========================================================================== */

class PortfolioApp {
  constructor() {
    this.theme = localStorage.getItem('aaryan_theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.bindNavigation();
    this.bindModal();
    this.bindThemeToggle();
    this.bindContactForm();
  }

  /* Theme Management */
  bindThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.theme);
      localStorage.setItem('aaryan_theme', this.theme);
    });
  }

  applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      const icon = document.getElementById('theme-icon');
      if (icon) {
        // Show moon icon for switching back to dark
        icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      }
    } else {
      document.body.classList.remove('light-theme');
      const icon = document.getElementById('theme-icon');
      if (icon) {
        // Show sun icon for switching to light
        icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
      }
    }
  }

  /* Navigation & Scroll Spy */
  bindNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Intersection Observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  /* Case Study Deep-Dive Modal */
  bindModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', () => this.closeModal());
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  openModal(projectId, stageKey = null) {
    const overlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-dynamic-body');
    if (!overlay || !modalBody) return;

    let project = PORTFOLIO_DATA.workshop.find(p => p.id === projectId);
    let isGarage = false;

    if (!project) {
      project = PORTFOLIO_DATA.garage[projectId];
      isGarage = true;
    }

    if (!project) return;

    if (isGarage) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); text-transform: uppercase;">Mobility Design Deep Dive</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; margin: 0.4rem 0;">${project.title}</h2>
          <p style="color: var(--text-secondary);">${project.tagline}</p>
        </div>
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem;">
          <img src="${project.heroImage}" alt="${project.title}" style="width: 100%; height: auto; object-fit: cover;" />
        </div>
        <h3 style="font-family: var(--font-display); margin-bottom: 0.8rem;">Engineering & Aero Specification Telemetry</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          ${Object.entries(project.specs).map(([k, v]) => `
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: capitalize;">${k}</div>
              <div style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan); margin-top: 0.25rem;">${v}</div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      const stage = project.stages[stageKey || 'rendering'];
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-amber); text-transform: uppercase;">${stage.phase}</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; margin: 0.4rem 0;">${project.title}</h2>
          <p style="color: var(--text-secondary);">${stage.title}</p>
        </div>
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem;">
          <img src="${stage.image}" alt="${stage.title}" style="width: 100%; height: auto; object-fit: cover;" />
        </div>
        <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--glass-border);">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 0.5rem;">Process Narrative</h4>
          <p style="color: var(--text-secondary); line-height: 1.7;">${stage.description}</p>
        </div>
        <h4 style="font-family: var(--font-display); margin-bottom: 0.8rem;">Technical Parameters</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem;">
          ${Object.entries(stage.specs).map(([k, v]) => `
            <div style="background: var(--bg-tertiary); padding: 0.8rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
              <div style="font-size: 0.75rem; color: var(--text-muted);">${k}</div>
              <div style="font-family: var(--font-mono); font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">${v}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* Contact Form handler */
  bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
        Message Sent Successfully!
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      submitBtn.style.color = '#ffffff';

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3500);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
