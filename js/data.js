/* ==========================================================================
   PORTFOLIO DATA STORE - AARYAN HALDANKAR
   Mobility & Vehicle Design (Garage) & Industrial Design (Workshop)
   ========================================================================== */

const PORTFOLIO_DATA = {
  garage: {
    'bharat-mobility': {
      id: 'bharat-mobility',
      title: 'Bharat Mobility',
      tagline: 'Autonomous Last-Mile Passenger Mobility System',
      category: 'Transportation Design / Shared Mobility',
      accentColor: '#d97757',
      heroImage: '',
      modelUrl: 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',
      specs: {
        'Powertrain': 'Electric 48V Powertrain',
        'Capacity': '6 PAX Ergonomic Layout',
        'Range': '25 KM Optimized Last-Mile Range',
        'Speed': '30 KM/H Safe Urban Speed',
        'Drive': 'Level 4 Autonomous Sensor Suite'
      }
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
