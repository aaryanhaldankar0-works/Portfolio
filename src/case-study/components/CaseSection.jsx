import Reveal from './Reveal.jsx';

/**
 * CaseSection — chapter wrapper. Provides the anchor id, chapter index/label,
 * optional title + intro, and consistent vertical rhythm for its blocks.
 */
export default function CaseSection({ id, index, label, title, intro, tone = 'default', children }) {
  return (
    <section id={id} className={`cs-section cs-section--${tone}`} aria-labelledby={`${id}-label`}>
      <Reveal className="cs-section__header">
        <span className="cs-section__index" aria-hidden="true">{index}</span>
        <div className="cs-section__heading">
          <span id={`${id}-label`} className="cs-section__label">
            {index} — {label}
          </span>
          {title && <h3 className="cs-section__title">{title}</h3>}
          {intro && <p className="cs-section__intro">{intro}</p>}
        </div>
      </Reveal>
      <div className="cs-section__blocks">{children}</div>
    </section>
  );
}
