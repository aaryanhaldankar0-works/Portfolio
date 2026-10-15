import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Media from './Media.jsx';
import TextSlot from './TextSlot.jsx';

/**
 * EngineeringSection — a technical drawing with numbered annotation hotspots
 * linked to a callout list. Hovering a callout highlights its hotspot and vice versa.
 *
 * Props:
 *  media     media descriptor for the technical view
 *  callouts  [{ label?, value?, body?, x?, y? }]  x/y = hotspot position in % of the image
 *  heading   optional heading above the callout list
 */
const DEFAULT_POSITIONS = [
  { x: 22, y: 38 },
  { x: 48, y: 24 },
  { x: 72, y: 46 },
  { x: 38, y: 72 },
  { x: 82, y: 70 },
  { x: 60, y: 62 },
];

export default function EngineeringSection({ media, callouts = [], heading }) {
  const [active, setActive] = useState(null);

  return (
    <div className="cs-engineering">
      <Reveal className="cs-engineering__visual">
        <Media media={media} />
        <div className="cs-engineering__hotspots">
          {callouts.map((c, i) => {
            const pos = { x: c.x ?? DEFAULT_POSITIONS[i % 6].x, y: c.y ?? DEFAULT_POSITIONS[i % 6].y };
            return (
              <button
                key={i}
                type="button"
                className={`cs-hotspot${active === i ? ' is-active' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`Annotation ${i + 1}${c.label ? `: ${c.label}` : ''}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="cs-engineering__panel">
        {heading ? <h4 className="cs-engineering__heading">{heading}</h4> : <TextSlot lines={1} size="title" />}
        <ol className="cs-engineering__callouts">
          {callouts.map((c, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 70}
              className={`cs-callout${active === i ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="cs-callout__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="cs-callout__content">
                {c.label ? <span className="cs-callout__label">{c.label}</span> : <TextSlot lines={1} size="label" />}
                {c.value && <span className="cs-callout__value">{c.value}</span>}
                {c.body ? <p className="cs-callout__body">{c.body}</p> : <TextSlot lines={2} />}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
