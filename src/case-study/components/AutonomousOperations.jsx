import { useState } from 'react';
import Reveal from './Reveal.jsx';

/**
 * AutonomousOperations — Phase 07: How the Service Operates
 *
 * System-design chapter addressing key jury inquiries regarding autonomous shared transit:
 * 1. Pickup request identification
 * 2. Passenger vehicle identification
 * 3. Boarding authorization
 * 4. Destination & stop assignment
 * 5. Shared occupancy management
 * 6. 4-seat vs 6-seat vehicle dispatch
 * 7. Missed vehicle handling
 * 8. Blocked/unavailable route handling
 * 9. SOS & emergency response
 * 10. Autonomous fallback / Minimal Risk Condition
 *
 * Strictly separates:
 *  - Existing Design Intent
 *  - Proposed Operational Logic
 *  - Open Engineering Questions
 */

const OPERATIONS_DATA = [
  {
    id: 'op-01',
    question: 'How does the vehicle identify a pickup request?',
    intent: 'Design Intent: Fixed corridor looping with designated micro-stops rather than chaotic door-to-door hailing.',
    logic: 'Proposed Logic: Anonymized optical curb-sensors and tap turnstiles signal waiting passenger clusters to incoming pods within 500 meters.',
    openQuestion: 'Open Engineering Question: How to handle spontaneous roadside hailing in areas without digital stop totems without false-positive sensor braking?',
    category: 'Request & Discovery',
  },
  {
    id: 'op-02',
    question: 'How does the passenger identify the correct vehicle?',
    intent: 'Design Intent: Calm, high-contrast exterior signage and approachable civic lighting identity.',
    logic: 'Proposed Logic: High-mounted 360° roofline LED beacon mirrors the route color and terminal stop code; companion app buzzes with haptic confirmation upon pod docking.',
    openQuestion: 'Open Engineering Question: Legibility of digital electronic rollsigns under harsh direct Indian midday sunlight and heavy dust accumulation.',
    category: 'Passenger Identification',
  },
  {
    id: 'op-03',
    question: 'How would boarding authorization work?',
    intent: 'Design Intent: Open-throughput unreserved access modeled on the Mumbai Local — zero friction, zero app dependencies.',
    logic: 'Proposed Logic: Sub-second contactless NFC card/token tap at the doorframe pillar. Visual green LED perimeter indicator flashes for valid fare.',
    openQuestion: 'Open Engineering Question: High-speed validation when 4 passengers board simultaneously through the wide 1.3 m sliding door aperture.',
    category: 'Access & Authorization',
  },
  {
    id: 'op-04',
    question: 'How are destinations and stops assigned?',
    intent: 'Design Intent: Pre-established feeder spines connecting rail heads, marketplaces, and universities.',
    logic: 'Proposed Logic: Fixed-artery loop with dynamic request stops. Pod stops only at nodes where passengers tap to board or press interior capacitive drop buttons.',
    openQuestion: 'Open Engineering Question: Algorithmic optimization of stop frequency vs route travel time when multiple passengers request intermediate stops.',
    category: 'Routing & Assignment',
  },
  {
    id: 'op-05',
    question: 'How would shared occupancy be managed?',
    intent: 'Design Intent: Forward-facing 6-passenger layout with dedicated legroom and unobstructed central aisle preventing claustrophobia.',
    logic: 'Proposed Logic: Overhead infrared seat occupancy sensors detect occupied cushions. When full, vehicle automatically updates exterior headsign to "EXPRESS: EN ROUTE".',
    openQuestion: 'Open Engineering Question: Privacy-preserving interior sensing that accurately distinguishes passenger baggage placed on seats from actual human occupants.',
    category: 'Cabin Management',
  },
  {
    id: 'op-06',
    question: 'How are 4-seat and 6-seat vehicle variants dispatched?',
    intent: 'Design Intent: Two distinct physical vehicle platforms sharing one skateboard chassis — smaller 4-seater for narrow alleys, 6-seater for peak trunk lines.',
    logic: 'Proposed Logic: Machine learning fleet manager forecasts passenger volume from historical and live tap telemetry, routing 4-seaters to low-density feeders and 6-seaters during school/work peaks.',
    openQuestion: 'Open Engineering Question: Repositioning empty 4-seaters through congested market traffic without human intervention or excessive battery draw.',
    category: 'Fleet Dispatch',
  },
  {
    id: 'op-07',
    question: 'What happens if a passenger misses a vehicle?',
    intent: 'Design Intent: High headway frequency (every 3–5 minutes) so missing one vehicle creates near-zero anxiety.',
    logic: 'Proposed Logic: Fare tokens remain valid for 60 minutes across any pod on the corridor. The sidewalk totem display immediately counts down to the next trailing pod.',
    openQuestion: 'Open Engineering Question: Platform queue management if multiple consecutive pods arrive at peak capacity during sudden market dispersal.',
    category: 'Contingency & Flow',
  },
  {
    id: 'op-08',
    question: 'What happens when a route becomes unavailable?',
    intent: 'Design Intent: High ground clearance (>180 mm) and narrow 1,380 mm width to maneuver around common Indian street bottlenecks and roadworks.',
    logic: 'Proposed Logic: Live V2X mesh communication flags road blockages; pod recalculates route via secondary vetted alleys or holds safely at preceding node.',
    openQuestion: 'Open Engineering Question: Autonomous negotiation of unmapped construction debris, waterlogged monsoon dips, and unregulated temporary vendor stalls.',
    category: 'Route Obstruction',
  },
  {
    id: 'op-09',
    question: 'How would an SOS or emergency request be handled?',
    intent: 'Design Intent: Prominent physical illuminated emergency push-buttons at every seat tier, plus emergency mechanical door release.',
    logic: 'Proposed Logic: Triggering SOS instantly streams cabin audio and sensor telemetry to human remote operations center; pod illuminates exterior emergency hazards and routes to nearest designated safe harbor.',
    openQuestion: 'Open Engineering Question: Robustness of cellular telemetry uplink during Himalayan storms or remote dead zones; manual override authority protocols.',
    category: 'Safety & Emergency',
  },
  {
    id: 'op-10',
    question: 'What happens if autonomous operation cannot continue safely?',
    intent: 'Design Intent: Built-in fail-operational redundant braking and steering actuators with mechanical fail-safe lock.',
    logic: 'Proposed Logic: Autonomous Minimal Risk Condition (MRC): vehicle slows safely, indicates hazard lights, moves to the curb margin, and releases door locks for safe passenger disembarkation.',
    openQuestion: 'Open Engineering Question: Ensuring safe curbside pulling-over in dense chaotic traffic without high-curb infrastructure or marked shoulder lanes.',
    category: 'Failsafe Protocol',
  },
];

export default function AutonomousOperations() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Request & Discovery', 'Access & Authorization', 'Fleet Dispatch', 'Safety & Emergency'];

  const filtered = activeFilter === 'All'
    ? OPERATIONS_DATA
    : OPERATIONS_DATA.filter((d) => d.category === activeFilter);

  return (
    <div className="cs-auto-ops">
      <Reveal className="cs-auto-ops__header">
        <div className="cs-auto-ops__eyebrow-row">
          <span className="cs-eyebrow">System Architecture · Operations Engineering</span>
          <span className="cs-auto-ops__badge">Jury Questions Addressed</span>
        </div>
        <h3 className="cs-auto-ops__title">HOW THE SERVICE OPERATES</h3>
        <p className="cs-auto-ops__subtitle">
          Transportation design does not end at exterior surfacing. The jury posed essential questions regarding how an autonomous shared fleet would actually function on chaotic, organic street networks. Below is the operational framework, explicitly separating existing design intent from proposed operational logic and open engineering questions.
        </p>
      </Reveal>

      {/* Tripartite Taxonomy Legend */}
      <Reveal className="cs-auto-ops__legend">
        <div className="cs-auto-ops__legend-item cs-auto-ops__legend-item--intent">
          <span className="cs-auto-ops__dot cs-auto-ops__dot--intent" />
          <div>
            <strong>Existing Design Intent</strong>
            <span>Decisions already physically solved in the vehicle packaging, floor height, and seating architecture.</span>
          </div>
        </div>

        <div className="cs-auto-ops__legend-item cs-auto-ops__legend-item--logic">
          <span className="cs-auto-ops__dot cs-auto-ops__dot--logic" />
          <div>
            <strong>Proposed Operational Logic</strong>
            <span>Proposed system design protocols, communication layers, and dispatch rules.</span>
          </div>
        </div>

        <div className="cs-auto-ops__legend-item cs-auto-ops__legend-item--open">
          <span className="cs-auto-ops__dot cs-auto-ops__dot--open" />
          <div>
            <strong>Open Engineering Questions</strong>
            <span>Transparent technical challenges that require physical hardware testing and fleet telemetry.</span>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <div className="cs-auto-ops__filter-row">
        <div className="cs-auto-ops__pills" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={activeFilter === c}
              className={`cs-auto-ops__pill ${activeFilter === c ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="cs-auto-ops__count">{filtered.length} Inquiries</span>
      </div>

      {/* Operations Matrix Cards */}
      <div className="cs-auto-ops__grid">
        {filtered.map((item, idx) => (
          <Reveal key={item.id} delay={(idx % 2) * 80} className="cs-auto-ops__card">
            <div className="cs-auto-ops__card-header">
              <span className="cs-auto-ops__card-num">0{idx + 1}</span>
              <h4 className="cs-auto-ops__card-q">{item.question}</h4>
            </div>

            <div className="cs-auto-ops__card-sections">
              {/* Existing Intent */}
              <div className="cs-auto-ops__sec cs-auto-ops__sec--intent">
                <span className="cs-auto-ops__sec-tag">EXISTING DESIGN INTENT</span>
                <p>{item.intent}</p>
              </div>

              {/* Proposed Logic */}
              <div className="cs-auto-ops__sec cs-auto-ops__sec--logic">
                <span className="cs-auto-ops__sec-tag">PROPOSED OPERATIONAL LOGIC</span>
                <p>{item.logic}</p>
              </div>

              {/* Open Engineering Questions */}
              <div className="cs-auto-ops__sec cs-auto-ops__sec--open">
                <span className="cs-auto-ops__sec-tag">OPEN ENGINEERING QUESTION</span>
                <p>{item.openQuestion}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Minimal Risk Condition Diagram */}
      <Reveal className="cs-auto-ops__mrc-diagram">
        <div className="cs-auto-ops__mrc-header">
          <span className="cs-eyebrow">Safety Architecture · Failsafe Engineering</span>
          <h4 className="cs-auto-ops__mrc-title">MINIMAL RISK CONDITION (MRC) FALLBACK SEQUENCE</h4>
          <p className="cs-auto-ops__mrc-sub">What happens when autonomous systems encounter unresolvable road failure?</p>
        </div>

        <div className="cs-auto-ops__mrc-flow">
          <div className="cs-auto-ops__mrc-node">
            <span className="cs-auto-ops__mrc-step">STAGE 01</span>
            <strong>Fault Detection</strong>
            <p>Sensor occlusion or redundant compute mismatch triggers autonomous warning.</p>
          </div>
          <span className="cs-auto-ops__mrc-arrow">→</span>

          <div className="cs-auto-ops__mrc-node">
            <span className="cs-auto-ops__mrc-step">STAGE 02</span>
            <strong>Corridor Slowing</strong>
            <p>Vehicle decelerates smoothly, activates 360° hazard strobe beacons, alerts cabin passengers.</p>
          </div>
          <span className="cs-auto-ops__mrc-arrow">→</span>

          <div className="cs-auto-ops__mrc-node">
            <span className="cs-auto-ops__mrc-step">STAGE 03</span>
            <strong>Curbside Maneuver</strong>
            <p>Secondary steering actuator guides pod to nearest safe roadway margin within 10 seconds.</p>
          </div>
          <span className="cs-auto-ops__mrc-arrow">→</span>

          <div className="cs-auto-ops__mrc-node">
            <span className="cs-auto-ops__mrc-step">STAGE 04</span>
            <strong>Egress Unlock</strong>
            <p>Mechanical door releases disengage; passengers step out directly onto sidewalk; remote center notified.</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
