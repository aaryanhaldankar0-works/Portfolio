import Reveal from './Reveal.jsx';
import Media from './Media.jsx';
import TextSlot from './TextSlot.jsx';

/**
 * Hero — case study opener.
 * Props:
 *  index     project number (e.g. "01")
 *  category  mono kicker
 *  title     project name
 *  tagline   one-line positioning
 *  meta      [{ label, value }] quiet spec strip
 *  media     media descriptor for the hero visual (full-bleed)
 *  actions   [{ label, href, onClick }]
 */
export default function Hero({ index, category, title, tagline, meta = [], media, actions = [] }) {
  return (
    <header className="cs-hero">
      <div className="cs-hero__intro">
        <Reveal className="cs-hero__kicker">
          {index && <span className="cs-hero__index">{index}</span>}
          {category && <span className="cs-eyebrow">{category}</span>}
        </Reveal>

        <Reveal as="h2" className="cs-hero__title" delay={80}>
          {title}
        </Reveal>

        <div className="cs-hero__lede">
          <Reveal delay={160}>
            {tagline ? <p className="cs-hero__tagline">{tagline}</p> : <TextSlot lines={2} size="lede" />}
          </Reveal>

          {actions.length > 0 && (
            <Reveal className="cs-hero__actions" delay={220}>
              {actions.map((a, i) => (
                <a
                  key={i}
                  href={a.href || '#'}
                  className="btn-jump-3d cs-hero__action"
                  onClick={a.onClick}
                >
                  <span>{a.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </Reveal>
          )}
        </div>
      </div>

      {media && (
        <Reveal className="cs-hero__visual cs-bleed" delay={120}>
          <Media media={media} />
        </Reveal>
      )}

      {meta.length > 0 && (
        <dl className="cs-hero__meta">
          {meta.map((m, i) => (
            <Reveal key={m.label} className="cs-hero__meta-item" delay={i * 60}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </Reveal>
          ))}
        </dl>
      )}
    </header>
  );
}
