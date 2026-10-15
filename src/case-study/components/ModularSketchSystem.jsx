import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * ModularSketchSystem — a flexible transportation design ideation wall.
 * Built to display currently available sketches alongside elegant reserved slots
 * for future package, proportion, perspective, and detail studies.
 *
 * Props:
 *  title       section subtitle or deck header
 *  categories  string[] category filters (e.g. ['All', 'Ideation', 'Packaging', 'Proportions', 'Details'])
 *  items       [{ media, category, title, phase, status }]
 */
export default function ModularSketchSystem({
  title = 'CONCEPT FORM & IDEATION REPOSITORY',
  categories = ['All Studies', 'Ideation', 'Packaging', 'Proportions', 'Perspectives', 'Details'],
  items = [],
}) {
  const [activeCategory, setActiveCategory] = useState('All Studies');

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All Studies') return true;
    if (activeCategory === 'Current Sketches') return !item.isReserved;
    if (activeCategory === 'Future Sketches') return item.isReserved;
    if (activeCategory === 'Package Studies')
      return item.category === 'Package Studies' || item.category === 'Packaging';
    if (activeCategory === 'Proportion Studies')
      return item.category === 'Proportion Studies' || item.category === 'Proportions';
    if (activeCategory === 'Perspective Studies')
      return item.category === 'Perspective Studies' || item.category === 'Perspectives';
    if (activeCategory === 'Detail Studies')
      return item.category === 'Detail Studies' || item.category === 'Details';
    return item.category === activeCategory;
  });

  return (
    <div className="cs-sketchsystem">
      <div className="cs-sketchsystem__filter-bar">
        <div className="cs-sketchsystem__filter-label">
          <span className="cs-eyebrow">{title}</span>
          <span className="cs-sketchsystem__count">
            {filteredItems.length} {filteredItems.length === 1 ? 'Study' : 'Studies'}
          </span>
        </div>

        <div className="cs-sketchsystem__pills" role="tablist" aria-label="Filter sketch studies">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`cs-sketchsystem__pill${activeCategory === cat ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="cs-sketchsystem__grid">
        {filteredItems.map((item, i) => (
          <Reveal key={`${item.category}-${i}`} className="cs-sketchsystem__card" delay={(i % 4) * 80}>
            <div className="cs-sketchsystem__media-wrap">
              <Media media={item.media} />
              {item.isReserved && (
                <div className="cs-sketchsystem__badge">
                  <span className="cs-sketchsystem__badge-dot" />
                  <span>Reserved Study Slot</span>
                </div>
              )}
            </div>

            <div className="cs-sketchsystem__info">
              <div className="cs-sketchsystem__header-row">
                <span className="cs-sketchsystem__category">{item.category}</span>
                <span className="cs-sketchsystem__phase">{item.phase || 'Phase Study'}</span>
              </div>
              <h4 className="cs-sketchsystem__title">{item.title}</h4>
              {item.note && <p className="cs-sketchsystem__note">{item.note}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
