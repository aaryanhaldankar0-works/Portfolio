import ImagePlaceholder from './ImagePlaceholder.jsx';

/** FutureSketchPlaceholder — reserved slot for hand sketches / ideation boards. */
export default function FutureSketchPlaceholder({ label = 'FORM EXPLORATION', ratio = '4/3', ...rest }) {
  return <ImagePlaceholder variant="sketch" label={label} ratio={ratio} {...rest} />;
}
