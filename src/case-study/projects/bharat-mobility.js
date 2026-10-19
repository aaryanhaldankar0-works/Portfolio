/**
 * BHARAT MOBILITY POD — The Exhibition
 * ---------------------------------------------------------------------------
 * Recruiter-length walkthrough (3–4 minutes) structured per professional jury feedback.
 *
 * Sequence:
 *   01. Project Overview & Context
 *   02. Context & Field Discovery
 *   03. User Journey & Key Insight
 *   04. Design Opportunity (From Failure to Baseline)
 *   05. Form Development (Authentic Hand Sketches to CAD)
 *   06. Vehicle Architecture & AI-Assisted Workflow
 *   07. Passenger & Service Experience:
 *       - From Booking to Boarding (Proposed UX Flow)
 *       - How the Service Operates (Autonomous Operations Matrix)
 *       - Vehicle Variants & AI Fleet Logic (4-Seat vs 6-Seat Dispatch)
 *   08. Final Design, Deployment & Future Scope (Roadmap)
 *   09. Rabbit Hole (Deep Dive Workshop) & Garage Entrance
 *
 * Preserves breathing room and editorial variety: 6/6 text & visual,
 * 5/7 research & diagram, 4/8 explanatory & technical, full-width statements,
 * and two-up image compositions.
 *
 * Source deep-dive material is fully preserved in `bharat-mobility.workshop.js`
 * and accessed via the Rabbit Hole doorway.
 */

import fieldNotebook from './bharat-mobility/field-notebook.js';
import sketchbookData from './bharat-mobility/sketchbook.js';
import engineeringTableData from './bharat-mobility/engineering-table.js';
import workflowData from './bharat-mobility/workflow.js';
import prototypeData from './bharat-mobility/prototype.js';
import serviceOperationsData from './bharat-mobility/service-operations.js';

const img = (label, ratio = '16/9', extra = {}) => ({ kind: 'image', label, ratio, ...extra });
const render = (label, ratio = '21/9', extra = {}) => ({ kind: 'render', label, ratio, ...extra });

const bharatMobility = {
  id: 'bharat-mobility',
  next: 'ebs-tech', // Emergency Communication Systems (EBS Tech)

  hero: {
    index: '01',
    category: 'Transportation Design · Public Mobility Ecosystem',
    title: 'BHARAT MOBILITY POD',
    subtitle: 'Autonomous last-mile transit architecture engineered for the secondary street corridors of Tier 2 & Tier 3 India.',
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
    /* -----------------------------------------------------------------------
       01 / PROJECT OVERVIEW & THE CORE QUESTION
       Intentional 6/6 text and visual composition
       ----------------------------------------------------------------------- */
    {
      id: 'cs-the-question',
      index: '01',
      label: 'The Brief',
      title: 'THE\nQUESTION.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'Before designing a vehicle, understand the city.',
            emphasis: 'understand the city.',
            note: 'FIRST SEMESTER · DESIGN DIRECTION',
            align: 'left',
          },
        },
        {
          type: 'split',
          props: {
            weight: 'balanced', // 6/6 split
            media: {
              kind: 'image',
              label: 'FIELD PHOTOGRAPHY · THE LIVING CITY',
              ratio: '16/9',
              src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM.jpeg',
              alt: 'Field photography of Tier 2 & 3 living city streets and terrain',
            },
            text: {
              eyebrow: 'Design Reframing',
              heading: 'Reframing the problem from product to urban infrastructure.',
              body: [
                'My mentor’s advice changed the trajectory of the brief. Rather than jumping directly into styling a futuristic pod, I stepped into the secondary street corridors of Dehradun and surrounding towns to understand how everyday commuters actually move.',
                'Public transit modal share in these cities has plummeted from 11% to barely 1%. The problem was never lack of commuter demand — it was that conventional large buses physically cannot navigate the narrow, organic road networks where 80% of urban life takes place.',
              ],
            },
          },
        },
      ],
    },

    /* -----------------------------------------------------------------------
       02 / CONTEXT & FIELD DISCOVERY
       Rich photographic collage documenting narrow-road reality
       ----------------------------------------------------------------------- */
    {
      id: 'cs-field-discovery',
      index: '02',
      label: 'Field Discovery',
      title: 'FIELD\nDISCOVERY.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'Where buses cannot go, the city improvises.',
            emphasis: 'the city improvises.',
            note: 'OBSERVATION · SECONDARY ROAD REALITY',
            align: 'left',
          },
        },
        {
          type: 'editorial',
          props: {
            body: [
              'Secondary market alleys, school lanes, and village peripheries feature street widths often under 2.4 meters with frequent encroaching stalls and mixed-speed traffic. Diesel Trackers, Vikrams, three-wheelers, and personal two-wheelers fill the gap. Commuters documented that a simple 5 km journey frequently demands two distinct transfers and 25–40 minutes of unpredictable curbside waiting.',
            ],
            columns: 2,
          },
        },
        {
          type: 'collage',
          props: {
            caption: 'FIELD PHOTOGRAPHY · NARROW ROAD & TERRAIN REALITY (DEHRADUN & TIER 2 CORRIDORS)',
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
      ],
    },

    /* -----------------------------------------------------------------------
       03 / USER JOURNEY & KEY INSIGHT
       The transfer bottleneck vs top speed
       ----------------------------------------------------------------------- */
    {
      id: 'cs-key-insight',
      index: '03',
      label: 'Key Insight',
      title: 'KEY\nINSIGHT.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'The vehicle was not the problem. The journey was.',
            emphasis: 'The journey was.',
            note: 'STRUCTURAL INSIGHT · FROM SPEED TO FLOW',
            align: 'left',
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Friction Analysis',
            heading: 'Transit failure happens during the 15-minute curbside pause.',
            body: [
              'In-depth interviews at tracker stands revealed that travel speed is rarely what breaks a commuter’s day. Friction lives entirely in the transfers: standing at dusty intersections for 10–15 minutes while informal drivers wait to pack vehicles past safe capacity.',
              'Inspired by the universal accessibility of unreserved public transit networks, Bharat Mobility Pod pairs fixed-route affordability with advance seat assurance — eliminating the scramble to board overcrowded shared transit.',
            ],
          },
        },
        {
          type: 'journeyMotion',
        },
      ],
    },

    /* -----------------------------------------------------------------------
       04 / DESIGN OPPORTUNITY
       From rejected "Mother Pod" to trusted Tracker baseline
       ----------------------------------------------------------------------- */
    {
      id: 'cs-the-solution',
      index: '04',
      label: 'Design Opportunity',
      title: 'THE\nFOUNDATION.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'Start from what people already trust.',
            emphasis: 'already trust.',
            note: 'HUMAN-CENTERED PACKAGING',
            align: 'left',
          },
        },
        {
          type: 'split',
          props: {
            weight: 'balanced',
            media: {
              kind: 'image',
              label: 'BASELINE BENCHMARK · TATA MAGIC / TRACKER',
              ratio: '16/9',
              src: 'assets/Project_1/Photos/Ideations/tata-magic-colour-white.png',
              alt: 'Tata Magic vehicle reference',
              fit: 'contain',
              bg: '#ffffff',
            },
            text: {
              eyebrow: 'Confronting Conceptual Failure',
              heading: 'Killing the multi-modal scooter carrier to honor street truth.',
              body: [
                'An early ambitious concept envisioned a "Mother Pod" carrying personal mopeds and e-bikes inside roll-in roll-out bays. Packaging calculations quickly killed it: 65% of interior volume was consumed by docking mechanisms, leaving room for barely two passengers.',
                'I pivoted back to the trusted Tata Magic / Tracker baseline: narrow track width, low step-in height, and familiar community presence. By pairing this trusted silhouette with an electric flat skateboard, we keep what works while eliminating toxic tailpipe emissions, engine noise, and steep steps.',
              ],
            },
          },
        },
        {
          type: 'twoUp',
          props: {
            caption: 'PACKAGING EVOLUTION · Rejected Multi-Modal Docking Pod (Left) vs. Focused 6-Passenger Urban Envelope (Right)',
            itemA: {
              src: 'assets/Project_1/Photos/Ideations/this is a autonomous transit vehicle with capabilities for docking moped, e-bikes, electric cycles roll in roll out style for last mile mobility mostly made for tier 2 and tier 3 cities with congestion p.png',
              alt: 'Multi-modal transit pod docking concept study',
              label: 'CONCEPT 01 (REJECTED) · MULTI-MODAL SCOOTER DOCK',
              caption: 'Over-engineered carrier. Heavy mechanism overhead and compromised passenger legroom.',
              ratio: '16/9',
            },
            itemB: {
              src: 'assets/Project_1/Photos/Ideations/6 orthographic drawing views and one isometric view to show a manufacturer .png',
              alt: 'Dimensional orthographic study',
              label: 'SELECTED DIRECTION · ORTHOGRAPHIC PACKAGING DATUM',
              caption: 'Pure passenger focus. 3,600 mm overall length, 1,380 mm width, and <320 mm floor height.',
              ratio: '16/9',
            },
          },
        },
      ],
    },

    /* -----------------------------------------------------------------------
       05 / FORM DEVELOPMENT (PHASE 04 JURY FEEDBACK IMPROVEMENT)
       Prominent transportation-design form development chapter
       ----------------------------------------------------------------------- */
    {
      id: 'cs-form-development',
      index: '05',
      label: 'Form Development',
      title: 'FORM\nDEVELOPMENT.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'Form is the resolution of observed street reality.',
            emphasis: 'observed street reality.',
            note: 'PROPORTIONS · VOLUMES · AESTHETIC RESOLUTION',
            align: 'left',
          },
        },
        {
          type: 'formDevelopment',
          props: {
            title: 'AUTHENTIC FORM DEVELOPMENT & PROPORTION STUDIES',
            subtitle:
              'Vehicle form was dictated by three non-negotiables: a 1,380 mm maximum width for narrow alleys, a step-in height under 320 mm for unassisted curb boarding, and an approachable, non-aggressive civic identity. Below is the authentic visual evidence tracing freehand pen sketches to 3D NURBS CAD.',
          },
        },
      ],
    },

    /* -----------------------------------------------------------------------
       06 / VEHICLE ARCHITECTURE & AI-ASSISTED DESIGN WORKFLOW (PHASE 05)
       Engineering blueprint + 6-stage AI workflow visual sequence
       ----------------------------------------------------------------------- */
    {
      id: 'cs-engineering-direction',
      index: '06',
      label: 'Architecture & Workflow',
      title: 'VEHICLE\nARCHITECTURE.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'The platform dictates the passenger experience.',
            emphasis: 'The platform dictates',
            note: 'STRUCTURAL TOPOLOGY · FLAT-BED EV SKATEBOARD',
            align: 'left',
          },
        },
        {
          type: 'split',
          props: {
            weight: 'balanced',
            media: {
              kind: 'render',
              label: 'ENGINEERING BLUEPRINT · FLAT SKATEBOARD CHASSIS',
              ratio: '16/9',
              src: 'assets/Project_1/Renders/Render_3.png',
              alt: 'Flat-bed EV skateboard architecture blueprint render',
              fit: 'contain',
              bg: '#f1f2f4',
            },
            text: {
              eyebrow: 'Chassis Packaging',
              heading: 'Separating the mechanical platform from the passenger cabin.',
              body: [
                'Monocoque and ladder-frame architectures were evaluated and rejected. A ladder frame forces an unacceptably high step-in floor height (>540 mm), while an integrated automotive monocoque prevents modular body swapping.',
                'The selected flat EV skateboard houses low-profile prismatic battery cells within a reinforced perimeter frame. This achieves an unassisted step-in height under 320 mm, lowers the center of gravity for roll stability on mountain roads, and supports lightweight tubular rollcage spaceframes.',
              ],
            },
          },
        },
        {
          type: 'aiWorkflow',
          props: {
            title: 'THE EXPEDITED ITERATION PIPELINE (AI WORKFLOW)',
            subtitle:
              'AI was treated transparently as an ideation amplifier that accelerated visual exploration in minutes, while every packaging constraint, human manikin threshold, and chassis load path remained strictly human.',
          },
        },
      ],
    },

    /* -----------------------------------------------------------------------
       07 / PASSENGER EXPERIENCE & SERVICE OPERATIONS (SECTIONS 12 & 13)
       From Seat Assurance to Destination (Animated flow + 3-layer diagram)
       ----------------------------------------------------------------------- */
    {
      id: 'cs-service-operations',
      index: '07',
      label: 'Service Operations',
      title: 'FROM SEAT ASSURANCE\nTO DESTINATION.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'The vehicle is a component. The service is the product.',
            emphasis: 'The service is the product.',
            note: 'FIXED-ROUTE SHARED TRANSIT · ADVANCE SEAT ASSURANCE',
            align: 'left',
          },
        },
        {
          type: 'seatAssuranceToDestination',
        },
      ],
    },

    /* -----------------------------------------------------------------------
       08 / FINAL DESIGN, DEPLOYMENT & FUTURE SCOPE (PHASE 09)
       Cinematic resolution + Development Roadmap
       ----------------------------------------------------------------------- */
    {
      id: 'cs-deployment',
      index: '08',
      label: 'Resolution & Roadmap',
      title: 'FINAL DESIGN\n& ROADMAP.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'Prove it on campus. Scale it to the city.',
            emphasis: 'Scale it to the city.',
            note: 'PHASED DEPLOYMENT · STRATEGIC HORIZON',
            align: 'left',
          },
        },
        {
          type: 'split',
          props: {
            weight: 'balanced',
            media: {
              kind: 'render',
              label: 'FINAL VEHICLE · 3/4 EXTERIOR RESOLUTION',
              ratio: '16/9',
              src: 'assets/Project_1/Renders/Render_1.png',
              alt: 'Final vehicle exterior render showing compact stance and panoramic glazing',
              fit: 'contain',
            },
            text: {
              eyebrow: 'Production Resolution',
              heading: 'Calm civic presence engineered for everyday Indian streets.',
              body: [
                'Compact 3,600 mm overall length, 1,380 mm width for organic streetscapes, six forward-facing seats on an uninterrupted flat floor, and 360° panoramic daylight glazing providing safety and orientation.',
                'The initial deployment strategy focuses on controlled environments — university campuses, tech parks, and hospital grounds — where autonomous corridors and smart charging can be validated before scaling to municipal feeder routes.',
              ],
            },
          },
        },
        // Phase 09: Development Roadmap & Future Scope
        {
          type: 'developmentRoadmap',
        },
      ],
    },
  ],

  /**
   * The Workshop entrance — compact doorway positioned toward the side
   * immediately before the 3D Garage BackDoor.
   */
  workshop: {
    line: 'The finished pod is only the last page.',
    aside:
      'Behind this door: the field notebooks, wrong turns, complete sketch archive, structural engineering comparisons, and full prototype evolution.',
    label: 'Step into the workshop',
    href: '#bharat-mobility/workshop',

    /** The studio floor — five stations preserving all detailed process assets */
    zones: [
      {
        id: 'field-notebook',
        name: 'Field Notebook',
        object: 'notebook',
        note: 'Streets, commuters, raw inquiries asked at tracker ranks in Dehradun.',
        content: fieldNotebook,
      },
      {
        id: 'sketchbook',
        name: 'Sketchbook',
        object: 'sketchbook',
        note: 'Gestures, proportions, discarded concepts, and intentional drafting studies.',
        content: sketchbookData,
      },
      {
        id: 'engineering-table',
        name: 'Engineering Table',
        object: 'table',
        note: 'Chassis comparisons (Monocoque vs Ladder vs Skateboard), rollcage spaceframe, packaging math.',
        content: engineeringTableData,
      },
      {
        id: 'workflow',
        name: 'Workflow',
        object: 'workflow',
        note: 'In-depth methodology: how hand sketch, Vizcom AI diffusion, CAD NURBS, and human judgment fit together.',
        content: workflowData,
      },
      {
        id: 'prototype',
        name: 'Prototype',
        object: 'prototype',
        note: 'Under the skin — the modular body applications, chassis topology, and multi-modal transit system.',
        content: prototypeData,
      },
      {
        id: 'service-operations',
        name: 'Service & Operations Development',
        object: 'operations',
        note: 'Seat assurance, fixed-route planning, booking & kiosk wireframes, union roles, and fleet AI.',
        content: serviceOperationsData,
      },
    ],
  },
};

export default bharatMobility;
