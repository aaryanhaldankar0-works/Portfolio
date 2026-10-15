/* ==========================================================================
   THE VIRTUAL GARAGE CONTROLLER (MINIMAL STUDIO)
   Manages vehicle selection, clean telemetry rendering, and thought process timeline
   ========================================================================== */

class VirtualGarage {
  constructor() {
    this.currentVehicleId = '01';
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderVehicle(this.currentVehicleId);
  }

  bindEvents() {
    const tabs = document.querySelectorAll('.garage-tab-item');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const vehicleId = tab.dataset.vehicle;
        if (vehicleId && vehicleId !== this.currentVehicleId) {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.switchVehicle(vehicleId);
        }
      });
    });
  }

  switchVehicle(vehicleId) {
    this.currentVehicleId = vehicleId;
    const imgEl = document.getElementById('garage-display-image');
    if (imgEl) {
      imgEl.style.opacity = '0.3';
      setTimeout(() => {
        this.renderVehicle(vehicleId);
        imgEl.style.opacity = '1';
      }, 150);
    } else {
      this.renderVehicle(vehicleId);
    }
  }

  renderVehicle(vehicleId) {
    const data = PORTFOLIO_DATA.garage[vehicleId];
    if (!data) return;

    // Update Image & Badge
    const imgEl = document.getElementById('garage-display-image');
    const badgeEl = document.getElementById('garage-img-badge');
    if (imgEl) {
      imgEl.src = data.heroImage;
      imgEl.alt = `${data.title} - ${data.tagline}`;
    }
    if (badgeEl) badgeEl.textContent = data.category;

    // Update Header Meta
    const nameEl = document.getElementById('vehicle-name');
    const taglineEl = document.getElementById('vehicle-tagline');
    const catEl = document.getElementById('vehicle-category-tag');

    if (nameEl) nameEl.textContent = data.title;
    if (taglineEl) taglineEl.textContent = data.tagline;
    if (catEl) catEl.textContent = data.category;

    // Update Specs Table
    const specsContainer = document.getElementById('specs-table');
    if (specsContainer && data.specs) {
      specsContainer.innerHTML = Object.entries(data.specs).map(([k, v], i) => `
        <div class="spec-row">
          <span class="spec-label">${k}</span>
          <span class="spec-value ${i === 0 ? 'highlight-spec' : ''}">${v}</span>
        </div>
      `).join('');
    }

    // Render Thought Process Step-by-Step Storytelling
    this.renderProcessSteps(data);
  }

  renderProcessSteps(data) {
    const container = document.getElementById('process-steps-list');
    if (!container) return;
    const steps = (data && (data.sections || data.thoughtProcess)) || null;
    if (!steps || !Array.isArray(steps)) {
      container.innerHTML = '';
      return;
    }

    let html = '';
    steps.forEach((step, idx) => {
      const stepNum = step.step || `0${idx + 1}`;
      const tagsHtml = step.pills
        ? step.pills.map(p => `<span class="step-tag-item">${p}</span>`).join('')
        : '';
      html += `
        <div class="process-step-item">
          <div class="step-number-col">${stepNum}</div>
          <div class="step-info-col">
            <span class="step-phase-badge">${step.phase || ''}</span>
            <h4>${step.title}</h4>
            <p>${step.desc}</p>
            ${tagsHtml ? `<div class="step-tags-wrap">${tagsHtml}</div>` : ''}
          </div>
          ${step.image ? `
            <div class="step-visual-col">
              <img src="${step.image}" alt="${step.title}" loading="lazy" />
            </div>
          ` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.garageApp = new VirtualGarage();
});
