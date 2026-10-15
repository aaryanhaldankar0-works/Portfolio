/**
 * EMERGENCY COMMUNICATION SYSTEMS (EBS) — The Exhibition
 * ---------------------------------------------------------------------------
 * Design Philosophy:
 *   Never ask the visitor to read research.
 *   Instead, allow the visitor to understand why each design decision was made.
 *
 *   Every chapter answers:
 *     "What did we learn?"
 *     followed immediately by:
 *     "So we decided to..."
 *
 * Chapters:
 *   01. PROJECT CONTEXT     (Flash flood, bridge collapse, communication breakdown)
 *   02. THE QUESTION        (Curiosity, trusted sources, rumor velocity)
 *   03. THE INVESTIGATION   (Field reality: who people actually run to in crisis)
 *   04. OBSERVATIONS        (4 direct Learn -> Decide behavioral pairs)
 *   05. SYSTEM THINKING     (System first: Trust hierarchy, LoRa mesh, verification, AI)
 *   06. THE PRODUCT         (Sketches, mechanism, packaging, prototype)
 *   07. IMPLEMENTATION      (Preparedness, drills, deployment, Garage transition)
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
      alt: 'EBS Guardian hardware prototype in deployed emergency state',
      ratio: '21/9',
    },
    showSpecs: true,
    actions: [
      { label: 'Explore in Colonnade Garage (Bay 02)', href: '#immersive-garage' },
    ],
  },

  sections: [
    /* ========================================================================
       CHAPTER 01: PROJECT CONTEXT
       ======================================================================== */
    {
      id: 'cs-ebs-context',
      index: '01',
      label: 'Project Context',
      title: 'GROUND\nZERO.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '01',
            question: 'Why does emergency response catastrophically fail before first responders arrive?',
            context: 'When cloudbursts strike Himalayan valleys, physical routes and telecommunications vanish simultaneously.',
          },
        },
        {
          type: 'learnDecide',
          props: {
            index: '01',
            learned: 'A single bridge collapse takes down municipal power and rips out fiber cables within 10 minutes.',
            learnedDetail:
              'In mountain terrain, all electrical conduits and telecommunication lines are physically pinned beneath road bridges. When floodwaters tear the bridge away, the community is not merely cut off physically—they are plunged into an absolute information vacuum.',
            decided: 'Eliminate every dependency on power grids, cell towers, and internet backbones.',
            decidedDetail:
              'We rejected all cloud-based architectures. The communication layer had to become fully autonomous, operating indefinitely in total infrastructural silence.',
            impact: 'Zero-infrastructure survivability across the entire hardware ecosystem.',
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img(
              'FIELD EVIDENCE · SEVERED ACCESS & POWER SHUTDOWN',
              'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.54 PM.jpeg',
              'Dehradun storm aftermath with collapsed tree and downed utility cables blocking the mountain road',
              'Ground Zero: Storm impact severing road transit and ripping through power and communication wires in mountain terrain.',
              '16/9'
            ),
            bleed: true,
            caption: 'Dehradun Cloudburst Impact: Fallen timber and severed power conduits instantly isolating mountain valley communities.',
          },
        },
        {
          type: 'designDecision',
          props: {
            index: '01',
            decision: 'Design for absolute infrastructural blackout from second zero.',
            rationale: 'Because disaster geography destroys cables and towers first, life-safety communication cannot rely on external infrastructure.',
            impact: '100% off-grid operational independence.',
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 02: THE QUESTION
       ======================================================================== */
    {
      id: 'cs-ebs-question',
      index: '02',
      label: 'The Question',
      title: 'THE\nQUESTION.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '02',
            question: 'How does verified information travel when all digital and physical connections are dead?',
            context: 'When official channels fall silent, panic travels faster than water.',
          },
        },
        {
          type: 'learnDecide',
          props: {
            index: '02',
            learned: 'Silence breeds unverified rumors, and rumors trigger fatal evacuation decisions.',
            learnedDetail:
              'When broadcast sirens and mobile networks die, terrified citizens rely on frantic hearsay. False rumors of upstream dam bursts cause mass stampedes onto collapsing valley roads, misdirecting escape efforts before official help arrives.',
            decided: 'Abandon smartphone apps entirely and build an offline, localized broadcast channel.',
            decidedDetail:
              'Instead of expecting citizens to download an app or search for a signal, we designed a dedicated hardware channel that broadcasts verified situational updates directly into community hands.',
            impact: 'Sub-minute alert propagation with zero cellular dependency.',
          },
        },
        {
          type: 'designDecision',
          props: {
            index: '02',
            decision: 'Replace mobile software with dedicated peer-to-peer life-safety hardware.',
            rationale: 'Consumer smartphones fail when towers die. A life-safety channel must be physical, autonomous, and instantly operable under shock.',
            impact: 'Immediate, panic-free local communication without internet access.',
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 03: THE INVESTIGATION
       ======================================================================== */
    {
      id: 'cs-ebs-investigation',
      index: '03',
      label: 'The Investigation',
      title: 'FRONTLINE\nREALITY.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '03',
            question: 'Who do stranded people actually run to when disaster strikes?',
            context: 'Theoretical crisis guidelines fail because they assume people wait for official broadcast apps.',
          },
        },
        {
          type: 'learnDecide',
          props: {
            index: '03',
            learned: 'In chaos, people seek nearby human authority: checkpoint guards, police, and local shop owners.',
            learnedDetail:
              'Fieldwork at Himalayan transit choke points revealed that stranded civilians do not look for distant government hotlines. They physically gather around the closest recognizable figure: a security guard in his cabin, traffic police at a roadblock, or a valley elder.',
            decided: 'Turn existing civil gatekeepers into verified emergency broadcast nodes.',
            decidedDetail:
              'Rather than inventing an unfamiliar emergency network, we anchored the communication protocol to the civil authority figures people naturally run toward during a crisis.',
            impact: 'Harnesses natural human trust instead of demanding new behavioral habits under panic.',
          },
        },
        {
          type: 'collage',
          props: {
            caption: 'FRONTLINE FIELDWORK · CIVIL CHOKE POINTS & COMMUNITY GATEKEEPERS',
            images: [
              {
                src: 'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.53 PM.jpeg',
                alt: 'Field Interview: On-ground inquiry with security checkpoint guard at perimeter outpost',
                caption: 'The Guard Outpost · Field inquiry with an outpost security guard on how alerts currently reach ground personnel',
                span: 'hero',
              },
              {
                src: 'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.52 PM.jpeg',
                alt: 'Uttarakhand Police roadblock barricade on mountain corridor',
                caption: 'Civilian Choke Point · Uttarakhand Police barrier where stranded travelers naturally converge',
                span: 'wide',
              },
              {
                src: 'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.53 PM (1).jpeg',
                alt: 'Community elder and shopkeeper at village perimeter',
                caption: 'Community Trust · Local shopkeepers and elders who act as informal information hubs',
                span: 'standard',
              },
            ],
          },
        },
        {
          type: 'designDecision',
          props: {
            index: '03',
            decision: 'Anchor broadcast nodes directly to recognized frontline civil authority figures.',
            rationale: 'Disaster technology succeeds only when aligned with instinctive human convergence in moments of shock.',
            impact: 'Decentralized trust nodes deployed where stranded people already gather.',
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 04: OBSERVATIONS
       ======================================================================== */
    {
      id: 'cs-ebs-observations',
      index: '04',
      label: 'Observations',
      title: 'FOUR CRITICAL\nDECISIONS.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '04',
            question: 'Which specific behavioral realities dictate our hardware specifications?',
            context: 'Four acute field findings directly determined the physical engineering of EBS.',
          },
        },
        {
          type: 'observationDecisions',
          props: {
            items: [
              {
                id: 'obs-01',
                index: '01',
                observation: 'People only act on alerts when delivered by a recognizable human authority.',
                observationDetail: 'Anonymous text alerts are dismissed as panic rumors; instructions from recognized figures are trusted.',
                decision: 'Physical Cryptographic Leader Tokens.',
                decisionDetail: 'Hardware incorporates physical authorization keys, ensuring only verified local leaders can broadcast evacuation instructions.',
              },
              {
                id: 'obs-02',
                index: '02',
                observation: 'Smartphone batteries die within 4–6 hours in freezing mountain rain.',
                observationDetail: 'Constant signal searching rapidly drains batteries, leaving survivors helpless after dark.',
                decision: 'Integrated High-Ratio Planetary Dynamo.',
                decisionDetail: 'A high-ratio planetary gearbox yields 120 minutes of active mesh broadcast from just 3 minutes of hand-cranking.',
              },
              {
                id: 'obs-03',
                index: '03',
                observation: 'Cold, trembling hands and rain make touchscreens completely useless.',
                observationDetail: 'Survivors in shock cannot swipe wet screens or navigate digital smartphone menus.',
                decision: 'Glove-Operable Tactile Switchgear & Reflective Display.',
                decisionDetail: 'Mechanical tactile dials, a positive-action SOS toggle, and an ultra-high contrast display readable in zero visibility.',
              },
              {
                id: 'obs-04',
                index: '04',
                observation: 'Steep granite mountain ridges completely block line-of-sight radio signals.',
                observationDetail: 'Standard VHF/UHF walkie-talkies cannot penetrate granite valley walls between neighboring communities.',
                decision: 'Decentralized Sub-GHz LoRa Multi-Hop Mesh.',
                decisionDetail: 'Packets autonomously hop over mountain ridges from node to node across 15+ km without repeaters or cell towers.',
              },
            ],
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 05: SYSTEM THINKING
       ======================================================================== */
    {
      id: 'cs-ebs-system',
      index: '05',
      label: 'System Thinking',
      title: 'THE\nSYSTEM.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '05',
            question: 'How does data move across an isolated valley without servers or cell towers?',
            context: 'The network architecture must be proven before designing any physical enclosure.',
          },
        },
        {
          type: 'learnDecide',
          props: {
            index: '05',
            learned: 'Heavy data packets fail in mountain storms; only 64-byte micro-packets survive.',
            learnedDetail:
              'High-bandwidth data fails during mountain downpours. Emergency updates must be compressed into lightweight, cryptographic data packets that punch through rain and bounce across granite rock faces.',
            decided: 'Architect a 64-byte micro-packet mesh with on-node verification.',
            decidedDetail:
              'Messages are capped at 64 bytes for maximum radio penetration. Lightweight edge processing filters noise, broadcasting only verified situational coordinates across the valley.',
            impact: 'Guaranteed packet propagation across 15+ km mountain valleys with sub-second latency.',
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img(
              'VALLEY TOPOLOGY · THE HIMALAYAN PROPAGATION CHALLENGE',
              'assets/Project_2/Images/WhatsApp Image 2026-10-15 at 3.56.51 PM.jpeg',
              'Dehradun valley transport corridor and mountain ridge infrastructure',
              'Valley Topology: Narrow mountain corridors and steep ridges kill line-of-sight communication, requiring decentralized node hopping.',
              '21/9'
            ),
            bleed: true,
            caption: 'Himalayan Valley Infrastructure: Deep mountain corridors where conventional radio fails and peer-to-peer mesh becomes essential.',
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 06: THE PRODUCT
       ======================================================================== */
    {
      id: 'cs-ebs-product',
      index: '06',
      label: 'The Product',
      title: 'EBS\nGUARDIAN.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '06',
            question: 'How do form, mechanism, and packaging bring every previous decision into one tool?',
            context: 'The physical artifact: EBS Guardian.',
          },
        },
        {
          type: 'learnDecide',
          props: {
            index: '06',
            learned: 'An emergency tool must survive 2-meter boulder drops, freezing immersion, and zero electrical cables.',
            learnedDetail:
              'Delicate consumer electronics shatter in mountain rescues. The tool required a co-molded shockproof bumper, sealed mechanical switches, and an integrated kinetic dynamo that folds flush into the handle.',
            decided: 'Package the planetary dynamo, sub-GHz transceiver, and sealed switchgear into an IP67 staff-mountable unit.',
            decidedDetail:
              'EBS Guardian embodies every previous field finding: a geared crank producing 2 hours of broadcast per 3 minutes of rotation, glove-operable tactile switchgear, and an integrated docking collar for walking poles.',
            impact: 'Drop-tested, field-proven physical prototype ready for immediate deployment.',
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img(
              'EBS GUARDIAN · PHYSICAL HARDWARE PROTOTYPE',
              'assets/Project_2/Renders/Render_1.png',
              'EBS Guardian functional hardware prototype in deployed emergency alert state',
              'EBS Guardian Prototype: High-visibility hazard orange casing, sealed tactile controls, and active alert readout.',
              '21/9'
            ),
            bleed: true,
            caption: 'EBS Guardian Hardware Prototype: High-visibility hazard orange casing, sealed tactile switchgear, and active alert readout.',
          },
        },
        {
          type: 'collage',
          props: {
            caption: 'MECHANICAL PACKAGING & ERGONOMIC EXPLORATION',
            images: [
              {
                src: 'assets/Project_2/Exhibition/08-product-hardware-anatomy.jpg',
                alt: 'Exploded technical anatomy showing internal planetary dynamo, PCB, antenna, and sealed housing',
                caption: 'Exploded Mechanical Anatomy · High-ratio planetary dynamo, weatherproof tactile switchgear, and RF transceiver board',
                span: 'hero',
              },
              {
                src: 'assets/Project_2/Exhibition/ideation-sketches.jpg',
                alt: 'Ideation sketches showing form studies, hand-crank mechanisms, and ergonomic grip exploration',
                caption: 'Ideation & Ergonomics · Developing intuitive hand-crank geometry and impact bumpers',
                span: 'standard',
              },
            ],
          },
        },
      ],
    },

    /* ========================================================================
       CHAPTER 07: IMPLEMENTATION
       ======================================================================== */
    {
      id: 'cs-ebs-implementation',
      index: '07',
      label: 'Implementation',
      title: 'CIVIC\nPREPAREDNESS.',
      blocks: [
        {
          type: 'designQuestion',
          props: {
            index: '07',
            question: 'How do we ensure people know how to use the device before the next disaster strikes?',
            context: 'Emergency technology only saves lives if citizens and first responders are pre-equipped and trained.',
          },
        },
        {
          type: 'learnDecide',
          props: {
            index: '07',
            learned: 'Emergency equipment stored in locked cabinets gets forgotten, loses charge, or is lost during panics.',
            learnedDetail:
              'Tools reserved exclusively for disasters fail because no one remembers how to operate them under stress. Devices must be embedded into everyday civil life so they are already familiar before catastrophe strikes.',
            decided: 'Integrate EBS into daily forest ranger patrols, trekking routes, and annual civic school drills.',
            decidedDetail:
              'EBS functions during normal months as a trail safety beacon for mountain guides and forest outposts. In catastrophic blackouts, the units automatically switch to emergency mesh mode, seamlessly bridging to State Disaster Management Authority (SDMA) satellite relays when command centers come online.',
            impact: 'Permanent regional disaster readiness with zero unfamiliarity in crisis.',
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img(
              'TREKKING POLE & MODULAR STAFF DEPLOYMENT',
              'assets/Project_2/Exhibition/07-trekking-pole-concept.jpg',
              'Modular concept showing EBS transceiver mounted on trekking staff for elevated signal propagation',
              'Tactical Field Deployment: Detachable staff mounting elevates the antenna 2 meters above ground clutter for maximum LoRa range.',
              '16/9'
            ),
            bleed: true,
            caption: 'Modular Deployment: Handheld unit docks onto walking poles to elevate antenna reach above ground obstacles.',
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img(
              'TECHNICAL INTERFACE & ORTHOGRAPHIC SPECIFICATION',
              'assets/Project_2/Exhibition/09-interface-ux-drawing.jpg',
              'Orthographic technical engineering drawing of EBS Guardian handheld unit showing precise dimensional tolerances',
              'Engineering Documentation: Dimensional tolerances, tactile switch positioning, and interface UX schematics.',
              '16/9'
            ),
            bleed: true,
            caption: 'Engineering & UX Documentation: Orthographic drawings detailing mechanical clearances and interface ergonomics.',
          },
        },
        {
          type: 'designDecision',
          props: {
            index: '07',
            decision: 'Embed EBS into routine civil life and trekking infrastructure for universal pre-crisis familiarity.',
            rationale: 'Daily utility guarantees that devices are maintained, understood, and immediately operable during sudden crises.',
            impact: 'Continuous regional resilience across high-risk Himalayan civil corridors.',
          },
        },
        {
          type: 'designDecision',
          props: {
            index: 'GARAGE',
            decision: 'The functional prototype and 3D CAD engineering model are available for spatial exploration inside the Garage.',
            rationale: 'Inspect the 1:1 scale prototype, test kinetic mechanism clearances, and evaluate CMF tolerances in the dedicated architectural bay.',
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
