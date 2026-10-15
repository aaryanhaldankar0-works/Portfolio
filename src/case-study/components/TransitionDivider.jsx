import Reveal from './Reveal.jsx';

/**
 * TransitionDivider — a quiet chapter break: a hairline that draws itself on scroll,
 * with an optional mono label (e.g. "From research to form").
 */
export default function TransitionDivider({ label, index, variant = 'line' }) {
  return (
    <Reveal className={`cs-divider cs-divider--${variant}`} role="separator">
      <span className="cs-divider__line" aria-hidden="true" />
      {(label || index) && (
        <span className="cs-divider__label">
          {index && <span className="cs-divider__index">{index}</span>}
          {label}
        </span>
      )}
      <span className="cs-divider__line" aria-hidden="true" />
    </Reveal>
  );
}
