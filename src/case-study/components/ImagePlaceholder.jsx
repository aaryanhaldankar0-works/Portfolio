/**
 * ImagePlaceholder — the base media slot.
 * - With `src`: renders the real asset (drop-in ready for future content).
 * - Without `src`: renders an elegant studio placeholder labelled with the
 *   intended asset (e.g. "FIELD PHOTOGRAPHY"). No fake imagery is generated.
 *
 * Variants: 'image' | 'sketch' | 'render'
 */
const KIND = {
  image: 'Image',
  sketch: 'Sketch',
  render: 'Render',
};

function toAspect(ratio) {
  if (!ratio || ratio === 'auto' || ratio === 'natural') return undefined;
  return String(ratio).replace(/\s*[/:]\s*/, ' / ');
}

function toLabel(ratio) {
  if (!ratio || ratio === 'auto' || ratio === 'natural') return 'AUTO';
  return String(ratio).replace(/\s*[/:]\s*/, ':');
}

function resolveSrc(s) {
  if (!s) return undefined;
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:') || s.startsWith('/')) {
    return encodeURI(s);
  }
  return '/' + encodeURI(s);
}

export default function ImagePlaceholder({
  label = 'IMAGE',
  ratio = '16/9',
  variant = 'image',
  src,
  alt,
  caption,
  className = '',
  controls = false,
  fit,
  bg,
}) {
  const isAutoRatio = !ratio || ratio === 'auto' || ratio === 'natural';
  const aspect = toAspect(ratio);
  const style = {
    ...(aspect ? { aspectRatio: aspect } : {}),
    ...(bg ? { background: bg } : {}),
  };
  const safeSrc = resolveSrc(src);

  return (
    <figure className={`cs-figure${className ? ` ${className}` : ''}`}>
      {src ? (
        <div className={`cs-media${isAutoRatio ? ' cs-media--auto' : ''}`} style={style}>
          {src.endsWith('.mp4') || src.endsWith('.webm') || variant === 'video' ? (
            <video
              src={safeSrc}
              autoPlay
              muted
              loop
              playsInline
              controls={controls ? true : undefined}
              disablePictureInPicture
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              tabIndex={-1}
              style={{
                width: '100%',
                height: isAutoRatio ? 'auto' : '100%',
                objectFit: fit || 'cover',
                display: 'block',
                pointerEvents: controls ? 'auto' : 'none',
              }}
            />
          ) : (
            <img
              src={safeSrc}
              alt={alt || label}
              loading="lazy"
              style={{
                width: '100%',
                height: isAutoRatio ? 'auto' : '100%',
                objectFit: fit || (isAutoRatio ? undefined : 'cover'),
                display: 'block',
                ...(bg ? { background: bg } : {}),
              }}
            />
          )}
        </div>
      ) : (
        <div
          className={`cs-ph cs-ph--${variant}`}
          style={style}
          role="img"
          aria-label={`${label} — asset pending`}
        >
          <span className="cs-ph__grid" aria-hidden="true" />
          <span className="cs-ph__corner cs-ph__corner--tl" aria-hidden="true" />
          <span className="cs-ph__corner cs-ph__corner--tr" aria-hidden="true" />
          <span className="cs-ph__corner cs-ph__corner--bl" aria-hidden="true" />
          <span className="cs-ph__corner cs-ph__corner--br" aria-hidden="true" />

          <span className="cs-ph__kind">{KIND[variant] || KIND.image}</span>

          <div className="cs-ph__center">
            <span className="cs-ph__label">{label}</span>
            <span className="cs-ph__status">
              <span className="cs-ph__dot" aria-hidden="true" />
              Asset pending
            </span>
          </div>

          <span className="cs-ph__ratio">{toLabel(ratio)}</span>
        </div>
      )}
      {caption && <figcaption className="cs-figure__caption">{caption}</figcaption>}
    </figure>
  );
}
