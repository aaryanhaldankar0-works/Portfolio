import { useEffect, useRef } from 'react';

/**
 * SectionNavigation — sticky chapter index with reading progress.
 * Props:
 *  sections  [{ id, label, index }]
 *  activeId  id of the section currently in view
 *  progress  0–1 reading progress
 *  title     short project name shown at the start of the bar
 */
export default function SectionNavigation({ sections = [], activeId, progress = 0, title }) {
  const listRef = useRef(null);

  // Keep the active chip visible inside the horizontally scrollable list
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const chip = list.querySelector(`[data-target="${activeId}"]`);
    if (!chip) return;
    const left = chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [activeId]);

  const goTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="cs-sectionnav" aria-label="Case study chapters">
      <div className="cs-sectionnav__inner">
        {title && <span className="cs-sectionnav__title">{title}</span>}
        <ol ref={listRef} className="cs-sectionnav__list">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-target={s.id}
                className={`cs-sectionnav__link${activeId === s.id ? ' is-active' : ''}`}
                aria-current={activeId === s.id ? 'true' : undefined}
                onClick={(e) => goTo(e, s.id)}
              >
                <span className="cs-sectionnav__index">{s.index}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
        <span className="cs-sectionnav__pct" aria-hidden="true">
          {String(Math.round(progress * 100)).padStart(2, '0')}%
        </span>
      </div>
      <span className="cs-sectionnav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </nav>
  );
}
