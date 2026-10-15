/**
 * BHARAT MOBILITY POD — Workflow (Workshop · Zone 04)
 * ---------------------------------------------------------------------------
 * Honest presentation of the design and engineering pipeline.
 * Explicitly positions AI as a visual acceleration tool while preserving
 * human judgement for all spatial, ergonomic, and engineering decisions.
 *
 * Sequence:
 *   Research → Sketch → Vizcom → Iteration → Engineering → CAD → Rendering → Presentation
 *
 * HOW TO ADD MORE WORKFLOW STAGES:
 *  - Append a stage object to `stages`.
 *  - The connected pinboard timeline adapts and renders automatically.
 */

const workflowData = {
  intro:
    'Design maturity is defined by knowing where tools belong. In this project, AI was neither an automated creator nor an avoided novelty. It was treated transparently as an ideation amplifier that accelerated visual exploration in minutes, while every packaging constraint, ergonomic threshold, and chassis decision remained strictly human.',

  principle: 'AI accelerated exploration. Engineering decisions remained human.',

  stages: [
    {
      id: 'research',
      num: '01',
      title: 'Research',
      actor: 'Human Fieldwork',
      badge: 'Empirical',
      headline: 'Stepping into the street corridor before touching pencil to paper.',
      desc: 'Walking secondary market roads, riding informal diesel trackers, and conducting commuter inquiries across ranks. Uncovering that the deepest commuter friction was not cruising speed, but unpredictable transfers and long curbside waiting.',
      tooling: 'Field photography · commuter notebooks · journey mapping',
      media: {
        type: 'image',
        label: 'FIELD OBSERVATION',
        src: 'assets/Project_1/Sketches/WhatsApp Image 2026-03-06 at 9.47.42 AM.jpeg', // or field ref
      },
    },
    {
      id: 'sketch',
      num: '02',
      title: 'Sketch',
      actor: 'Human Intent',
      badge: 'Manual',
      headline: 'Rapid physical line gestures defining volumes and human orientation.',
      desc: 'Freehand sketching on bond paper and vellum to quickly explore proportions, low-floor step-in thresholds, arch gestures, and forward-facing occupant seating packages without software friction.',
      tooling: 'Felt tip · ballpoint pen · marker · graphite',
      media: {
        type: 'sketch',
        label: 'INITIAL GESTURAL SKETCHES',
        src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-06 at 4.12.39 PM.jpeg',
      },
    },
    {
      id: 'vizcom',
      num: '03',
      title: 'Vizcom',
      actor: 'AI Acceleration',
      badge: 'Diffusion',
      headline: 'Instant surface reflection and CMF exploration passes.',
      desc: 'Introducing diffusion rendering over hand-drawn linework to test lighting reflections, specular highlights, and color palettes in seconds. What previously demanded days of manual marker passes was accelerated into an afternoon of wide visual exploration.',
      tooling: 'Vizcom AI · image-to-image diffusion · rapid CMF passes',
      honestNote:
        'What AI did: accelerated visual feedback on surface highlights and paint tones. What AI could not do: calculate torsional stiffness, evaluate ingress accessibility, or understand street clearances.',
    },
    {
      id: 'iteration',
      num: '04',
      title: 'Iteration',
      actor: 'Human Filter',
      badge: 'Critical',
      headline: 'Weeding out non-functional fantasies and confronting failure.',
      desc: 'Subjecting early concepts to ground reality. For example, rigorously testing the initial "Mother Pod" concept (carrying personal scooters inside) and killing it when packaging calculations proved 65% of volume was wasted on mechanisms. Returning to the trusted Tracker baseline.',
      tooling: 'Spatial packaging math · failure analysis · cultural validation',
    },
    {
      id: 'engineering',
      num: '05',
      title: 'Engineering',
      actor: 'Mechanical Rigor',
      badge: 'Feasibility',
      headline: 'Platform topology, load paths, and packaging boundary conditions.',
      desc: 'Evaluating Monocoque vs Ladder Frame vs Flat-Bed EV Skateboard. Engineering the tubular A, B, and C pillar spaceframe roll cage, <320 mm ingress threshold datum, and ensuring underfloor battery protection against side-impact intrusion.',
      tooling: 'Mechanical packaging · spaceframe topology · SAE manikin standards',
      media: {
        type: 'render',
        label: 'EXPLODED CHASSIS TOPOLOGY',
        src: 'assets/Project_1/Renders/exploded view of this vehicle with flat bed ev structure with a,b,c pillars and seating position without steering like a autonomous vehicle showing battery section at the bottom with the motors at front  (1).png',
      },
    },
    {
      id: 'cad',
      num: '06',
      title: 'CAD',
      actor: 'Human Precision',
      badge: 'Parametric',
      headline: 'Translating gestural lines into production-accurate 3D NURBS.',
      desc: 'Surfacing the entire exterior and interior volume in 3D CAD modeling software. Modeling production-feasible shut lines, bi-parting door slider tracks, A-pillar tumblehome, and lighting cluster recesses to engineering clearances.',
      tooling: '3D NURBS CAD · parametric modeling · assembly clearance',
      media: {
        type: 'model',
        label: 'DETAILED SHARP V2 CAD DATASET',
        note: 'Complete 3D model active in Virtual Garage',
      },
    },
    {
      id: 'rendering',
      num: '07',
      title: 'Rendering',
      actor: 'Studio Tooling',
      badge: 'Final CMF',
      headline: 'Physically based ray-tracing and contextual realism.',
      desc: 'Material assignment, studio HDR environment illumination, and contextual street lighting simulations. Applying real commercial polymers, warm terracotta accents, and daylight glass transmittance.',
      tooling: 'KeyShot / Blender · physically based shaders · HDR lighting',
      media: {
        type: 'render',
        label: 'FINAL PRODUCTION EXTERIOR RENDER',
        src: 'assets/Project_1/Renders/Render_1.png',
      },
    },
    {
      id: 'presentation',
      num: '08',
      title: 'Presentation',
      actor: 'Exhibition Architecture',
      badge: 'Communication',
      headline: 'Separating the 3-minute gallery from the deep-dive studio workshop.',
      desc: 'Designing the case study experience itself. Structuring an Exhibition that communicates the core civic and automotive narrative in under 3 minutes for recruiters, while preserving the full engineering rigor inside this Workshop.',
      tooling: 'Modular web architecture · responsive design · editorial layout',
    },
  ],

  futureMilestones: [
    {
      title: 'Physical Scale Prototyping',
      badge: 'Next Milestone',
      desc: 'Reserved workflow stage for 1:5 scale clay or CNC foam package bucks verifying sightlines and volumetric clearance in physical light.',
    },
    {
      title: 'Tooling & DFM Validation',
      badge: 'Next Milestone',
      desc: 'Design for Manufacturing analysis for thermoformed exterior skin panels and tubular chassis jigging.',
    },
  ],
};

export default workflowData;
