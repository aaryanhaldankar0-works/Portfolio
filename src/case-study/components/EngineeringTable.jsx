import { useState } from 'react';
import Reveal from './Reveal.jsx';

/**
 * EngineeringTable — Workshop Zone 03: Mechanical Engineering Bench.
 *
 * Designed as a mechanical engineer's workbench with technical blueprint grid,
 * trade-off evaluation matrices, exploded vehicle structure inspection,
 * packaging dimensions, and future CAD/FEA simulation modules.
 */
export default function EngineeringTable({
  intro,
  tabs = [],
  chassisComparison = [],
  explodedArchitecture = {},
  packagingBounds = [],
  simulationLab = {},
}) {
  const [activeTab, setActiveTab] = useState('chassis');
  const [selectedSubsystem, setSelectedSubsystem] = useState(0);

  return (
    <div className="et">
      {intro && <p className="et-intro fn-hand">{intro}</p>}

      {/* Engineering Bench Mode Selector */}
      <div className="et-toolbar">
        <div className="et-toolbar__meta">
          <span className="ws-tape">Engineering Bench</span>
          <span className="et-toolbar__sub">Mechanical Systems & Architecture</span>
        </div>

        <div className="et-tabs" role="tablist" aria-label="Engineering exploration stations">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`et-tab${activeTab === tab.id ? ' is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. CHASSIS COMPARISON */}
      {activeTab === 'chassis' && (
        <div className="et-panel et-panel--chassis">
          <div className="et-panel__header">
            <h3 className="et-panel__title">Chassis Structural Topologies</h3>
            <p className="et-panel__desc">
              Comparative trade-off evaluation across three structural topologies: Monocoque, Ladder Frame, and Decoupled EV Skateboard.
            </p>
          </div>

          <div className="et-chassis-grid">
            {chassisComparison.map((item, idx) => (
              <Reveal
                key={item.id}
                className={`et-chassis-card ${item.isSelected ? 'et-chassis-card--selected' : ''}`}
                delay={idx * 80}
              >
                <div className="et-chassis-card__header">
                  <div className="et-chassis-card__meta">
                    <span className="et-chassis-card__num">0{idx + 1}</span>
                    <span
                      className={`et-chassis-card__badge ${
                        item.isSelected ? 'et-chassis-card__badge--selected' : 'et-chassis-card__badge--evaluated'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="et-chassis-card__name">{item.name}</h4>
                  <span className="et-chassis-card__tagline">{item.tagline}</span>
                </div>

                <p className="et-chassis-card__summary">{item.summary}</p>

                <div className="et-chassis-card__sections">
                  <div className="et-chassis-card__section">
                    <strong className="et-chassis-card__section-label">Why It Was Explored</strong>
                    <p>{item.whyExplored}</p>
                  </div>

                  <div className="et-chassis-card__section">
                    <strong className="et-chassis-card__section-label">Engineering Limitations</strong>
                    <p>{item.limitations}</p>
                  </div>
                </div>

                {item.metrics && item.metrics.length > 0 && (
                  <div className="et-chassis-card__metrics">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="et-chassis-card__metric-row">
                        <span className="et-chassis-card__metric-label">{m.label}</span>
                        <span className={`et-chassis-card__metric-val is-${m.status}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="et-chassis-card__verdict">
                  <strong className="et-chassis-card__verdict-title">Engineering Verdict:</strong>
                  <p>{item.verdict}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* 2. EXPLODED ARCHITECTURE & STRUCTURE */}
      {activeTab === 'exploded' && (
        <div className="et-panel et-panel--exploded">
          <div className="et-panel__header">
            <h3 className="et-panel__title">{explodedArchitecture.title || 'Exploded Architecture'}</h3>
            <p className="et-panel__desc">{explodedArchitecture.subtitle}</p>
          </div>

          <div className="et-exploded-layout">
            <div className="et-exploded-visual">
              <div className="et-exploded-frame">
                <img
                  src={explodedArchitecture.image}
                  alt={explodedArchitecture.alt}
                  className="et-exploded-image"
                />
                <div className="et-exploded-blueprint-overlay" aria-hidden="true" />
              </div>
            </div>

            <div className="et-subsystems-list">
              <span className="ws-tape">Subsystem Teardown</span>
              {explodedArchitecture.subsystems?.map((sub, sIdx) => (
                <div
                  key={sub.num}
                  className={`et-subsystem-item ${selectedSubsystem === sIdx ? 'is-selected' : ''}`}
                  onClick={() => setSelectedSubsystem(sIdx)}
                >
                  <div className="et-subsystem-item__num">{sub.num}</div>
                  <div className="et-subsystem-item__content">
                    <div className="et-subsystem-item__head">
                      <h4 className="et-subsystem-item__title">{sub.name}</h4>
                      <span className="et-subsystem-item__cat">{sub.category}</span>
                    </div>
                    <p className="et-subsystem-item__desc">{sub.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PACKAGING & DIMENSIONS */}
      {activeTab === 'packaging' && (
        <div className="et-panel et-panel--packaging">
          <div className="et-panel__header">
            <h3 className="et-panel__title">Packaging & Ergonomic Boundary Conditions</h3>
            <p className="et-panel__desc">
              Rigorous boundary constraints derived from Tier 2 & 3 city street corridors and commuter ergonomics.
            </p>
          </div>

          <div className="et-bounds-grid">
            {packagingBounds.map((bound, bIdx) => (
              <Reveal key={bIdx} className="et-bound-card" delay={bIdx * 70}>
                <div className="et-bound-card__top">
                  <span className="et-bound-card__domain">{bound.domain}</span>
                  <span className="et-bound-card__metric">{bound.metric}</span>
                </div>
                <h4 className="et-bound-card__title">{bound.title}</h4>
                <p className="et-bound-card__text">{bound.exploration}</p>
              </Reveal>
            ))}
          </div>

          <div className="et-packaging-summary">
            <span className="ws-tape">Packaging Resolution</span>
            <p>
              The 3,600 mm × 1,380 mm envelope satisfies both narrow-street turning physics and legal secondary-corridor clearance, while the flat-bed skateboard achieves universal walk-through boarding with zero floor tunnels.
            </p>
          </div>
        </div>
      )}

      {/* 4. CAD & FEA SIMULATION LAB */}
      {activeTab === 'simulation' && (
        <div className="et-panel et-panel--simulation">
          <div className="et-panel__header">
            <h3 className="et-panel__title">Mechanical Engineering Bench: CAD & Simulation Lab</h3>
            <p className="et-panel__desc">
              Bridging conceptual design into production engineering. Interactive 3D NURBS dataset alongside designated structural simulation stations.
            </p>
          </div>

          <div className="et-sim-grid">
            {simulationLab.stations?.map((st, idx) => (
              <Reveal key={st.id} className="et-sim-card" delay={idx * 80}>
                <div className="et-sim-card__header">
                  <div className="et-sim-card__badges">
                    <span className="et-sim-badge et-sim-badge--tag">{st.badge}</span>
                    <span className="et-sim-badge et-sim-badge--status">{st.status}</span>
                  </div>
                  <h4 className="et-sim-card__title">{st.title}</h4>
                  <span className="et-sim-card__medium">{st.medium}</span>
                </div>

                <p className="et-sim-card__desc">{st.desc}</p>

                {st.href && (
                  <div className="et-sim-card__action">
                    <a href={st.href} className="et-sim-btn">
                      <span>{st.action}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          <div className="et-sim-future-box">
            <span className="ws-tape">Future Engineering Dataset</span>
            <p>
              This engineering table is architected to receive high-fidelity meshed FEA contour plots, suspension kinematic curve overlays, and exploded assembly CAD drawings as the mechanical validation package expands.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
