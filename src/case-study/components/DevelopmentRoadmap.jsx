import Reveal from './Reveal.jsx';

/**
 * DevelopmentRoadmap — Phase 09: Future Scope
 *
 * Provides a structured, transparent development roadmap reflecting the
 * future-oriented scope of the project.
 *
 * Categorized into 4 distinct phases:
 *  - Concept Defined (Completed studio work)
 *  - Further Design Development (Active studio scope)
 *  - Engineering and Validation (Feasibility & engineering requirements)
 *  - System Pilot (Proposed operational roadmap)
 *
 * Transparently stated as a proposed roadmap, not completed testing.
 */

const ROADMAP_PHASES = [
  {
    phase: 'Phase 01',
    status: 'COMPLETED / ESTABLISHED',
    statusCode: 'done',
    title: 'Concept Defined',
    desc: 'Foundational transportation design inquiry establishing the core civic argument, field context, and architectural layout.',
    deliverables: [
      { name: 'Mobility Problem Identification', desc: 'Field research in Dehradun documenting collapse of modal share and 2.4 m narrow road bottlenecks.' },
      { name: 'User Research & Journey Friction', desc: 'Commuter inquiry identifying transfer delays and waiting anxiety over top-speed requirements.' },
      { name: 'Vehicle Architectural Concept', desc: 'Flat skateboard chassis datum delivering <320 mm step-in floor height and 6 forward-facing seats.' },
      { name: 'Platform & Packaging Definition', desc: '1,380 mm overall width constraint for Indian streetscapes and steel spaceframe topology.' },
    ],
  },
  {
    phase: 'Phase 02',
    status: 'ACTIVE STUDIO STUDY',
    statusCode: 'active',
    title: 'Further Design Development',
    desc: 'Ongoing industrial design and ergonomic development detailing physical touchpoints and user-facing systems.',
    deliverables: [
      { name: 'Additional Form Exploration', desc: 'Further refinement of front/rear aerodynamic chamfers, lower body cladding, and sensor pod housings.' },
      { name: 'Human Packaging & Manikins', desc: '2D/3D ergonomic package overlays verifying 5th %ile to 95th %ile SAE clearance across all seating tiers.' },
      { name: 'Detailed Production CAD', desc: 'Deepening exterior/interior NURBS data for injection molded thermoplastic panels and structural frame jigs.' },
      { name: 'Vehicle Access & Interior UX', desc: 'Tactile grab handle geometry, antimicrobial seat fabric CMF, and floor drainage channels for monsoon mud.' },
      { name: 'App & Totem Interaction Design', desc: 'High-contrast accessible digital interface wireframes for companion app and sidewalk totems.' },
    ],
  },
  {
    phase: 'Phase 03',
    status: 'ENGINEERING FEASIBILITY REQUIRED',
    statusCode: 'engineering',
    title: 'Engineering & Validation',
    desc: 'Critical mechanical and safety engineering milestones required before any physical prototype can operate.',
    deliverables: [
      { name: 'Vehicle Dynamics & Roll Stability', desc: 'Center of gravity calculation with underfloor battery pack; lateral acceleration stability on uneven camber.' },
      { name: 'Turning Radius & Maneuverability', desc: 'Multi-link front geometry achieving <4.6 m kerb-to-kerb turning radius in 90-degree market corners.' },
      { name: 'Structural & Rollover Assessment', desc: 'FEA torsional stiffness analysis on tubular A, B, and C pillar spaceframe under side impact.' },
      { name: 'Battery & Drivetrain Packaging', desc: 'IP67 thermal management, underbody stone-strike shielding, and dual front/rear hub motor integration.' },
      { name: 'Autonomous Sensor Integration', desc: 'Solid-state LiDAR and camera washing nozzles designed for heavy Indian monsoon mud and dust.' },
      { name: 'Safety & Emergency Protocols', desc: 'Dual-redundant brake-by-wire actuators and physical mechanical door release interlocks.' },
    ],
  },
  {
    phase: 'Phase 04',
    status: 'FUTURE PILOT SCOPE',
    statusCode: 'pilot',
    title: 'System Pilot & Deployment',
    desc: 'Proposed phased deployment framework transitioning from controlled environments to live urban corridors.',
    deliverables: [
      { name: 'Geofenced Campus Feasibility', desc: 'Initial validation on university or industrial campus corridors with managed traffic and dedicated charging.' },
      { name: 'Fleet Operations & Telemetry', desc: 'Closed-loop testing of unreserved tap-and-board turnstiles and AI demand forecasting accuracy.' },
      { name: 'Stakeholder & Union Integration', desc: 'Collaborative operating model training existing tracker/rickshaw drivers as fleet managers and technicians.' },
      { name: 'Passenger Trust & Accessibility', desc: 'Elderly, disabled, and child passenger boarding evaluations on non-curbed secondary roads.' },
      { name: 'Regulatory & Municipal Assessment', desc: 'Compliance with Indian CMVR autonomous testing frameworks and regional transport authority permits.' },
    ],
  },
];

export default function DevelopmentRoadmap() {
  return (
    <div className="cs-roadmap">
      <Reveal className="cs-roadmap__header">
        <div className="cs-roadmap__eyebrow-row">
          <span className="cs-eyebrow">Project Evolution · Strategic Horizon</span>
          <span className="cs-roadmap__badge">Transparent Project Scope</span>
        </div>
        <h3 className="cs-roadmap__title">DEVELOPMENT ROADMAP & FUTURE SCOPE</h3>
        <p className="cs-roadmap__subtitle">
          The jury emphasized that a forward-looking transportation project must clearly delineate what has been proven from what remains future engineering scope. Below is the proposed development pathway from concept definition to municipal pilot.
        </p>
      </Reveal>

      {/* Honest Disclaimer */}
      <Reveal className="cs-roadmap__disclaimer">
        <div className="cs-roadmap__disc-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <div className="cs-roadmap__disc-text">
          <strong>Proposed Roadmap Statement:</strong>
          <span>
            {' '}This roadmap represents the intended research, engineering, and testing trajectory for the Bharat Mobility Pod. Milestones in Phase 03 and Phase 04 are engineering requirements to be verified, not claims of current commercial deployment.
          </span>
        </div>
      </Reveal>

      {/* 4-Phase Grid / Timeline */}
      <div className="cs-roadmap__grid">
        {ROADMAP_PHASES.map((p, idx) => (
          <Reveal key={p.phase} delay={idx * 70} className={`cs-roadmap__card cs-roadmap__card--${p.statusCode}`}>
            <div className="cs-roadmap__card-top">
              <span className="cs-roadmap__phase-num">{p.phase}</span>
              <span className={`cs-roadmap__status-pill cs-roadmap__status-pill--${p.statusCode}`}>
                {p.status}
              </span>
            </div>

            <h4 className="cs-roadmap__card-title">{p.title}</h4>
            <p className="cs-roadmap__card-desc">{p.desc}</p>

            <div className="cs-roadmap__deliverables">
              <span className="cs-roadmap__deliv-header">KEY MILESTONES & WORK PACKAGES:</span>
              <ul className="cs-roadmap__deliv-list">
                {p.deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="cs-roadmap__deliv-item">
                    <strong className="cs-roadmap__item-name">{item.name}</strong>
                    <span className="cs-roadmap__item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
