import Reveal from './Reveal.jsx';

/**
 * TwoUpMedia — intentional 2-column image/diagram composition for Phase 02 grid correction.
 * Borderless, responsive, with technical captions.
 */
export default function TwoUpMedia({
  itemA = {},
  itemB = {},
  caption = '',
  ratio = '16/9',
}) {
  return (
    <div className="cs-two-up">
      <div className="cs-two-up__grid">
        <Reveal className="cs-two-up__item">
          <div className="cs-two-up__media" style={{ aspectRatio: itemA.ratio || ratio }}>
            <img src={itemA.src} alt={itemA.alt || ''} loading="lazy" />
          </div>
          {(itemA.label || itemA.caption) && (
            <div className="cs-two-up__meta">
              {itemA.label && <span className="cs-two-up__label">{itemA.label}</span>}
              {itemA.caption && <p className="cs-two-up__caption">{itemA.caption}</p>}
            </div>
          )}
        </Reveal>

        <Reveal className="cs-two-up__item" delay={80}>
          <div className="cs-two-up__media" style={{ aspectRatio: itemB.ratio || ratio }}>
            <img src={itemB.src} alt={itemB.alt || ''} loading="lazy" />
          </div>
          {(itemB.label || itemB.caption) && (
            <div className="cs-two-up__meta">
              {itemB.label && <span className="cs-two-up__label">{itemB.label}</span>}
              {itemB.caption && <p className="cs-two-up__caption">{itemB.caption}</p>}
            </div>
          )}
        </Reveal>
      </div>

      {caption && (
        <Reveal className="cs-two-up__global-caption">
          <span>{caption}</span>
        </Reveal>
      )}
    </div>
  );
}
