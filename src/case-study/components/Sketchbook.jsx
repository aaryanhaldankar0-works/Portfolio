import { useState, useEffect } from 'react';
import Reveal from './Reveal.jsx';

/**
 * Sketchbook — Workshop Zone 02: Transportation Design Ideation Archive.
 *
 * Designed as a physical designer's studio portfolio of drafting sheets.
 * Shows genuine hand sketches with zoom inspection, alongside intentional
 * reserved drafting pages for future studies (packaging, perspective,
 * orthographics, marker renderings).
 */
export default function Sketchbook({
  intro,
  categories = [
    'All Pages',
    'Current Sketches',
    'Package Studies',
    'Perspective Studies',
    'Orthographic Studies',
    'Marker Renderings',
    'Future Sketches',
  ],
  pages = [],
}) {
  const [activeCategory, setActiveCategory] = useState('All Pages');
  const [selectedSketch, setSelectedSketch] = useState(null);

  // Close lightbox on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedSketch(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredPages = pages.filter((page) => {
    if (activeCategory === 'All Pages') return true;
    if (activeCategory === 'Current Sketches') return !page.isReserved;
    if (activeCategory === 'Future Sketches') return page.isReserved;
    return page.category === activeCategory;
  });

  return (
    <div className="sb">
      {intro && <p className="sb-intro fn-hand">{intro}</p>}

      {/* Filter bar styled as studio drafting tabs */}
      <div className="sb-toolbar">
        <div className="sb-toolbar__meta">
          <span className="ws-tape">Sketchbook Archive</span>
          <span className="sb-toolbar__count">
            {filteredPages.length} {filteredPages.length === 1 ? 'Page' : 'Pages'}
          </span>
        </div>

        <div className="sb-pills" role="tablist" aria-label="Filter sketchbook pages">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`sb-pill${activeCategory === cat ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* The Sheets Grid */}
      <div className="sb-grid">
        {filteredPages.map((page, i) => (
          <Reveal key={page.id || i} className={`sb-sheet ${page.isReserved ? 'sb-sheet--reserved' : 'sb-sheet--active'}`}>
            <article className="sb-sheet__inner">
              {/* Technical Page Header / Registration Marks */}
              <header className="sb-sheet__header">
                <div className="sb-sheet__page-num">
                  <span className="sb-sheet__crosshair" aria-hidden="true">+</span>
                  <span>PAGE {page.pageNumber || String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="sb-sheet__badge-wrap">
                  <span className="sb-badge sb-badge--category">{page.category}</span>
                  {page.isReserved ? (
                    <span className="sb-badge sb-badge--reserved">Reserved Study</span>
                  ) : (
                    <span className="sb-badge sb-badge--medium">{page.medium}</span>
                  )}
                </div>
              </header>

              {/* Sheet Visual Surface */}
              <div className="sb-sheet__visual">
                {page.isReserved ? (
                  <div className="sb-drafting-canvas" aria-label={`Reserved drafting page for ${page.title}`}>
                    {/* Isometric / Perspective Drafting Construction Lines */}
                    <svg className="sb-drafting-grid" viewBox="0 0 400 280" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <pattern id={`sb-grid-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.18" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#sb-grid-${i})`} />
                      <line x1="0" y1="230" x2="400" y2="230" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
                      <line x1="200" y1="0" x2="200" y2="280" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.3" />
                      <path d="M 40 230 L 200 70 L 360 230" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" strokeOpacity="0.3" />
                      <circle cx="200" cy="70" r="3" fill="currentColor" opacity="0.4" />
                      <circle cx="40" cy="230" r="3" fill="currentColor" opacity="0.4" />
                      <circle cx="360" cy="230" r="3" fill="currentColor" opacity="0.4" />
                    </svg>

                    <div className="sb-drafting-canvas__content">
                      <span className="sb-drafting-canvas__icon" aria-hidden="true">📐</span>
                      <span className="sb-drafting-canvas__label">RESERVED STUDY SHEET</span>
                      <strong className="sb-drafting-canvas__title">{page.title}</strong>
                      {page.spec && <span className="sb-drafting-canvas__spec">{page.spec}</span>}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="sb-sheet__zoom-btn"
                    onClick={() => setSelectedSketch(page)}
                    aria-label={`View full sketch: ${page.title}`}
                  >
                    <img
                      src={page.src}
                      alt={page.alt || page.title}
                      loading="lazy"
                      className="sb-sheet__image"
                    />
                    <span className="sb-sheet__zoom-hint" aria-hidden="true">
                      <span>Click to inspect line work</span>
                      <span>🔍</span>
                    </span>
                  </button>
                )}
              </div>

              {/* Title Block & Studio Notes */}
              <footer className="sb-sheet__titleblock">
                <div className="sb-sheet__titleblock-main">
                  <h4 className="sb-sheet__title">{page.title}</h4>
                  {page.note && <p className="sb-sheet__note">{page.note}</p>}
                </div>

                <div className="sb-sheet__meta-row">
                  <span className="sb-sheet__date">{page.date || 'Design Phase'}</span>
                  {page.tags && page.tags.length > 0 && (
                    <div className="sb-sheet__tags">
                      {page.tags.map((t, idx) => (
                        <span key={idx} className="sb-sheet__tag">#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </footer>
            </article>
          </Reveal>
        ))}

        {/* Future Page Invitation Card */}
        <Reveal className="sb-sheet sb-sheet--future-prompt">
          <div className="sb-future-card">
            <span className="ws-tape">Continuous Growth</span>
            <div className="sb-future-card__icon" aria-hidden="true">✏️</div>
            <h4 className="sb-future-card__title">Future Pages</h4>
            <p className="sb-future-card__text">
              As more package overlays, marker renderings, and perspective gestures are scanned, new sheets slide seamlessly into this binder.
            </p>
            <div className="sb-future-card__meta">
              <span>Next reserved slot: Page {String(pages.length + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox inspection modal */}
      {selectedSketch && (
        <div
          className="sb-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedSketch.title}
          onClick={() => setSelectedSketch(null)}
        >
          <div className="sb-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="sb-lightbox__close"
              onClick={() => setSelectedSketch(null)}
              aria-label="Close zoom view"
            >
              ✕
            </button>
            <img
              src={selectedSketch.src}
              alt={selectedSketch.alt || selectedSketch.title}
              className="sb-lightbox__image"
            />
            <div className="sb-lightbox__caption">
              <div>
                <span className="sb-lightbox__page">Page {selectedSketch.pageNumber}</span>
                <h3 className="sb-lightbox__title">{selectedSketch.title}</h3>
                <p className="sb-lightbox__note">{selectedSketch.note}</p>
              </div>
              <span className="sb-lightbox__medium">{selectedSketch.medium}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
