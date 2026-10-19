import Reveal from './Reveal.jsx';

/**
 * FleetVariantsLogic — Phase 08: Vehicle Variants and AI Fleet Logic
 *
 * Clarifies that the project proposes two distinct vehicle capacities:
 *  - 4-seat variant (high agility, narrow alleyways, off-peak/feeder)
 *  - 6-seat variant (trunk corridor, peak capacity)
 *
 * Explicitly states: The vehicle does NOT mechanically stretch.
 * They are two distinct body platforms sharing the same skateboard chassis.
 *
 * Visualizes the 5-step downward flow:
 *   BOOKING AND DEMAND DATA
 *   ↓
 *   DEMAND FORECASTING
 *   ↓
 *   FLEET ALLOCATION
 *   ↓
 *   4-SEAT / 6-SEAT DISPATCH
 *   ↓
 *   SERVICE FEEDBACK
 */

export default function FleetVariantsLogic() {
  return (
    <div className="cs-variants">
      <Reveal className="cs-variants__header">
        <div className="cs-variants__eyebrow-row">
          <span className="cs-eyebrow">Fleet Intelligence & Capacity Architecture</span>
          <span className="cs-variants__badge">Two Distinct Vehicle Platforms</span>
        </div>
        <h3 className="cs-variants__title">VEHICLE VARIANTS & FLEET ALLOCATION LOGIC</h3>
        <p className="cs-variants__subtitle">
          A common point of confusion during jury review was vehicle capacity. To be explicit: <em>the vehicle does not mechanically expand or stretch</em>. Instead, the ecosystem uses two distinct, purpose-built vehicle variants sharing the modular EV skateboard chassis, dispatched dynamically by an AI fleet management layer.
        </p>
      </Reveal>

      {/* Two Distinct Vehicles Comparison (6/6 Composition) */}
      <div className="cs-variants__two-up">
        {/* 4-Seater */}
        <Reveal className="cs-variants__card cs-variants__card--4seat">
          <div className="cs-variants__card-header">
            <span className="cs-variants__cap-tag">VARIANT 01</span>
            <span className="cs-variants__role-tag">High Agility Feeder</span>
          </div>
          <h4 className="cs-variants__card-title">4-Seat Agile Pod</h4>
          <p className="cs-variants__card-tagline">Engineered for ultra-narrow alleys, off-peak hours, and low-density residential connections.</p>

          <div className="cs-variants__specs">
            <div className="cs-variants__spec-row">
              <span>Overall Length</span>
              <strong>2,850 mm</strong>
            </div>
            <div className="cs-variants__spec-row">
              <span>Overall Width</span>
              <strong>1,200 mm</strong>
            </div>
            <div className="cs-variants__spec-row">
              <span>Turning Radius</span>
              <strong>3.8 m (Kerb-to-Kerb)</strong>
            </div>
            <div className="cs-variants__spec-row">
              <span>Target Role</span>
              <strong>Residential Feeder & Night Transit</strong>
            </div>
          </div>

          <div className="cs-variants__operational-rationale">
            <strong>Operational Role:</strong>
            <p>Running a full-sized 6-passenger pod through empty residential alleys at 2 PM wastes battery energy and creates street obstruction. The 4-seater runs lean, maintaining corridor frequency without dead-weight overhead.</p>
          </div>
        </Reveal>

        {/* 6-Seater */}
        <Reveal className="cs-variants__card cs-variants__card--6seat" delay={100}>
          <div className="cs-variants__card-header">
            <span className="cs-variants__cap-tag">VARIANT 02</span>
            <span className="cs-variants__role-tag">High Throughput Trunk</span>
          </div>
          <h4 className="cs-variants__card-title">6-Seat Trunk Pod</h4>
          <p className="cs-variants__card-tagline">Engineered for main commercial arteries, school rushes, and high-volume railway station clearance.</p>

          <div className="cs-variants__specs">
            <div className="cs-variants__spec-row">
              <span>Overall Length</span>
              <strong>3,600 mm</strong>
            </div>
            <div className="cs-variants__spec-row">
              <span>Overall Width</span>
              <strong>1,380 mm</strong>
            </div>
            <div className="cs-variants__spec-row">
              <span>Turning Radius</span>
              <strong>4.6 m (Kerb-to-Kerb)</strong>
            </div>
            <div className="cs-variants__spec-row">
              <span>Target Role</span>
              <strong>Peak Commute & Trunk Arterials</strong>
            </div>
          </div>

          <div className="cs-variants__operational-rationale">
            <strong>Operational Role:</strong>
            <p>During morning office rushes and bazaar fair days, the 6-seater provides maximum platform clearance through its 1.3 m wide double-door aperture, preventing station queues from backing onto the roadway.</p>
          </div>
        </Reveal>
      </div>

      {/* Downward 5-Step Flowchart as requested by Phase 08 */}
      <Reveal className="cs-variants__flowchart">
        <div className="cs-variants__flowchart-header">
          <span className="cs-eyebrow">AI Fleet Allocation Protocol</span>
          <h4 className="cs-variants__flowchart-title">CONCEPTUAL DEMAND & DISPATCH PIPELINE</h4>
          <span className="cs-variants__illustrative-tag">Conceptual Example · Illustrative Model</span>
        </div>

        <p className="cs-variants__flowchart-note">
          AI does not style vehicle proportions. Its role is strictly systemic: predicting surges and allocating between 4-seater and 6-seater dispatches to optimize corridor flow.
        </p>

        <div className="cs-variants__flow-chain">
          {/* Node 1 */}
          <div className="cs-variants__node">
            <div className="cs-variants__node-top">
              <span className="cs-variants__node-num">01</span>
              <span className="cs-variants__node-label">TELEMETRY INGESTION</span>
            </div>
            <h5 className="cs-variants__node-title">BOOKING AND DEMAND DATA</h5>
            <p className="cs-variants__node-desc">
              Curbside NFC tap turnstiles, optical doorstep sensors, and civic partner schedules feed anonymized commuter density streams to the local hub.
            </p>
          </div>

          <div className="cs-variants__chain-arrow" aria-hidden="true">
            <span className="cs-variants__chain-line" />
            <span className="cs-variants__chain-tip">↓</span>
          </div>

          {/* Node 2 */}
          <div className="cs-variants__node">
            <div className="cs-variants__node-top">
              <span className="cs-variants__node-num">02</span>
              <span className="cs-variants__node-label">TIME-SERIES ML MODEL</span>
            </div>
            <h5 className="cs-variants__node-title">DEMAND FORECASTING</h5>
            <p className="cs-variants__node-desc">
              Historical commute cycles, railway arrival timetables, weekly marketplace schedules, and live rain radar forecast passenger surge 15–30 minutes ahead.
            </p>
          </div>

          <div className="cs-variants__chain-arrow" aria-hidden="true">
            <span className="cs-variants__chain-line" />
            <span className="cs-variants__chain-tip">↓</span>
          </div>

          {/* Node 3 */}
          <div className="cs-variants__node">
            <div className="cs-variants__node-top">
              <span className="cs-variants__node-num">03</span>
              <span className="cs-variants__node-label">CAPACITY DECISION ENGINE</span>
            </div>
            <h5 className="cs-variants__node-title">FLEET ALLOCATION</h5>
            <p className="cs-variants__node-desc">
              The optimization solver balances idle fleet battery states, corridor road widths, and predicted queue depths to assign vehicle classes.
            </p>
          </div>

          <div className="cs-variants__chain-arrow" aria-hidden="true">
            <span className="cs-variants__chain-line" />
            <span className="cs-variants__chain-tip">↓</span>
          </div>

          {/* Node 4 */}
          <div className="cs-variants__node">
            <div className="cs-variants__node-top">
              <span className="cs-variants__node-num">04</span>
              <span className="cs-variants__node-label">ACTIVE AUTONOMOUS ROUTING</span>
            </div>
            <h5 className="cs-variants__node-title">4-SEAT / 6-SEAT DISPATCH</h5>
            <p className="cs-variants__node-desc">
              4-seat agile pods are routed through narrow feeder alleys; 6-seat pods are deployed to primary trunk arteries to absorb platform congestion.
            </p>
          </div>

          <div className="cs-variants__chain-arrow" aria-hidden="true">
            <span className="cs-variants__chain-line" />
            <span className="cs-variants__chain-tip">↓</span>
          </div>

          {/* Node 5 */}
          <div className="cs-variants__node">
            <div className="cs-variants__node-top">
              <span className="cs-variants__node-num">05</span>
              <span className="cs-variants__node-label">CONTINUOUS TELEMETRY LOOP</span>
            </div>
            <h5 className="cs-variants__node-title">SERVICE FEEDBACK</h5>
            <p className="cs-variants__node-desc">
              Actual boarding dwell times and sensor seat-occupancy metrics feed back into the prediction engine, continually refining the allocation model.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
