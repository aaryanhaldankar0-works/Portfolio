/**
 * BHARAT MOBILITY POD — Service & Operations Development (Workshop · Zone 06)
 * ---------------------------------------------------------------------------
 * Authentic documentation of the proposed service operations, passenger
 * booking flow, seat assurance model, dual payment verification, stopping protocols,
 * union integration, and editable UX placeholders.
 *
 * Core Concept Integrity:
 * - NOT an on-demand taxi; NO door-to-door detours.
 * - Fixed-route shared transit with advance seat assurance.
 * - Two distinct physical vehicle platforms (4-seater & 6-seater); no stretching.
 * - AI operates strictly at the fleet dispatch level.
 * - Transparent delineation:
 *     * Research Observation
 *     * Design Intent
 *     * Proposed System Behaviour
 *     * Future Engineering Validation
 */

const serviceOperationsData = {
  intro:
    'A public vehicle is only as humane as the service that operates it. In Tier 2 and Tier 3 Indian cities, public transit failure is primarily operational: uncertain vehicle arrivals, chronic seat unavailability, and driver economic pressure that forces dangerous overcrowding. This station documents the operational architecture designed to guarantee confirmed seating, fixed-route predictability, and collaborative union participation.',

  manifesto: {
    tag: 'Operational Integrity Principle',
    statement: 'Seat assurance removes passenger anxiety. Fixed routes guarantee urban throughput.',
    sub: 'By decoupling vehicle occupancy from driver daily rental pressure, the system preserves human dignity and safety without pretending that an unconstrained autonomous cab network is feasible.',
  },

  // 01 — Passenger Booking & Seat Assurance
  booking: {
    title: 'Passenger Booking & Advance Seat Assurance',
    badge: 'Finalized Service Model',
    intent: 'A booking confirms one seat within a selected time window, not on a specific pod or departure. The passenger is not promised a particular vehicle at the initial booking stage.',
    flowRules: [
      'A confirmed seat is guaranteed within the selected time window, never tied to a rigid single-vehicle departure.',
      'System never confirms a seat unless proposed allocation logic can support that capacity commitment.',
      'Demand prediction is strictly separated from guaranteed capacity.',
      'Both 4-seater and 6-seater variants pool dynamically to fulfill committed corridor capacity.',
      'The vehicle remains strictly on its predefined route; passengers cannot alter the route.',
      'Booking telemetry continuously contributes to downstream fleet demand forecasting.',
    ],
    steps: [
      { step: '01', title: 'Route Selection', desc: 'Passenger selects a designated fixed municipal transit corridor.' },
      { step: '02', title: 'Junction Selection', desc: 'Passenger chooses pickup and drop-off junctions along the route.' },
      { step: '03', title: 'Time Window Selection', desc: 'Passenger selects an available travel window (e.g. 08:15 – 08:30).' },
      { step: '04', title: 'Committed Capacity Check', desc: 'System verifies real-time or committed fleet capacity across 4-seat and 6-seat pods.' },
      { step: '05', title: 'Seat Confirmation', desc: 'Seat is confirmed within the window. (Prediction is never confused with guaranteed capacity).' },
      { step: '06', title: 'Booking Confirmation', desc: 'Passenger receives confirmation ticket. No specific vehicle is promised yet.' },
      { step: '07', title: 'Pod Assignment / Identification', desc: 'As the time window nears, system assigns or identifies an approaching pod.' },
      { step: '08', title: 'Junction Boarding', desc: 'Passenger reaches junction, completes verification (Option A/B), and boards.' },
    ],
    finalizedDecision: {
      tag: 'FINALIZED DESIGN DECISION · SERVICE ARCHITECTURE',
      title: 'Advance Seat Assurance & Committed Fleet Capacity',
      statement: 'A booking confirms one seat within a selected time window, not on a specific pod or departure.',
      explanation: 'Rather than forcing passengers into an inflexible scheduled departure (like a long-distance train) or leaving them in an unreserved curbside scramble (like existing shared autos), Bharat Mobility Pod guarantees a confirmed seat within a defined window. The passenger is not promised a particular vehicle at initial booking; the fleet allocation engine identifies the specific approaching pod as the window nears.',
      capacityRule: 'Do not confirm a seat unless allocation logic can support that commitment. Demand forecasting guides fleet pre-positioning, but only confirmed vehicle capacity (summing 4-seat and 6-seat pod runs) can validate a booking confirmation.',
      uiCommunication: {
        header: 'SEAT CONFIRMED',
        window: 'YOUR BOARDING WINDOW: 08:15 – 08:30',
        pickup: 'PICKUP: CLOCK TOWER JUNCTION',
        dropoff: 'DROP-OFF: PALTAN BAZAAR',
        podStatus: 'POD ASSIGNMENT: ASSIGNED ON APPROACH',
        illustrativeNote: '*Time range, junctions, and pod status shown for illustrative purposes only. Specific vehicle assignment is withheld until dispatched.',
      },
    },
  },

  // 02 — Reaching Pickup Junction (Fixed Route, No Door-to-Door)
  routeGeometry: {
    title: 'Fixed-Route Architecture vs. Door-to-Door Cabs',
    badge: 'Infrastructure Reality',
    statement: 'Pods do not make door-to-door detours.',
    rationale:
      'In Tier 2/3 cities with narrow, winding residential alleys (often under 2.4 m wide), sending automated vehicles deep into private dead-ends causes gridlock, delays schedule reliability, and creates hazardous bottlenecks. Pods strictly operate on predetermined arterial corridors with designated pickup and drop-off junctions.',
    principles: [
      { label: 'Fixed Arterial Corridors', value: 'High-frequency continuous loops connecting rail stations, colleges, bazaars, and residential nodes.' },
      { label: 'Junction-Based Stops', value: 'Designated boarding nodes equipped with clear signage, lighting, and optional physical totems.' },
      { label: 'Predictable Throughput', value: 'Fixed routes ensure guaranteed travel times for all onboard passengers without arbitrary detours.' },
    ],
  },

  // 03 — Boarding & Dual Payment Verification
  boardingPayment: {
    title: 'Boarding Sequence & Dual Payment Verification',
    badge: 'Hardware & Interaction',
    options: [
      {
        option: 'OPTION A · PREPAYMENT',
        role: 'App / Sidewalk Kiosk',
        desc: 'Passenger completes payment in advance through the companion app or physical junction kiosk. The seat confirmation ticket generates a digital NFC/QR credential.',
      },
      {
        option: 'OPTION B · ONBOARD PAYMENT',
        role: 'Behind-Seat Tap Interface',
        desc: 'Passenger boards with their seat reservation and completes payment using an intuitive contactless tap-to-pay interface located directly on the seatback in front of them.',
      },
    ],
    doorSequence: [
      { num: '01', title: 'Audio/Visual Warning', desc: 'Subtle illuminated edge lights and a non-jarring chime indicate upcoming door movement.' },
      { num: '02', title: 'Safety Verification', desc: 'Infrared sensors and optical doorway clearance scans confirm no passenger or limb obstruction.' },
      { num: '03', title: 'Bi-Parting Door Glide', desc: 'Sliding doors close flush along exterior tracks; mechanical interlocks confirm seal.' },
      { num: '04', title: 'Departure Initiation', desc: 'Vehicle initiates smooth electric acceleration along its fixed geofenced route trajectory.' },
    ],
    disclaimer: 'Proposed system behavior: Automated payment validation hardware and door-control firmware remain in design development; neither is claimed as fully implemented or tested.',
  },

  // 04 — Normal Stop Request vs. Emergency / SOS Protocols
  stoppingProtocols: {
    title: 'Dual Stopping Protocols: Normal Stop vs. Emergency SOS',
    badge: 'Safety Architecture',
    sub: 'An ordinary drop-off request and an emergency intervention require fundamentally distinct operational and safety logic.',
    normalStop: {
      type: 'NORMAL PASSENGER STOP REQUEST',
      intent: 'Allow early exit before the scheduled drop-off junction without compromising traffic flow or passenger safety.',
      flow: [
        'Passenger presses dedicated Stop Request control located at their seat.',
        'System evaluates route rules and identifies an upcoming permitted safe stopping point.',
        'Pod decelerates smoothly and pulls adjacent to the curbside or road margin.',
        'System verifies safe external traffic conditions before unlocking sliding doors.',
        'Passenger exits safely; vehicle resumes fixed route.',
      ],
      ruleNote: 'Policy constraint: Passengers cannot exit anywhere. The vehicle will not stop in active intersections or blind corners.',
    },
    emergencySos: {
      type: 'EMERGENCY / SOS INTERVENTION',
      intent: 'Provide immediate, driverless emergency control accessible from every passenger seat.',
      flow: [
        'Passenger activates high-contrast, tactile Emergency SOS control.',
        'Vehicle immediately initiates safety-prioritized vehicle response and activates exterior hazard strobes.',
        'Incident telemetry, cabin audio, and location coordinates are transmitted to remote operations.',
        'Vehicle initiates controlled deceleration to the nearest viable roadway margin.',
        'Mechanical door interlocks release once the vehicle achieves zero velocity.',
      ],
      ruleNote: 'Engineering constraint: The vehicle does NOT skid-brake instantly or open doors while moving. Stopping and evacuation logic require formal automotive safety engineering and validation.',
    },
  },

  // 05 — Vehicle Variants: 4-Seater vs. 6-Seater (NO STRETCHING)
  vehicleVariants: {
    title: 'Vehicle Capacity Configurations: 4-Seater & 6-Seater',
    badge: 'Physical Hardware',
    statement: 'Two distinct physical vehicle platforms. The vehicle does NOT stretch or transform.',
    variants: [
      {
        name: '4-Seater Agile Pod',
        tag: 'COMPACT FEEDER PLATFORM',
        role: 'Narrow Alleys, Remote Feeders & Low-Demand Hours',
        chassis: 'Shorter wheelbase on the shared skateboard architecture.',
        context: 'Deployed on residential lanes where larger vehicles risk congestion, and during off-peak night hours to maintain high frequency without energy waste.',
        occupancy: '4 Forward-Facing Seats · Compact Luggage Storage',
      },
      {
        name: '6-Seater Trunk Pod',
        tag: 'HIGH-THROUGHPUT PLATFORM',
        role: 'Commercial Corridors, School Rush & Railway Clearances',
        chassis: 'Full 3.6 m platform with wide 1.3 m bi-parting door aperture.',
        context: 'Deployed along high-density arterial spines during morning/evening commute peaks to clear passenger platforms rapidly.',
        occupancy: '6 Forward-Facing Seats on Flat Skateboard Floor',
      },
    ],
  },

  // 06 — AI-Assisted Fleet Allocation Layer
  fleetAllocation: {
    title: 'AI-Assisted Fleet Allocation Layer',
    badge: 'Fleet Intelligence',
    statement: 'AI operates at the fleet-management level. It does not style vehicle proportions.',
    flow: [
      { step: '01', title: 'Booking Application / Kiosk', desc: 'Captures passenger travel intent, origin junction, and destination.' },
      { step: '02', title: 'Passenger Demand Data', desc: 'Aggregates anonymized passenger volumes across fixed municipal corridors.' },
      { step: '03', title: 'Demand Forecasting', desc: 'Machine learning forecasts impending surges from railway arrivals, bazaar days, and weather.' },
      { step: '04', title: 'Route and Vehicle Allocation', desc: 'Optimizer matches corridor road widths and demand levels to vehicle capacities.' },
      { step: '05', title: 'Four-Seat or Six-Seat Pod Dispatch', desc: '4-seaters deployed to narrow feeders; 6-seaters deployed to trunk lines.' },
      { step: '06', title: 'Service Feedback', desc: 'Actual dwell times and seat occupancy telemetry continually calibrate the dispatch model.' },
    ],
    disclaimer: 'Proposed system architecture: No simulated accuracy percentages or unverified operational efficiency metrics are claimed.',
  },

  // 07 — Existing Transport Unions & Driver Decoupling
  unionIntegration: {
    title: 'Local Transport Unions & Driver Economic Decoupling',
    badge: 'Socio-Economic Foundation',
    statement: 'The goal is to collaborate with existing transport ecosystems, not eliminate them.',
    researchFact:
      'Field research in Dehradun revealed that informal shared-transit drivers often rent vehicles from private owners at approximately ₹700 per day. To break even and earn a living wage after fuel costs, drivers are economically forced to dangerously overload vehicles and stall at junctions until every square inch is packed.',
    researchAttribution:
      '*Figure of ~₹700/day reflects qualitative field research in Dehradun tracker corridors and is attributed strictly to that research context, not presented as a universal national statistic.',
    designResponse:
      'Bharat Mobility Pod decouples vehicle occupancy from driver livelihood by removing fare-collection pressure from individuals and transitioning local transport unions into fleet operating partners.',
    collaborativeRoles: [
      { role: 'Cooperative Fleet Ownership', desc: 'Existing driver unions can hold equity stakes in municipal pod fleets through cooperative transport trusts.' },
      { role: 'Depot Maintenance & Charging', desc: 'Local drivers are reskilled as EV technicians, battery swap managers, and physical safety inspectors.' },
      { role: 'Transit Hub Operations', desc: 'Union members manage pickup junction kiosks, passenger boarding queues, and accessibility assistance.' },
      { role: 'Fair Revenue Sharing', desc: 'Municipal service revenues are distributed predictably without forcing drivers into cutthroat passenger poaching.' },
    ],
    disclaimer: 'Proposed stakeholder framework: Represents design intent for inclusive transition; no formal union agreements currently exist.',
  },

  // 08 — Night-Time Operations Assessment
  nightOperations: {
    title: 'Night-Time Operations Feasibility Assessment',
    badge: 'Future Service Horizon',
    opportunity:
      'In many Tier 2 and Tier 3 cities, public transit completely halts after 9 PM. Shift workers, hospital staff, railway travelers, and women face severe mobility isolation or exorbitant private auto fares. An autonomous fleet could provide lifeline connectivity during night hours.',
    engineeringRequirements: [
      { item: 'Street Illumination & Sensor Performance', note: 'Evaluating vision and LiDAR sensor reliability in unlit suburban stretches.' },
      { item: 'In-Cabin Passenger Security', note: 'Remote audio/video monitoring protocols and rapid emergency safe-haven routing.' },
      { item: 'Operating Economics', note: 'Deploying agile 4-seater pods to minimize running costs during low-frequency night windows.' },
      { item: 'Regulatory Feasibility', note: 'Aligning with municipal transport rules for uncrewed late-night commercial transit.' },
    ],
    disclaimer: 'Future service opportunity: Presented as an architectural expansion, not a tested or approved operational capability.',
  },

  // 09 — Editable UX Placeholders for Future Design Work (Section 15)
  uxPlaceholders: [
    {
      id: 'ux-01',
      title: 'Ticket-Booking & Corridor Selection Interface Placeholder',
      tag: 'Companion App Screen · Route, Junction & Time Window',
      purpose: 'Interface displaying fixed route choices, pickup/drop-off junction selectors, available travel time windows, and real-time committed fleet capacity verification.',
    },
    {
      id: 'ux-02',
      title: 'Route & Junction Selection Placeholder',
      tag: 'Interactive Route Map',
      purpose: 'Visual route line displaying available fixed stops and estimated walking time from commuter current location.',
    },
    {
      id: 'ux-03',
      title: 'Seat Confirmation Screen Placeholder',
      tag: 'Digital Boarding Credential · Confirmed Seat Assurance',
      purpose: 'Displays SEAT CONFIRMED, YOUR BOARDING WINDOW: [TIME RANGE], PICKUP: [JUNCTION], and DROP-OFF: [JUNCTION]. Specific vehicle assignment is deferred until the approaching pod is identified.',
      uiExample: {
        status: 'SEAT CONFIRMED',
        window: 'YOUR BOARDING WINDOW: 08:15 – 08:30',
        pickup: 'PICKUP: CLOCK TOWER JUNCTION',
        dropoff: 'DROP-OFF: PALTAN BAZAAR',
        pod: 'POD ASSIGNMENT: IDENTIFIED ON APPROACH',
        caption: 'Illustrative placeholder values. No specific pod is promised at initial booking stage.',
      },
    },
    {
      id: 'ux-04',
      title: 'Sidewalk Kiosk Interface Placeholder',
      tag: 'Physical Totem Hardware Screen',
      purpose: 'High-contrast, multilingual touchscreen / physical button interface for smartphone-free passenger booking.',
    },
    {
      id: 'ux-05',
      title: 'In-Seat Onboard Tap-to-Pay Unit Placeholder',
      tag: 'Behind-Seat Hardware Unit',
      purpose: 'Contactless card and transit pass tap sensor located directly behind the forward seatback with fare confirmation LED.',
    },
    {
      id: 'ux-06',
      title: 'Passenger Stop-Request Control Placement Placeholder',
      tag: 'Cabin Ergonomic Touchpoint',
      purpose: 'Physical capacitive illuminated stop button positioned within comfortable arm reach of all 6 forward-facing seat tiers.',
    },
    {
      id: 'ux-07',
      title: 'Seat-Side Emergency SOS Button Placement Placeholder',
      tag: 'Safety Override Hardware',
      purpose: 'Dedicated guarded physical switch triggering telemetry alert and controlled safe-haven deceleration.',
    },
    {
      id: 'ux-08',
      title: 'Fleet Allocation Operator Visualization Placeholder',
      tag: 'Central Fleet Dispatch Matrix',
      purpose: 'Municipal dashboard showing corridor demand forecasts, 4-seater vs. 6-seater pod distribution, and battery states.',
    },
  ],

  // 10 — Open Technical & Operational Inquiries
  openQuestions: [
    { q: 'Simultaneous Doorway Validation', note: 'Multi-passenger contactless validation speed through wide 1.3 m sliding aperture without queue choke.' },
    { q: 'Permitted Stopping Policy', note: 'Algorithmic identification and municipal gazetting of safe stopping bays along dense secondary market corridors.' },
    { q: 'Uncurbed Rural Road Safe-Stop', note: 'Autonomous minimal-risk pull-over protocols on uneven road edges without formal curbs or marked shoulders.' },
    { q: 'Monsoon Sensor Cleaning', note: 'Automated spray nozzles and wiper cycles for LiDAR and optical cameras navigating heavy rain and road splatter.' },
    { q: 'Fleet Capacity Ingestion Latency', note: 'Real-time telemetry sync speed between roving pods and the centralized capacity allocation ledger.' },
  ],
};

export default serviceOperationsData;
