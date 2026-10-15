/**
 * TextSlot — elegant typographic placeholder for copy that has not been written yet.
 * Renders skeleton lines that mirror the rhythm of the final text, so the layout
 * can be judged before content arrives. Never renders invented copy.
 */
const WIDTHS = [100, 94, 97, 88, 92, 76, 96, 84, 62];

export default function TextSlot({ lines = 3, size = 'body', label, className = '' }) {
  const count = Math.max(1, lines);
  return (
    <div className={`cs-textslot cs-textslot--${size}${className ? ` ${className}` : ''}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const isLast = i === count - 1 && count > 1;
        const width = isLast ? 58 : WIDTHS[i % WIDTHS.length];
        return <span key={i} className="cs-textslot__line" style={{ width: `${width}%` }} />;
      })}
      {label && <span className="cs-textslot__label">{label}</span>}
    </div>
  );
}
