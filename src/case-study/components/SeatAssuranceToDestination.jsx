import { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';

/**
 * SeatAssuranceToDestination — Section 07 (Main Exhibition)
 *
 * "FROM SEAT ASSURANCE TO DESTINATION"
 * Concise, visual chapter showing:
 * 1. Proposed passenger experience via a lightweight, seamlessly looping motion graphic (~14s loop).
 *    Sequence:
 *      RESERVE SEAT → REACH JUNCTION → BOARD / PAY → DOOR WARNING & CLOSURE → FIXED-ROUTE JOURNEY → REQUEST STOP / EXIT
 * 2. Compact 3-layer visual showing how the service operates:
 *      - PASSENGER EXPERIENCE (Booking / Seat Assurance / Boarding / Journey)
 *      - VEHICLE SYSTEM (Four-seat & Six-seat Pods / Fixed Routes / Stop Requests / Safety Controls)
 *      - OPERATIONS (Demand Forecasting / Fleet Allocation / Local Union Participation / Maintenance)
 *
 * Core project identity:
 *   - Fixed-route shared transit (NOT an on-demand taxi, NO door-to-door detour)
 *   - Advance seat assurance (removes overcrowding and uncertainty)
 *   - 4-seat and 6-seat distinct physical pods (NO stretching vehicle)
 *   - Minimal monochrome icons, thin lines, and muted-yellow accent (#e2b13c).
 */

const SEQUENCE_STEPS = [
  {
    num: '01',
    id: 'reserve',
    title: 'RESERVE SEAT',
    desc: 'Select fixed route & time window. One seat confirmed from committed fleet capacity (no vehicle promised yet).',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cs-flow-icon">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="7" y1="9" x2="17" y2="9" />
        <line x1="7" y1="13" x2="13" y2="13" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '02',
    id: 'junction',
    title: 'REACH JUNCTION',
    desc: 'Walk to designated fixed-route junction stop. (No off-route door-to-door deviations).',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cs-flow-icon">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    num: '03',
    id: 'board-pay',
    title: 'BOARD / PAY',
    desc: 'Prepayment verification or onboard tap-to-pay interface behind the seat.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cs-flow-icon">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <circle cx="6" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '04',
    id: 'doors',
    title: 'DOOR WARNING & CLOSURE',
    desc: 'Visual/chime warning sounded, safety clearance checked, sliding doors seal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cs-flow-icon">
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <polyline points="9 10 7 12 9 14" />
        <polyline points="15 10 17 12 15 14" />
      </svg>
    ),
  },
  {
    num: '05',
    id: 'journey',
    title: 'FIXED-ROUTE JOURNEY',
    desc: 'Autonomous pod navigates predefined geofenced corridor. 6 forward-facing seats.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cs-flow-icon">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    num: '06',
    id: 'stop-exit',
    title: 'REQUEST STOP / EXIT',
    desc: 'Passenger activates stop control; pod stops at permitted safe location; doors release.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cs-flow-icon">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12h6" />
        <path d="M12 9l3 3-3 3" />
      </svg>
    ),
  },
];

const LOOP_MS = 15000; // 15 seconds loop

export default function SeatAssuranceToDestination() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let animId;
    let start = null;

    const tick = (now) => {
      if (!start) start = now;
      const elapsed = (now - start) % LOOP_MS;
      const norm = elapsed / LOOP_MS;
      setProgress(norm);
      const step = Math.min(Math.floor(norm * SEQUENCE_STEPS.length), SEQUENCE_STEPS.length - 1);
      setActiveStepIdx(step);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [inView]);

  return (
    <div ref={containerRef} className="cs-seat-assurance">
      {/* Chapter Header */}
      <Reveal className="cs-seat-assurance__header">
        <div className="cs-seat-assurance__eyebrow-row">
          <span className="cs-eyebrow">Service Architecture · Passenger Experience</span>
          <span className="cs-seat-assurance__badge">Fixed-Route · Advance Seat Assurance</span>
        </div>
        <h3 className="cs-seat-assurance__title">FROM SEAT ASSURANCE TO DESTINATION</h3>
        <p className="cs-seat-assurance__subtitle">
          Bharat Mobility Pod is <strong>not an on-demand, door-to-door cab</strong>. It is a proposed <strong>fixed-route, shared autonomous mobility system</strong> for Tier 2 and Tier 3 Indian cities. <strong>A booking confirms one seat within a selected time window, not on a specific pod or departure.</strong> The system confirms seats only when committed fleet capacity (4-seat and 6-seat variants pooling dynamically) can support that commitment, while keeping vehicles strictly on predetermined routes.
        </p>
      </Reveal>

      {/* 12-18s Animated Service Flow Diagram */}
      <div className="cs-seat-assurance__motion-container">
        <div className="cs-seat-assurance__motion-header">
          <div className="cs-seat-assurance__motion-title-wrap">
            <span className="cs-flow-pulse" />
            <span className="cs-seat-assurance__motion-title">PROPOSED PASSENGER JOURNEY SEQUENCE (~15s Loop)</span>
          </div>
          <span className="cs-seat-assurance__loop-counter">
            STEP {SEQUENCE_STEPS[activeStepIdx].num} / 06 · {SEQUENCE_STEPS[activeStepIdx].title}
          </span>
        </div>

        {/* Illustrative Booking UI Ticket Specification */}
        <div className="cs-flow-ticket-banner">
          <div className="cs-flow-ticket-badge">
            <span className="cs-flow-ticket-dot" />
            <span className="cs-flow-ticket-status">SEAT CONFIRMED</span>
          </div>
          <div className="cs-flow-ticket-fields">
            <div className="cs-flow-ticket-field">
              <span className="cs-flow-ticket-label">YOUR BOARDING WINDOW</span>
              <span className="cs-flow-ticket-val">08:15 – 08:30 <span className="cs-flow-ticket-tag">(Illustrative)</span></span>
            </div>
            <div className="cs-flow-ticket-field">
              <span className="cs-flow-ticket-label">PICKUP</span>
              <span className="cs-flow-ticket-val">Clock Tower Junction</span>
            </div>
            <div className="cs-flow-ticket-field">
              <span className="cs-flow-ticket-label">DROP-OFF</span>
              <span className="cs-flow-ticket-val">Paltan Bazaar</span>
            </div>
            <div className="cs-flow-ticket-field cs-flow-ticket-field--pod">
              <span className="cs-flow-ticket-label">POD ASSIGNMENT</span>
              <span className="cs-flow-ticket-val cs-flow-ticket-val--deferred">Identified On Approach</span>
            </div>
          </div>
        </div>

        {/* Horizontal Connecting Route Line & Stepper */}
        <div className="cs-flow-strip">
          <div className="cs-flow-strip__track">
            <div
              className="cs-flow-strip__progress"
              style={{ width: `${Math.max(5, progress * 100)}%` }}
            />
            <div
              className="cs-flow-strip__pulse-head"
              style={{ left: `${progress * 100}%` }}
            />
          </div>

          <div className="cs-flow-steps">
            {SEQUENCE_STEPS.map((s, idx) => {
              const isActive = idx === activeStepIdx;
              const isPast = idx < activeStepIdx;
              return (
                <div
                  key={s.id}
                  className={`cs-flow-node ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                >
                  <div className="cs-flow-node__circle">
                    <span className="cs-flow-node__icon">{s.icon}</span>
                  </div>
                  <div className="cs-flow-node__text">
                    <span className="cs-flow-node__num">{s.num}</span>
                    <strong className="cs-flow-node__title">{s.title}</strong>
                    <p className="cs-flow-node__desc">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Route Diagram Explainer */}
        <div className="cs-flow-route-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <circle cx="5" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="19" cy="12" r="2" fill="currentColor" />
          </svg>
          <span>
            <strong>Fixed Route Geometry:</strong> Pods strictly follow geofenced municipal corridors between predetermined pickup and drop-off junctions. Pods do not make door-to-door detours into personal lanes.
          </span>
        </div>
      </div>

      {/* Compact 3-Layer System Diagram (Section 13) */}
      <Reveal className="cs-system-diagram">
        <div className="cs-system-diagram__header">
          <span className="cs-eyebrow">Integrated Operating Model</span>
          <h4 className="cs-system-diagram__title">THREE-LAYER SERVICE INTEGRATION</h4>
          <p className="cs-system-diagram__sub">
            The service connects the human commute experience, physical vehicle architecture, and municipal operational logic into one coherent framework.
          </p>
        </div>

        <div className="cs-system-diagram__layers">
          {/* Layer 01: Passenger Experience */}
          <div className="cs-sys-layer cs-sys-layer--passenger">
            <div className="cs-sys-layer__aside">
              <span className="cs-sys-layer__num">LAYER 01</span>
              <h5 className="cs-sys-layer__heading">PASSENGER EXPERIENCE</h5>
            </div>
            <div className="cs-sys-layer__cards">
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Pre-Trip</span>
                <strong>Route &amp; Schedule Select</strong>
                <p>Choose fixed route, pickup/drop-off junctions, and travel time window via app or totem.</p>
              </div>
              <div className="cs-sys-cell cs-sys-cell--accent">
                <span className="cs-sys-cell__kicker">Core Assurance</span>
                <strong>Advance Seat Assurance</strong>
                <p>Guaranteed confirmed seat capacity prior to arrival; eliminates overcrowding scrambles (no specific vehicle promised yet).</p>
              </div>
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Ingress</span>
                <strong>Dual Payment Verification</strong>
                <p>Prepayment validation or in-seat tap-to-pay behind each forward seat.</p>
              </div>
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">In Transit</span>
                <strong>Fixed-Route Journey</strong>
                <p>Comfortable forward-facing seats, high-visibility glazing, no standing crush.</p>
              </div>
            </div>
          </div>

          <div className="cs-sys-layer-connector" aria-hidden="true">
            <span className="cs-sys-layer-connector__line" />
            <span className="cs-sys-layer-connector__arrow">↕</span>
          </div>

          {/* Layer 02: Vehicle System */}
          <div className="cs-sys-layer cs-sys-layer--vehicle">
            <div className="cs-sys-layer__aside">
              <span className="cs-sys-layer__num">LAYER 02</span>
              <h5 className="cs-sys-layer__heading">VEHICLE SYSTEM</h5>
            </div>
            <div className="cs-sys-layer__cards">
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Hardware Variants</span>
                <strong>4-Seat &amp; 6-Seat Pods</strong>
                <p>Two distinct physical vehicle platforms. (No stretching mechanism).</p>
              </div>
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Navigation</span>
                <strong>Predefined Geofencing</strong>
                <p>Strictly locked to evaluated road widths, turning radii, and corridor constraints.</p>
              </div>
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Passenger Control</span>
                <strong>Normal Stop Request</strong>
                <p>Dedicated control requests drop-off; vehicle stops at permitted safe locations.</p>
              </div>
              <div className="cs-sys-cell cs-sys-cell--safety">
                <span className="cs-sys-cell__kicker">Safety Override</span>
                <strong>Emergency / SOS Controls</strong>
                <p>Direct passenger seat controls trigger controlled safe-stop &amp; telemetry alert.</p>
              </div>
            </div>
          </div>

          <div className="cs-sys-layer-connector" aria-hidden="true">
            <span className="cs-sys-layer-connector__line" />
            <span className="cs-sys-layer-connector__arrow">↕</span>
          </div>

          {/* Layer 03: Operations */}
          <div className="cs-sys-layer cs-sys-layer--operations">
            <div className="cs-sys-layer__aside">
              <span className="cs-sys-layer__num">LAYER 03</span>
              <h5 className="cs-sys-layer__heading">OPERATIONS</h5>
            </div>
            <div className="cs-sys-layer__cards">
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Fleet Intelligence</span>
                <strong>Demand Forecasting</strong>
                <p>Analyzes travel trends &amp; booking data without confusing prediction with guaranteed capacity.</p>
              </div>
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Capacity Allocation</span>
                <strong>Fleet Dispatch Engine</strong>
                <p>Pools 4-seaters &amp; 6-seaters dynamically to fulfill committed seat reservations across active departure windows.</p>
              </div>
              <div className="cs-sys-cell cs-sys-cell--union">
                <span className="cs-sys-cell__kicker">Ecosystem Partnership</span>
                <strong>Local Union Roles</strong>
                <p>Drivers transition to fleet co-ownership, hub operations, and depot maintenance.</p>
              </div>
              <div className="cs-sys-cell">
                <span className="cs-sys-cell__kicker">Future Scope</span>
                <strong>Night-Time Feasibility</strong>
                <p>Evaluates late-night lifeline connectivity under safety and supervision rules.</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Quiet Threshold to Deep Dive Workshop (Section 14) */}
      <Reveal className="cs-seat-assurance__deepdive-bridge">
        <div className="cs-seat-assurance__bridge-content">
          <span className="cs-eyebrow">Studio Process Archive</span>
          <h4 className="cs-seat-assurance__bridge-title">Deep Dive: Service &amp; Operations Development</h4>
          <p className="cs-seat-assurance__bridge-desc">
            The full operational architecture — including ticket reservation logic, proposed app and kiosk wireframe placeholders, normal vs. SOS stopping sequences, driver union economic decoupling, and fleet dispatch — is documented inside the Rabbit Hole.
          </p>
        </div>
        <a
          href="#bharat-mobility/workshop"
          className="cs-seat-assurance__bridge-btn"
          onClick={(e) => {
            e.preventDefault();
            const btn = document.getElementById('bharat-mobility-workshop-entrance');
            if (btn) btn.click();
          }}
        >
          <span>Open Workshop: Zone 06 (Service &amp; Operations)</span>
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </div>
  );
}
