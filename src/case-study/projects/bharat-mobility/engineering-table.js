/**
 * BHARAT MOBILITY POD — Engineering Table (Workshop · Zone 03)
 * ---------------------------------------------------------------------------
 * Celebrates the Mechanical Engineering background of the designer.
 * Presents engineering as rigorous, iterative trade-off exploration rather
 * than predetermined certainty.
 *
 * Covers:
 *  - Chassis Topology Comparison (Monocoque vs Ladder Frame vs EV Skateboard)
 *  - Exploded Architecture & Vehicle Structure
 *  - Packaging & Dimensional Bounds
 *  - Future Engineering: CAD model inspection, FEA stress simulation, kinematics.
 */

const engineeringTableData = {
  intro:
    'Form cannot compensate for a compromised structural backbone. As a mechanical engineer, vehicle architecture begins by testing trade-offs: torsional flex versus mass, tooling cost versus modularity, and step height versus ground clearance. Here is the engineering exploration.',

  tabs: [
    { id: 'chassis', label: 'Chassis Comparison' },
    { id: 'exploded', label: 'Exploded Architecture' },
    { id: 'packaging', label: 'Packaging & Structure' },
    { id: 'simulation', label: 'CAD & FEA Lab' },
  ],

  // 1. Chassis Topologies Evaluated
  chassisComparison: [
    {
      id: 'monocoque',
      name: 'Monocoque',
      tagline: 'Unitized Stamped Sheet Metal Shell',
      badge: 'Explored & Evaluated',
      isSelected: false,
      summary:
        'Lightweight structural efficiency with mature automotive manufacturing standards that minimize parts in high-volume production lines.',
      whyExplored:
        'Investigated for its high torsional rigidity and crash energy absorption paths common in modern passenger cars.',
      limitations:
        'High stamping die tooling investment is economically unviable for specialized regional transit volumes. The rigid body structure locks the entire vehicle into a single body shape, making modular application variants impossible without new body dies.',
      metrics: [
        { label: 'Step-in Floor Height', value: 'Low Floor', status: 'positive' },
        { label: 'Modularity for Top-Hats', value: 'Rigid / Non-Modular', status: 'negative' },
        { label: 'Tooling Investment', value: 'High CapEx Stamping', status: 'negative' },
        { label: 'Multi-Body Viability', value: 'Locked Single Shape', status: 'negative' },
      ],
      verdict:
        'Tooling rigidity prevents future modular adaptations; altering cabin height or cargo variants would demand prohibitive stamping reinvestment.',
    },
    {
      id: 'ladder-frame',
      name: 'Ladder Frame',
      tagline: 'Heavy Commercial Steel Channel Rails',
      badge: 'Explored & Evaluated',
      isSelected: false,
      summary:
        'Traditional Indian shared transit (Trackers, Vikrams, rural utility vehicles) relies on ladder rails for extreme load endurance and easy roadside welding repairs.',
      whyExplored:
        'Proven survivability over broken village roads, unpaved shoulders, and heavy overloading conditions.',
      limitations:
        'Longitudinal steel rail thickness forces interior floor height above 500 mm, demanding steep boarding steps that alienate elderly passengers and commuters carrying bags. The high center of mass also increases rollover danger in tight hill turns.',
      metrics: [
        { label: 'Step-in Floor Height', value: 'High (>500 mm)', status: 'negative' },
        { label: 'Modularity for Top-Hats', value: 'Moderate Top-Hat', status: 'neutral' },
        { label: 'Chassis Torsional Flex', value: 'High Longitudinal Twist', status: 'negative' },
        { label: 'Rollover Stability', value: 'High Center of Mass', status: 'negative' },
      ],
      verdict:
        'High floor severely compromises universal accessibility; heavy chassis rails penalize electrical energy consumption and reduce usable interior volume.',
    },
    {
      id: 'ev-skateboard',
      name: 'EV Skateboard',
      tagline: 'Decoupled Rolling Flat-Bed Chassis',
      badge: 'Selected Platform',
      isSelected: true,
      summary:
        'Separates the rolling drive platform (propulsion units, steering, suspension, flat underfloor energy tray) from the structural top-hat cabin.',
      whyExplored:
        'Unlocks a 100% flat floor, ultra-low step-in threshold, and allows a single standardized platform to carry six distinct civic and commercial body modules.',
      limitations:
        'Demands reinforced lateral side crash sill beams to protect underfloor energy storage during side impact collisions on uncurbed roads.',
      metrics: [
        { label: 'Step-in Floor Height', value: 'Ultra-Low (<320 mm)', status: 'positive' },
        { label: 'Modularity for Top-Hats', value: 'Fully Decoupled', status: 'positive' },
        { label: 'Floor Topography', value: '100% Flat Walkway', status: 'positive' },
        { label: 'Platform Reusability', value: 'Universal Baseline', status: 'positive' },
      ],
      verdict:
        'Delivers the ultra-low step-in threshold essential for elderly commuters while establishing a standardized structural foundation for multiple civic bodies.',
    },
  ],

  // 2. Exploded Architecture & Subsystem Callouts
  explodedArchitecture: {
    title: 'EXPLODED SUBSYSTEM TOPOLOGY',
    subtitle: 'Decoupling heavy mechanical propulsion from human civic architecture.',
    image:
      'assets/Project_1/Renders/exploded view of this vehicle with flat bed ev structure with a,b,c pillars and seating position without steering like a autonomous vehicle showing battery section at the bottom with the motors at front  (1).png',
    alt: 'Exploded engineering blueprint showing rolling EV flat bed chassis, A, B, C spaceframe pillars, and seating tray',
    subsystems: [
      {
        num: '01',
        name: 'Rolling Skateboard Chassis',
        category: 'Drive Platform',
        desc: 'Rigid flat-bed structural platform integrating front electric drive units, steer-by-wire linkage, independent trailing arm suspension, and underfloor structural battery enclosure.',
      },
      {
        num: '02',
        name: 'Tubular Spaceframe Cage',
        category: 'Crash Structure',
        desc: 'High-strength structural steel spaceframe with interconnected A, B, and C pillars forming a rigid rollover protection cage without requiring massive monolithic stamping dies.',
      },
      {
        num: '03',
        name: 'Flat Walkway Passenger Tub',
        category: 'Ergonomic Interior',
        desc: 'Continuous barrier-free floor deck (<320 mm step-in) allowing step-in directly from roadside curb. Eliminates the transmission tunnel and structural steps.',
      },
      {
        num: '04',
        name: 'Bi-Parting Slider Door Tracks',
        category: 'Ingress Mechanics',
        desc: 'Dual-track sliding door hardware recessed flush along the beltline perimeter. Doors open outward-sliding to maintain vehicle track width in narrow 3.5 m lanes.',
      },
    ],
  },

  // 3. Packaging & Dimensional Exploration (Strictly from project specs)
  packagingBounds: [
    {
      metric: '3,600 mm',
      title: 'Overall Envelope Length',
      domain: 'Maneuverability',
      exploration:
        'Shorter than standard sub-4m commercial vehicles. Allows a tight turning radius to navigate 90-degree alleyway corners where conventional 9 m municipal buses get stuck.',
    },
    {
      metric: '1,380 mm',
      title: 'Vehicle Track Width',
      domain: 'Spatial Clearance',
      exploration:
        'Optimized for sub-4-meter narrow interior streets. Balances two-way passing clearance against lateral roll stability on unbanked 15-degree road crowns.',
    },
    {
      metric: '< 320 mm',
      title: 'Ingress Threshold Datum',
      domain: 'Universal Access',
      exploration:
        'Dramatically lower than diesel trackers (550+ mm). Removes the knee-straining climb for elderly commuters and women wearing traditional saris carrying market goods.',
    },
    {
      metric: '6 Occupants',
      title: 'Forward-Facing Seating',
      domain: 'Human Packaging',
      exploration:
        'Staggered two-tier forward orientation prevents the motion sickness endemic to sideways bench seating on twisting regional roads, with a continuous 1.3 m center aisle.',
    },
  ],

  // 4. CAD & Future Simulation Stations
  simulationLab: {
    modelUrl: 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',
    stations: [
      {
        id: 'cad-inspection',
        badge: 'Production 3D Model',
        status: 'Active Model Available',
        title: '3D NURBS Surface & Packaging Model',
        medium: 'Detailed Sharp V2 CAD Dataset',
        desc: 'Production-ready 3D parametric envelope establishing shut-lines, glass cutouts, packaging clearances, and lighting integration.',
        action: 'Explore in 3D Garage',
        href: '#immersive-garage',
      },
      {
        id: 'fea-torsional',
        badge: 'Future FEA Study',
        status: 'Simulation Ready',
        title: 'Torsional Rigidity & Roll Cage Analysis',
        medium: 'Finite Element Analysis Target',
        desc: 'Reserved engineering exploration for chassis torsional stiffness under diagonal wheel-drop scenarios on unpaved village roads, verifying tubular A/B/C pillar survivability.',
      },
      {
        id: 'fea-side-impact',
        badge: 'Future FEA Study',
        status: 'Simulation Ready',
        title: 'Side Sill Intrusion & Battery Pack Protection',
        medium: 'Crash Energy Absorption Target',
        desc: 'Reserved engineering simulation verifying lateral sill beam load paths to shield underfloor energy cells from side t-bone collisions by two-wheelers and auto-rickshaws.',
      },
      {
        id: 'kinematics-door',
        badge: 'Future Kinematic Study',
        status: 'Kinematic Study Slot',
        title: 'Bi-Parting Slider Latch & Weather Gasket Kinematics',
        medium: 'Mechanism Motion Analysis',
        desc: 'Reserved mechanism analysis testing bi-directional sliding track tolerances against Dehradun monsoon silt intrusion, unpaved vibration, and long-term hinge wear.',
      },
    ],
  },
};

export default engineeringTableData;
