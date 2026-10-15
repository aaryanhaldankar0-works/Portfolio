/* ==========================================================================
   PORTFOLIO DATA STORE - AARYAN HALDANKAR
   Mobility & Vehicle Design (Garage) & Industrial Design (Workshop)
   ========================================================================== */

const PORTFOLIO_DATA = {
  // Centralized projects collection supporting future scalability
  projects: [
    {
      id: 'bharat-mobility',
      slug: 'bharat-mobility-pod',
      number: '01',
      title: 'Bharat Mobility Pod',
      subtitle: 'Autonomous Transit for Tier 2 & 3 India',
      category: 'Mobility / Transportation / Systems',
      discipline: 'Transportation Design / Shared Mobility',
      year: '2024',
      thumbnail: 'assets/Project_1/Renders/Render_1.png',
      previewImage: 'assets/Project_1/Renders/Render_1.png',
      heroImage: 'assets/Project_1/Renders/Render_1.png',
      featured: true,
      route: '/work/bharat-mobility-pod',
      garageBay: 0,
      garageModel: 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',
      accentColor: '#d97757',
      tagline: 'Autonomous Last-Mile Transit Pod for Tier 2 & 3 Indian Corridors',
      specs: {
        'Dimensions': '3,600 L × 1,380 W × 1,700 H mm',
        'Wheelbase': '2,350 mm Low-Floor EV Stance',
        'Capacity': '6 PAX Forward-Facing (1.3m Aisle)',
        'Platform': 'Steel Spaceframe + EV Skateboard',
        'Body Structure': 'Swappable Thermoplastic Panels',
        'Drive System': 'Level 4 Autonomous Sensor Suite'
      }
    },
    {
      id: 'ebs-tech',
      slug: 'ebs-guardian',
      number: '02',
      title: 'EBS Guardian',
      subtitle: 'Emergency Communication Systems',
      category: 'Industrial Design / Product / Systems',
      discipline: 'Disaster Resilience & Emergency Hardware',
      year: '2024',
      thumbnail: 'assets/Project_2/Renders/Render_1.png',
      previewImage: 'assets/Project_2/Renders/Render_1.png',
      heroImage: 'assets/Project_2/Renders/Render_1.png',
      featured: true,
      route: '/work/ebs-guardian',
      garageBay: 1,
      garageModel: 'assets/Project_2/3D Models/Segmented 3D model_ Max · Balanced 3D model.glb',
      accentColor: '#f97316',
      tagline: 'Emergency Communication Systems (EBS) · Low-Tech Solution for High-Stakes Environments',
      specs: {
        'System Type': 'Off-Grid LoRaWAN Mesh Device',
        'Power Source': 'Manual Kinetic Hand-Crank Dynamo',
        'Target Context': 'Himalayan Cloudburst / Remote Terrain',
        'Form Factor': 'Detachable Handheld Staff Module',
        'Interface': 'High-Contrast Emergency LCD & Tactile Alert'
      }
    }
  ],

  // Helper query methods for scalability
  getFeaturedProjects() {
    return this.projects.filter(p => p.featured);
  },

  getProjectBySlug(slug) {
    if (!slug) return null;
    const clean = slug.replace(/^\/work\//, '').replace(/^\//, '');
    return this.projects.find(p => p.slug === clean || p.id === clean) || null;
  },

  getProjectById(id) {
    if (!id) return null;
    return this.projects.find(p => p.id === id || p.slug === id) || null;
  },
  garage: {
    'bharat-mobility': {
      id: 'bharat-mobility',
      title: 'Bharat Mobility',
      tagline: 'Autonomous Last-Mile Transit Pod for Tier 2 & 3 Indian Corridors',
      category: 'Transportation Design / Shared Mobility',
      accentColor: '#d97757',
      heroImage: 'assets/Project_1/Renders/Render_1.png',
      modelUrl: 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',
      specs: {
        'Dimensions': '3,600 L × 1,380 W × 1,700 H mm',
        'Wheelbase': '2,350 mm Low-Floor EV Stance',
        'Capacity': '6 PAX Forward-Facing (1.3m Aisle)',
        'Platform': 'Steel Spaceframe + EV Skateboard',
        'Body Structure': 'Swappable Thermoplastic Panels',
        'Drive System': 'Level 4 Autonomous Sensor Suite'
      },
      sectionsTitle: 'Case Study & Engineering Architecture',
      sectionsSubtitle: 'A production-focused autonomous micro-transit ecosystem engineered for high-density Indian urban centers.',
      sections: [
        {
          title: 'Urban Bottlenecks & Mobility Void',
          phase: 'Phase 01 · Terrain & Infrastructure Research',
          desc: 'Severe street encroachments, steep mountain corridors, and extreme traffic bottlenecks in Dehradun caused public transit share to collapse from eleven percent down to barely one percent today.',
          image: ''
        },
        {
          title: 'Modular Spaceframe & Platform Architecture',
          phase: 'Phase 02 · Engineering Constraints',
          desc: 'Engineered around an accessible flat skateboard chassis paired with an ultra-rigid steel tubular spaceframe and swappable thermoplastic outer body panels ensuring uninterrupted continuous fleet operation throughout demanding transit cycles.',
          image: ''
        },
        {
          title: 'Spatial Packaging & Connected Ecosystem',
          phase: 'Phase 03 · Ergonomics & Deployment',
          desc: 'Six forward-facing ergonomic seats completely eliminate passenger motion sickness while a tall roofline, wide door aperture, and flat aisle enable rapid roll-in roll-out micro-mobility across university campuses and hospitals.',
          image: 'assets/Project_1/Renders/Render_1.png'
        }
      ]
    },
    '01': null, // populated below as alias to bharat-mobility
  },

  workshop: [
    {
      id: 'ebs-tech',
      title: 'EBS Tech',
      tagline: 'Emergency Communication Systems (EBS) · Low-Tech Solution for High-Stakes Environments',
      category: 'Disaster Resilience & Emergency Hardware',
      accentColor: '#f97316',
      heroImage: 'assets/Project_2/Renders/Render_1.png',
      modelUrl: 'assets/Project_2/3D Models/Segmented 3D model_ Max · Balanced 3D model.glb',
      specs: {
        'System Type': 'Off-Grid LoRaWAN Mesh Device',
        'Power Source': 'Manual Kinetic Hand-Crank Dynamo',
        'Target Context': 'Himalayan Cloudburst / Remote Terrain',
        'Form Factor': 'Detachable Handheld Staff Module',
        'Interface': 'High-Contrast Emergency LCD & Tactile Alert'
      },
      sectionsTitle: 'Case Study & Architecture',
      sectionsSubtitle: 'A low-tech physical communication system engineered for crisis silence and infrastructure collapse.',
      sections: [
        {
          title: 'Ground Zero & The Communication Void',
          phase: 'Phase 01 · Crisis Research',
          desc: 'Triggered by the Dehradun cloudburst where collapsed bridges and severed cell towers caused panic. When centralized networks fail, rumor spreads faster than facts without trusted hyper-local alerts.',
          image: ''
        },
        {
          title: 'The Hardware Design Brief',
          phase: 'Phase 02 · Engineering Constraints',
          desc: 'Engineered for complete power and cellular grid independence using durable low-tech components, an authenticated LoRaWAN mesh network, and intuitive physical dials to eliminate cognitive panic during critical crises.',
          image: ''
        },
        {
          title: 'EBS Guardian Interface & Anatomy',
          phase: 'Phase 03 · Physical Hardware',
          desc: 'Adapted to Himalayan terrain within a trekking staff format featuring a detachable handheld module, manual kinetic hand-crank generator, high-contrast emergency LCD, and tactile distress alert button.',
          image: 'assets/Project_2/Renders/Render_1.png'
        }
      ]
    }
  ]
};

// Alias '01' to 'bharat-mobility' for navigation and tab sync
if (PORTFOLIO_DATA && PORTFOLIO_DATA.garage) {
  PORTFOLIO_DATA.garage['01'] = PORTFOLIO_DATA.garage['bharat-mobility'];
}
