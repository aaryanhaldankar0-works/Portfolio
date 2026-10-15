import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * ArchitectureComparison — side-by-side engineering evaluation of chassis foundations:
 * Monocoque vs. Ladder Frame vs. EV Skateboard.
 *
 * Props:
 *  title       eyebrow or section headline
 *  subtitle    explanatory intro
 *  options     [{ name, badge, isSelected, media, whyExplored, limitations, attributes }]
 */
export default function ArchitectureComparison({
  title = 'FOUNDATIONAL ARCHITECTURE EVALUATION',
  subtitle = 'Evaluating structural chassis topologies against Tier 2 & 3 operating conditions, passenger ingress ergonomics, and multi-body modularity.',
  options = [],
}) {
  return (
    <div className="cs-archcompare">
      {(title || subtitle) && (
        <Reveal className="cs-archcompare__header">
          {title && <span className="cs-eyebrow">{title}</span>}
          {subtitle && <p className="cs-archcompare__lede">{subtitle}</p>}
        </Reveal>
      )}

      <div className="cs-archcompare__grid">
        {options.map((opt, i) => (
          <Reveal
            key={opt.name || i}
            className={`cs-archcompare__card${opt.isSelected ? ' is-selected' : ''}`}
            delay={i * 100}
          >
            <div className="cs-archcompare__card-top">
              <div className="cs-archcompare__badge-row">
                <span className="cs-archcompare__idx">0{i + 1}</span>
                <span
                  className={`cs-archcompare__badge${
                    opt.isSelected ? ' cs-archcompare__badge--selected' : ' cs-archcompare__badge--evaluated'
                  }`}
                >
                  {opt.badge || (opt.isSelected ? 'Selected Platform' : 'Explored & Evaluated')}
                </span>
              </div>
              <h4 className="cs-archcompare__name">{opt.name}</h4>
              {opt.tagline && <span className="cs-archcompare__tagline">{opt.tagline}</span>}
            </div>

            {opt.media && (
              <div className="cs-archcompare__media-wrap">
                <Media media={opt.media} />
              </div>
            )}

            <div className="cs-archcompare__body">
              <div className="cs-archcompare__section">
                <span className="cs-archcompare__section-label">Why It Was Explored</span>
                <p className="cs-archcompare__text">{opt.whyExplored}</p>
              </div>

              <div className="cs-archcompare__section">
                <span className="cs-archcompare__section-label">Engineering Limitations</span>
                <p className="cs-archcompare__text">{opt.limitations}</p>
              </div>

              {opt.attributes && opt.attributes.length > 0 && (
                <div className="cs-archcompare__attrs">
                  {opt.attributes.map((attr, idx) => (
                    <div key={idx} className="cs-archcompare__attr-row">
                      <span className="cs-archcompare__attr-label">{attr.label}</span>
                      <span
                        className={`cs-archcompare__attr-value${
                          attr.positive ? ' is-positive' : attr.negative ? ' is-negative' : ''
                        }`}
                      >
                        {attr.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {opt.verdict && (
                <div className="cs-archcompare__verdict">
                  <span className="cs-archcompare__verdict-label">Verdict:</span>
                  <p className="cs-archcompare__verdict-text">{opt.verdict}</p>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
