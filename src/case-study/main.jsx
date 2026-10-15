import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CaseStudy from './CaseStudy.jsx';
import { getCaseStudyConfig } from './projects/index.js';
import './styles/case-study.css';
import './styles/workshop.css';

/**
 * Bridge between the existing vanilla site and the React case study.
 *
 *   window.CaseStudy.has(id)        → does this project have a native case study?
 *   window.CaseStudy.mount(el, id)  → render the case study into `el`
 *   window.CaseStudy.unmount(el)    → tear it down (called before the host clears its HTML)
 *
 * Hosts may also render `<div data-case-study="id"></div>` before this module
 * has loaded; pending hosts are mounted automatically on load.
 */
const roots = new Map();

function getPortfolioData() {
  // PORTFOLIO_DATA is a global `const` declared by the classic script js/data.js
  // eslint-disable-next-line no-undef
  return typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : null;
}

function findProject(id) {
  const data = getPortfolioData();
  if (!data || !id) return null;
  return (
    (data.projects && (data.projects.find((p) => p.id === id || p.slug === id))) ||
    (data.garage && data.garage[id]) ||
    (data.workshop || []).find((p) => p.id === id) ||
    null
  );
}

function navigateToProject(id) {
  const slugMap = {
    'bharat-mobility': 'bharat-mobility-pod',
    'ebs-tech': 'ebs-guardian',
  };
  const slug = slugMap[id] || id;
  if (window.router && typeof window.router.navigate === 'function') {
    window.router.navigate(`/work/${slug}`);
  } else {
    window.location.href = `/work/${slug}`;
  }
}

function unmount(el) {
  const root = roots.get(el);
  if (root) {
    root.unmount();
    roots.delete(el);
    delete el.dataset.mounted;
  }
}

function mount(el, id) {
  const config = getCaseStudyConfig(id);
  if (!el || !config) return false;

  unmount(el);
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <CaseStudy
        config={config}
        project={findProject(id) || { title: id }}
        nextProject={config.next ? findProject(config.next) : null}
        onNavigateProject={navigateToProject}
      />
    </StrictMode>
  );
  roots.set(el, root);
  el.dataset.mounted = 'true';
  return true;
}

function has(id) {
  return Boolean(getCaseStudyConfig(id));
}

window.CaseStudy = { mount, unmount, has };

// Mount any hosts that were rendered before this module finished loading
document.querySelectorAll('[data-case-study]:not([data-mounted])').forEach((el) => {
  mount(el, el.dataset.caseStudy);
});

window.dispatchEvent(new CustomEvent('casestudy:ready'));
