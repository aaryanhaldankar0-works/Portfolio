/**
 * BHARAT MOBILITY POD — The Exhibition
 * ---------------------------------------------------------------------------
 * A recruiter-length walkthrough (< 3 minutes). Every room follows one rhythm:
 *
 *   One statement → One paragraph → One image → continue.
 *
 * Rooms:
 *   Hero → The Question → Field Discovery → Key Insight → The Solution →
 *   Engineering Direction → System Vision → Final Vehicle → Deployment →
 *   [Workshop threshold — `workshop` config] → Next Project (via `next`).
 *
 * The full, detailed research story (journey maps, failed concepts, sketch
 * archive, AI workflow, chassis evaluation, fleet AI, ticketing, unions,
 * interior, details) is preserved in `bharat-mobility.workshop.js` and will
 * become the Workshop.
 */

import fieldNotebook from './bharat-mobility/field-notebook.js';
import sketchbookData from './bharat-mobility/sketchbook.js';
import engineeringTableData from './bharat-mobility/engineering-table.js';
import workflowData from './bharat-mobility/workflow.js';
import prototypeData from './bharat-mobility/prototype.js';

const img = (label, ratio = '16/9', extra = {}) => ({ kind: 'image', label, ratio, ...extra });
const render = (label, ratio = '21/9', extra = {}) => ({ kind: 'render', label, ratio, ...extra });

/** One exhibition room: statement → paragraph → optional image or visual block. */
const room = ({ id, index, label, title, statement, emphasis, note, body, media, block }) => {
  const blocks = [
    { type: 'statement', props: { text: statement, emphasis, note, align: 'left' } },
    { type: 'editorial', props: { body: [body], align: 'offset', showHeadingSlot: false, slotLines: 0 } },
  ];
  if (block) {
    blocks.push(block);
  } else if (media) {
    blocks.push({ type: 'fullWidthImage', props: { media, bleed: true } });
  }
  return { id, index, label, title, blocks };
};

const bharatMobility = {
  id: 'bharat-mobility',
  next: 'ebs-tech', // Emergency Communication Systems (EBS Tech)

  hero: {
    index: '01',
    category: 'Transportation Design · Public Mobility Ecosystem',
    title: 'BHARAT MOBILITY POD',
    subtitle: 'Designing a scalable public mobility ecosystem for Tier 2 & Tier 3 India.',
    media: render('BHARAT MOBILITY POD · HERO RENDER', '21/9', {
      src: 'assets/Project_1/Renders/render_2.png',
      alt: 'Bharat Mobility Pod Hero Render · Exterior aerodynamic and architectural view',
    }),
    showSpecs: true,
    actions: [
      { label: 'Explore in Virtual Garage (3D)', href: '#immersive-garage' },
    ],
  },

  sections: [
    room({
      id: 'cs-the-question',
      index: '01',
      label: 'The Question',
      title: 'THE\nQUESTION.',
      statement: 'Before designing a vehicle, understand the city.',
      emphasis: 'understand the city.',
      note: 'FIRST SEMESTER · DESIGN DIRECTION',
      body:
        'My mentor’s advice reframed the brief. Instead of sketching a vehicle, I stepped out of the room to see how Tier 2 and Tier 3 cities actually move.',
      media: {
        kind: 'image',
        label: 'FIELD PHOTOGRAPHY · THE LIVING CITY',
        ratio: '21/9',
        src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM.jpeg',
        alt: 'Field photography of Tier 2 & 3 living city streets and terrain',
      },
    }),

    room({
      id: 'cs-field-discovery',
      index: '02',
      label: 'Field Discovery',
      title: 'FIELD\nDISCOVERY.',
      statement: 'Where buses cannot go, the city improvises.',
      emphasis: 'the city improvises.',
      note: 'OBSERVATION · NARROW-ROAD REALITY',
      body:
        'Narrow lanes, market streets and village roads shut out conventional buses. Trackers, Vikrams and scooters carry the city instead — and commuters told me a 5 km trip often meant two transfers and long waits.',
      block: {
        type: 'collage',
        props: {
          caption: 'FIELD PHOTOGRAPHY · NARROW ROAD & TERRAIN REALITY',
          bleed: true,
          images: [
            {
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (2).jpeg',
              alt: 'Narrow street passage and unpaved terrain in Tier 2 living city',
              caption: 'Narrow Ingress · 2.4m Width Constraint',
              span: 'hero',
            },
            {
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM (2).jpeg',
              alt: 'Narrow alleyway infrastructure bottleneck',
              caption: 'Alleyway Bottleneck · Infrastructure Friction',
              span: 'tall',
            },
            {
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM (3).jpeg',
              alt: 'Potholes, dust and rugged terrain transitions',
              caption: 'Pavement Transitions & Rutted Roads',
              span: 'standard',
            },
            {
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM (4).jpeg',
              alt: 'Informal passenger pickup point without high platforms',
              caption: 'Curbless Boarding Dynamics',
              span: 'standard',
            },
            {
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM.jpeg',
              alt: 'Market lane traffic density during peak midday transit',
              caption: 'Midday Congestion & Turning Radius Bottlenecks',
              span: 'wide',
            },
            {
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (1).jpeg',
              alt: 'Shared transit waiting area',
              caption: 'Shared Transit Gathering Node',
              span: 'standard',
            },
          ],
        },
      },
    }),

    room({
      id: 'cs-key-insight',
      index: '03',
      label: 'Key Insight',
      title: 'KEY\nINSIGHT.',
      statement: 'The vehicle wasn’t the problem. The journey was.',
      emphasis: 'The journey was.',
      note: 'STRUCTURAL INSIGHT · FROM PRODUCT TO SYSTEM',
      body:
        'Friction lived in the transfers, not the ride: 10–15 minutes of waiting at every junction while drivers held out for a full vehicle. Solving the journey mattered more than styling the box.',
      block: {
        type: 'journeyMotion',
      },
    }),

    room({
      id: 'cs-the-solution',
      index: '04',
      label: 'The Solution',
      title: 'THE\nSOLUTION.',
      statement: 'Start from what people already trust.',
      emphasis: 'already trust.',
      note: 'HUMAN-CENTERED FOUNDATION',
      body:
        'After rejecting an over-engineered first concept, I returned to the Tracker — narrow, easy to board and trusted for decades — and kept its strengths while removing its fumes, noise and steep steps.',
      block: {
        type: 'collage',
        props: {
          caption: 'FIELD INSPIRATION · THE TRACKER AS BASELINE & IDEATION ARCHIVE',
          images: [
            {
              src: 'assets/Project_1/Photos/Ideations/tata-magic-colour-white.png',
              alt: 'Tata Magic / Tracker baseline vehicle reference',
              caption: 'Tata Magic Baseline · Familiar Tier 2/3 civic presence, compact footprint & step-in ergonomics',
              span: 'hero',
              fit: 'contain',
              bg: '#ffffff',
            },
            {
              src: 'assets/Project_1/Photos/Ideations/an autonomous vehicle with no driver modern cmf and tata ace magic passenger stance look moving through rough terrain tier 2 and tier 3_6 seater with 2x2 seating position and 3 rows__3 no of less tra (1).png',
              alt: 'Ideation Study · Tata Ace stance adapted to autonomous passenger format',
              caption: 'Autonomous Stance · Magic proportions adapted to electric flatbed',
              span: 'tall',
            },
            {
              src: 'assets/Project_1/Photos/Ideations/this is a autonomous transit vehicle with capabilities for docking moped, e-bikes, electric cycles roll in roll out style for last mile mobility mostly made for tier 2 and tier 3 cities with congestion p.png',
              alt: 'Multi-modal transit pod docking ideation',
              caption: 'Multi-Modal Docking · Roll-in roll-out transit pod concept',
              span: 'wide',
            },
            {
              src: 'assets/Project_1/Photos/Ideations/6 orthographic drawing views and one isometric view to show a manufacturer .png',
              alt: 'Dimensional package study',
              caption: 'Orthographic Views · Packaging & wheelbase verification',
              span: 'standard',
            },
            {
              src: 'assets/Project_1/Photos/Ideations/this is a autonomous transit vehicle with capabilities for docking moped, e-bikes, electric cycles roll in roll out style for last mile mobility mostly made for tier 2 and tier 3 cities with congesti (2).png',
              alt: 'Narrow-track passenger pod ideation',
              caption: 'Congestion Navigation · Narrow track width for organic Indian streetscapes',
              span: 'half',
            },
            {
              src: 'assets/Project_1/Photos/Ideations/an autonomous vehicle with no driver modern cmf and tata ace magic passenger stance look moving through rough terrain tier 2 and tier 3_6 seater with 3 no of less track width e kick scooter docked on a s.png',
              alt: 'Integrated e-scooter docking study',
              caption: 'First-to-Last Mile · Micro-mobility docking integration',
              span: 'half',
            },
          ],
        },
      },
    }),

    room({
      id: 'cs-engineering-direction',
      index: '05',
      label: 'Engineering Direction',
      title: 'ENGINEERING\nDIRECTION.',
      statement: 'The platform dictates the passenger experience.',
      emphasis: 'The platform dictates',
      note: 'STRUCTURAL TOPOLOGY · EV SKATEBOARD',
      body:
        'Monocoque and ladder-frame options were evaluated and rejected. A flat EV skateboard delivers a step-in height under 320 mm and separates the drive platform from the cabin.',
      media: {
        kind: 'render',
        label: 'ENGINEERING BLUEPRINT · FLAT-BED SKATEBOARD ARCHITECTURE',
        ratio: 'auto',
        src: 'assets/Project_1/Renders/Render_3.png',
        alt: 'Flat-bed EV skateboard architecture render showing structural chassis, powertrain, and cabin frame',
        fit: 'contain',
        bg: '#f1f2f4',
      },
    }),

    room({
      id: 'cs-system-vision',
      index: '06',
      label: 'System Vision',
      title: 'SYSTEM\nVISION.',
      statement: 'The vehicle was never the product. The network was.',
      emphasis: 'The network was.',
      note: 'ECOSYSTEM · ONE PLATFORM, MANY ROLES',
      body:
        'One chassis supports six bodies, from commuter pods to logistics carriers. AI dispatch matches pod size to demand, tap-and-go ticketing removes booking, and existing driver unions run the fleet.',
      media: {
        kind: 'video',
        label: 'SYSTEM VISION · ONE PLATFORM, SIX MODULAR BODIES',
        ratio: '21/9',
        src: 'assets/Project_1/Photos/AI layer video/Vehicle_moving_on_orange_path_20260927154746.mp4',
        alt: 'System vision video showing autonomous pod moving along guided orange network path',
        caption: 'Autonomous Fleet Network · Simulation of pod navigating guided corridor trajectory',
      },
    }),

    room({
      id: 'cs-final-vehicle',
      index: '07',
      label: 'Final Vehicle',
      title: 'FINAL\nVEHICLE.',
      statement: 'Form is the resolution of every observed reality.',
      emphasis: 'every observed reality.',
      note: 'AESTHETIC RESOLUTION · CIVIC PRESENCE',
      body:
        'Compact 3,600 mm length, 1,380 mm width for narrow streets, six forward-facing seats on a flat floor. Calm and friendly rather than aggressive — a vehicle that belongs to the streets it serves.',
      media: {
        kind: 'render',
        label: 'FINAL VEHICLE · CINEMATIC EXTERIOR 3/4',
        ratio: 'auto',
        src: 'assets/Project_1/Renders/Render_1.png',
        alt: 'Final vehicle exterior render showing compact stance and panoramic glazing',
        fit: 'contain',
      },
    }),

    room({
      id: 'cs-deployment',
      index: '08',
      label: 'Deployment',
      title: 'DEPLOYMENT.',
      statement: 'Prove it on campus. Scale it to the city.',
      emphasis: 'Scale it to the city.',
      note: 'PHASED ROLLOUT',
      body:
        'Rollout starts in universities and industrial campuses where demand and charging can be validated, then expands to Tier 2 and Tier 3 feeder routes, schools and quick commerce.',
    }),
  ],

  /**
   * The Workshop entrance — one quiet doorway after Deployment.
   * Owned by this project; rendered once, outside the chapter list.
   */
  workshop: {
    line: 'The finished pod is only the last page.',
    aside: 'Behind this door: the notebooks, the wrong turns, and every decision that shaped it.',
    label: 'Step into the workshop',
    href: '#bharat-mobility/workshop',

    /** The studio floor — five stations. Content arrives later. */
    zones: [
      { id: 'field-notebook', name: 'Field Notebook', object: 'notebook', note: 'Streets, commuters, questions asked at tracker ranks.', content: fieldNotebook },
      { id: 'sketchbook', name: 'Sketchbook', object: 'sketchbook', note: 'Gestures, proportions, the ideas that didn’t survive.', content: sketchbookData },
      { id: 'engineering-table', name: 'Engineering Table', object: 'table', note: 'Chassis, packaging, the numbers behind the form.', content: engineeringTableData },
      { id: 'workflow', name: 'Workflow', object: 'workflow', note: 'How sketch, AI, CAD and judgement fit together.', content: workflowData },
      { id: 'prototype', name: 'Prototype', object: 'prototype', note: 'Under the cover — the pod as a system.', content: prototypeData },
    ],
  },
};

export default bharatMobility;
