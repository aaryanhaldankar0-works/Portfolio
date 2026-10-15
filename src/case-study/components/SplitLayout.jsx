import Reveal from './Reveal.jsx';
import Media from './Media.jsx';
import EditorialTextBlock from './EditorialTextBlock.jsx';

/**
 * SplitLayout — media and editorial text side by side.
 * Props:
 *  media    media descriptor
 *  text     EditorialTextBlock props
 *  reverse  place media on the right
 *  weight   'media' | 'balanced' | 'text' — column emphasis
 *  sticky   keep the text column pinned while the media scrolls
 */
export default function SplitLayout({ media, text = {}, reverse = false, weight = 'media', sticky = false }) {
  return (
    <div className={`cs-split cs-split--${weight}${reverse ? ' cs-split--reverse' : ''}${sticky ? ' cs-split--sticky' : ''}`}>
      <Reveal className="cs-split__media">
        <Media media={media} />
      </Reveal>
      <div className="cs-split__text">
        <EditorialTextBlock slotLines={4} {...text} />
      </div>
    </div>
  );
}
