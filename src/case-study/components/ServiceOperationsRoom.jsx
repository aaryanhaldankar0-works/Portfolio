import { useState } from 'react';
import Reveal from './Reveal.jsx';

/**
 * ServiceOperationsRoom — Workshop Zone 06: Service & Operations Development
 *
 * Detailed studio documentation covering:
 *  - Booking & Seat Assurance Logic
 *  - Fixed-Route Predefined Geometry (No door-to-door cab detours)
 *  - Boarding & Dual Payment Verification (Prepayment vs Onboard behind-seat tap)
 *  - Normal Stop Request vs Emergency / SOS Intervention
 *  - Vehicle Variants: 4-Seater Agile Pod vs 6-Seater Trunk Pod (No stretching)
 *  - AI-Assisted Fleet Allocation Layer
 *  - Existing Transport Unions & Driver Rental Decoupling (~₹700/day observation)
 *  - Night-Time Operations Feasibility
 *  - 8 Editable UX Placeholders for Future Work
 *  - Open Technical & Operational Questions
 */

export default function ServiceOperationsRoom({
  intro,
  manifesto,
  booking = {},
  routeGeometry = {},
  boardingPayment = {},
  stoppingProtocols = {},
  vehicleVariants = {},
  fleetAllocation = {},
  unionIntegration = {},
  nightOperations = {},
  uxPlaceholders = [],
  openQuestions = [],
}) {
  const [activeTab, setActiveTab] = useState('booking');

  const tabs = [
    { id: 'booking', label: 'Booking & Route' },
    { id: 'boarding-stops', label: 'Boarding & Stops' },
    { id: 'variants-ai', label: 'Variants & Fleet AI' },
    { id: 'unions-night', label: 'Unions & Night Service' },
    { id: 'ux-placeholders', label: 'Future UX Assets' },
  ];

  return (
    <div className="so-room">
      {intro && <p className="so-intro fn-hand">{intro}</p>}

      {/* Manifesto Callout */}
      {manifesto && (
        <Reveal className="so-manifesto">
          <span className="ws-tape">{manifesto.tag}</span>
          <h3 className="so-manifesto__text">“{manifesto.statement}”</h3>
          <p className="so-manifesto__sub">{manifesto.sub}</p>
        </Reveal>
      )}

      {/* Workshop Navigation Toolbar */}
      <div className="so-toolbar">
        <div className="so-toolbar__meta">
          <span className="ws-tape">Studio Desk 06</span>
          <span className="so-toolbar__sub">Service Architecture &amp; Operations Archive</span>
        </div>

        <div className="so-tabs" role="tablist" aria-label="Service operations stations">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`so-tab${activeTab === tab.id ? ' is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 01: BOOKING & FIXED ROUTE */}
      {activeTab === 'booking' && (
        <div className="so-panel">
          <Reveal className="so-panel__header">
            <span className="ws-tape">{booking.badge}</span>
            <h3 className="so-panel__title">{booking.title}</h3>
            <p className="so-panel__desc">{booking.intent}</p>
          </Reveal>

          {/* Finalized Decision Callout */}
          {booking.finalizedDecision && (
            <Reveal className="so-decision-card">
              <div className="so-decision-card__head">
                <span className="ws-tape">{booking.finalizedDecision.tag}</span>
                <h4 className="so-decision-card__title">{booking.finalizedDecision.title}</h4>
              </div>
              <strong className="so-decision-card__stmt">“{booking.finalizedDecision.statement}”</strong>
              <p className="so-decision-card__expl">{booking.finalizedDecision.explanation}</p>

              {/* Required UI Communication Box */}
              <div className="so-ui-spec-box">
                <span className="so-ui-spec-box__tag">UI SPECIFICATION · PASSENGER CONFIRMATION</span>
                <div className="so-ui-spec-ticket">
                  <div className="so-ui-spec-ticket__badge">
                    <span className="so-ui-spec-ticket__dot" />
                    <strong>{booking.finalizedDecision.uiCommunication?.header}</strong>
                  </div>
                  <div className="so-ui-spec-ticket__body">
                    <div className="so-ui-spec-ticket__row">
                      <span className="so-ui-spec-ticket__label">BOARDING WINDOW</span>
                      <span className="so-ui-spec-ticket__val">{booking.finalizedDecision.uiCommunication?.window}</span>
                    </div>
                    <div className="so-ui-spec-ticket__row">
                      <span className="so-ui-spec-ticket__label">PICKUP</span>
                      <span className="so-ui-spec-ticket__val">{booking.finalizedDecision.uiCommunication?.pickup}</span>
                    </div>
                    <div className="so-ui-spec-ticket__row">
                      <span className="so-ui-spec-ticket__label">DROP-OFF</span>
                      <span className="so-ui-spec-ticket__val">{booking.finalizedDecision.uiCommunication?.dropoff}</span>
                    </div>
                    <div className="so-ui-spec-ticket__row so-ui-spec-ticket__row--deferred">
                      <span className="so-ui-spec-ticket__label">POD ASSIGNMENT</span>
                      <span className="so-ui-spec-ticket__val">{booking.finalizedDecision.uiCommunication?.podStatus}</span>
                    </div>
                  </div>
                  <p className="so-ui-spec-ticket__note">{booking.finalizedDecision.uiCommunication?.illustrativeNote}</p>
                </div>
              </div>

              <div className="so-decision-card__capacity-rule">
                <strong>Committed Capacity Rule:</strong> {booking.finalizedDecision.capacityRule}
              </div>
            </Reveal>
          )}

          {/* 8-Step Booking Procedure */}
          <div className="so-booking-section">
            <span className="ws-tape">8-Stage Passenger Flow</span>
            <div className="so-booking-grid">
              {booking.steps?.map((st) => (
                <div key={st.step} className="so-booking-step">
                  <span className="so-booking-step__num">{st.step}</span>
                  <strong className="so-booking-step__title">{st.title}</strong>
                  <p className="so-booking-step__desc">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Allocation Rules Framework */}
          {booking.flowRules && (
            <div className="so-rules-callout">
              <span className="ws-tape">Operational Allocation Rules</span>
              <ul className="so-rules-list">
                {booking.flowRules.map((rule, idx) => (
                  <li key={idx} className="so-rule-item">
                    <span className="so-rule-bullet">✦</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fixed Route vs Door-to-Door Rationale */}
          <div className="so-route-geometry">
            <div className="so-route-geom__head">
              <span className="ws-tape">{routeGeometry.badge}</span>
              <h4 className="so-route-geom__title">{routeGeometry.title}</h4>
              <strong className="so-route-geom__statement">“{routeGeometry.statement}”</strong>
              <p className="so-route-geom__rationale">{routeGeometry.rationale}</p>
            </div>

            <div className="so-route-principles">
              {routeGeometry.principles?.map((p, idx) => (
                <div key={idx} className="so-route-principle-card">
                  <span className="so-route-principle-card__label">{p.label}</span>
                  <p className="so-route-principle-card__val">{p.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: BOARDING & STOPS */}
      {activeTab === 'boarding-stops' && (
        <div className="so-panel">
          <Reveal className="so-panel__header">
            <span className="ws-tape">{boardingPayment.badge}</span>
            <h3 className="so-panel__title">{boardingPayment.title}</h3>
          </Reveal>

          {/* Dual Payment Options */}
          <div className="so-dual-payment">
            {boardingPayment.options?.map((opt, idx) => (
              <div key={idx} className="so-pay-card">
                <span className="so-pay-card__role">{opt.role}</span>
                <h4 className="so-pay-card__title">{opt.option}</h4>
                <p className="so-pay-card__desc">{opt.desc}</p>
              </div>
            ))}
          </div>

          {/* Automated Door Sequence */}
          <div className="so-door-sequence">
            <span className="ws-tape">Automated Departure &amp; Ingress Sequence</span>
            <div className="so-door-steps">
              {boardingPayment.doorSequence?.map((ds) => (
                <div key={ds.num} className="so-door-step">
                  <span className="so-door-step__num">{ds.num}</span>
                  <strong className="so-door-step__title">{ds.title}</strong>
                  <p className="so-door-step__desc">{ds.desc}</p>
                </div>
              ))}
            </div>
            <p className="so-sub-note">{boardingPayment.disclaimer}</p>
          </div>

          {/* Normal Stop Request vs Emergency SOS Comparison */}
          <div className="so-stopping-comparison">
            <div className="so-stopping-head">
              <span className="ws-tape">{stoppingProtocols.badge}</span>
              <h3 className="so-stopping-title">{stoppingProtocols.title}</h3>
              <p className="so-stopping-sub">{stoppingProtocols.sub}</p>
            </div>

            <div className="so-protocols-grid">
              {/* Normal Stop */}
              <div className="so-protocol-card so-protocol-card--normal">
                <span className="so-protocol-card__tag">ROUTINE TRANSIT PROTOCOL</span>
                <h4 className="so-protocol-card__title">{stoppingProtocols.normalStop?.type}</h4>
                <p className="so-protocol-card__intent">{stoppingProtocols.normalStop?.intent}</p>
                <ol className="so-protocol-flow">
                  {stoppingProtocols.normalStop?.flow.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
                <div className="so-protocol-card__rule">
                  <strong>Constraint:</strong> {stoppingProtocols.normalStop?.ruleNote}
                </div>
              </div>

              {/* Emergency SOS */}
              <div className="so-protocol-card so-protocol-card--emergency">
                <span className="so-protocol-card__tag">SAFETY-PRIORITIZED OVERRIDE</span>
                <h4 className="so-protocol-card__title">{stoppingProtocols.emergencySos?.type}</h4>
                <p className="so-protocol-card__intent">{stoppingProtocols.emergencySos?.intent}</p>
                <ol className="so-protocol-flow">
                  {stoppingProtocols.emergencySos?.flow.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
                <div className="so-protocol-card__rule">
                  <strong>Constraint:</strong> {stoppingProtocols.emergencySos?.ruleNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 03: VARIANTS & FLEET AI */}
      {activeTab === 'variants-ai' && (
        <div className="so-panel">
          {/* Vehicle Variants */}
          <Reveal className="so-panel__header">
            <span className="ws-tape">{vehicleVariants.badge}</span>
            <h3 className="so-panel__title">{vehicleVariants.title}</h3>
            <strong className="so-highlight-statement">“{vehicleVariants.statement}”</strong>
          </Reveal>

          <div className="so-variants-grid">
            {vehicleVariants.variants?.map((v, i) => (
              <div key={i} className="so-variant-card">
                <span className="so-variant-card__tag">{v.tag}</span>
                <h4 className="so-variant-card__title">{v.name}</h4>
                <p className="so-variant-card__role">{v.role}</p>
                <div className="so-variant-card__meta">
                  <div>
                    <span className="so-meta-label">Architecture</span>
                    <span className="so-meta-val">{v.chassis}</span>
                  </div>
                  <div>
                    <span className="so-meta-label">Operational Context</span>
                    <span className="so-meta-val">{v.context}</span>
                  </div>
                  <div>
                    <span className="so-meta-label">Seating Package</span>
                    <span className="so-meta-val">{v.occupancy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI-Assisted Fleet Allocation Layer */}
          <div className="so-fleet-ai">
            <div className="so-fleet-ai__head">
              <span className="ws-tape">{fleetAllocation.badge}</span>
              <h4 className="so-fleet-ai__title">{fleetAllocation.title}</h4>
              <strong className="so-fleet-ai__stmt">“{fleetAllocation.statement}”</strong>
            </div>

            <div className="so-fleet-flow">
              {fleetAllocation.flow?.map((item, idx) => (
                <div key={item.step} className="so-fleet-node">
                  <span className="so-fleet-node__num">{item.step}</span>
                  <strong className="so-fleet-node__title">{item.title}</strong>
                  <p className="so-fleet-node__desc">{item.desc}</p>
                  {idx < (fleetAllocation.flow?.length || 0) - 1 && (
                    <span className="so-fleet-node__arrow" aria-hidden="true">↓</span>
                  )}
                </div>
              ))}
            </div>
            <p className="so-sub-note">{fleetAllocation.disclaimer}</p>
          </div>
        </div>
      )}

      {/* TAB 04: UNIONS & NIGHT OPERATIONS */}
      {activeTab === 'unions-night' && (
        <div className="so-panel">
          {/* Union Integration */}
          <Reveal className="so-panel__header">
            <span className="ws-tape">{unionIntegration.badge}</span>
            <h3 className="so-panel__title">{unionIntegration.title}</h3>
            <strong className="so-highlight-statement">“{unionIntegration.statement}”</strong>
          </Reveal>

          <div className="so-union-research">
            <div className="so-union-research__box">
              <span className="ws-tape">Fieldwork Observation · Economic Reality</span>
              <p className="so-union-research__fact">{unionIntegration.researchFact}</p>
              <span className="so-union-research__attribution">{unionIntegration.researchAttribution}</span>
            </div>
            <div className="so-union-research__response">
              <span className="ws-tape">Proposed Design Response</span>
              <p>{unionIntegration.designResponse}</p>
            </div>
          </div>

          <div className="so-union-roles">
            <h4 className="so-union-roles__title">Proposed Collaborative Stakeholder Roles</h4>
            <div className="so-union-roles-grid">
              {unionIntegration.collaborativeRoles?.map((r, i) => (
                <div key={i} className="so-union-role-card">
                  <span className="so-union-role-card__marker">0{i + 1}</span>
                  <strong className="so-union-role-card__name">{r.role}</strong>
                  <p className="so-union-role-card__desc">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="so-sub-note">{unionIntegration.disclaimer}</p>
          </div>

          {/* Night-Time Operations */}
          <div className="so-night-ops">
            <div className="so-night-ops__head">
              <span className="ws-tape">{nightOperations.badge}</span>
              <h3 className="so-night-ops__title">{nightOperations.title}</h3>
              <p className="so-night-ops__opp">{nightOperations.opportunity}</p>
            </div>

            <div className="so-night-reqs">
              <span className="so-night-reqs__title">Engineering &amp; Safety Requirements to Assess:</span>
              <div className="so-night-reqs-grid">
                {nightOperations.engineeringRequirements?.map((er, idx) => (
                  <div key={idx} className="so-night-req-item">
                    <strong>{er.item}</strong>
                    <p>{er.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="so-sub-note">{nightOperations.disclaimer}</p>
          </div>
        </div>
      )}

      {/* TAB 05: FUTURE UX ASSETS & OPEN QUESTIONS */}
      {activeTab === 'ux-placeholders' && (
        <div className="so-panel">
          <Reveal className="so-panel__header">
            <span className="ws-tape">Future UX Assets (Section 15)</span>
            <h3 className="so-panel__title">Editable Interaction Design Placeholders</h3>
            <p className="so-panel__desc">
              These modular placeholders reserve architectural space for high-fidelity interface wireframes and physical touchpoint ergonomics. They are honest, editable placeholders to be developed and replaced in future design phases.
            </p>
          </Reveal>

          {/* 8 Editable UX Placeholders */}
          <div className="so-ux-grid">
            {uxPlaceholders.map((ph, idx) => (
              <div key={ph.id} className="so-ux-card">
                <div className="so-ux-card__frame">
                  <div className="so-ux-card__header-bar">
                    <span className="so-ux-card__dot" />
                    <span className="so-ux-card__dot" />
                    <span className="so-ux-card__dot" />
                    <span className="so-ux-card__num">SPEC {String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="so-ux-card__canvas">
                    <span className="so-ux-card__wire-badge">FUTURE UX SPECIFICATION · TO BE DEVELOPED</span>
                    <strong className="so-ux-card__name">{ph.title}</strong>
                    <span className="so-ux-card__tag">{ph.tag}</span>
                    {ph.uiExample && (
                      <div className="so-ux-card__mini-ticket">
                        <div className="so-ux-card__mini-badge">
                          <span className="so-ux-card__mini-dot" />
                          <span>{ph.uiExample.status}</span>
                        </div>
                        <div className="so-ux-card__mini-window">{ph.uiExample.window}</div>
                        <div className="so-ux-card__mini-route">
                          <span>{ph.uiExample.pickup}</span>
                          <span className="so-ux-card__mini-arrow">→</span>
                          <span>{ph.uiExample.dropoff}</span>
                        </div>
                        <div className="so-ux-card__mini-pod">{ph.uiExample.pod}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="so-ux-card__footer">
                  <p>{ph.purpose}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Open Questions Matrix */}
          <div className="so-open-questions">
            <span className="ws-tape">Open Technical &amp; Operational Inquiries</span>
            <div className="so-questions-list">
              {openQuestions.map((oq, i) => (
                <div key={i} className="so-question-item">
                  <span className="so-question-num">Q{i + 1}</span>
                  <div className="so-question-body">
                    <strong>{oq.q}</strong>
                    <p>{oq.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
