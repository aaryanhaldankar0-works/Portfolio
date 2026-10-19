import Reveal from './Reveal.jsx';

/**
 * AIWorkflow — Phase 05: AI-Assisted Design Workflow
 *
 * Sequence:
 *   HAND SKETCH
 *   → VIZCOM EXPLORATION
 *   → DESIGN EVALUATION
 *   → FORM REFINEMENT
 *   → CAD DEVELOPMENT
 *   → FINAL VISUALIZATION
 *
 * Clearly distinguishes what AI did (accelerated surface/CMF exploration in seconds)
 * from what human engineering did (structural topology, human packaging, CAD NURBS).
 * Supported strictly by existing project assets.
 */

const WORKFLOW_STAGES = [
  {
    num: '01',
    title: 'HAND SKETCH',
    actor: 'Human Intent',
    badge: 'Manual',
    badgeType: 'manual',
    desc: 'Rapid freehand linework on bond paper defining proportions, low step-in threshold (<320 mm), and canopy arch gestures.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-06 at 4.12.39 PM.jpeg',
    alt: 'Authentic hand sketch ideation sheet',
    roleTag: 'Origin of Form',
  },
  {
    num: '02',
    title: 'VIZCOM EXPLORATION',
    actor: 'AI Acceleration',
    badge: 'Diffusion',
    badgeType: 'ai',
    desc: 'Image-to-image diffusion passes over hand linework to test surface highlight roll, specular reflections, and CMF palettes in minutes.',
    src: 'assets/Project_1/Photos/Ideations/an autonomous vehicle with no driver modern cmf and tata ace magic passenger stance look moving through rough terrain tier 2 and tier 3_6 seater with 2x2 seating position and 3 rows__3 no of less tra (1).png',
    alt: 'Vizcom AI diffusion study testing surface reflections and CMF',
    roleTag: 'Visual Velocity',
    honestNote: 'Accelerated highlight feedback. Did not calculate kinematics or structural load.',
  },
  {
    num: '03',
    title: 'DESIGN EVALUATION',
    actor: 'Human Filter',
    badge: 'Critical',
    badgeType: 'critical',
    desc: 'Rigorously filtering out generative distortions, unrealistic pillar thicknesses, and mechanically impossible door shutlines.',
    roleTag: 'Engineering Filter',
    src: 'assets/Project_1/Photos/Ideations/this is a autonomous transit vehicle with capabilities for docking moped, e-bikes, electric cycles roll in roll out style for last mile mobility mostly made for tier 2 and tier 3 cities with congestion p.png',
    alt: 'Design evaluation of packaging concepts',
  },
  {
    num: '04',
    title: 'FORM REFINEMENT',
    actor: 'Human Precision',
    badge: 'Surfacing',
    badgeType: 'digital',
    desc: 'Translating selected 2D directions into controlled digital blockout sketches, defining precise tumblehome, beltline, and wheel arch stances.',
    src: 'assets/Project_1/Sketches/digi -1.png',
    alt: 'Digital sketch studying volumetric proportions and highlights',
    roleTag: 'Volume Locking',
  },
  {
    num: '05',
    title: 'CAD DEVELOPMENT',
    actor: 'Parametric Rigor',
    badge: '3D NURBS',
    badgeType: 'cad',
    desc: 'Modeling production-feasible 3D NURBS geometry: steel tubular rollcage, underfloor battery pack enclosure, and flush door slider tracks.',
    src: 'assets/Project_1/Renders/exploded view of this vehicle with flat bed ev structure with a,b,c pillars and seating position without steering like a autonomous vehicle showing battery section at the bottom with the motors at front  (1).png',
    alt: 'Exploded CAD architecture showing spaceframe and battery pack',
    roleTag: 'Parametric Hardpoints',
  },
  {
    num: '06',
    title: 'FINAL VISUALIZATION',
    actor: 'Studio Tooling',
    badge: 'Final Render',
    badgeType: 'render',
    desc: 'Physically based ray-tracing with studio lighting environments, authentic polymer shaders, and contextual street rendering.',
    src: 'assets/Project_1/Renders/Render_1.png',
    alt: 'Final vehicle exterior render in 3/4 perspective',
    roleTag: 'CMF Resolution',
  },
];

export default function AIWorkflow({
  title = 'AI-ASSISTED DESIGN WORKFLOW',
  subtitle = 'In this project, AI was neither an automated substitute for design nor an avoided novelty. It was treated as a rapid ideation amplifier that accelerated visual exploration in minutes, while every packaging constraint, ergonomic threshold, and chassis decision remained strictly human.',
}) {
  return (
    <div className="cs-aiworkflow">
      <Reveal className="cs-aiworkflow__header">
        <div className="cs-aiworkflow__eyebrow-row">
          <span className="cs-eyebrow">Design Process & Methodology</span>
          <span className="cs-aiworkflow__tag">Visual Velocity + Human Rigor</span>
        </div>
        <h3 className="cs-aiworkflow__title">{title}</h3>
        <p className="cs-aiworkflow__subtitle">{subtitle}</p>
      </Reveal>

      {/* Manifest Callout Banner */}
      <Reveal className="cs-aiworkflow__manifest">
        <span className="cs-aiworkflow__manifest-tag">INTEGRITY PRINCIPLE</span>
        <blockquote className="cs-aiworkflow__manifest-quote">
          “AI accelerated visual exploration. Human design decisions and engineering constraints remained central.”
        </blockquote>
      </Reveal>

      {/* 6-Stage Visual Sequence Grid */}
      <div className="cs-aiworkflow__stages-grid">
        {WORKFLOW_STAGES.map((s, idx) => (
          <Reveal key={s.num} delay={idx * 60} className="cs-aiworkflow__stage-card">
            <div className="cs-aiworkflow__card-top">
              <span className="cs-aiworkflow__stage-num">{s.num}</span>
              <span className={`cs-aiworkflow__badge cs-aiworkflow__badge--${s.badgeType}`}>
                {s.badge}
              </span>
            </div>

            {s.src && (
              <div className="cs-aiworkflow__media">
                <img src={s.src} alt={s.alt} loading="lazy" />
              </div>
            )}

            <div className="cs-aiworkflow__card-body">
              <span className="cs-aiworkflow__role-tag">{s.roleTag} · {s.actor}</span>
              <h4 className="cs-aiworkflow__stage-title">{s.title}</h4>
              <p className="cs-aiworkflow__stage-desc">{s.desc}</p>

              {s.honestNote && (
                <div className="cs-aiworkflow__honest-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>{s.honestNote}</span>
                </div>
              )}
            </div>

            {idx < WORKFLOW_STAGES.length - 1 && (
              <div className="cs-aiworkflow__arrow-step" aria-hidden="true">
                <span>→</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* Workshop Link */}
      <Reveal className="cs-aiworkflow__workshop-link">
        <span>Deep-dive comparisons between AI diffusion passes and final CAD engineering are archived inside:</span>
        <a
          href="#bharat-mobility/workshop"
          className="cs-aiworkflow__workshop-btn"
          onClick={(e) => {
            e.preventDefault();
            const btn = document.getElementById('bharat-mobility-workshop-entrance');
            if (btn) btn.click();
          }}
        >
          <span>Open AI Workflow Studio (Workshop Zone 04)</span>
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </div>
  );
}
