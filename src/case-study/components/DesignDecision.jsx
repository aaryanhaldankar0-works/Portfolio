import Reveal from './Reveal.jsx';

/**
 * DesignDecision — concludes each exhibition chapter by locking in the design decision.
 * Never continue to the next chapter until this decision is established.
 * Props:
 *  index     chapter number (e.g. "01")
 *  decision  the core design decision statement
 *  rationale technical or contextual rationale
 *  impact    the concrete engineering or system outcome
 */
export default function DesignDecision({ index, decision, rationale, impact }) {
  return (
    <Reveal className="cs-decision-block">
      <div className="cs-decision-block__inner">
        <div className="cs-decision-block__header">
          <div className="cs-decision-block__tag">
            <span className="cs-badge cs-badge--accent">
              DESIGN DECISION {index ? `· ${index}` : ''}
            </span>
            <span className="cs-decision-block__lock">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              ESTABLISHED & LOCKED
            </span>
          </div>
        </div>

        <div className="cs-decision-block__body">
          <h4 className="cs-decision-block__title">{decision}</h4>
          {rationale && <p className="cs-decision-block__rationale">{rationale}</p>}
        </div>

        {impact && (
          <div className="cs-decision-block__footer">
            <span className="cs-decision-block__label">SYSTEM & ENGINEERING OUTCOME</span>
            <span className="cs-decision-block__value">{impact}</span>
          </div>
        )}
      </div>
    </Reveal>
  );
}
