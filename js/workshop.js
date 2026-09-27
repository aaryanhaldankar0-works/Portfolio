/* ==========================================================================
   THE WORKSHOP CONTROLLER - INDUSTRIAL DESIGN
   Handles 3-Stage switcher (Ideation, Rendering, Prototyping) & interactive views
   ========================================================================== */

class WorkshopManager {
  constructor() {
    this.projects = PORTFOLIO_DATA.workshop;
    this.init();
  }

  init() {
    this.renderWorkshopCards();
    this.bindEvents();
  }

  renderWorkshopCards() {
    const grid = document.getElementById('workshop-grid-container');
    if (!grid) return;

    let html = '';
    this.projects.forEach(project => {
      const initialStage = project.stages.rendering; // Default to rendering/CAD view
      
      html += `
        <div class="workshop-card" id="card-${project.id}" data-project-id="${project.id}">
          <div class="workshop-card-header">
            <div class="workshop-title-area">
              <span class="workshop-category-tag">${project.category}</span>
              <h3>${project.title}</h3>
            </div>
            <div class="stage-switcher-tabs" data-project-id="${project.id}">
              <button class="stage-tab-btn" data-stage="ideation">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path></svg>
                Ideation
              </button>
              <button class="stage-tab-btn active" data-stage="rendering">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                Rendering & CAD
              </button>
              <button class="stage-tab-btn" data-stage="prototyping">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                Prototyping
              </button>
            </div>
          </div>

          <div class="workshop-card-body" id="body-${project.id}">
            ${this.buildStageContent(project, 'rendering')}
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  buildStageContent(project, stageKey) {
    const stage = project.stages[stageKey];
    if (!stage) return '';

    let specRows = '';
    for (const [k, v] of Object.entries(stage.specs)) {
      specRows += `
        <div class="stage-spec-row">
          <span class="stage-spec-key">${k}</span>
          <span class="stage-spec-value">${v}</span>
        </div>
      `;
    }

    return `
      <div class="stage-visual-container">
        <img class="stage-visual-img" src="${stage.image}" alt="${stage.title}" />
        <div class="stage-badge-indicator">
          <span>●</span> ${stage.phase}
        </div>
      </div>
      <div class="stage-details-panel">
        <div>
          <span class="stage-phase-name">${stage.phase}</span>
          <h4>${stage.title}</h4>
          <p class="stage-description">${stage.description}</p>
          <div class="stage-specs-box">
            <div class="stage-specs-title">Technical Validation & Specs</div>
            <div class="stage-specs-items">
              ${specRows}
            </div>
          </div>
        </div>
        <div class="stage-actions">
          <button class="btn-stage-explore" onclick="window.portfolioApp.openModal('${project.id}', '${stageKey}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            Inspect Detailed Case Study
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const grid = document.getElementById('workshop-grid-container');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const tab = e.target.closest('.stage-tab-btn');
      if (!tab) return;

      const tabsContainer = tab.closest('.stage-switcher-tabs');
      const projectId = tabsContainer.dataset.projectId;
      const stageKey = tab.dataset.stage;

      const project = this.projects.find(p => p.id === projectId);
      if (!project) return;

      // Update Active Tab
      tabsContainer.querySelectorAll('.stage-tab-btn').forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      // Update Body with smooth transition
      const bodyEl = document.getElementById(`body-${projectId}`);
      if (bodyEl) {
        bodyEl.style.opacity = '0.4';
        setTimeout(() => {
          bodyEl.innerHTML = this.buildStageContent(project, stageKey);
          bodyEl.style.opacity = '1';
        }, 150);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.workshopApp = new WorkshopManager();
});
