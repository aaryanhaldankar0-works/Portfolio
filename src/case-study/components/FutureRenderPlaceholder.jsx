import ImagePlaceholder from './ImagePlaceholder.jsx';

/** FutureRenderPlaceholder — reserved slot for final CGI / studio renders. */
export default function FutureRenderPlaceholder({ label = 'FINAL RENDER', ratio = '16/9', ...rest }) {
  return <ImagePlaceholder variant="render" label={label} ratio={ratio} {...rest} />;
}
