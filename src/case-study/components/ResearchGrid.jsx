import Reveal from './Reveal.jsx';
import Media from './Media.jsx';
import TextSlot from './TextSlot.jsx';

/**
 * ResearchGrid — a grid of research findings, data points or field observations.
 * Props:
 *  items    [{ media?, title?, body?, stat? }]
 *  columns  2 | 3 | 4
 *  variant  'media' (image-led cards) | 'cards' (text-only numbered insights)
 */
export default function ResearchGrid({ items = [], columns = 3, variant = 'media' }) {
  return (
    <div className={`cs-research cs-research--${variant} cs-research--cols-${columns}`}>
      {items.map((item, i) => (
        <Reveal key={i} className="cs-research__item" delay={i * 80}>
          {variant === 'media' && item.media && <Media media={item.media} />}

          <div className="cs-research__meta">
            <span className="cs-research__index">{String(i + 1).padStart(2, '0')}</span>
            {item.stat && <span className="cs-research__stat">{item.stat}</span>}
          </div>

          {item.title ? (
            <h4 className="cs-research__title">{item.title}</h4>
          ) : (
            <TextSlot lines={1} size="title" />
          )}

          {item.body ? <p className="cs-research__body">{item.body}</p> : <TextSlot lines={variant === 'cards' ? 3 : 2} />}
        </Reveal>
      ))}
    </div>
  );
}
