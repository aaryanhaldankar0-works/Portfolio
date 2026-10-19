import Reveal from './Reveal.jsx';

/**
 * BookingToBoarding — Phase 06: Passenger Booking Experience
 *
 * Explains the proposed unreserved passenger journey from request to drop-off.
 * Explicitly treats this as a proposed UX flow, not a tested/implemented app.
 * Clearly tags unresolved decisions with "TO BE DEVELOPED".
 * Includes a reusable visual blueprint area for future wireframes and prototypes.
 */

const JOURNEY_STEPS = [
  {
    step: '01',
    phase: 'Intent & Direction',
    title: 'Selects Route or Destination',
    actor: 'Passenger',
    interaction:
      'The passenger indicates their travel corridor either through a lightweight civic app, an integrated micro-mobility kiosk, or by approaching a physical transit totem at a designated boarding node.',
    status: 'Proposed UX Logic',
    toBeDeveloped: false,
    details: 'Fixed corridor routing with dynamic stop matching based on live corridor density.',
  },
  {
    step: '02',
    phase: 'Fare Medium Request',
    title: 'Requests or Purchases Unreserved Ticket',
    actor: 'Passenger / Node Turnstile',
    interaction:
      'Commuter procures an unreserved open ticket. Eliminates surge pricing, seat reservation locks, and app requirements for maximum civic accessibility.',
    status: 'Open Architecture Decision',
    toBeDeveloped: true,
    toDevelopNote: 'TO BE DEVELOPED: Unified smartcard NFC tap vs reusable physical token vs UPI-generated QR printout.',
    details: 'Zero technological exclusion: accommodates both smartphone owners and unbanked daily-wage commuters.',
  },
  {
    step: '03',
    phase: 'Arrival Telemetry',
    title: 'System Communicates Service Information',
    actor: 'Central Fleet Dispatch / Stop Display',
    interaction:
      'The digital node totem and/or mobile view displays real-time countdown, vehicle bay assignment, pod capacity status (4-seater vs 6-seater), and vehicle arrival countdown.',
    status: 'Operational Logic',
    toBeDeveloped: true,
    toDevelopNote: 'TO BE DEVELOPED: Micro-LED stop totem visibility under direct midday Indian sun & low-latency mesh telemetry.',
    details: 'Countdown broadcast keeps boarding nodes calm and prevents chaotic sidewalk jostling.',
  },
  {
    step: '04',
    phase: 'Curbside Arrival',
    title: 'Reaches Designated Pickup Point',
    actor: 'Passenger & Vehicle',
    interaction:
      'Passenger steps into the clearly marked curbside boarding zone. The arriving pod identifies the designated pickup zone using curb sensors and docks parallel to the sidewalk within 5 cm.',
    status: 'Spatial Packaging',
    toBeDeveloped: false,
    details: 'Ultra-low step height (<320 mm) allows seamless transition directly from curb to vehicle floor without high steps.',
  },
  {
    step: '05',
    phase: 'Ingress & Validation',
    title: 'Boarding & Ticket Validation Occur',
    actor: 'Vehicle Aperture & Passenger',
    interaction:
      'Bi-parting sliding doors glide open. Passenger steps through the wide 1.3 m aperture and taps their card/token at the doorframe reader in under 2 seconds.',
    status: 'Hardware Interface',
    toBeDeveloped: true,
    toDevelopNote: 'TO BE DEVELOPED: Multi-passenger simultaneous doorway validation and optical passenger-counter dispute resolution.',
    details: 'Flat uninterrupted floor eliminates internal trip hazards; forward-facing seats provide immediate orientation.',
  },
  {
    step: '06',
    phase: 'Transit Corridor',
    title: 'Travels to Selected Stop',
    actor: 'Autonomous Vehicle System',
    interaction:
      'Vehicle navigates its allocated corridor using Level 4 perception. High daylight glazing gives passengers situational awareness while internal ambient displays show upcoming stops.',
    status: 'Proposed System Flow',
    toBeDeveloped: false,
    details: 'Forward-facing seats eliminate motion sickness common in rear-facing shuttle layouts on rough secondary roads.',
  },
  {
    step: '07',
    phase: 'Egress & Last-Mile',
    title: 'Exits & Completes Last-Mile Journey',
    actor: 'Passenger',
    interaction:
      'Pod docks smoothly at the designated drop-off point. Doors slide open; passenger steps directly onto the sidewalk. If needed, micro-mobility docking bays at the node support final-mile walking or e-scooters.',
    status: 'Proposed UX Resolution',
    toBeDeveloped: false,
    details: 'Rapid egress cycle keeps vehicle dwell times under 15 seconds at minor feeder stops.',
  },
];

export default function BookingToBoarding() {
  return (
    <div className="cs-booking">
      <Reveal className="cs-booking__header">
        <div className="cs-booking__eyebrow-row">
          <span className="cs-eyebrow">Service Architecture · Commuter Flow</span>
          <span className="cs-booking__status-badge">Proposed UX Flow · Unreserved Model</span>
        </div>
        <h3 className="cs-booking__title">FROM BOOKING TO BOARDING</h3>
        <p className="cs-booking__subtitle">
          How does an unreserved shared transit system work in practice? The jury rightly asked how booking friction is eliminated without creating boarding chaos. Below is the step-by-step passenger journey from initial intention to final destination.
        </p>
      </Reveal>

      {/* Editorial Disclaimer on Design Honesty */}
      <Reveal className="cs-booking__integrity-banner">
        <div className="cs-booking__integrity-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="cs-booking__integrity-text">
          <strong>Design Integrity & Implementation Boundary:</strong>
          <span>
            {' '}This is a proposed service design flow, not a tested or deployed software application. Technical integration points, edge protocols, and unverified payment gateways are transparently marked as <em>TO BE DEVELOPED</em>.
          </span>
        </div>
      </Reveal>

      {/* 7-Step Service Flow Diagram */}
      <div className="cs-booking__flow">
        {JOURNEY_STEPS.map((step, idx) => (
          <Reveal key={step.step} delay={idx * 50} className={`cs-booking__step ${step.toBeDeveloped ? 'is-tbd' : ''}`}>
            <div className="cs-booking__step-header">
              <div className="cs-booking__step-number-wrap">
                <span className="cs-booking__step-num">{step.step}</span>
                <span className="cs-booking__step-phase">{step.phase}</span>
              </div>
              {step.toBeDeveloped ? (
                <span className="cs-booking__tbd-badge">
                  <span className="cs-booking__tbd-dot" />
                  TO BE DEVELOPED
                </span>
              ) : (
                <span className="cs-booking__status-tag">{step.status}</span>
              )}
            </div>

            <div className="cs-booking__step-body">
              <h4 className="cs-booking__step-title">{step.title}</h4>
              <div className="cs-booking__actor">
                <span className="cs-booking__actor-label">Actor:</span>
                <span className="cs-booking__actor-name">{step.actor}</span>
              </div>
              <p className="cs-booking__step-desc">{step.interaction}</p>
              <div className="cs-booking__step-detail">
                <span className="cs-booking__detail-bullet">↳</span>
                <span>{step.details}</span>
              </div>

              {step.toBeDeveloped && (
                <div className="cs-booking__tbd-callout">
                  <strong>Open Technical Question:</strong>
                  <p>{step.toDevelopNote}</p>
                </div>
              )}
            </div>

            {idx < JOURNEY_STEPS.length - 1 && (
              <div className="cs-booking__connector" aria-hidden="true">
                <span className="cs-booking__connector-line" />
                <span className="cs-booking__connector-arrow">↓</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* Reusable Visual Area for Future Wireframes and Prototypes */}
      <Reveal className="cs-booking__wireframe-area">
        <div className="cs-booking__wireframe-header">
          <div className="cs-booking__wireframe-title-wrap">
            <span className="cs-eyebrow">Interface System Architecture</span>
            <h4 className="cs-booking__wireframe-title">PROPOSED APP & CURB TOTEM INTERFACE WIREFRAMES</h4>
          </div>
          <span className="cs-booking__wireframe-badge">
            <span className="cs-booking__tbd-dot" />
            RESERVED PROTOTYPE PROTOCOL · TO BE DEVELOPED
          </span>
        </div>

        <p className="cs-booking__wireframe-desc">
          Below is the designated architectural space reserved for high-fidelity interactive wireframes. It covers both the passenger companion app (for tech-savvy users wanting live corridor tracking) and the high-contrast physical sidewalk totem (for completely smartphone-free civic access).
        </p>

        {/* Blueprint Wireframe Skeleton Cards */}
        <div className="cs-booking__wireframe-grid">
          <div className="cs-booking__wf-card">
            <div className="cs-booking__wf-frame">
              <div className="cs-booking__wf-screen-header">
                <span className="cs-booking__wf-dot" />
                <span className="cs-booking__wf-dot" />
                <span className="cs-booking__wf-dot" />
                <span className="cs-booking__wf-screen-name">Mobile Companion Wireframe (Future)</span>
              </div>
              <div className="cs-booking__wf-canvas">
                <div className="cs-booking__wf-block cs-booking__wf-block--hero">
                  <span>Corridor Live Radar & Pod Distance</span>
                </div>
                <div className="cs-booking__wf-row">
                  <div className="cs-booking__wf-block">Next Arrival: 2.4 min</div>
                  <div className="cs-booking__wf-block">Capacity: 4 / 6 Seats</div>
                </div>
                <div className="cs-booking__wf-block cs-booking__wf-block--action">
                  <span>1-Tap NFC Transit Token Sync</span>
                </div>
              </div>
            </div>
            <div className="cs-booking__wf-caption">
              <strong>Screen 01 · Corridor Telemetry Feed</strong>
              <span>Displays incoming pod occupancy without requiring upfront trip registration. [TO BE DEVELOPED]</span>
            </div>
          </div>

          <div className="cs-booking__wf-card">
            <div className="cs-booking__wf-frame">
              <div className="cs-booking__wf-screen-header">
                <span className="cs-booking__wf-dot" />
                <span className="cs-booking__wf-dot" />
                <span className="cs-booking__wf-dot" />
                <span className="cs-booking__wf-screen-name">Sidewalk Totem Interface (Future)</span>
              </div>
              <div className="cs-booking__wf-canvas">
                <div className="cs-booking__wf-block cs-booking__wf-block--hero">
                  <span>Solar-Powered E-Ink / High-Brite LED</span>
                </div>
                <div className="cs-booking__wf-row">
                  <div className="cs-booking__wf-block">Physical Coin / Token Slot</div>
                  <div className="cs-booking__wf-block">Audio Route Prompt</div>
                </div>
                <div className="cs-booking__wf-block cs-booking__wf-block--action">
                  <span>Emergency Assistance Call Button</span>
                </div>
              </div>
            </div>
            <div className="cs-booking__wf-caption">
              <strong>Screen 02 · Curb Totem Hardware</strong>
              <span>Zero-smartphone physical access node for daily commuters and unbanked riders. [TO BE DEVELOPED]</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
