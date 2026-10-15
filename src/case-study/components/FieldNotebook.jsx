import Reveal from './Reveal.jsx';

/**
 * FieldNotebook — Workshop zone: the research archive, pinned to a wall.
 *
 * Driven entirely by data ({ intro, sections, entries }). New entries
 * appear automatically in their section; empty sections stay on the wall
 * with a blank pin so the notebook can keep growing.
 */

// Deterministic "hand-pinned" imperfection — same every render, different per item.
const wobble = (i, salt = 0) => {
  const n = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return n - Math.floor(n); // 0..1
};
const pinStyle = (i) => ({
  '--fn-rot': `${(wobble(i) * 5 - 2.5).toFixed(2)}deg`,
  '--fn-dy': `${Math.round(wobble(i, 1) * 18)}px`,
  '--fn-tape': `${(wobble(i, 2) * 14 - 7).toFixed(1)}deg`,
});

function EmptyFrame({ label }) {
  return (
    <span className="fn-frame fn-frame--empty" aria-hidden="true">
      <span>{label}</span>
    </span>
  );
}

function Entry({ entry }) {
  switch (entry.type) {
    case 'photo':
    case 'map':
      return (
        <figure className={`fn-polaroid fn-polaroid--${entry.type}`}>
          {entry.src ? (
            <img className="fn-frame" src={entry.src} alt={entry.alt || entry.caption} loading="lazy" />
          ) : (
            <EmptyFrame label={entry.type === 'map' ? 'map to pin' : 'photo to pin'} />
          )}
          <figcaption>
            <span className="fn-hand">{entry.caption}</span>
            {entry.note && <small>{entry.note}</small>}
          </figcaption>
        </figure>
      );

    case 'video':
      return (
        <figure className="fn-polaroid fn-polaroid--video">
          {entry.src ? (
            <video className="fn-frame" src={entry.src} poster={entry.poster} controls preload="none" />
          ) : (
            <EmptyFrame label="footage to pin" />
          )}
          <figcaption>
            <span className="fn-hand">{entry.caption}</span>
            {entry.note && <small>{entry.note}</small>}
          </figcaption>
        </figure>
      );

    case 'note':
      return (
        <div className="fn-card">
          {entry.title && <strong className="fn-card__title">{entry.title}</strong>}
          <p className="fn-hand">{entry.text}</p>
        </div>
      );

    case 'questionnaire':
      return (
        <div className="fn-page">
          <header className="fn-page__head">
            <strong>{entry.title}</strong>
            {entry.date && <span>{entry.date}</span>}
          </header>
          <ol className="fn-page__list">
            {entry.questions.map((q, i) => (
              <li key={i} className="fn-hand">{q}</li>
            ))}
          </ol>
        </div>
      );

    case 'journey':
      return (
        <div className="fn-journey">
          <strong className="fn-journey__title">{entry.title}</strong>
          <ol className="fn-journey__steps">
            {entry.steps.map((s, i) => (
              <li key={i} style={pinStyle(i + 40)}>
                <span className="fn-journey__label">{s.label}</span>
                {s.friction && <span className="fn-hand fn-journey__friction">{s.friction}</span>}
              </li>
            ))}
          </ol>
        </div>
      );

    case 'document':
      return (
        <a className="fn-doc" href={entry.href} target="_blank" rel="noopener noreferrer">
          <span className="fn-doc__sheet" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="fn-hand">{entry.caption}</span>
          {entry.note && <small>{entry.note}</small>}
        </a>
      );

    default:
      return null;
  }
}

export default function FieldNotebook({ intro, sections = [], entries = [] }) {
  let n = 0; // running index so imperfection is unique across the wall

  return (
    <div className="fn">
      {intro && <p className="fn-intro fn-hand">{intro}</p>}

      {sections.map((section) => {
        const items = entries.filter((e) => e.section === section.id);
        return (
          <section key={section.id} id={`fn-${section.id}`} className="fn-section" aria-label={section.label}>
            <h3 className="fn-section__label">
              <span className="ws-tape">{section.label}</span>
              <span className="fn-section__count">{items.length || '—'}</span>
            </h3>

            <div className="fn-wall">
              {items.length > 0 ? (
                items.map((entry, i) => {
                  const idx = n++;
                  return (
                    <Reveal key={`${section.id}-${i}`} className={`fn-pin fn-pin--${entry.type}`}>
                      <div className="fn-pin__body" style={pinStyle(idx)}>
                        <span className="fn-pin__tape" aria-hidden="true" />
                        <Entry entry={entry} />
                      </div>
                    </Reveal>
                  );
                })
              ) : (
                <div className="fn-pin fn-pin--vacant">
                  <div className="fn-pin__body" style={pinStyle(n++)}>
                    <span className="fn-pin__tack" aria-hidden="true" />
                    <span className="fn-hand">Nothing pinned yet.</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
