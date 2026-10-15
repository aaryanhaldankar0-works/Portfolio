import Reveal from './Reveal.jsx';
import TextSlot from './TextSlot.jsx';
import useReveal from '../hooks/useReveal.js';

/**
 * Timeline — sequential phases (process, system flow, deployment roadmap).
 * The connecting rail fills in as the timeline enters the viewport.
 *
 * Props:
 *  steps        [{ label?, title?, body? }]
 *  orientation  'horizontal' | 'vertical'
 */
export default function Timeline({ steps = [], orientation = 'horizontal' }) {
  const [ref, isRevealed] = useReveal({ threshold: 0.25 });

  return (
    <div ref={ref} className={`cs-timeline cs-timeline--${orientation}${isRevealed ? ' is-revealed' : ''}`}>
      <span className="cs-timeline__rail" aria-hidden="true">
        <span className="cs-timeline__fill" />
      </span>
      <ol className="cs-timeline__steps" style={{ '--cs-steps': steps.length }}>
        {steps.map((step, i) => (
          <Reveal as="li" key={i} className="cs-timeline__step" delay={150 + i * 120}>
            <span className="cs-timeline__node" aria-hidden="true" />
            <span className="cs-timeline__label">{step.label || `Phase ${String(i + 1).padStart(2, '0')}`}</span>
            {step.title ? <h4 className="cs-timeline__title">{step.title}</h4> : <TextSlot lines={1} size="title" />}
            {step.body ? <p className="cs-timeline__body">{step.body}</p> : <TextSlot lines={2} />}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
