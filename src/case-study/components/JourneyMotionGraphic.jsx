import { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';

/**
 * JourneyMotionGraphic — Automatic, seamlessly looping transport motion graphic.
 * Visualizes commute friction progression across Short (1–3 km), Moderate (3–8 km),
 * and Long (8–25 km) distance corridors in Tier 2 & 3 Indian cities.
 *
 * Core Concept:
 * As journey distance scales, transport connections and potential transfer friction
 * become exponentially more complex.
 *
 * Architectural Layout:
 * - Transport Modes & Monochrome Icons: Placed neatly ABOVE the route line (y ~ 36-54).
 * - Route Line: Draws continuously across the horizontal datum (y = 90).
 * - Waypoints, Transfer Points & Wait Times: Placed neatly BELOW the route line (y ~ 114-130).
 *
 * Requirements:
 * - Pure continuous horizontal route line with no user interaction / controls.
 * - Smooth progression: Short → Moderate → Long → Seamless return.
 * - Monochrome icons, thin lines, warm charcoal background (#141518), muted yellow accent (#e5a93c).
 * - Automatic pause when outside viewport via IntersectionObserver.
 * - Respects prefers-reduced-motion with static readable diagram.
 * - Compact height: ~260–320px.
 */

// Total loop duration in milliseconds (~13.5 seconds)
const LOOP_DURATION = 13500;

// Coordinates along horizontal baseline (viewBox: 0 0 960 170)
const COORDS = {
  y: 86,
  xHome: 80,
  xNode1: 340, // Local Junction (Short end) / Transfer 01 (Shared Auto Stand)
  xNode2: 620, // Market/College (Mod end) / Transfer 02 (Bus Junction)
  xNode3: 880, // Regional Hub (Long end)
};

export default function JourneyMotionGraphic() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // IntersectionObserver to pause loop when outside viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // requestAnimationFrame loop
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let animId;
    let startTime = null;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) % LOOP_DURATION;
      setProgress(elapsed / LOOP_DURATION);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isInView, prefersReducedMotion]);

  // If user prefers reduced motion, render clean static comparison
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className="cs-journey-motion cs-bleed cs-bleed--padded" aria-label="Commuter Journey Distance Comparison">
        <div className="cs-journey-motion__card">
          <div className="cs-journey-motion__header">
            <span className="cs-journey-motion__cat-name">COMMUTER TOPOLOGY · STATIC OVERVIEW</span>
            <span className="cs-journey-motion__badge">3 Distance Scales</span>
          </div>
          <div className="cs-journey-motion__static-grid">
            <div className="cs-journey-motion__static-row">
              <span className="cs-journey-motion__static-cat">01 / SHORT (1–3 km)</span>
              <span className="cs-journey-motion__static-flow">Home → Walk 0.8 km → Local Junction</span>
              <span className="cs-journey-motion__static-stat">0 Transfers · 15–25 min</span>
            </div>
            <div className="cs-journey-motion__static-row">
              <span className="cs-journey-motion__static-cat">02 / MODERATE (3–8 km)</span>
              <span className="cs-journey-motion__static-flow">Home → Walk → [Auto Stand · Wait 10–15m] → Shared Tracker → Destination</span>
              <span className="cs-journey-motion__static-stat">1 Transfer · 30–45 min</span>
            </div>
            <div className="cs-journey-motion__static-row">
              <span className="cs-journey-motion__static-cat">03 / LONG (8–25 km)</span>
              <span className="cs-journey-motion__static-flow">Home → Walk → [Auto Stand] → Feeder → [Bus Junction · Crowding] → City Bus → Hub</span>
              <span className="cs-journey-motion__static-stat">2 Transfers · 65–85 min</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Stage calculation:
  // Phase 1 (Short):    0.00 – 0.28 (~3.8s)
  // Phase 2 (Moderate): 0.28 – 0.62 (~4.6s)
  // Phase 3 (Long):     0.62 – 0.92 (~4.0s)
  // Loop Wrap Fade:     0.92 – 1.00 (~1.1s)
  const isPhase1 = progress < 0.28;
  const isPhase2 = progress >= 0.28 && progress < 0.62;
  const isPhase3 = progress >= 0.62 && progress < 0.92;
  const isReset = progress >= 0.92;

  // Calculate drawing head X position
  let headX = COORDS.xHome;
  let opacityFade = 1;

  if (isPhase1) {
    const localT = Math.min(1, Math.max(0, (progress - 0.02) / 0.18));
    headX = COORDS.xHome + (COORDS.xNode1 - COORDS.xHome) * easeOutCubic(localT);
  } else if (isPhase2) {
    const localT = Math.min(1, Math.max(0, (progress - 0.30) / 0.20));
    headX = COORDS.xNode1 + (COORDS.xNode2 - COORDS.xNode1) * easeOutCubic(localT);
  } else if (isPhase3) {
    const localT = Math.min(1, Math.max(0, (progress - 0.64) / 0.18));
    headX = COORDS.xNode2 + (COORDS.xNode3 - COORDS.xNode2) * easeOutCubic(localT);
  } else {
    // Reset phase: linger at node 3 and smooth opacity dip
    headX = COORDS.xNode3;
    const resetT = (progress - 0.92) / 0.08;
    opacityFade = resetT > 0.6 ? (resetT - 0.6) / 0.4 : 1 - resetT * 1.5;
    opacityFade = Math.max(0.1, Math.min(1, opacityFade));
  }

  // Active distance category metadata
  let categoryNum = '01';
  let categoryLabel = 'SHORT DISTANCE';
  let categoryDistance = '1 – 3 km';
  let categoryRoute = 'Direct Pedestrian Walk · 0 Transfers · 15–25 min';
  let frictionBadge = '0 TRANSFERS';
  let frictionTone = 'neutral';

  if (isPhase2) {
    categoryNum = '02';
    categoryLabel = 'MODERATE DISTANCE';
    categoryDistance = '3 – 8 km';
    categoryRoute = 'First-Mile Walk + Shared Tracker · 1 Transfer · 30–45 min';
    frictionBadge = '1 TRANSFER NODE';
    frictionTone = 'accent';
  } else if (isPhase3 || isReset) {
    categoryNum = '03';
    categoryLabel = 'LONG DISTANCE';
    categoryDistance = '8 – 25 km';
    categoryRoute = 'Multi-Leg Corridor: Walk + Feeder + Bus Trunk · 65–85 min';
    frictionBadge = '2 TRANSFER BOTTLENECKS';
    frictionTone = 'accent-high';
  }

  return (
    <Reveal className="cs-journey-motion cs-bleed cs-bleed--padded" aria-label="Dynamic User Journey Visualization">
      <div
        ref={containerRef}
        className="cs-journey-motion__card"
        style={{ opacity: isReset ? opacityFade : 1, transition: 'opacity 0.25s ease' }}
      >
        {/* Minimal Header Datum */}
        <div className="cs-journey-motion__header">
          <div className="cs-journey-motion__header-left">
            <span className="cs-journey-motion__cat-num">{categoryNum} /</span>
            <span className="cs-journey-motion__cat-name">{categoryLabel}</span>
            <span className="cs-journey-motion__cat-sep">·</span>
            <span className="cs-journey-motion__cat-dist">{categoryDistance}</span>
          </div>
          <div className="cs-journey-motion__header-right">
            <span className={`cs-journey-motion__badge cs-journey-motion__badge--${frictionTone}`}>
              <span className="cs-journey-motion__badge-dot" />
              {frictionBadge}
            </span>
          </div>
        </div>

        {/* Route Lede */}
        <div className="cs-journey-motion__lede">
          <p className="cs-journey-motion__lede-text">{categoryRoute}</p>
        </div>

        {/* SVG Continuous Motion Canvas */}
        <div className="cs-journey-motion__canvas-wrap">
          <svg
            className="cs-journey-motion__svg"
            viewBox="0 0 960 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background Full Horizon Track */}
            <line
              x1={COORDS.xHome}
              y1={COORDS.y}
              x2={COORDS.xNode3}
              y2={COORDS.y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Muted Previous Segments Line (persistent grey trail) */}
            {progress >= 0.28 && (
              <line
                x1={COORDS.xHome}
                y1={COORDS.y}
                x2={COORDS.xNode1}
                y2={COORDS.y}
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="2"
              />
            )}
            {progress >= 0.62 && (
              <line
                x1={COORDS.xNode1}
                y1={COORDS.y}
                x2={COORDS.xNode2}
                y2={COORDS.y}
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="2"
              />
            )}

            {/* Active Drawing Route Line */}
            <line
              x1={COORDS.xHome}
              y1={COORDS.y}
              x2={headX}
              y2={COORDS.y}
              stroke="#e5a93c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Moving Head Indicator */}
            <circle
              cx={headX}
              cy={COORDS.y}
              r="10"
              fill="rgba(229, 169, 60, 0.16)"
            />
            <circle
              cx={headX}
              cy={COORDS.y}
              r="4.5"
              fill="#e5a93c"
              stroke="#141518"
              strokeWidth="1.5"
            />

            {/* =================================================================
                TRANSPORT ICONS & LABELS (ABOVE ROUTE LINE, y ~ 28 - 56)
                ================================================================= */}

            {/* Segment 1: Walking Mode (x = 210) */}
            <g
              transform="translate(210, 32)"
              className="cs-jm-icon"
              style={{
                opacity: progress >= 0.04 ? 1 : 0.2,
                transition: 'opacity 0.4s ease',
              }}
            >
              {/* Walking Person SVG Silhouette */}
              <circle cx="0" cy="-10" r="2.8" fill={isPhase1 ? '#f8fafc' : '#94a3b8'} />
              <path
                d="M -2 -5 L 2 -5 L 3 1 L 0 6 L -3 11 M 2 1 L 5 6 L 3 11 M -3 -2 L 3 -2"
                stroke={isPhase1 ? '#f8fafc' : '#94a3b8'}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <text
                x="0"
                y="20"
                textAnchor="middle"
                className="cs-jm-modelabel"
                fill={isPhase1 ? '#f8fafc' : '#64748b'}
              >
                Walk (0.8 km)
              </text>
            </g>

            {/* Segment 2: Shared Auto / Tracker (x = 480) */}
            <g
              transform="translate(480, 32)"
              className="cs-jm-icon"
              style={{
                opacity: progress >= 0.32 ? (isPhase2 ? 1 : 0.6) : 0.15,
                transition: 'opacity 0.4s ease',
              }}
            >
              {/* Tracker / Feeder Vehicle Silhouette */}
              <rect
                x="-12"
                y="-11"
                width="24"
                height="11"
                rx="2"
                stroke={isPhase2 ? '#e5a93c' : '#94a3b8'}
                strokeWidth="1.4"
                fill="none"
              />
              <line x1="-5" y1="-11" x2="-5" y2="0" stroke={isPhase2 ? '#e5a93c' : '#94a3b8'} strokeWidth="1" />
              <line x1="4" y1="-11" x2="4" y2="0" stroke={isPhase2 ? '#e5a93c' : '#94a3b8'} strokeWidth="1" />
              <circle cx="-7" cy="1" r="2.4" fill={isPhase2 ? '#e5a93c' : '#94a3b8'} />
              <circle cx="7" cy="1" r="2.4" fill={isPhase2 ? '#e5a93c' : '#94a3b8'} />
              <text
                x="0"
                y="20"
                textAnchor="middle"
                className="cs-jm-modelabel"
                fill={isPhase2 ? '#f8fafc' : '#64748b'}
              >
                Shared Feeder (Tracker)
              </text>
            </g>

            {/* Segment 3: Arterial Trunk Bus (x = 750) */}
            <g
              transform="translate(750, 32)"
              className="cs-jm-icon"
              style={{
                opacity: progress >= 0.64 ? (isPhase3 ? 1 : 0.6) : 0.15,
                transition: 'opacity 0.4s ease',
              }}
            >
              {/* City Bus Silhouette */}
              <rect
                x="-16"
                y="-13"
                width="32"
                height="13"
                rx="2"
                stroke={isPhase3 ? '#e5a93c' : '#94a3b8'}
                strokeWidth="1.4"
                fill="none"
              />
              <line x1="-9" y1="-13" x2="-9" y2="0" stroke={isPhase3 ? '#e5a93c' : '#94a3b8'} strokeWidth="1" />
              <line x1="-1" y1="-13" x2="-1" y2="0" stroke={isPhase3 ? '#e5a93c' : '#94a3b8'} strokeWidth="1" />
              <line x1="7" y1="-13" x2="7" y2="0" stroke={isPhase3 ? '#e5a93c' : '#94a3b8'} strokeWidth="1" />
              <circle cx="-10" cy="1" r="2.4" fill={isPhase3 ? '#e5a93c' : '#94a3b8'} />
              <circle cx="10" cy="1" r="2.4" fill={isPhase3 ? '#e5a93c' : '#94a3b8'} />
              <text
                x="0"
                y="20"
                textAnchor="middle"
                className="cs-jm-modelabel"
                fill={isPhase3 ? '#f8fafc' : '#64748b'}
              >
                Arterial City Bus
              </text>
            </g>

            {/* =================================================================
                WAYPOINTS & TRANSFER NODES (BELOW ROUTE LINE, y ~ 108 - 128)
                ================================================================= */}

            {/* Node 0: Origin (Home) */}
            <g transform={`translate(${COORDS.xHome}, ${COORDS.y})`}>
              <circle cx="0" cy="0" r="5" fill="#f8fafc" />
              <text x="0" y="24" textAnchor="middle" className="cs-jm-nodelabel cs-jm-nodelabel--main">
                HOME
              </text>
              <text x="0" y="38" textAnchor="middle" className="cs-jm-nodesub">
                Origin (0 km)
              </text>
            </g>

            {/* Node 1: Local Junction (Short) / Transfer 01 (Shared Auto Stand) */}
            <g transform={`translate(${COORDS.xNode1}, ${COORDS.y})`}>
              {/* Highlight Ring when Transfer Active in Phase 2 & 3 */}
              {(isPhase2 || isPhase3 || isReset) && (
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="none"
                  stroke="rgba(229, 169, 60, 0.45)"
                  strokeWidth="1.2"
                  className="cs-jm-pulse-ring"
                />
              )}
              <circle
                cx="0"
                cy="0"
                r="5"
                fill={isPhase1 ? (headX >= COORDS.xNode1 ? '#22c55e' : '#334155') : '#e5a93c'}
                stroke="#141518"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="cs-jm-nodelabel"
                fill={isPhase1 ? (headX >= COORDS.xNode1 ? '#f8fafc' : '#94a3b8') : '#e5a93c'}
              >
                {isPhase1 ? 'LOCAL JUNCTION' : 'TRANSFER 01'}
              </text>
              <text x="0" y="38" textAnchor="middle" className="cs-jm-nodesub">
                {isPhase1 ? 'Local Market (15–25 min)' : '⚠ Wait for 6–8 PAX (10–15m)'}
              </text>
            </g>

            {/* Node 2: College/Market (Moderate) / Transfer 02 (Bus Junction) */}
            <g
              transform={`translate(${COORDS.xNode2}, ${COORDS.y})`}
              style={{
                opacity: progress >= 0.28 ? 1 : 0.25,
                transition: 'opacity 0.4s ease',
              }}
            >
              {(isPhase3 || isReset) && (
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="none"
                  stroke="rgba(229, 169, 60, 0.45)"
                  strokeWidth="1.2"
                  className="cs-jm-pulse-ring"
                />
              )}
              <circle
                cx="0"
                cy="0"
                r="5"
                fill={
                  isPhase2
                    ? headX >= COORDS.xNode2
                      ? '#22c55e'
                      : '#334155'
                    : isPhase3 || isReset
                    ? '#e5a93c'
                    : '#334155'
                }
                stroke="#141518"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="cs-jm-nodelabel"
                fill={isPhase2 ? (headX >= COORDS.xNode2 ? '#f8fafc' : '#94a3b8') : isPhase3 ? '#e5a93c' : '#64748b'}
              >
                {isPhase1 || isPhase2 ? 'COLLEGE / MARKET' : 'TRANSFER 02'}
              </text>
              <text x="0" y="38" textAnchor="middle" className="cs-jm-nodesub">
                {isPhase1 || isPhase2 ? 'Midpoint Hub (30–45 min)' : '⚠ Irregular Cadence & Crowding'}
              </text>
            </g>

            {/* Node 3: Regional Hub (Long Destination) */}
            <g
              transform={`translate(${COORDS.xNode3}, ${COORDS.y})`}
              style={{
                opacity: progress >= 0.62 ? 1 : 0.25,
                transition: 'opacity 0.4s ease',
              }}
            >
              <circle
                cx="0"
                cy="0"
                r="5.5"
                fill={headX >= COORDS.xNode3 ? '#22c55e' : '#334155'}
                stroke="#141518"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="cs-jm-nodelabel"
                fill={headX >= COORDS.xNode3 ? '#22c55e' : '#64748b'}
              >
                REGIONAL HUB
              </text>
              <text x="0" y="38" textAnchor="middle" className="cs-jm-nodesub">
                Workplace / Hospital (65–85 min)
              </text>
            </g>
          </svg>
        </div>

        {/* Quiet Bottom Synthesis Datum */}
        <div className="cs-journey-motion__footer">
          <span className="cs-journey-motion__footer-tag">KEY COMMUTE INSIGHT</span>
          <span className="cs-journey-motion__footer-text">
            As distance scales, friction shifts from road speed to compounding transfer delays.
          </span>
        </div>
      </div>
    </Reveal>
  );
}

// Cubic easing for natural vehicle acceleration and decelerating stop
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}
