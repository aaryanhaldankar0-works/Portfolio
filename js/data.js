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
      tagline: 'Physical Architecture & Autonomous Last-Mile Transit Platform',
      category: 'Transportation Design & Physical Architecture',
      accentColor: '#38bdf8',
      heroImage: '',
      modelUrl: 'assets/Project_2/3D Models/Segmented 3D model_ Max · Balanced 3D model.glb',
      specs: {
        'Target Application': 'Urban Last-Mile Transit & Campus Shuttle',
        'Wheelbase': '2,180 mm Compact Urban Stance',
        'Accessibility': 'Zero-Step Ingress Low Floor',
        'Architecture': 'Bi-Directional Symmetrical Cabin'
      },
      stages: {
        ideation: {
          title: 'Packaging Architecture & Bi-Directional Form',
          phase: 'Phase 01: Ideation & Ergonomics',
          image: '',
          description: 'Engineered an inclusive, low-floor autonomous micro-mobility platform for last-mile public transit. Optimized 4-6 passenger ingress/egress, expansive panoramic safety glazing, and modular skateboard chassis integration.',
          specs: {
            'Target Application': 'Urban Last-Mile Transit & Campus Shuttle',
            'Wheelbase': '2,180 mm Compact Urban Stance',
            'Accessibility': 'Zero-Step Ingress Low Floor',
            'Architecture': 'Bi-Directional Symmetrical Cabin'
          }
        },
        rendering: {
          title: 'Segmented Class-A Surfacing & CMF Strategy',
          phase: 'Phase 02: CAD & Photorealistic CMF',
          image: '',
          description: 'Modeled aerodynamic unibody exterior volumes with segmented modular panels for rapid maintenance and field replacement. Applied high-contrast ceramic gloss white body panels, satin charcoal impact cladding, and aerodynamic flush disc wheels.',
          specs: {
            'Surface Quality': 'Class-A Curvature Continuity',
            'Glazing': 'Smart Electrochromic Acoustic Glass',
            'Livery Accent': 'Geometric Cyan Transit Graphic',
            'CMF Palette': 'Ceramic White + Satin Basalt'
          }
        },
        prototyping: {
          title: 'Segmented 3D CAD Validation & Physical Digital Twin',
          phase: 'Phase 03: 3D Model & Scale Validation',
          image: '',
          description: 'Exported segmented multi-part 3D assembly for scale validation, wind tunnel boundary layer observation, and ergonomic sightline analysis in physical studio space.',
          specs: {
            'Model Format': 'Segmented Multi-Body GLB Assembly',
            'Sensor Suite': '360° Flush LIDAR & Radar Pucks',
            'Scale Model': 'Interactive 3D Digital Twin Showroom',
            'Aero Feature': 'Flush Disc Wheel Aero Covers'
          }
        }
      }
    }
  ]
};

// Alias '01' to 'bharat-mobility' for navigation and tab sync
if (PORTFOLIO_DATA && PORTFOLIO_DATA.garage) {
  PORTFOLIO_DATA.garage['01'] = PORTFOLIO_DATA.garage['bharat-mobility'];
}
