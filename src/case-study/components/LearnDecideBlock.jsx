import Reveal from './Reveal.jsx';

/**
 * LearnDecideBlock — core storytelling unit:
 *   "What did we learn?"
 *   followed immediately by:
 *   "So we decided to..."
 *
 * Props:
 *  index?: string,
 *  learned: string (the core takeaway / insight),
 *  learnedDetail?: string (brief context, no academic jargon),
 *  decided: string (the direct design action),
 *  decidedDetail?: string (concrete technical or ergonomic outcome),
 *  impact?: string,
 */
export default function LearnDecideBlock({
  index,
  learned,
  learnedDetail,
  decided,
  decidedDetail,
  impact,
}) {
  return (
    <Reveal className="cs-learn-decide">
      {/* 1. What did we learn? */}
      <div className="cs-learn-decide__pane cs-learn-decide__pane--learned">
        <div className="cs-learn-decide__header">
          <span className="cs-badge cs-badge--mono">
            WHAT DID WE LEARN? {index ? `· ${index}` : ''}
          </span>
          <span className="cs-learn-decide__status">CORE REALITY</span>
        </div>
        <h3 className="cs-learn-decide__title cs-learn-decide__title--learned">
          {learned}
        </h3>
        {learnedDetail && (
          <p className="cs-learn-decide__body">{learnedDetail}</p>
        )}
      </div>

      {/* Downward transition indicator */}
      <div className="cs-learn-decide__transition" aria-hidden="true">
        <span className="cs-learn-decide__line" />
        <span className="cs-learn-decide__arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </span>
        <span className="cs-learn-decide__line" />
      </div>

      {/* 2. So we decided to... */}
      <div className="cs-learn-decide__pane cs-learn-decide__pane--decided">
        <div className="cs-learn-decide__header">
          <span className="cs-badge cs-badge--accent">
            SO WE DECIDED TO... {index ? `· ${index}` : ''}
          </span>
          <span className="cs-learn-decide__status cs-learn-decide__status--accent">
            DESIGN DECISION
          </span>
        </div>
        <h3 className="cs-learn-decide__title cs-learn-decide__title--decided">
          {decided}
        </h3>
        {decidedDetail && (
          <p className="cs-learn-decide__body cs-learn-decide__body--decided">
            {decidedDetail}
          </p>
        )}
        {impact && (
          <div className="cs-learn-decide__footer">
            <span className="cs-learn-decide__label">OUTCOME</span>
            <span className="cs-learn-decide__value">{impact}</span>
          </div>
        )}
      </div>
    </Reveal>
  );
}
