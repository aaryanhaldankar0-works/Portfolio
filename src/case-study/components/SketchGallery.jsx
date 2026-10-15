import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * SketchGallery — an asymmetric editorial gallery for ideation work.
 * Props:
 *  items   media descriptors (kind defaults to 'sketch')
 *  layout  'mosaic' (feature + supporting tiles) | 'row' (even horizontal strip)
 *  bleed   break out to full viewport width
 */
export default function SketchGallery({ items = [], layout = 'mosaic', bleed = false }) {
  return (
    <div className={`cs-gallery cs-gallery--${layout}${bleed ? ' cs-bleed cs-bleed--padded' : ''}`}>
      {items.map((media, i) => (
        <Reveal key={i} className="cs-gallery__item" delay={(i % 4) * 90}>
          <Media media={{ kind: 'sketch', ...media }} />
        </Reveal>
      ))}
    </div>
  );
}
