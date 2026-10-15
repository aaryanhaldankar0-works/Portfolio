/**
 * EMERGENCY COMMUNICATION SYSTEMS (EBS) — The Exhibition
 * ---------------------------------------------------------------------------
 * High-restraint editorial exhibition structured for a 2–4 minute recruiter review.
 *
 * Chapters:
 *   01. Context              (Bridge collapse, infrastructural blackout, zero-infrastructure baseline)
 *   02. Research             (Frontline reality: civilian choke points, guard outposts, human authority)
 *   03. Insight              (Four acute ground realities dictating physical hardware constraints)
 *   04. Design Response      (EBS Guardian: kinetic transceiver, glove-operable controls, reflective display)
 *   05. System Architecture  (Distinguishing proposed sub-GHz valley mesh from validated physical prototype)
 *   06. Product Development  (Planetary dynamo packaging, IP67 sealing, orthographic tolerances)
 *   07. Application & Garage (Dual-use trekking deployment, Colonnade Garage transition, studio workshop)
 */

const img = (label, src, alt, caption, ratio = '16/9') => ({
  kind: 'image',
  label,
  src,
  alt: alt || label,
  caption,
  ratio,
});

const ebsTech = {
  id: 'ebs-tech',
  next: 'bharat-mobility',

  hero: {
    index: '02',
    category: 'Disaster Resilience & Emergency Hardware Design',
    title: 'EMERGENCY COMMUNICATION SYSTEMS',
    subtitle: 'A decentralized kinetic mesh transceiver engineered for Himalayan disaster silence and infrastructural collapse.',
    media: {
      kind: 'image',
      label: 'EBS GUARDIAN · PHYSICAL PROTOTYPE',
      src: 'assets/Project_2/Renders/Render_1.png',
      alt: 'EBS Guardian hardware prototype in deployed emergency alert state',
      ratio: '21/9',
    },
    showSpecs: true,
    actions: [
      { label: 'Explore in Colonnade Garage (Bay 02)', href: '#immersive-garage' },
    ],
  },

  sections: [
    /* ========================================================================
       CHAPTER 01: CONTEXT
       ======================================================================== */
    {
      id: 'cs-ebs-context',
      index: '01',
      label: 'Context',
      title: 'Infrastructural Collapse in Valley Corridors',
      intro: 'When cloudbursts strike Himalayan valleys, physical routes and telecommunications vanish simultaneously.',
      blocks: [
        {
          type: 'split',
          props: {
            weight: 'media',
            reverse: true,
            media: img(
              'FIELD EVIDENCE · SEVERED ACCESS & POWER SHUTDOWN',
              'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.54 PM.jpeg',
              'Dehradun storm aftermath with collapsed tree and downed utility cables blocking the mountain road',
              'Ground Zero: Storm impact severing road transit and tearing through power and communication wires.',
              '16/9'
            ),
            text: {
              eyebrow: 'GROUND ZERO · THE INFORMATION VACUUM',
              heading: 'Zero-Infrastructure Survivability',
              body: [
                'In steep valley topography, municipal electrical conduits and telecommunication lines are physically pinned beneath road bridges. When floodwaters tear the bridge away, the community is not merely cut off physically—it is plunged into absolute information silence within 10 minutes.',
                'Traditional disaster responses assume cellular base stations survive and cloud backbones remain reachable. EBS establishes a strict zero-infrastructure baseline: total operational autonomy with zero cellular, grid, or satellite dependency from second zero.',
              ],
            },
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 02: RESEARCH
       ======================================================================== */
    {
      id: 'cs-ebs-research',
      index: '02',
      label: 'Research',
      title: 'Field Inquiry at Civil Choke Points',
      intro: 'Who do stranded civilians actually turn to when official broadcast networks go silent?',
      blocks: [
        {
          type: 'editorial',
          props: {
            eyebrow: 'FIELDWORK REALITY · CIVIL CONVERGENCE',
            heading: 'People Converge on Recognized Human Figures, Not Apps',
            body: [
              'On-ground field inquiry conducted across Himalayan transit bottlenecks revealed a fundamental human truth: in terrifying blackouts, stranded people do not search for mobile emergency apps or wait for sirens that have lost power. They physically run toward the nearest recognizable human authority—an outpost security guard, traffic police at a roadblock barrier, or a respected valley elder.',
            ],
          },
        },
        {
          type: 'collage',
          props: {
            caption: 'FIELDWORK & CHOKE POINTS · DEHRADUN VALLEY CORRIDOR',
            bleed: false,
            images: [
              {
                src: 'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.53 PM (1).jpeg',
                alt: 'Community elder and shopkeeper at village perimeter',
                caption: 'Community Trust Hubs · Local shopkeepers and elders who anchor informal communication',
                span: 'hero',
              },
              {
                src: 'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.52 PM.jpeg',
                alt: 'Uttarakhand Police roadblock barricade on mountain corridor',
                caption: 'Civilian Choke Point · Roadblock where stranded travelers naturally converge',
                span: 'standard',
              },
              {
                src: 'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.53 PM.jpeg',
                alt: 'Field Interview: On-ground inquiry with security checkpoint guard at perimeter outpost',
                caption: 'The Guard Outpost · Inquiring with outpost personnel on how alerts currently travel during road washouts',
                span: 'standard',
              },
            ],
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 03: INSIGHT
       ======================================================================== */
    {
      id: 'cs-ebs-insight',
      index: '03',
      label: 'Insight',
      title: 'Four Behavioral Realities Dictate the Hardware',
      intro: 'Direct empirical observations from disaster corridors translated into non-negotiable physical constraints.',
      blocks: [
        {
          type: 'observationDecisions',
          props: {
            items: [
              {
                id: 'obs-01',
                index: '01',
                observation: 'People reject anonymous alerts as rumors, but trust instructions from known civil figures.',
                observationDetail: 'Hearsay triggers panic stampedes onto collapsing roads; verified civil leadership restores composure.',
                decision: 'Physical Cryptographic Leader Tokens',
                decisionDetail: 'Hardware keys anchor broadcast privileges to recognized gatekeepers, preventing hearsay propagation.',
              },
              {
                id: 'obs-02',
                index: '02',
                observation: 'Smartphone batteries die within 4 hours in freezing mountain downpours.',
                observationDetail: 'Continuous cellular searching rapidly exhausts batteries, leaving survivors helpless after dark.',
                decision: 'Integrated High-Ratio Planetary Dynamo',
                decisionDetail: 'A 40:1 geared kinetic crank delivers 120 minutes of active transceiver broadcast from 3 minutes of rotation.',
              },
              {
                id: 'obs-03',
                index: '03',
                observation: 'Cold, trembling hands and driving rain render touchscreens completely inoperable.',
                observationDetail: 'Survivors in trauma cannot swipe capacitive screens with wet fingers or through winter gloves.',
                decision: 'Glove-Operable Tactile Switchgear & Reflective Display',
                decisionDetail: 'Mechanical rotary dials, a guarded SOS toggle, and a reflective display readable in zero visibility.',
              },
              {
                id: 'obs-04',
                index: '04',
                observation: 'Steep granite ridges block line-of-sight VHF/UHF radio between valley communities.',
                observationDetail: 'Standard walkie-talkies cannot penetrate mountain topography between isolated settlements.',
                decision: 'Decentralized Sub-GHz Multi-Hop Mesh',
                decisionDetail: 'Lightweight packets autonomously hop across ridges from node to node over 15+ km without repeaters.',
              },
            ],
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 04: DESIGN RESPONSE
       ======================================================================== */
    {
      id: 'cs-ebs-response',
      index: '04',
      label: 'Design Response',
      title: 'EBS Guardian: The Kinetic Transceiver',
      intro: 'A dedicated, autonomous handheld lifeline engineered for sub-zero mountain resilience.',
      blocks: [
        {
          type: 'split',
          props: {
            weight: 'media',
            reverse: false,
            media: img(
              'EBS GUARDIAN · PHYSICAL PROTOTYPE',
              'assets/Project_2/Renders/Render_1.png',
              'EBS Guardian functional hardware prototype in deployed emergency alert state',
              'EBS Guardian Prototype: High-visibility hazard orange housing, tactile switchgear, and active alert readout.',
              '16/9'
            ),
            text: {
              eyebrow: 'PHYSICAL LIFELINE · WORKING PROTOTYPE',
              heading: 'Form Follows Instinct Under Shock',
              body: [
                'EBS Guardian replaces fragile smartphone glass with an armored, high-visibility hazard orange casing. The planetary dynamo folds flush into the handle, allowing rapid manual generation even while wearing heavy winter mittens.',
                'An ultra-high contrast reflective memory display delivers vital evacuation coordinates and verified safety alerts without requiring backlighting or external power.',
              ],
            },
          },
        },
        {
          type: 'split',
          props: {
            weight: 'text',
            reverse: true,
            media: img(
              'ERGONOMICS & MECHANISM · STUDIO IDEATION',
              'assets/Project_2/Exhibition/ideation-sketches.jpg',
              'Ideation sketches showing form studies, hand-crank mechanisms, and ergonomic grip exploration',
              'Studio Ideation: Developing tactile crank geometry, grip proportions, and drop-resistant corner bumpers.',
              '16/9'
            ),
            text: {
              eyebrow: 'HUMAN FACTORS · PHYSICAL TESTING',
              heading: 'Engineered for Cold, Stressed Hands',
              body: [
                'Physical mockups tested grip clearances under cold water immersion. The rotary channel selector provides heavy mechanical detents that click distinctly through winter gloves, while a recessed mechanical trigger prevents accidental SOS transmission during falls.',
              ],
            },
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 05: SYSTEM ARCHITECTURE
       ======================================================================== */
    {
      id: 'cs-ebs-system',
      index: '05',
      label: 'System Architecture',
      title: 'Decentralized Valley Mesh Protocol',
      intro: 'Clearly distinguishing the proposed valley network architecture from implemented, physical hardware.',
      blocks: [
        {
          type: 'split',
          props: {
            weight: 'media',
            reverse: false,
            media: img(
              'HIMALAYAN TOPOGRAPHY · RF PROPAGATION CHALLENGE',
              'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.51 PM.jpeg',
              'Dehradun valley transport corridor and Himalayan mountain ridge infrastructure',
              'Topological Reality: Deep mountain corridors where conventional radio fails, necessitating multi-hop mesh routing.',
              '16/9'
            ),
            text: {
              eyebrow: 'TOPOLOGICAL CONSTRAINTS · 64-BYTE PACKETS',
              heading: 'Sub-GHz Autonomous Packet Hopping',
              body: [
                'High-frequency signals scatter against torrential mountain rain. EBS transmits over sub-GHz LoRa radio frequencies that bend along terrain contours and reflect off granite valley walls.',
                'Alerts are compressed into 64-byte cryptographic micro-packets containing only timestamped GPS coordinates, hazard status codes, and leader signatures—ensuring propagation across 15+ km corridors with sub-second transit.',
              ],
            },
          },
        },
        {
          type: 'architectureComparison',
          props: {
            title: 'SYSTEM SPECIFICATION & VALIDATION STATUS',
            subtitle: 'Engineering accountability: explicitly distinguishing proposed theoretical network protocols from implemented, physical hardware prototypes.',
            options: [
              {
                name: 'Proposed Valley Mesh Protocol',
                badge: 'Proposed System Specification',
                isSelected: false,
                tagline: 'Autonomous ridge-hopping & micro-packet routing specification',
                whyExplored: 'Designed to bypass line-of-sight granite blockage using lightweight 64-byte peer-to-peer RF packet routing without central servers.',
                limitations: 'Requires regional node saturation across civil checkpoints to establish full redundant valley coverage during catastrophic events.',
                attributes: [
                  { label: 'Network Topology', value: 'Decentralized Multi-Hop Mesh' },
                  { label: 'Payload Limit', value: '64-Byte Cryptographic Micro-Packets' },
                  { label: 'Carrier Frequency', value: 'Sub-GHz LoRa (868/915 MHz)' },
                  { label: 'Current Status', value: 'Protocol Architecture & RF Simulation', positive: false },
                ],
                verdict: 'Validated via RF propagation modeling; proposed for regional civic rollout with State Disaster Management Authorities (SDMA).',
              },
              {
                name: 'EBS Guardian Physical Hardware',
                badge: 'Implemented & Validated Prototype',
                isSelected: true,
                tagline: '1:1 Functional kinetic transceiver prototype (Space 04 / Bay 02)',
                whyExplored: 'Physical hardware engineered to survive freezing rain, zero grid power, and severe physical impacts in catastrophic shock.',
                limitations: 'Manual generation requires human cranking (3 minutes rotation yields 120 minutes of continuous beacon transmission).',
                attributes: [
                  { label: 'Kinetic Dynamo', value: '40:1 High-Ratio Planetary Gearbox', positive: true },
                  { label: 'Ingress Protection', value: 'IP67 Weatherproof Sealed', positive: true },
                  { label: 'Tactile Controls', value: 'Glove-Operable Mechanical Switchgear', positive: true },
                  { label: 'Current Status', value: '1:1 Scale Physical Prototype Built', positive: true },
                ],
                verdict: 'Fully engineered and built at 1:1 scale; physical prototype and CAD engineering models available in the Colonnade Garage.',
              },
            ],
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 06: PRODUCT DEVELOPMENT
       ======================================================================== */
    {
      id: 'cs-ebs-product',
      index: '06',
      label: 'Product Development',
      title: 'Mechanical Packaging & Engineering Tolerances',
      intro: 'Internal packaging, kinetic gear train integration, and precision orthographic drawings.',
      blocks: [
        {
          type: 'split',
          props: {
            weight: 'media',
            reverse: false,
            media: img(
              'INTERNAL PACKAGING · EXPLODED MECHANICAL ANATOMY',
              'assets/Project_2/Exhibition/08-product-hardware-anatomy.jpg',
              'Exploded technical anatomy showing internal planetary dynamo, PCB, antenna, and sealed housing',
              'Exploded Mechanical Architecture: 40:1 planetary dynamo, sealed PCB enclosure, and shock-absorbing outer bumper.',
              '16/9'
            ),
            text: {
              eyebrow: 'INTERNAL PACKAGING · MECHANICAL CAD',
              heading: 'Planetary Gearbox & IP67 Sealing',
              body: [
                'The internal packaging tightly integrates a 40:1 high-ratio planetary gear train, permanent magnet generator, and cold-weather LiFePO4 buffer cell.',
                'Dual silicone perimeter gaskets protect the RF transceiver board against continuous immersion and torrential mountain rainfall, ensuring indefinite shelf life without battery deterioration.',
              ],
            },
          },
        },
        {
          type: 'split',
          props: {
            weight: 'media',
            reverse: true,
            media: img(
              'ORTHOGRAPHIC ENGINEERING SPECIFICATION',
              'assets/Project_2/Exhibition/09-interface-ux-drawing.jpg',
              'Orthographic technical engineering drawing detailing dimensional tolerances and mechanical clearances',
              'Engineering Documentation: Dimensional clearances, tactile switch angles, and interface UX ergonomics.',
              '16/9'
            ),
            text: {
              eyebrow: 'ENGINEERING SPECIFICATION · ORTHOGRAPHIC DRAWING',
              heading: 'Precision Tolerances for Stress Operability',
              body: [
                'Every dimension is dialed for emergency human factors: a 38mm knurled rotary selector for positive indexing with gloves, a recessed SOS trigger with a physical safety guard, and an 80 kg load-rated bottom lanyard anchor.',
              ],
            },
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 07: APPLICATION AND GARAGE CONNECTION
       ======================================================================== */
    {
      id: 'cs-ebs-application',
      index: '07',
      label: 'Application & Garage',
      title: 'Civic Preparedness & Spatial Prototype',
      intro: 'Embedding life-safety hardware into daily mountain life, and transitioning into the 3D Colonnade Garage.',
      blocks: [
        {
          type: 'split',
          props: {
            weight: 'balanced',
            reverse: false,
            media: img(
              'MODULAR TREKKING POLE DEPLOYMENT',
              'assets/Project_2/Exhibition/07-trekking-pole-concept.jpg',
              'Modular concept showing EBS transceiver mounted on trekking staff for elevated signal propagation',
              'Modular Tactical Deployment: Handheld unit docks onto walking poles to elevate antenna reach above ground obstacles.',
              '16/9'
            ),
            text: {
              eyebrow: 'CIVIC UTILITY · DUAL-PURPOSE PREPAREDNESS',
              heading: 'Familiarity Before Disaster Strikes',
              body: [
                'Emergency equipment stored in locked disaster cupboards fails because panic erases unfamiliar instructions. EBS functions in calm seasons as a standard trail safety beacon for mountain guides and forest ranger patrols.',
                'A quick-release bayonet collar allows the unit to dock directly onto trekking poles, elevating the omnidirectional antenna 2 meters above ground clutter to maximize ridge line-of-sight.',
              ],
            },
          },
        },
        {
          type: 'designDecision',
          props: {
            index: 'GARAGE',
            decision: 'Inspect the 1:1 Functional Prototype in the Colonnade Garage',
            rationale: 'The complete physical hardware prototype, internal kinetic mechanisms, and material finishes are permanently housed in Space 04: Colonnade Garage (Bay 02). Explore 3D clearances, examine the hand-crank assembly, and view full spatial dimensions.',
            impact: 'Direct transition to Space 04: Colonnade Garage (Bay 02).',
          },
        },
      ],
    },
  ],

  /**
   * The Workshop entrance — one quiet doorway after Implementation.
   * Owned by this project; rendered once, outside the chapter list.
   */
  workshop: {
    line: 'The deployed hardware is only the visible surface.',
    aside: 'Behind this door: the field notes, kinetic mechanism studies, failed housing prototypes, and mesh protocols.',
    label: 'Step into the workshop',
    href: '#ebs-tech/workshop',

    /** The studio floor — five stations. */
    zones: [
      {
        id: 'field-notebook',
        name: 'Field Notebook',
        object: 'notebook',
        note: 'Ground zero interviews, disaster choke points, community gatekeeper logs.',
      },
      {
        id: 'sketchbook',
        name: 'Sketchbook',
        object: 'sketchbook',
        note: 'Hand-crank form explorations, ergonomic grip iterations, failed concepts.',
      },
      {
        id: 'engineering-table',
        name: 'Engineering Table',
        object: 'table',
        note: 'Planetary dynamo gearing, sub-GHz LoRa RF specs, IP67 seals.',
      },
      {
        id: 'workflow',
        name: 'Workflow',
        object: 'workflow',
        note: 'Synthesizing field reality, 3D CAD mechanism, and drop-testing.',
      },
      {
        id: 'prototype',
        name: 'Prototype',
        object: 'prototype',
        note: 'Functional 1:1 kinetic transceiver in deployed state.',
      },
    ],
  },
};

export default ebsTech;
