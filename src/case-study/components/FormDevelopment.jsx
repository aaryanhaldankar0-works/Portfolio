import { useState } from 'react';
import Reveal from './Reveal.jsx';

/**
 * FormDevelopment — prominent chapter showcasing the authentic transportation design
 * form exploration process from early gestures to final exterior resolution.
 *
 * Distinguishes:
 *  - Hand Sketch
 *  - AI-Assisted Vizcom
 *  - CAD Development
 *  - Final Render
 */

export const FORM_STUDIES = [
  {
    id: 'form-01',
    phase: '01 / Silhouette & Gesture',
    category: 'Hand Sketch',
    badge: 'HAND SKETCH',
    badgeType: 'sketch',
    title: 'Canopy Arch & Ingress Gesture',
    desc: 'Testing an arched, open door volume to allow commuters carrying goods to board upright without hitting a traditional low roof rail.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-03-06 at 9.47.42 AM.jpeg',
    alt: 'Authentic pen sketch of canopy arch and ingress gesture',
    aspect: '4/3',
    focus: 'Ingress Volume',
    parameters: 'Datum: 1,700 mm Roof Apex · Standing Head Clearance',
  },
  {
    id: 'form-02',
    phase: '02 / Proportions & Stance',
    category: 'Hand Sketch',
    badge: 'HAND SKETCH',
    badgeType: 'sketch',
    title: 'Cabin Silhouette & Beltline Rhythm',
    desc: 'Side profile study defining the character shoulder line, wheel arch placement, and low beltline maximizing passenger outward visibility.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-03-06 at 9.56.21 AM.jpeg',
    alt: 'Authentic hand sketch exploring side profile and beltline proportions',
    aspect: '4/3',
    focus: 'Side Elevation',
    parameters: 'Wheelbase: 2,350 mm · Low Floor Stance',
  },
  {
    id: 'form-03',
    phase: '03 / Fascia & Identity',
    category: 'Hand Sketch',
    badge: 'HAND SKETCH',
    badgeType: 'sketch',
    title: 'Front Fascia & Lighting Graphic',
    desc: 'Exploring a non-aggressive, approachable civic identity. Continuous horizontal DRL band with recessed protective lower headlamps for rough road survival.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-09 at 4.39.46 PM.jpeg',
    alt: 'Hand sketch exploring front fascia and lighting graphics',
    aspect: '4/3',
    focus: 'Frontal Graphic',
    parameters: 'Calm Civic Stance · Recessed Optics',
  },
  {
    id: 'form-04',
    phase: '04 / Ingress Packaging',
    category: 'Hand Sketch',
    badge: 'HAND SKETCH',
    badgeType: 'sketch',
    title: 'Step-in Height & Door Aperture',
    desc: 'Analyzing curb height variations against an ultra-low flat skateboard platform, ensuring step-in height under 320 mm without roadside scraping.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-15 at 9.58.58 AM.jpeg',
    alt: 'Hand sketch studying entry threshold and door geometry',
    aspect: '4/3',
    focus: 'Threshold Packaging',
    parameters: 'Floor Step: <320 mm · Curb-to-Floor Transition',
  },
  {
    id: 'form-05',
    phase: '05 / Access Mechanism',
    category: 'Hand Sketch',
    badge: 'HAND SKETCH',
    badgeType: 'sketch',
    title: 'Bi-Parting Slider Door Kinematics',
    desc: '3/4 perspective study of external sliding door guide tracks integrated flush into the beltline, avoiding sidewalk intrusion in congested corridors.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-15 at 10.37.30 AM.jpeg',
    alt: 'Hand sketch studying door mechanics and quarter view',
    aspect: '4/3',
    focus: 'Door Kinematics',
    parameters: 'Zero-Swing Sliding Aperture · 1.3 m Clear Width',
  },
  {
    id: 'form-06',
    phase: '06 / Massing & Stance',
    category: 'Hand Sketch',
    badge: 'HAND SKETCH',
    badgeType: 'sketch',
    title: 'Volumetric Massing & Ground Clearance',
    desc: 'Multi-view ideation sheet evaluating departure angles, short front overhangs, and protective polymer lower cladding for monsoon rutting.',
    src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-06 at 4.12.39 PM.jpeg',
    alt: 'Multi-view concept sketch sheet of pod proportions and stance',
    aspect: '4/3',
    focus: 'Vehicle Packaging',
    parameters: 'Approach/Departure: >22° · High Breakover',
  },
  {
    id: 'form-07',
    phase: '07 / Surface Exploration',
    category: 'Digital Sketch',
    badge: 'DIGITAL SKETCH',
    badgeType: 'digital',
    title: 'Digital Volume & Highlight Roll',
    desc: 'Transitioning from ink to digital blockout. Testing pillar tumblehome curvature, roof chamfers, and lower rock guard volume in digital light.',
    src: 'assets/Project_1/Sketches/digi -1.png',
    alt: 'Digital sketch studying volumetric proportions and highlights',
    aspect: '4/3',
    focus: 'Surfacing Highlight',
    parameters: 'Tumblehome: 8° Inward Lean · Chamfered Corners',
  },
  {
    id: 'form-08',
    phase: '08 / Packaging Orthographics',
    category: 'Package Study',
    badge: 'ORTHOGRAPHIC STUDY',
    badgeType: 'ortho',
    title: 'Orthographic Envelope & Packaging Datum',
    desc: 'Six orthographic projection views establishing the 3,600 mm overall length, 1,380 mm width constraint, and forward-facing 6-passenger layout datum.',
    src: 'assets/Project_1/Photos/Ideations/6 orthographic drawing views and one isometric view to show a manufacturer .png',
    alt: 'Six orthographic package views and isometric study',
    aspect: '16/9',
    focus: 'Manufacturing Package',
    parameters: '3,600 mm L × 1,380 mm W × 1,700 mm H',
  },
  {
    id: 'form-09',
    phase: '09 / AI Diffusion Pass',
    category: 'Vizcom Exploration',
    badge: 'VIZCOM EXPLORATION',
    badgeType: 'ai',
    title: 'Diffusion Stance & CMF Exploration',
    desc: 'Rapid AI diffusion pass over hand linework exploring protective textured cladding and glass reflections. Used purely as a visual accelerator; packaging was locked by hand.',
    src: 'assets/Project_1/Photos/Ideations/an autonomous vehicle with no driver modern cmf and tata ace magic passenger stance look moving through rough terrain tier 2 and tier 3_6 seater with 2x2 seating position and 3 rows__3 no of less tra (1).png',
    alt: 'Vizcom AI diffusion study exploring CMF and lighting highlights',
    aspect: '16/9',
    focus: 'CMF & Light Reflection',
    parameters: 'Tooling: Vizcom Diffusion over 2D Pen Linework',
  },
  {
    id: 'form-10',
    phase: '10 / Structural CAD Resolution',
    category: 'CAD Development',
    badge: 'CAD ARCHITECTURE',
    badgeType: 'cad',
    title: 'Chassis Spaceframe & Platform Topology',
    desc: 'Translation into structural topology. Exploded engineering architecture illustrating tubular rollcage, underfloor battery pack enclosure, and front/rear drive subframes.',
    src: 'assets/Project_1/Renders/exploded view of this vehicle with flat bed ev structure with a,b,c pillars and seating position without steering like a autonomous vehicle showing battery section at the bottom with the motors at front  (1).png',
    alt: 'Exploded view of vehicle flat bed EV structure with spaceframe pillars and battery enclosure',
    aspect: '16/9',
    focus: 'Chassis & Packaging',
    parameters: 'Flat-bed EV Skateboard · Steel Spaceframe Rollcage',
  },
  {
    id: 'form-11',
    phase: '11 / Production CAD Surfacing',
    category: 'CAD Development',
    badge: 'CAD 3D DATASET',
    badgeType: 'cad',
    title: 'Detailed Sharp V2 Surface Geometry',
    desc: 'Full parametric NURBS dataset modeling production shutlines, glazing transitions, lighting housings, and flush door mechanisms. Active in 3D Garage.',
    src: 'assets/Project_1/Renders/Render_3.png',
    alt: 'Engineering blueprint and 3D CAD visualization of vehicle chassis and body',
    aspect: '16/9',
    focus: 'Production Hardpoints',
    parameters: 'NURBS CAD Dataset · Integrated into 3D Garage Bay 01',
  },
  {
    id: 'form-12',
    phase: '12 / Final Exterior Resolution',
    category: 'Final Visualization',
    badge: 'FINAL RENDER',
    badgeType: 'render',
    title: 'Civic Exterior Stance & Proportions',
    desc: 'Final exterior resolution showing 360° daylight opening, calm non-aggressive fascia, aerodynamic nose taper, and narrow 1,380 mm track width for Indian streets.',
    src: 'assets/Project_1/Renders/Render_1.png',
    alt: 'Final exterior render of Bharat Mobility Pod in 3/4 perspective',
    aspect: '16/9',
    focus: 'Design Resolution',
    parameters: 'KeyShot Studio Lighting · Physically Based CMF',
  },
];

const FILTER_TABS = [
  'All Studies',
  'Hand Sketches',
  'Package & Stance',
  'Vizcom AI',
  'CAD & Engineering',
  'Final Renders',
];

export default function FormDevelopment({
  title = 'FORM DEVELOPMENT & PROPORTION STUDIES',
  subtitle = 'Form development was driven by the strict packaging reality of narrow Indian streets: a 1,380 mm width constraint, an ultra-low floor (<320 mm), and high glass-to-body ratios for passenger security. Below is the authentic visual evidence tracing early gesture sketches to production-ready NURBS CAD.',
}) {
  const [activeTab, setActiveTab] = useState('All Studies');
  const [activeItem, setActiveItem] = useState(FORM_STUDIES[0]);

  const filtered = FORM_STUDIES.filter((item) => {
    if (activeTab === 'All Studies') return true;
    if (activeTab === 'Hand Sketches') return item.badgeType === 'sketch' || item.badgeType === 'digital';
    if (activeTab === 'Package & Stance') return item.badgeType === 'ortho' || item.category === 'Package Study';
    if (activeTab === 'Vizcom AI') return item.badgeType === 'ai';
    if (activeTab === 'CAD & Engineering') return item.badgeType === 'cad';
    if (activeTab === 'Final Renders') return item.badgeType === 'render';
    return true;
  });

  return (
    <div className="cs-formdev">
      <Reveal className="cs-formdev__header">
        <div className="cs-formdev__eyebrow-row">
          <span className="cs-eyebrow">Design Chapter 05 · Visual Form Evolution</span>
          <span className="cs-formdev__evidence-tag">Authentic Studio Artifacts</span>
        </div>
        <h3 className="cs-formdev__title">{title}</h3>
        <p className="cs-formdev__subtitle">{subtitle}</p>
      </Reveal>

      {/* Featured Deep-Dive Studio Stage (6/6 Composition) */}
      <Reveal className="cs-formdev__featured">
        <div className="cs-formdev__featured-visual">
          <div className="cs-formdev__media-wrap">
            <img
              src={activeItem.src}
              alt={activeItem.alt}
              className="cs-formdev__featured-img"
              loading="lazy"
            />
            <span className={`cs-formdev__badge cs-formdev__badge--${activeItem.badgeType}`}>
              {activeItem.badge}
            </span>
          </div>
        </div>

        <div className="cs-formdev__featured-info">
          <div className="cs-formdev__meta-strip">
            <span className="cs-formdev__phase-tag">{activeItem.phase}</span>
            <span className="cs-formdev__focus-tag">{activeItem.focus}</span>
          </div>

          <h4 className="cs-formdev__featured-title">{activeItem.title}</h4>
          <p className="cs-formdev__featured-desc">{activeItem.desc}</p>

          <div className="cs-formdev__spec-box">
            <span className="cs-formdev__spec-label">DIMENSIONAL & PACKAGING CONSTRAINT</span>
            <span className="cs-formdev__spec-value">{activeItem.parameters}</span>
          </div>

          <div className="cs-formdev__integrity-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              {activeItem.badgeType === 'sketch' && 'Authentic hand-drawn ideation sheet from studio sketchbook.'}
              {activeItem.badgeType === 'ai' && 'AI diffusion pass used exclusively for surface reflections. No structural claims made.'}
              {activeItem.badgeType === 'cad' && 'Parametric 3D NURBS assembly modeled to engineering packaging clearances.'}
              {activeItem.badgeType === 'render' && 'Physically based ray-traced CMF visualization.'}
              {activeItem.badgeType === 'ortho' && 'Engineering envelope verifying wheelbase, track and passenger envelope.'}
              {activeItem.badgeType === 'digital' && 'Direct digital pen surface and highlight study.'}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <div className="cs-formdev__filter-bar">
        <div className="cs-formdev__tabs" role="tablist" aria-label="Filter form studies">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`cs-formdev__tab ${activeTab === tab ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="cs-formdev__count">{filtered.length} Studies</span>
      </div>

      {/* Grid of Form Studies (Interactive selector) */}
      <div className="cs-formdev__grid">
        {filtered.map((item, idx) => (
          <Reveal
            key={item.id}
            delay={(idx % 3) * 60}
            className={`cs-formdev__card ${activeItem.id === item.id ? 'is-active' : ''}`}
            onClick={() => setActiveItem(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveItem(item);
              }
            }}
            aria-label={`View ${item.title}`}
          >
            <div className="cs-formdev__card-media">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className={`cs-formdev__card-badge cs-formdev__badge--${item.badgeType}`}>
                {item.badge}
              </span>
            </div>
            <div className="cs-formdev__card-body">
              <span className="cs-formdev__card-phase">{item.phase}</span>
              <h5 className="cs-formdev__card-title">{item.title}</h5>
              <p className="cs-formdev__card-sub">{item.focus}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Rabbit Hole Sketchbook Bridge */}
      <Reveal className="cs-formdev__footer-bridge">
        <div className="cs-formdev__bridge-text">
          <strong>Looking for the full process archive?</strong>
          <span>The complete ideation sheets, failed packaging configurations, and reserved drafting studies are preserved inside the Rabbit Hole Sketchbook.</span>
        </div>
        <a
          href="#bharat-mobility/workshop"
          className="cs-formdev__bridge-btn"
          onClick={(e) => {
            e.preventDefault();
            const btn = document.getElementById('bharat-mobility-workshop-entrance');
            if (btn) btn.click();
          }}
        >
          <span>Open Full Sketchbook (Workshop Zone 02)</span>
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </div>
  );
}
