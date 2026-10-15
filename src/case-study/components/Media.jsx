import ImagePlaceholder from './ImagePlaceholder.jsx';
import FutureSketchPlaceholder from './FutureSketchPlaceholder.jsx';
import FutureRenderPlaceholder from './FutureRenderPlaceholder.jsx';

/**
 * Media — resolves a media descriptor from project config to the right slot.
 * Descriptor shape: { kind: 'image' | 'sketch' | 'render', label, ratio, src?, alt?, caption? }
 */
export default function Media({ media, className }) {
  if (!media) return null;
  const { kind = 'image', ...props } = media;

  if (kind === 'video') return <ImagePlaceholder variant="video" className={className} {...props} />;
  if (kind === 'sketch') return <FutureSketchPlaceholder className={className} {...props} />;
  if (kind === 'render') return <FutureRenderPlaceholder className={className} {...props} />;
  return <ImagePlaceholder variant={kind} className={className} {...props} />;
}
