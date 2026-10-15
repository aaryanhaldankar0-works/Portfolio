import Reveal from './Reveal.jsx';

/**
 * PhotoCollage — Editorial masonry collage for field photography.
 * Composes multiple authentic photographs into an asymmetrical, dynamic gallery.
 *
 * Props:
 *  caption     kicker / caption label
 *  images      [{ src, alt, caption?, span? }]
 *  bleed       boolean: break out to full viewport
 */
export default function PhotoCollage({
  caption = 'FIELD PHOTOGRAPHY · THE LIVING CITY',
  images = [],
  bleed = true,
}) {
  if (!images.length) return null;

  return (
    <Reveal className={`cs-collage${bleed ? ' cs-bleed cs-bleed--padded' : ''}`}>
      <div className="cs-collage__grid">
        {images.map((img, i) => (
          <figure
            key={i}
            className={`cs-collage__item cs-collage__item--${img.span || (i === 0 ? 'hero' : 'standard')}`}
            style={img.bg ? { background: img.bg } : undefined}
          >
            <img
              src={img.src ? encodeURI(img.src) : undefined}
              alt={img.alt || `Field observation ${i + 1}`}
              loading="lazy"
              className="cs-collage__img"
              style={{
                objectFit: img.fit || 'cover',
                background: img.bg || undefined,
                padding: img.padding || (img.fit === 'contain' ? '1.5rem' : undefined),
              }}
            />
            {img.caption && (
              <figcaption className="cs-collage__caption">
                <span>{img.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {caption && (
        <div className="cs-collage__footer">
          <span className="cs-eyebrow">{caption}</span>
        </div>
      )}
    </Reveal>
  );
}
