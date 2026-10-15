/**
 * BHARAT MOBILITY POD — Editorial Case Study
 * ---------------------------------------------------------------------------
 * Chapters:
 * - Project Hero: Large hero render placeholder, minimal text.
 * - Section 01: IT STARTED WITH A QUESTION. (Story + 1 large photography placeholder)
 * - Section 02: UNDERSTANDING THE CITY. (Observational narrative + Road Hierarchy terrain placeholders)
 * - Section 03: OBSERVING HOW PEOPLE MOVE. (Trackers, Vikrams, Scooters, Motorcycles instead of buses)
 * - Section 04: ASKING THE RIGHT QUESTIONS. (Notebook style field inquiry)
 * - Section 05: THE ANSWERS CHANGED EVERYTHING. ("The vehicle wasn't the problem. The journey was." + Journey Map)
 * - Section 06: THE WAITING PROBLEM. (10–15 min waiting, driver pressure, discomfort, occupancy, comfort)
 *
 * Stops at Section 06 as specified.
 */

const img = (label, ratio = '16/9', extra = {}) => ({ kind: 'image', label, ratio, ...extra });
const render = (label, ratio = '21/9', extra = {}) => ({ kind: 'render', label, ratio, ...extra });
const sketch = (label, ratio = '4/3', extra = {}) => ({ kind: 'sketch', label, ratio, ...extra });

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
    showSpecs: false, // Very little text. Large image.
    actions: [
      { label: 'Explore in Virtual Garage (3D)', href: '#immersive-garage' },
    ],
  },

  sections: [
    {
      id: 'cs-started-with-a-question',
      index: '01',
      label: 'Origin',
      title: 'IT STARTED\nWITH A QUESTION.',
      blocks: [
        {
          type: 'editorial',
          props: {
            eyebrow: 'First Semester · Design Direction',
            body: [
              'During my first semester my mentor suggested I first understand the city before designing a vehicle.',
            ],
            align: 'offset',
            showHeadingSlot: false,
            slotLines: 0,
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img('FIELD PHOTOGRAPHY · THE LIVING CITY', '21/9', {
              caption: 'Field photography — stepping out of the studio to observe the daily rhythms of Tier 2 & 3 street corridors.',
            }),
            bleed: true,
          },
        },
      ],
    },
    {
      id: 'cs-understanding-the-city',
      index: '02',
      label: 'Observational Study',
      title: 'UNDERSTANDING\nTHE CITY.',
      intro:
        'Instead of treating terrain as an abstract dataset, the project began with observational fieldwork. Mobility here does not happen on planned uniform grids; it navigates a layered, evolving road hierarchy.',
      blocks: [
        {
          type: 'researchGrid',
          props: {
            columns: 4,
            variant: 'media',
            items: [
              {
                media: img('TERRAIN PHOTOGRAPHY · VILLAGE ROADS', '4/3'),
                stat: '01',
                title: 'Village roads',
                body:
                  'Unpaved periphery connectors, variable surface grades, and unbanked turns where transit vehicles must maintain ground clearance and roll stability.',
              },
              {
                media: img('TERRAIN PHOTOGRAPHY · URBAN ROADS', '4/3'),
                stat: '02',
                title: 'Urban roads',
                body:
                  'Multi-speed shared corridors where micro-transit continuously maneuvers alongside high-speed arterial flow, two-wheelers, and pedestrians.',
              },
              {
                media: img('TERRAIN PHOTOGRAPHY · COMMERCIAL ROADS', '4/3'),
                stat: '03',
                title: 'Commercial roads',
                body:
                  'Dense marketplace arteries with heavy curb encroachment, informal pickup stops, and intense pedestrian cross-flow.',
              },
              {
                media: img('TERRAIN PHOTOGRAPHY · NARROW LANES', '4/3'),
                stat: '04',
                title: 'Narrow lanes',
                body:
                  'Sub-4-meter interior passages and historic corridors where conventional city buses physically cannot enter or turn.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-observing-how-people-move',
      index: '03',
      label: 'Modal Realities',
      title: 'OBSERVING\nHOW PEOPLE MOVE.',
      intro:
        'Inside the narrow interior roads, conventional city buses were physically non-existent. Instead, the streets were entirely populated by intermediate and informal modes: Trackers, Vikrams, scooters, and motorcycles.',
      blocks: [
        {
          type: 'fullWidthImage',
          props: {
            media: img('FIELD PHOTOGRAPHY · NARROW ROAD TRANSIT REALITY', '21/9', {
              caption: 'Field observation — intermediate shared vehicles and two-wheelers navigating narrow city corridors where buses cannot enter.',
            }),
            bleed: true,
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 4,
            variant: 'media',
            items: [
              {
                media: img('FIELD PHOTOGRAPHY · TRACKERS', '4/3'),
                stat: '01',
                title: 'Trackers',
                body:
                  'Rugged high-capacity informal diesel four-wheelers packed beyond rated limits to bridge peripheral villages and transit nodes.',
              },
              {
                media: img('FIELD PHOTOGRAPHY · VIKRAMS', '4/3'),
                stat: '02',
                title: 'Vikrams',
                body:
                  'Front-engine, high-floor shared three-wheelers serving as the primary corridor transit with cramped side-facing bench seating.',
              },
              {
                media: img('FIELD PHOTOGRAPHY · SCOOTERS', '4/3'),
                stat: '03',
                title: 'Scooters',
                body:
                  'The de facto family carrier, chosen out of necessity because scheduled public transit fails door-to-door access.',
              },
              {
                media: img('FIELD PHOTOGRAPHY · MOTORCYCLES', '4/3'),
                stat: '04',
                title: 'Motorcycles',
                body:
                  'High-maneuverability personal transport weaving through congested bottlenecks where four-wheel vehicles stall.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-asking-the-right-questions',
      index: '04',
      label: 'Field Inquiries',
      title: 'ASKING\nTHE RIGHT QUESTIONS.',
      intro:
        'To move beyond external visual observation, I spent time talking to regular commuters across bus stands, tracker ranks, and market junctions.',
      blocks: [
        {
          type: 'notebook',
          props: {
            title: 'COMMUTER INQUIRY JOURNAL · FIELD LOG',
            date: 'ON-SITE RESEARCH · SEMESTER 01',
            questions: [
              'How do you travel to work?',
              'How do you buy groceries?',
              'How do you watch movies?',
              'How do you travel for leisure?',
              'How do you reach the city centre?',
            ],
            notes: [
              'Commuters schedule their entire daily routine around vehicle frequency rather than road distance.',
              'A trip of just 5 km frequently demands two separate vehicle changes and lengthy sidewalk waiting.',
              'Fares are paid in cash at every transfer, creating friction and unpredictable trip budgets.',
            ],
            media: img('NOTEBOOK SKETCH · FIELD INTERVIEW NOTES', '4/3'),
          },
        },
      ],
    },
    {
      id: 'cs-the-answers-changed-everything',
      index: '05',
      label: 'The Journey Shift',
      title: 'THE ANSWERS\nCHANGED EVERYTHING.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'The vehicle wasn\'t the problem. The journey was.',
            emphasis: 'The journey was.',
            note: 'STRUCTURAL INSIGHT · FROM PRODUCT TO SYSTEM',
            align: 'left',
          },
        },
        {
          type: 'journeyMap',
          props: {
            title: 'MAPPING THE BROKEN COMMUTE',
            subtitle:
              'A standard journey is not a continuous line. It is a fragmented chain of disjointed transfers, long waits, and exposed walks.',
            steps: [
              {
                mode: 'Pedestrian',
                label: 'Walking',
                note: 'Navigating unpaved village lanes or narrow residential alleys to reach an accessible pickup point.',
                friction: 'Footpath absence & weather exposure',
              },
              {
                mode: 'Feeder Transit',
                label: 'Tracker',
                note: 'Boarding an overcrowded shared tracker for the intermediate stretch toward the primary highway.',
                friction: '10–15 min waiting & cramped seating',
              },
              {
                mode: 'Corridor Transit',
                label: 'Bus',
                note: 'Transferring to a city bus for the main corridor leg; erratic frequency and heavy crowd pressure.',
                friction: 'Transfer friction & schedule delay',
              },
              {
                mode: 'Pedestrian',
                label: 'Walking',
                note: 'Last-mile foot journey through congested marketplace intersections to reach the workplace.',
                friction: 'Pedestrian conflicts & fatigue',
              },
              {
                mode: 'Arrival',
                label: 'Destination',
                note: 'Arrival at office, college, or market after high mental stress, variable wait times, and compounded fatigue.',
                friction: 'Accumulated commute friction',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-the-waiting-problem',
      index: '06',
      label: 'Core Friction',
      title: 'THE WAITING\nPROBLEM.',
      intro:
        'Across every user narrative, the deepest pain point was not speed on the road — it was the friction of waiting and the uncoordinated economics that drive it.',
      blocks: [
        {
          type: 'researchGrid',
          props: {
            columns: 3,
            variant: 'cards',
            items: [
              {
                stat: '10–15 min',
                title: 'Extended Waiting Cycles',
                body:
                  'Commuters routinely endure 10 to 15 minutes of dead time at every intermediate junction with no schedule predictability.',
              },
              {
                stat: 'Income',
                title: 'Driver Income Pressure',
                body:
                  'Drivers do not operate on fixed timetable departures. They cannot afford to leave until every single bench space is full, forcing early riders to wait.',
              },
              {
                stat: 'Ergo',
                title: 'Passenger Discomfort',
                body:
                  'Waiting occurs on open dusty roadsides or cramped inside stationary, unventilated cabins with zero ergonomic lumbar support.',
              },
              {
                stat: 'Capacity',
                title: 'Vehicle Occupancy Imbalance',
                body:
                  'Vehicles operate in extreme binaries: either parked idle waiting to fill up, or severely overloaded beyond manufacturer safety ratings.',
              },
              {
                stat: 'Experience',
                title: 'Customer Comfort Deficit',
                body:
                  'Loud cabin environments, high ingress thresholds, inward knee collisions, and lack of luggage space turn simple daily routines into exhausting ordeals.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-design-opportunity',
      index: '07',
      label: 'Design Opportunity',
      title: 'DESIGN OPPORTUNITY',
      intro:
        'Synthesizing months of street observation, commuter interviews, and route tracking converged on a single foundational realization.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'The existing transport ecosystem creates friction during transfers rather than during movement itself.',
            emphasis: 'friction during transfers',
            note: 'SYNTHESIS INSIGHT · TRANSIT ARCHITECTURE',
            align: 'left',
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'System Level Diagnosis',
            body: [
              'Automotive design traditionally obsesses over cruising speed, aerodynamic drag coefficients, and highway aesthetics. Yet in Tier 2 and Tier 3 Indian cities, commuters spend the majority of their travel time standing at unshaded curbs, negotiating fares, and climbing between mismatched floor heights.',
              'A truly transformational mobility pod could not simply be a faster box on wheels. It had to eliminate the physical, operational, and cognitive friction of the transfer points.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
        {
          type: 'divider',
          props: {
            label: 'Research Synthesis → First Iteration',
          },
        },
      ],
    },
    {
      id: 'cs-my-first-idea',
      index: '08',
      label: 'Initial Concept',
      title: 'MY FIRST IDEA.',
      intro:
        'Confronted by transfer friction, my first design reflex was ambitious: what if commuters never had to leave their personal vehicles at all?',
      blocks: [
        {
          type: 'editorial',
          props: {
            eyebrow: 'Concept Genesis · The Mother Pod',
            body: [
              'I envisioned a mothership transit architecture dubbed "The Mother Pod" — a high-capacity autonomous cabin engineered specifically to carry passengers while docked inside their personal scooters and micro-mobility vehicles.',
              'The theory was seductively simple: ride your scooter to the pod, roll directly into an automated restraint bay, cruise down the arterial corridor at high speed, and roll straight out into your final narrow lane without a single foot touching the ground.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: sketch('THE MOTHER POD · PERSONAL SCOOTER DOCKING POD', '21/9', {
              caption:
                'Early concept ideation — an autonomous mothership designed to swallow personal scooters whole to bypass transfer friction.',
            }),
            bleed: true,
          },
        },
      ],
    },
    {
      id: 'cs-why-it-failed',
      index: '09',
      label: 'Failure Analysis',
      title: 'WHY IT FAILED.',
      intro:
        'Design maturity is defined by how quickly you kill bad ideas that look brilliant in sketches. When subjecting the Mother Pod to engineering and ground reality, the entire premise collapsed.',
      blocks: [
        {
          type: 'comparison',
          props: {
            mode: 'side',
            before: {
              label: 'Idealized Vision: Scooter Carrier',
              media: sketch('IDEALIZED CONCEPT · SCOOTER BAY ARCHITECTURE', '4/3', {
                caption: 'Theoretical packaging: Roll-in roll-out scooter bays in clean CAD space.',
              }),
            },
            after: {
              label: 'Reality Check: Spatial & Weight Failure',
              media: sketch('ENGINEERING COLLAPSE · VOLUMETRIC REALITY', '4/3', {
                caption: 'Physical reality: 65% volume wasted on metallic frames, mechanisms, and dead ballast.',
              }),
            },
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 4,
            variant: 'cards',
            items: [
              {
                stat: 'Volume',
                title: 'Packaging Collapse',
                body:
                  'Accommodating three personal scooters consumed over 65% of total interior volume, leaving barely enough headroom for three human passengers in a massive footprint.',
              },
              {
                stat: 'Mass',
                title: 'Weight Penalty',
                body:
                  'Mechanical loading ramps, wheel locking clamps, and reinforced floors added hundreds of kilograms of dead weight, drastically degrading battery range and brake safety.',
              },
              {
                stat: 'Mechanisms',
                title: 'Mechanical Complexity',
                body:
                  'Automated docking latches and variable-width tire restraints would inevitably jam in Dehradun’s monsoon mud, loose gravel dust, and steep roadway tilts.',
              },
              {
                stat: 'Demographics',
                title: 'Real-World Feasibility',
                body:
                  'The design excluded elderly passengers, parents carrying toddlers, students, and marketplace shoppers with grocery sacks — serving only able-bodied scooter riders.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-starting-again',
      index: '10',
      label: 'Pivot to Reality',
      title: 'STARTING AGAIN.',
      intro:
        'Killing the Mother Pod cleared the whiteboard. I stopped looking at science-fiction solutions and returned to the vehicle that already kept the entire city alive: the Tracker.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'Why did the Tracker become the starting point? Not because it already existed. Because users trusted it.',
            emphasis: 'Because users trusted it.',
            note: 'HUMAN-CENTERED FOUNDATION · CULTURAL VALIDATION',
            align: 'left',
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'The Trust Baseline',
            body: [
              'The Tracker had survived decades on Indian streets not through government subsidies, but because it solved problems no planner anticipated. Its narrow 1.3-meter track width slipped through ancient alleyways. Its low step-in height allowed saris and grocery bags easy passage. Its open ingress meant quick escapes and effortless boarding.',
              'Designers often make the mistake of destroying what works in an attempt to look futuristic. The real transportation design challenge was not inventing an alien pod that alienated the city. It was taking the trusted, proven packaging of the Tracker — and engineering away its diesel fumes, harsh noise, and brutal structural indignities.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
        {
          type: 'fullWidthImage',
          props: {
            media: img('FIELD INSPIRATION · THE TRACKER AS ARCHITECTURAL BASELINE', '21/9', {
              caption:
                'Returning to the baseline — studying the spatial footprint and cultural trust of the humble shared Tracker.',
            }),
            bleed: true,
          },
        },
      ],
    },
    {
      id: 'cs-form-exploration',
      index: '11',
      label: 'Form Exploration',
      title: 'FORM EXPLORATION',
      intro:
        'A transportation design portfolio lives through sketches. Rather than faking volume, this modular repository presents authentic early ideation alongside dedicated slots reserved for ongoing package, proportion, perspective, and detail studies.',
      blocks: [
        {
          type: 'sketchSystem',
          props: {
            title: 'FORM STUDIES & SKETCH ARCHIVE',
            categories: [
              'All Studies',
              'Current Sketches',
              'Future Sketches',
              'Package Studies',
              'Proportion Studies',
              'Perspective Studies',
              'Detail Studies',
            ],
            items: [
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Canopy Arch & Ingress Gesture',
                note: 'Pen and marker exploration testing open archway ingress and low-step floor heights.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · INITIAL CANOPY EXPLORATION',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-03-06 at 9.47.42 AM.jpeg',
                  alt: 'Early pen sketch exploring canopy and ingress geometry',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Cabin Silhouette & Beltline Rhythm',
                note: 'Side profile ideation defining the character line and high-visibility glass area.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · CABIN SILHOUETTE',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-03-06 at 9.56.21 AM.jpeg',
                  alt: 'Hand sketch exploring side profile and beltline',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Front Fascia & Lighting Identity',
                note: 'Exploring friendly, non-aggressive front illumination clusters and indicator bands.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · FRONT FASCIA GESTURE',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-09 at 4.39.46 PM.jpeg',
                  alt: 'Hand sketch exploring front fascia and lighting',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Step-in Proportions & Door Opening',
                note: 'Analyzing low threshold step-in clearance for elderly passengers and saris.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · STEP-IN PROPORTIONS',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-15 at 9.58.58 AM.jpeg',
                  alt: 'Hand sketch studying entry threshold and door geometry',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Door Structure & 3/4 Stance',
                note: 'Side-quarter perspective exploring bi-parting slider tracks and pillar integrity.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · DOOR STRUCTURE & STANCE',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-15 at 10.37.30 AM.jpeg',
                  alt: 'Hand sketch studying door mechanics and quarter view',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Aisle Flow & Seating Layout Concept',
                note: 'Early layout explorations tracking boarding speed and standee movement.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · AISLE FLOW EXPLORATION',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-05-13 at 12.21.03 AM.jpeg',
                  alt: 'Sketch concept of interior circulation',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Volumetric Massing & Ingress Sheet',
                note: 'Multi-view concept sheet testing ground clearance, bumper chamfers, and arch stances.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · COMPILATION SHEET',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/WhatsApp Image 2026-04-06 at 4.12.39 PM.jpeg',
                  alt: 'Concept sketch sheet of pod proportions',
                },
              },
              {
                category: 'Current Sketches',
                phase: 'Current Sketch',
                title: 'Digital Surface & Volume Blockout',
                note: 'Digital sketching studying volumetric massing, bumper chamfers, and wheel arch stances.',
                isReserved: false,
                media: {
                  kind: 'sketch',
                  label: 'CURRENT SKETCH · DIGITAL VOLUME BLOCKOUT',
                  ratio: '4/3',
                  src: 'assets/Project_1/Sketches/digi -1.png',
                  alt: 'Digital sketch studying volumetric proportions',
                },
              },
              {
                category: 'Package Studies',
                phase: 'Future Study',
                title: 'Seating Ergonomics & Aisle Clearance',
                note: 'Reserved slot: 2D packaging overlay tracking 50th/95th percentile human manikins, knee room, and 1.3m central aisle clearance.',
                isReserved: true,
                media: sketch('FUTURE STUDY · PACKAGING & SEATING CLEARANCE', '4/3'),
              },
              {
                category: 'Proportion Studies',
                phase: 'Future Study',
                title: 'Track-to-Wheelbase Ratio Exploration',
                note: 'Reserved slot: Orthographic proportion study balancing 1,380 mm width against rollover stability on 15-degree lateral slopes.',
                isReserved: true,
                media: sketch('FUTURE STUDY · PROPORTION & ATTITUDE STUDY', '4/3'),
              },
              {
                category: 'Perspective Studies',
                phase: 'Future Study',
                title: 'Dynamic 3/4 Exterior Gesture',
                note: 'Reserved slot: Perspective study capturing vehicle stance, front fascia lighting identity, and roofline taper.',
                isReserved: true,
                media: sketch('FUTURE STUDY · DYNAMIC 3/4 PERSPECTIVE', '4/3'),
              },
              {
                category: 'Detail Studies',
                phase: 'Future Study',
                title: 'Sliding Door & Rail Mechanism',
                note: 'Reserved slot: Technical detail sketch of unpowered bi-directional sliding door tracks and sealed weather gaskets.',
                isReserved: true,
                media: sketch('FUTURE STUDY · DOOR & MECHANISM DETAIL', '4/3'),
              },
              {
                category: 'Detail Studies',
                phase: 'Future Study',
                title: 'Lighting & Sensor Pod Integration',
                note: 'Reserved slot: Close-up study on integrating flush LiDAR, ultrasonic pucks, and high-mounted indicator clusters.',
                isReserved: true,
                media: sketch('FUTURE STUDY · SENSOR & CMF INTEGRATION', '4/3'),
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-ai-workflow',
      index: '12',
      label: 'AI Workflow',
      title: 'AI WORKFLOW',
      intro:
        'AI tools were introduced transparently into the workflow as rapid visual accelerators — never as substitute architects. Understanding where machine generation ended and human engineering began is fundamental to the project integrity.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'AI accelerated visual exploration. Engineering decisions remained human.',
            emphasis: 'Engineering decisions remained human.',
            note: 'METHODOLOGY PRINCIPLE · TRANSPARENT TOOLING',
            align: 'left',
          },
        },
        {
          type: 'aiWorkflow',
          props: {
            title: 'THE 6-STAGE INTEGRATED DESIGN PIPELINE',
            subtitle:
              'From physical line gesture to generative rendering and rigorous CAD surfacing, every step had a distinct division of labor.',
            statement:
              'AI accelerated visual exploration. Engineering decisions remained human.',
            steps: [
              {
                num: '01',
                title: 'Sketch',
                role: 'Human Intent',
                badge: 'Manual',
                desc: 'Hand-drawn line work and spatial gestures defining the initial envelope, volume, and passenger orientation.',
              },
              {
                num: '02',
                title: 'Vizcom',
                role: 'AI Acceleration',
                badge: 'Generative',
                desc: 'Instant visual rendering passes over hand sketches exploring CMF variations, lighting reflections, and paint tones.',
              },
              {
                num: '03',
                title: 'Evaluation',
                role: 'Human Filter',
                badge: 'Critical',
                desc: 'Identifying generative hallucinations, non-manufacturable drafts, optical disproportions, and spatial flaws.',
              },
              {
                num: '04',
                title: 'Engineering',
                role: 'Human Rigor',
                badge: 'Feasibility',
                desc: 'Ground clearance, low-floor spaceframe rigidity, battery skateboard integration, and turn-radius physics.',
              },
              {
                num: '05',
                title: 'CAD',
                role: 'Human Precision',
                badge: 'Parametric',
                desc: 'Production-accurate 3D NURBS modeling, draft angles, shut lines, and mechanical clearance in CAD software.',
              },
              {
                num: '06',
                title: 'Render',
                role: 'Studio Output',
                badge: 'Final CMF',
                desc: 'Physically based ray-traced materials, environmental illumination, and context simulation for review.',
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Design Philosophy · AI in Transportation',
            body: [
              'Generative algorithms excel at rendering specular highlights, surface reflections, and cinematic lighting in seconds. What they cannot do is calculate structural torsional stiffness, understand whether an elderly passenger can reach a handhold, or know if a wheel will clear an open drainage gutter in Dehradun.',
              'Treating AI as a fast rendering collaborator accelerated visual exploration across dozens of styling directions in an afternoon, but every packaging constraint, crash path, and chassis decision remained strictly human. At no point did AI design the vehicle; human engineering guided every line.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-building-the-foundation',
      index: '13',
      label: 'Chassis Engineering',
      title: 'BUILDING\nTHE FOUNDATION.',
      intro:
        'Before defining vehicle surfaces or styling cabin closures, the underlying structural topology had to be evaluated. A transit vehicle serving Tier 2 and Tier 3 cities operates over broken asphalt, gravel lanes, and steep culverts. Three foundational architectures were investigated.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'Form cannot compensate for a compromised structural backbone. The platform dictates the passenger experience.',
            emphasis: 'The platform dictates the passenger experience.',
            note: 'ENGINEERING PRINCIPLE · STRUCTURAL TOPOLOGY',
            align: 'left',
          },
        },
        {
          type: 'architectureComparison',
          props: {
            title: 'STRUCTURAL TOPOLOGY EVALUATION',
            subtitle:
              'Evaluating three structural topologies across ingress step height, modular adaptability, manufacturing CapEx, and real-world durability.',
            options: [
              {
                name: 'Monocoque',
                badge: 'Explored & Rejected',
                isSelected: false,
                tagline: 'Unitized Stamped Sheet Metal Shell',
                media: sketch('STRUCTURAL STUDY · MONOCOQUE UNITIZED BODY', '16/9'),
                whyExplored:
                  'Investigated for its lightweight structural efficiency, high torsional rigidity, and mature automotive manufacturing standards that minimize parts in high-volume production lines.',
                limitations:
                  'High stamping die tooling investment is economically unviable for specialized regional transit volumes. The rigid body structure locks the entire vehicle into a single body shape, making modular application variants impossible without new body dies.',
                attributes: [
                  { label: 'Step-in Height', value: 'Low Floor', positive: true },
                  { label: 'Modularity', value: 'Rigid / Non-Modular', negative: true },
                  { label: 'Tooling Investment', value: 'High CapEx Stamping', negative: true },
                  { label: 'Multi-Body Viability', value: 'Locked Single Shape', negative: true },
                ],
                verdict:
                  'Rejected: Tooling rigidity prevents future modular adaptations; any alteration to cabin height or application requires catastrophic tooling re-investment.',
              },
              {
                name: 'Ladder Frame',
                badge: 'Explored & Rejected',
                isSelected: false,
                tagline: 'Heavy Commercial Steel Channel Rails',
                media: sketch('STRUCTURAL STUDY · LADDER FRAME CHASSIS', '16/9'),
                whyExplored:
                  'Investigated because traditional Indian shared transit (Trackers, Vikrams, rural utility vehicles) relies on ladder rails for extreme load endurance, easy roadside welding repairs, and survivability over broken village roads.',
                limitations:
                  'Longitudinal steel rail thickness forces the interior floor height above 500 mm, demanding steep boarding steps that alienate elderly passengers and commuters carrying heavy bags. The high center of mass increases rollover danger in tight mountain curves.',
                attributes: [
                  { label: 'Step-in Height', value: 'High (>500 mm)', negative: true },
                  { label: 'Modularity', value: 'Moderate Top-Hat', positive: true },
                  { label: 'Chassis Torsional Flex', value: 'High Longitudinal Twist', negative: true },
                  { label: 'Rollover Stability', value: 'High Center of Mass', negative: true },
                ],
                verdict:
                  'Rejected: High floor compromises universal accessibility; heavy chassis rails penalize energy efficiency and reduce usable interior cabin volume.',
              },
              {
                name: 'EV Skateboard',
                badge: 'Selected Architecture',
                isSelected: true,
                tagline: 'Decoupled Rolling Flat-Bed Chassis',
                media: {
                  kind: 'render',
                  label: 'ENGINEERING BLUEPRINT · FLAT-BED SKATEBOARD ARCHITECTURE',
                  ratio: '16/9',
                  src: 'assets/Project_1/Renders/Render_3.png',
                  alt: 'Flat-bed EV skateboard architecture render showing structural chassis, powertrain, and cabin frame',
                  fit: 'contain',
                  bg: '#f1f2f4',
                },
                whyExplored:
                  'Investigated to cleanly separate the rolling drive platform (propulsion units, steering, suspension, flat underfloor energy tray) from the structural top-hat cabin, unlocking a 100% flat floor and universal accessibility.',
                limitations:
                  'Requires reinforced lateral side crash sill beams to protect underfloor energy storage during side impact collisions on uncurbed roads.',
                attributes: [
                  { label: 'Step-in Height', value: 'Ultra-Low (<320 mm)', positive: true },
                  { label: 'Modularity', value: 'Fully Decoupled', positive: true },
                  { label: 'Floor Topography', value: '100% Flat Walkway', positive: true },
                  { label: 'Platform Reusability', value: 'Universal Baseline', positive: true },
                ],
                verdict:
                  'Selected: Delivers the ultra-low step-in threshold essential for elderly commuters while establishing a standardized structural foundation for multiple civic and commercial bodies.',
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Architectural Selection · Structural Logic',
            body: [
              'Selecting the structural platform is the most consequential decision in transportation design. A monocoque would have permanently bound the vehicle to a single passenger silhouette, demanding massive capital investments in rigid stamping dies that cannot adapt to local realities.',
              'A ladder frame would have preserved the hostile boarding climb of diesel trackers, forcing passengers to hike up steep metal steps with market sacks and children. The flat-bed EV skateboard was chosen because it decouples heavy engineering from human architecture, creating an open civic baseline that belongs to the entire city.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-why-the-ev-skateboard',
      index: '14',
      label: 'Platform Strategy',
      title: 'WHY THE\nEV SKATEBOARD.',
      intro:
        'A transit vehicle engineered for Tier 2 and Tier 3 cities cannot afford the single-purpose luxury of consumer passenger cars. The skateboard was selected because it systematically answers six operational demands without compromise.',
      blocks: [
        {
          type: 'researchGrid',
          props: {
            columns: 3,
            variant: 'cards',
            items: [
              {
                stat: '01',
                title: 'Modularity',
                body:
                  'Decoupling the rolling chassis from the cabin shell allows a standardized drive, steering, and suspension baseline to support completely different top-hat bodies without re-engineering the structural foundation.',
              },
              {
                stat: '02',
                title: 'Future Flexibility',
                body:
                  'Transit fleets must endure over a decade in service. A standardized skateboard allows municipal operators to refresh, reconfigure, or swap worn cabin shells as city routes shift without scrapping the underlying drive platform.',
              },
              {
                stat: '03',
                title: 'Manufacturing',
                body:
                  'Eliminates single-purpose compound sheet stamping dies. The rolling skateboard chassis can be assembled in high-precision facilities, while specialized body modules can be constructed by local body builders using regional tooling.',
              },
              {
                stat: '04',
                title: 'Maintenance',
                body:
                  'Suspension linkages, steering actuators, and underfloor energy enclosures are accessible from beneath without dismantling passenger seats, drastically compressing fleet turnaround times in municipal depots.',
              },
              {
                stat: '05',
                title: 'Cost Amortization',
                body:
                  'Amortizing chassis homologation, crash validation, and steering development across multiple commercial, school, and public transit fleets lowers per-unit acquisition cost for regional fleet owners and local operators.',
              },
              {
                stat: '06',
                title: 'Packaging & Ingress',
                body:
                  'Eliminating the internal combustion engine block and transmission tunnel frees up 100% of the upper volume for human and cargo circulation, delivering a continuous flat floor from entrance to rear row.',
              },
            ],
          },
        },
        {
          type: 'statement',
          props: {
            text:
              'Decoupling the chassis from the body transforms a solitary vehicle into an adaptable municipal infrastructure.',
            emphasis: 'an adaptable municipal infrastructure.',
            note: 'SYSTEM STRATEGY · LIFE CYCLE ECONOMICS',
            align: 'left',
          },
        },
      ],
    },
    {
      id: 'cs-one-platform-multiple-applications',
      index: '15',
      label: 'Modular Ecosystem',
      title: 'ONE PLATFORM\nMULTIPLE APPLICATIONS.',
      intro:
        'The true power of the skateboard architecture is its capacity to serve the diverse socioeconomic arteries of Tier 2 and Tier 3 cities. Six modular top-hat archetypes mount onto the identical structural baseline, addressing passenger transit, campus corridors, and commercial trade.',
      blocks: [
        {
          type: 'modularApplications',
          props: {
            title: 'STANDARDIZED CHASSIS · SIX MODULAR TOP-HAT ARCHETYPES',
            subtitle:
              'Every configuration shares identical perimeter mounting hardpoints and ultra-low floor geometry while adapting its spatial zoning and enclosure for a specialized civic role.',
            applications: [
              {
                id: 'passenger',
                tag: 'CIVIC TRANSIT',
                category: 'High-Frequency Commuter Top-Hat',
                title: 'Passenger Commuter Pod',
                role:
                  'Urban feeder transit replacing diesel Vikrams and Trackers along dense secondary city corridors.',
                zoning:
                  '6 forward-facing passenger seats arranged across two staggered tiers, wide 1.3 m central ingress aisle, bi-parting sliding doors, and ultra-low entry threshold.',
                features: [
                  'Low step-in floor height designed for effortless access by elderly passengers and women in saris',
                  'Continuous structural overhead grab rails integrated directly into tubular spaceframe',
                  'Generous under-seat clear zones for grocery bags, luggage, and market bundles',
                  'High-visibility panoramic side glazing for enhanced civic presence and passive safety',
                ],
                media: render('MODULAR BODY 01 · PASSENGER COMMUTER POD TOP-HAT', '16/9'),
              },
              {
                id: 'university',
                tag: 'CAMPUS MOBILITY',
                category: 'High-Turnover Shuttle Top-Hat',
                title: 'University Shuttle',
                role:
                  'Circulating students, faculty, and campus staff across large educational campuses, research institutes, and medical universities.',
                zoning:
                  'Perimeter inward-facing bench seating maximizing rapid short-hop passenger turnover, open central circulation space, and front storage straps for backpacks.',
                features: [
                  'Wide bi-directional door apertures enabling rapid dual-stream boarding and alighting',
                  'Dedicated under-bench cubbies sized for laptop bags, technical backpacks, and folders',
                  'Heavy-duty scuff-resistant polymer floor lining built for relentless student foot traffic',
                  'Integrated exterior route display and illuminated campus stop indicators',
                ],
                media: render('MODULAR BODY 02 · UNIVERSITY CAMPUS SHUTTLE TOP-HAT', '16/9'),
              },
              {
                id: 'school',
                tag: 'STUDENT SAFETY',
                category: 'Protected Transit Top-Hat',
                title: 'School Transit Module',
                role:
                  'Safe, monitored, and sheltered neighborhood transport for school children, replacing overcrowded auto-rickshaws and informal vans.',
                zoning:
                  'High-density child-scaled bench seating with integrated three-point safety harnesses, lowered secondary handholds, and an elevated supervisor jump seat overlooking the full cabin.',
                features: [
                  'Child-height grab handles and secondary non-slip step-up guide at ingress door',
                  'Driver-controlled emergency door interlocks with internal sensory safety override',
                  'High-visibility exterior school warning livery with perimeter strobe warning bands',
                  'Full-height window protective grilles preventing child limb extension while driving',
                ],
                media: render('MODULAR BODY 03 · SCHOOL STUDENT TRANSIT TOP-HAT', '16/9'),
              },
              {
                id: 'quick-commerce',
                tag: 'LAST-MILE FULFILLMENT',
                category: 'Hyperlocal Logistics Top-Hat',
                title: 'Quick Commerce Pod',
                role:
                  'Hyperlocal dark-store distribution and rapid grocery fulfillment navigating congested old-city bazaar alleys and residential lanes.',
                zoning:
                  'Bilateral sliding cargo hatches accessing standardized multi-tier modular crate racks, temperature-partitioned insulation zones, and contactless order collection bays.',
                features: [
                  'Roll-in standardized plastic tote crate sliding guides with positive locking latches',
                  'Insulated passive-chilled compartments for dairy, vegetables, and temperature-sensitive goods',
                  'Curb-facing side roll-up doors preventing traffic obstruction during rapid drops',
                  'Washdown-ready interior floor with sealed drainage scuppers for daily sanitation',
                ],
                media: render('MODULAR BODY 04 · QUICK COMMERCE LAST-MILE TOP-HAT', '16/9'),
              },
              {
                id: 'logistics',
                tag: 'URBAN FREIGHT',
                category: 'Medium-Duty Freight Top-Hat',
                title: 'Logistics & Freight Carrier',
                role:
                  'Medium-volume parcel shipping, wholesale marketplace resupply, and inter-hub transfer in dense commercial and light-industrial districts.',
                zoning:
                  'Maximized rear volumetric cargo bay with a flat unobstructed floor, full-height rear roller shutter, and flush tie-down anchor rings throughout.',
                features: [
                  'Flat rear load floor aligned with standard commercial loading dock thresholds',
                  'Internal LED floodlighting and continuous perimeter cargo lash rails',
                  'Heavy-duty reinforced partition bulkhead isolating operator cab from cargo shifting',
                  'Squared wheel-arch box covers designed to support stacking load',
                ],
                media: render('MODULAR BODY 05 · LOGISTICS & FREIGHT CARRIER TOP-HAT', '16/9'),
              },
              {
                id: 'small-business',
                tag: 'MICRO-ENTERPRISE',
                category: 'Mobile Retail & Service Top-Hat',
                title: 'Small Business & Mobile Kiosk',
                role:
                  'Empowering street vendors, mobile repair workshops, artisanal craftsmen, and healthcare screening camps without brick-and-mortar overhead.',
                zoning:
                  'Gullwing side-opening canopy revealing a fold-out display counter, modular tool/product shelving, integrated weather awning, and auxiliary power taps.',
                features: [
                  'Hydraulic gas-strut side canopy providing rain and sun shelter for patrons',
                  'Lockable display cases and modular pegboard equipment walls for customized trade gear',
                  'Fold-out stainless-steel service counter extending the operational workspace',
                  'Auxiliary low-voltage power take-off outlets powered from chassis energy reserves',
                ],
                media: render('MODULAR BODY 06 · SMALL BUSINESS & MOBILE KIOSK TOP-HAT', '16/9'),
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Ecosystem Architecture · Integrated Urban Utility',
            body: [
              'In Indian cities, transportation and commerce cannot be separated. The vehicle that carries commuters to the office at 8:00 AM might be the vehicle that resupplies wholesale produce at noon or delivers parcels in the evening.',
              'By standardizing the rolling EV skateboard chassis while keeping top-hat modules open, swappable, and locally buildable, Bharat Mobility Pod transitions from a solitary vehicle into an extensible civic platform that empowers passengers, fleet operators, and small entrepreneurs alike.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-the-vehicle-was-never-the-product',
      index: '16',
      label: 'System Thinking',
      title: 'THE VEHICLE\nWAS NEVER\nTHE PRODUCT.',
      intro:
        'Automotive design often obsesses over surfacing, character lines, and standalone sheet metal. But in Tier 2 and Tier 3 cities, a solitary vehicle is meaningless without a circulatory ecosystem. The actual product is the network.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'A vehicle in isolation is just parked metal. The real product is the circulatory system of the city.',
            emphasis: 'The real product is the circulatory system of the city.',
            note: 'ECOSYSTEM SHIFT · FROM OBJECT TO INFRASTRUCTURE',
            align: 'left',
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'System Architecture · Beyond the Object',
            body: [
              'When transportation designers design only the vehicle, they solve only 20% of the passenger experience. The remaining 80% happens on the curb: waiting in the rain, negotiating unregulated fares, walking through muddy alleys, and transferring between disjointed vehicle modes.',
              'Bharat Mobility Pod was conceived not as a consumer automobile, but as a public infrastructure utility. To make the vehicle truly functional, the design had to extend into digital fleet intelligence, frictionless ticketing, and socio-economic integration with the human networks that already run the city.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 3,
            variant: 'cards',
            items: [
              {
                stat: 'Layer 01',
                title: 'Physical Platform',
                body:
                  'The modular EV skateboard and low-floor accessible top-hat bodies engineered for narrow lanes, rugged survival, and effortless boarding.',
              },
              {
                stat: 'Layer 02',
                title: 'Digital Coordination',
                body:
                  'Predictive AI fleet orchestration and unreserved NFC/token ticketing that eliminates passenger waiting and matches capacity to footfall.',
              },
              {
                stat: 'Layer 03',
                title: 'Civic Governance',
                body:
                  'Cooperative integration with existing driver unions, local maintenance garage networks, and dignified multimodal curb hubs.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-ai-fleet-management',
      index: '17',
      label: 'Fleet Intelligence',
      title: 'AI FLEET\nMANAGEMENT.',
      intro:
        'Rather than deploying AI as an aesthetic novelty, the system leverages machine intelligence where it delivers genuine civic value: as a real-time fleet manager predicting passenger footfall and optimizing vehicular capacity.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'AI is the fleet manager. Not the designer.',
            emphasis: 'AI is the fleet manager.',
            note: 'DISPATCH GOVERNANCE · OPERATIONAL INTELLIGENCE',
            align: 'left',
          },
        },
        {
          type: 'fleetManagement',
          props: {
            title: 'AI FLEET OPTIMISATION & DISPATCH ENGINE',
            subtitle:
              'Machine intelligence monitors footfall surges, correlates seasonal rhythms, and dynamically dispatches 4-seater and 6-seater pods to prevent queue bottlenecks.',
            statement: 'AI is the fleet manager. Not the designer.',
            pillars: [
              {
                num: '01',
                title: 'Demand Prediction',
                badge: 'Predictive',
                desc:
                  'Algorithms forecast commuter surges by analyzing historical commute trends, train and bus arrivals, weekly market cycles, and weather patterns.',
              },
              {
                num: '02',
                title: 'Footfall Telemetry',
                badge: 'Real-Time',
                desc:
                  'Anonymized optical doorstep sensors and turnstile taps stream live crowd density data to municipal dispatch nodes without personal tracking.',
              },
              {
                num: '03',
                title: 'Vehicle Allocation',
                badge: 'Dispatch',
                desc:
                  'Automatically dispatches the optimal pod capacity — deploying agile 4-seaters for quiet feeders and high-throughput 6-seaters for rush corridors.',
              },
              {
                num: '04',
                title: 'Fleet Optimisation',
                badge: 'Loop',
                desc:
                  'Eliminates empty running and idle curbside congestion by circulating active pods toward anticipated demand zones before bottlenecks occur.',
              },
            ],
            vehicles: [
              {
                capacity: '4 Seater Pod',
                tag: 'LEAN DEMAND & NARROW LANES',
                role: 'Off-Peak & Feeder Dispatch',
                badge: 'High Agility',
                useCase:
                  'Dispatched during mid-day troughs, late evenings, and through tight residential lanes where operating an oversized pod wastes electrical energy and blocks street circulation.',
                attributes: [
                  { label: 'Corridor Type', value: 'Alleys & Secondary Feeders' },
                  { label: 'Demand Window', value: 'Mid-Day Troughs / Off-Peak' },
                  { label: 'Energy Profile', value: 'Optimized Lightweight Draw' },
                ],
              },
              {
                capacity: '6 Seater Pod',
                tag: 'PEAK COMMUTE & TRUNK ARTERIES',
                role: 'High-Volume Surge Dispatch',
                badge: 'Max Throughput',
                useCase:
                  'Dispatched during morning office hours, school opening bells, and railway station arrivals along major urban arteries to clear passenger platforms rapidly.',
                attributes: [
                  { label: 'Corridor Type', value: 'Main Arterials & Market Spines' },
                  { label: 'Demand Window', value: 'Peak Rush Hours' },
                  { label: 'Capacity Rate', value: 'Maximum Platform Clearance' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-unreserved-ticketing',
      index: '18',
      label: 'Flow Architecture',
      title: 'UNRESERVED\nTICKETING.',
      intro:
        'In secondary Indian cities, requiring app downloads, smartphone OTP verification, or ride-hailing accounts creates immediate digital exclusion. Learning from the Mumbai Suburban Railway, the system embraces unreserved open access.',
      blocks: [
        {
          type: 'unreservedTicketing',
          props: {
            title: 'FRICTION-FREE COMMUTE ARCHITECTURE',
            subtitle:
              'Drawing inspiration from the highest-density transit network on earth to eliminate booking friction, app barriers, and boarding delays.',
            inspiration: {
              eyebrow: 'Inspiration from Mumbai Local',
              heading: 'The World’s Most Resilient Mass Transit Model',
              text:
                'The Mumbai Suburban Railway moves over 7.5 million commuters every single day without requiring seat reservations, surge pricing algorithms, or pre-scheduled smartphone bookings. Passengers simply hold an unreserved pass, walk up to the platform, and board the next train within seconds. Bharat Mobility Pod brings this open-throughput accessibility to Tier 2 and Tier 3 cities — ensuring zero barrier to entry regardless of literacy, smartphone access, or technical familiarity.',
            },
            journeyComparison: {
              title: 'COMMUTER JOURNEY TRANSFORMATION',
              traditional: {
                tag: 'Conventional App-Based Ride Hailing',
                steps: [
                  'Open smartphone app & wait for cellular GPS signal',
                  'Input drop location & wait for surge pricing calculation',
                  'Wait 8–15 minutes for driver acceptance & matching',
                  'Verify OTP, negotiate fare change, or face sudden cancellation',
                  'High mental friction & 15+ min boarding delay',
                ],
              },
              unreserved: {
                tag: 'Bharat Mobility Unreserved Model',
                steps: [
                  'Walk up to nearest designated curb stop or transit node',
                  'Tap unified transit smartcard, NFC pass, or scan physical coin token',
                  'Step onto the ultra-low flat floor of the arriving pod',
                  'Immediate departure with automated route allocation',
                  'Friction-free boarding completed in under 5 seconds',
                ],
              },
            },
            telemetry: {
              title: 'THE CLOSED-LOOP TELEMETRY PIPELINE',
              subtitle:
                'Every physical tap becomes an anonymized real-time demand sensor feeding directly into the AI Fleet Manager.',
              steps: [
                {
                  num: '01',
                  title: 'Tap-On Event',
                  desc:
                    'Passenger taps card or token at curb turnstile; the event timestamps exact boarding stop and transit corridor direction.',
                },
                {
                  num: '02',
                  title: 'Aggregated Stream',
                  desc:
                    'Local edge gateways aggregate tap events in 30-second intervals, detecting localized footfall spikes as they develop.',
                },
                {
                  num: '03',
                  title: 'Fleet Redistribution',
                  desc:
                    'The AI Fleet Manager dynamically redirects nearby 4-seater and 6-seater pods to the node before commuter queues accumulate.',
                },
              ],
            },
          },
        },
        {
          type: 'statement',
          props: {
            text:
              'Ticketing data is not just financial accounting. It is the sensory nervous system of the entire fleet.',
            emphasis: 'the sensory nervous system of the entire fleet.',
            note: 'DATA ARCHITECTURE · SENSORY TELEMETRY',
            align: 'left',
          },
        },
      ],
    },
    {
      id: 'cs-working-with-existing-unions',
      index: '19',
      label: 'Union Integration',
      title: 'WORKING\nWITH EXISTING\nUNIONS.',
      intro:
        'Venture-backed mobility companies historically attempted to disrupt and dismantle local driver unions through predatory gig-contracting. Bharat Mobility Pod is built on an ethical premise: do not replace unions, integrate them.',
      blocks: [
        {
          type: 'statement',
          props: {
            text: 'Do not replace unions. Integrate them.',
            emphasis: 'Integrate them.',
            note: 'SOCIO-ECONOMIC ETHICS · COOPERATIVE GOVERNANCE',
            align: 'left',
          },
        },
        {
          type: 'unionIntegration',
          props: {
            title: 'COOPERATIVE CIVIC GOVERNANCE',
            subtitle:
              'Existing drivers and union cooperatives have sustained regional cities for decades. Rather than displacing them, the ecosystem integrates them across four operational pillars.',
            statement: 'Do not replace unions. Integrate them.',
            pillars: [
              {
                num: '01',
                title: 'Operations',
                badge: 'Dignified Livelihood',
                tagline: 'From Gig Insecurity to Salaried Stability',
                desc:
                  'Existing Vikram, Tracker, and auto drivers transition into trained, union-represented fleet operators. They receive guaranteed shift structures, stable living wages, and municipal medical coverage instead of predatory algorithmic commission penalties.',
              },
              {
                num: '02',
                title: 'Maintenance',
                badge: 'Local Economy',
                tagline: 'Empowering Roadside Garages as Certified Nodes',
                desc:
                  'Rather than closed corporate repair monopolies, local roadside garages and neighborhood mechanics are upskilled and certified to maintain modular skateboard chassis, steering linkages, and braking components — protecting grassroots automotive employment.',
              },
              {
                num: '03',
                title: 'Transit Hubs',
                badge: 'Civic Spaces',
                tagline: 'Formalizing Informal Ranks into Dignified Hubs',
                desc:
                  'Chaotic street-corner ranks and unshaded roadside stops are formalized into permanent municipal transit shelters. These hubs provide fast-charging bays, clean drinking water, shaded passenger platforms, and driver break rooms co-managed by union chapters.',
              },
              {
                num: '04',
                title: 'System Management',
                badge: 'Co-Governance',
                tagline: 'Democratic Route Planning & Operational Oversight',
                desc:
                  'Union representatives sit on the municipal transit council, directly co-directing route allocation, seasonal frequency revisions, and dispute arbitration. Drivers become co-architects of the system rather than passive cogs.',
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Social Sustainability · The Human Foundation',
            body: [
              'No transportation system can survive in India without the social license of the people who operate it. Driver unions are not obstacles to progress; they are the social glue that has kept Tier 2 and Tier 3 cities moving in the complete absence of state transit investment.',
              'By treating drivers as skilled municipal partners, preserving local mechanical repair livelihoods, and granting unions direct co-governance over dispatch and hubs, Bharat Mobility Pod ensures that technological progress elevates the community rather than extracting from it.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-final-design',
      index: '20',
      label: 'Form & Identity',
      title: 'FINAL DESIGN.',
      intro:
        'Only now, after understanding the streets, the human journeys, the engineering baseline, and the operating ecosystem, is the vehicle revealed.',
      blocks: [
        {
          type: 'fullWidthImage',
          props: {
            media: {
              kind: 'render',
              label: 'FINAL PRODUCTION VEHICLE · CINEMATIC EXTERIOR 3/4',
              ratio: '21/9',
              src: 'assets/Project_1/Renders/Render_1.png',
              alt: 'Final production vehicle exterior render showing compact stance and panoramic glazing',
              caption:
                'The final vehicle architecture: compact 3,600 mm envelope, 1,380 mm width for narrow street navigation, and calm civic character.',
            },
            bleed: true,
          },
        },
        {
          type: 'statement',
          props: {
            text:
              'Form is not a decoration added to a chassis. It is the resolution of every observed reality.',
            emphasis: 'the resolution of every observed reality.',
            note: 'AESTHETIC RESOLUTION · PURPOSEFUL FORM',
            align: 'left',
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 2,
            variant: 'media',
            items: [
              {
                media: render('PRODUCTION REVELATION · FRONT FASCIA & LIGHTING ARCHITECTURE', '16/9'),
                title: 'Frontal Presence & Street Stance',
                body:
                  'Friendly, non-aggressive front illumination clusters and pedestrian safety crumple zones engineered for tight alleyway corners.',
              },
              {
                media: render('PRODUCTION REVELATION · REAR THREE-QUARTER & INGRESS PROFILE', '16/9'),
                title: 'Canopy Rhythm & Ingress Profile',
                body:
                  'Bi-parting flush sliding side door tracks integrated into the body beltline, maintaining vehicle track width during passenger boarding.',
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Design Restraint · Civic Presence',
            body: [
              'The final form rejects aggressive automotive styling conventions — sharp predator grilles, artificial air scoops, and hostile silhouettes. Instead, it embodies calm, civic friendliness.',
              'Its upright stance, generous daylight opening, and protective perimeter cladding communicate safety, openness, and utility — a vehicle that looks and feels like it belongs to the streets it serves.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-interior',
      index: '21',
      label: 'Spatial Ergonomics',
      title: 'INTERIOR.',
      intro:
        'Public transit interiors must prioritize human dignity above all. The cabin was engineered from the inside out around four non-negotiable principles: universal accessibility, forward-facing orientation, generous standee aisle clearance, and intuitive ergonomics.',
      blocks: [
        {
          type: 'fullWidthImage',
          props: {
            media: {
              kind: 'render',
              label: 'INTERIOR ARCHITECTURE · SPACIOUS 6-PAX LOW-FLOOR CABIN',
              ratio: '21/9',
              src:
                'assets/Project_1/Renders/Interior view of a compact autonomous last-mile mobility pod inspired by Tata Ace Magic proportions, designed for Tier 2 and Tier 3 Indian roads, futuristic yet realistic production-ready CMF, spacious 6.png',
              alt: 'Interior cabin view showing forward-facing seating, open aisle, and wide visibility',
              caption:
                'Spacious 6-passenger interior layout with continuous flat floor, 1.3 m walk-through aisle, and natural panoramic illumination.',
            },
            bleed: true,
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 3,
            variant: 'cards',
            items: [
              {
                stat: 'Ergonomics',
                title: 'Human Package',
                body:
                  'Six forward-facing seats arranged across two staggered tiers. Forward orientation prevents the motion sickness endemic to sideways perimeter benches on twisting hill roads.',
              },
              {
                stat: 'Accessibility',
                title: 'Universal Ingress',
                body:
                  'Ultra-low step-in threshold under 320 mm from curb level. Eliminates the knee-straining climb of diesel trackers, allowing elderly commuters, children, and women in saris to board effortlessly.',
              },
              {
                stat: 'Circulation',
                title: 'Aisle Clearance',
                body:
                  'A generous 1.3-meter central corridor allows rapid simultaneous entry and exit. Standees can comfortably hold structural overhead rails without obstructing seated passengers.',
              },
            ],
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 2,
            variant: 'media',
            items: [
              {
                media: render('INTERIOR STUDY · 2D ERGONOMIC PACKAGING & CLEARANCES', '16/9'),
                title: 'Ergonomic Manikins & Knee Clearance',
                body:
                  'Accommodating 5th percentile female to 95th percentile male commuters with ample knee clearance and under-seat bag stowage.',
              },
              {
                media: render('INTERIOR STUDY · LOW-FLOOR THRESHOLD & BOARDING RAMPS', '16/9'),
                title: 'Seamless Step-In & Curb Alignment',
                body:
                  'Zero-step entrance with textured high-friction floor transition, minimizing boarding dwell time at busy marketplace pickup points.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'cs-details',
      index: '22',
      label: 'Craft & Systems',
      title: 'DETAILS.',
      intro:
        'A vehicle built for heavy daily municipal operation survives or fails in its details. Four focused domains define the execution: CMF durability, communicative lighting, replaceable body skin, and rigid safety architecture.',
      blocks: [
        {
          type: 'researchGrid',
          props: {
            columns: 4,
            variant: 'cards',
            items: [
              {
                stat: 'CMF',
                title: 'Color, Material & Finish',
                body:
                  'Textured, scratch-resistant unpainted lower polymers resist monsoon mud, flying gravel, and bumper scuffs. Interior touchpoints feature warm terracotta tones and wipe-clean antimicrobial fabrics.',
              },
              {
                stat: 'Lighting',
                title: 'Communicative Lighting',
                body:
                  'High-mounted panoramic indicator bands visible over pedestrian crowd heads. Front illumination combines wide-spread low-beam fog lamps with soft ambient welcome rings.',
              },
              {
                stat: 'Body',
                title: 'Modular Skin Panels',
                body:
                  'Lightweight, dent-resistant thermoplastic exterior skin panels. Individual corner sections can be swapped by local roadside garages in minutes without specialized body shop equipment.',
              },
              {
                stat: 'Architecture',
                title: 'Tubular Spaceframe Cage',
                body:
                  'High-strength structural steel spaceframe passenger safety cage enclosing the cabin, engineered to distribute rollover and lateral impact forces away from passenger survival zones.',
              },
            ],
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 2,
            variant: 'media',
            items: [
              {
                media: render('TECHNICAL DETAIL · CMF PALETTE & TEXTURED RESISTANT SKINS', '16/9'),
                title: 'Material Tactility & Regional CMF Palette',
                body:
                  'Studio material study balancing heavy-duty commercial durability with warm, tactile human finishes.',
              },
              {
                media: render('TECHNICAL DETAIL · ILLUMINATION PODS & SENSOR INTEGRATION', '16/9'),
                title: 'Flush Sensor Nodes & Indicator Architecture',
                body:
                  'Protective recessed housings for optical sensors, ultrasonic pucks, and high-visibility peripheral indicator bands.',
              },
            ],
          },
        },
        {
          type: 'statement',
          props: {
            text:
              'Quality in public transit is not luxury leather. Quality is durability, cleanliness, safety, and respect for every commuter.',
            emphasis: 'respect for every commuter.',
            note: 'DESIGN ETHOS · PUBLIC DIGNITY',
            align: 'left',
          },
        },
      ],
    },
    {
      id: 'cs-deployment',
      index: '23',
      label: 'Deployment Domains',
      title: 'DEPLOYMENT.',
      intro:
        'A public mobility ecosystem cannot remain a conceptual study. Bharat Mobility Pod is structured for phased municipal and institutional deployment across seven primary operational domains in regional India.',
      blocks: [
        {
          type: 'researchGrid',
          props: {
            columns: 4,
            variant: 'cards',
            items: [
              {
                stat: '01',
                title: 'Universities',
                body:
                  'Higher education institutions, medical colleges, and research institutes requiring continuous, zero-emission internal circulation between hostels, faculties, and laboratories.',
              },
              {
                stat: '02',
                title: 'Industrial Campuses',
                body:
                  'Special Economic Zones (SEZs), manufacturing corridors, and logistics parks managing shift-based worker movements with zero pedestrian vehicle conflicts.',
              },
              {
                stat: '03',
                title: 'Tier 2 Cities',
                body:
                  'Rapidly growing regional capitals (Dehradun, Jaipur, Indore, Coimbatore) with dense heritage centers, narrow arterial corridors, and severe street parking saturation.',
              },
              {
                stat: '04',
                title: 'Tier 3 Cities',
                body:
                  'Smaller district hubs and pilgrim towns characterized by unpaved road shoulders, steep topography, and a total absence of formal public bus transit.',
              },
              {
                stat: '05',
                title: 'Quick Commerce',
                body:
                  'Hyperlocal dark-store distribution and rapid grocery fulfillment navigating congested old-city bazaar alleys during high-demand daytime windows.',
              },
              {
                stat: '06',
                title: 'Schools',
                body:
                  'Safe, monitored, and sheltered neighborhood student transit replacing dangerous, overloaded three-wheelers and unregulated private vans.',
              },
              {
                stat: '07',
                title: 'Municipal Transport',
                body:
                  'Integrated feeder networks linking underserved peripheral settlements directly to central railway stations, interstate bus stands, and district hospitals.',
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Phased Urban Integration',
            body: [
              'Rather than attempting an overnight city-wide disruption, deployment begins in controlled, high-density institutional micro-environments — universities and industrial campuses — where passenger footfall and charging infrastructure can be validated.',
              'Lessons learned in campus operation feed directly into phased municipal rollout across Tier 2 and Tier 3 city feeder routes, proving operational reliability before expanding into quick commerce and municipal arterial corridors.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-project-impact',
      index: '24',
      label: 'Project Impact',
      title: 'PROJECT IMPACT.',
      intro:
        'A concise synthesis of what Bharat Mobility Pod achieved across transportation design, civic equity, and automotive systems architecture.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'Designing a vehicle is an act of engineering. Designing an ecosystem is an act of civic responsibility.',
            emphasis: 'an act of civic responsibility.',
            note: 'CORE CONCLUSION · TRANSPORTATION SYSTEMS ARCHITECTURE',
            align: 'left',
          },
        },
        {
          type: 'researchGrid',
          props: {
            columns: 3,
            variant: 'cards',
            items: [
              {
                stat: 'Accessibility',
                title: 'Universal Ergonomic Access',
                body:
                  'Proved that public transit in regional India does not require an exclusionary climb. The ultra-low flat floor and wide bi-parting doors guarantee dignity and effortless boarding for elderly commuters, women in saris, and children.',
              },
              {
                stat: 'Industrial Logic',
                title: 'Modular Decoupling',
                body:
                  'Demonstrated that specialized regional vehicle variants do not demand multi-million dollar monolithic tooling. Decoupling a shared EV skateboard from modular top-hats enables six distinct civic bodies on one platform.',
              },
              {
                stat: 'Social Equity',
                title: 'Collaborative Governance',
                body:
                  'Rejected venture-capital gig displacement in favor of socio-economic integration. Local driver unions transition into salaried fleet operators, while neighborhood mechanics are upskilled to maintain skateboard chassis.',
              },
            ],
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Final Design Reflection',
            body: [
              'Transportation design is frequently reduced to surface styling and luxury aspirational aesthetics. But the true moral test of mobility design lies in whether it serves the people who have been left behind by planning orthodoxies.',
              'Bharat Mobility Pod demonstrates that by observing how real people move, embracing cultural trust in existing forms, and treating the vehicle as one part of a larger civic nervous system, we can design public mobility that is humane, sustainable, and truly democratic.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
    {
      id: 'cs-next-project',
      index: '25',
      label: 'Next Project',
      title: 'NEXT PROJECT.',
      intro:
        'Continuing the exploration of mission-critical industrial design and high-stakes systems engineering.',
      blocks: [
        {
          type: 'statement',
          props: {
            text:
              'From public mobility infrastructure in Tier 2 & 3 cities to life-critical off-grid hardware resilience in disaster zones.',
            emphasis: 'life-critical off-grid hardware resilience',
            note: 'PORTFOLIO TRAJECTORY · INDUSTRIAL & SYSTEMS DESIGN',
            align: 'left',
          },
        },
        {
          type: 'editorial',
          props: {
            eyebrow: 'Project 02 · Workshop Showcase',
            body: [
              'The next case study examines EBS Tech: Emergency Communication Systems — an off-grid hardware ecosystem designed to maintain emergency broadcast, beacon tracking, and survival communications when power grids, cell towers, and cloud networks collapse.',
              'Click below to transition seamlessly into the EBS Tech case study in the featured project showcase.',
            ],
            columns: 2,
            slotLines: 0,
          },
        },
      ],
    },
  ],
};

export default bharatMobility;


