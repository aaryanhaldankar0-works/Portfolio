import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * FullWidthImage — large cinematic image.
 * Props:
 *  media    media descriptor
 *  bleed    true = break out of the content column to the full viewport width
 *  caption  optional caption rendered within the content column
 */
export default function FullWidthImage({ media, bleed = true, caption }) {
  return (
    <Reveal className={`cs-fullwidth${bleed ? ' cs-bleed' : ''}`}>
      <Media media={media} className="cs-fullwidth__media" />
      {caption && <p className="cs-fullwidth__caption">{caption}</p>}
    </Reveal>
  );
}
