import Reveal from './Reveal.jsx';

/**
 * ObservationDecisionList — renders pairs of empirical observations and their
 * direct design decisions:
 *
 *   Observation
 *        ↓
 *   Design Decision
 *
 * Props:
 *  items: Array<{
 *    id: string,
 *    index: string,
 *    observation: string,
 *    observationDetail?: string,
 *    decision: string,
 *    decisionDetail?: string,
 *  }>
 */
export default function ObservationDecisionList({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="cs-obs-dec-list">
      {items.map((item, i) => (
        <Reveal key={item.id || i} className="cs-obs-dec-card" delay={i * 80}>
          {/* Observation row */}
          <div className="cs-obs-dec-card__row cs-obs-dec-card__row--observation">
            <div className="cs-obs-dec-card__badge-row">
              <span className="cs-badge cs-badge--mono">WHAT DID WE LEARN? {item.index ? `· ${item.index}` : ''}</span>
              <span className="cs-obs-dec-card__tag">GROUND REALITY</span>
            </div>
            <p className="cs-obs-dec-card__statement cs-obs-dec-card__statement--obs">
              {item.observation}
            </p>
            {item.observationDetail && (
              <p className="cs-obs-dec-card__detail">{item.observationDetail}</p>
            )}
          </div>

          {/* Downward connecting arrow */}
          <div className="cs-obs-dec-card__arrow" aria-hidden="true">
            <span className="cs-obs-dec-card__arrow-line" />
            <span className="cs-obs-dec-card__arrow-symbol">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
            <span className="cs-obs-dec-card__arrow-line" />
          </div>

          {/* Design decision row */}
          <div className="cs-obs-dec-card__row cs-obs-dec-card__row--decision">
            <div className="cs-obs-dec-card__badge-row">
              <span className="cs-badge cs-badge--accent">SO WE DECIDED TO... {item.index ? `· ${item.index}` : ''}</span>
              <span className="cs-obs-dec-card__tag cs-obs-dec-card__tag--accent">DESIGN DECISION</span>
            </div>
            <p className="cs-obs-dec-card__statement cs-obs-dec-card__statement--dec">
              {item.decision}
            </p>
            {item.decisionDetail && (
              <p className="cs-obs-dec-card__detail">{item.decisionDetail}</p>
            )}
          </div>

        </Reveal>
      ))}
    </div>
  );
}
