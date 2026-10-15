import { useCallback, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * ComparisonModule — compare two states (before / after, option A / option B).
 *  mode 'slider' : draggable wipe between two overlaid media
 *  mode 'side'   : two media side by side
 *
 * Props: before { media, label }, after { media, label }, mode, initial (0–100)
 */
export default function ComparisonModule({ before = {}, after = {}, mode = 'slider', initial = 50 }) {
  const [pos, setPos] = useState(initial);
  const stageRef = useRef(null);
  const dragging = useRef(false);

  const updateFromPointer = useCallback((clientX) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(Math.max(pct, 0), 100));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromPointer(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) updateFromPointer(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const beforeLabel = before.label || 'Before';
  const afterLabel = after.label || 'After';

  if (mode === 'side') {
    return (
      <div className="cs-compare cs-compare--side">
        {[{ ...before, label: beforeLabel }, { ...after, label: afterLabel }].map((side, i) => (
          <Reveal key={i} className="cs-compare__side" delay={i * 120}>
            <span className="cs-compare__tag">{side.label}</span>
            <Media media={side.media} />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <Reveal className="cs-compare cs-compare--slider">
      <div
        ref={stageRef}
        className="cs-compare__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ '--cs-compare-pos': `${pos}%` }}
      >
        <div className="cs-compare__layer cs-compare__layer--before">
          <Media media={before.media} />
        </div>
        <div className="cs-compare__layer cs-compare__layer--after" aria-hidden="true">
          <Media media={after.media} />
        </div>

        <span className="cs-compare__tag cs-compare__tag--before">{beforeLabel}</span>
        <span className="cs-compare__tag cs-compare__tag--after">{afterLabel}</span>

        <div className="cs-compare__handle" aria-hidden="true">
          <span className="cs-compare__knob">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 6 3 12 9 18" />
              <polyline points="15 6 21 12 15 18" />
            </svg>
          </span>
        </div>

        <input
          className="cs-compare__range"
          type="range"
          min="0"
          max="100"
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        />
      </div>
    </Reveal>
  );
}
