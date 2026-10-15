import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * ModularApplications — presents the "One Platform, Multiple Applications" vision.
 * Showcases modular body visual placeholders over the standardized EV Skateboard:
 * Passenger, University, School, Quick Commerce, Logistics, Small Business.
 *
 * Props:
 *  title         deck title
 *  subtitle      contextual description
 *  applications  [{ id, label, title, tag, media, role, zoning, features }]
 */
export default function ModularApplications({
  title = 'ONE PLATFORM · MULTIPLE APPLICATIONS',
  subtitle = 'A singular standardized EV skateboard chassis decouples powertrain development from top-hat construction — enabling interchangeable vehicle modules tailored to civic and commercial life in Tier 2 and Tier 3 cities.',
  applications = [],
}) {
  const [activeId, setActiveId] = useState(applications[0]?.id || 'passenger');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'spotlight'

  const activeApp = applications.find((a) => a.id === activeId) || applications[0];

  return (
    <div className="cs-modapps">
      <div className="cs-modapps__top">
        <Reveal className="cs-modapps__header">
          <span className="cs-eyebrow">{title}</span>
          <p className="cs-modapps__lede">{subtitle}</p>
        </Reveal>

        <div className="cs-modapps__controls">
          <div className="cs-modapps__view-toggle" role="group" aria-label="Layout view mode">
            <button
              type="button"
              className={`cs-modapps__toggle-btn${viewMode === 'grid' ? ' is-active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              All Modules ({applications.length})
            </button>
            <button
              type="button"
              className={`cs-modapps__toggle-btn${viewMode === 'spotlight' ? ' is-active' : ''}`}
              onClick={() => setViewMode('spotlight')}
            >
              Module Spotlight
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'spotlight' && (
        <div className="cs-modapps__spotlight-wrap">
          <div className="cs-modapps__tabs" role="tablist" aria-label="Select vehicle application">
            {applications.map((app) => (
              <button
                key={app.id}
                role="tab"
                aria-selected={activeId === app.id}
                className={`cs-modapps__tab${activeId === app.id ? ' is-active' : ''}`}
                onClick={() => setActiveId(app.id)}
              >
                <span className="cs-modapps__tab-tag">{app.tag}</span>
                <span className="cs-modapps__tab-title">{app.title}</span>
              </button>
            ))}
          </div>

          {activeApp && (
            <Reveal key={activeApp.id} className="cs-modapps__spotlight-card">
              <div className="cs-modapps__spotlight-media">
                <Media media={activeApp.media} />
                <div className="cs-modapps__platform-badge">
                  <span className="cs-modapps__dot" />
                  <span>Standard EV Skateboard Baseline</span>
                </div>
              </div>

              <div className="cs-modapps__spotlight-content">
                <div className="cs-modapps__meta-row">
                  <span className="cs-modapps__app-tag">{activeApp.tag}</span>
                  <span className="cs-modapps__app-category">{activeApp.category || 'Modular Top-Hat'}</span>
                </div>
                <h4 className="cs-modapps__app-title">{activeApp.title}</h4>
                <p className="cs-modapps__app-role">{activeApp.role}</p>

                <div className="cs-modapps__spec-block">
                  <span className="cs-modapps__spec-label">Spatial Zoning & Interior Architecture</span>
                  <p className="cs-modapps__spec-text">{activeApp.zoning}</p>
                </div>

                {activeApp.features && (
                  <div className="cs-modapps__features">
                    <span className="cs-modapps__spec-label">Modular Adaptations</span>
                    <ul className="cs-modapps__feat-list">
                      {activeApp.features.map((f, i) => (
                        <li key={i} className="cs-modapps__feat-item">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          )}
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="cs-modapps__grid">
          {applications.map((app, i) => (
            <Reveal key={app.id || i} className="cs-modapps__grid-card" delay={(i % 3) * 80}>
              <div className="cs-modapps__grid-media">
                <Media media={app.media} />
                <div className="cs-modapps__grid-tag-bar">
                  <span className="cs-modapps__card-num">0{i + 1}</span>
                  <span className="cs-modapps__card-tag">{app.tag}</span>
                </div>
              </div>

              <div className="cs-modapps__grid-body">
                <h4 className="cs-modapps__grid-title">{app.title}</h4>
                <p className="cs-modapps__grid-role">{app.role}</p>
                <div className="cs-modapps__grid-zoning">
                  <span className="cs-modapps__zoning-label">Spatial Layout</span>
                  <p className="cs-modapps__zoning-text">{app.zoning}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
