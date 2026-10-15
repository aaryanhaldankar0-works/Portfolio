import Reveal from './Reveal.jsx';

/**
 * JourneyMap — visualizes fragmented commuter journeys and transfer friction.
 * Sequence: Walking → Tracker → Bus → Walking → Destination
 *
 * Props:
 *  title     headline for the journey analysis
 *  subtitle  contextual lede
 *  steps     [{ mode, label, note, friction }]
 */
export default function JourneyMap({
  title = 'THE MULTI-TRANSFER FRAGMENTATION',
  subtitle = 'Mapping a typical daily commuter trip reveals the structural friction of Tier 2 & 3 mobility: trips are rarely direct, forcing repeated mode changes.',
  steps = [
    {
      mode: 'Walk',
      label: 'Walking',
      note: 'First-mile pedestrian leg navigating unpaved village lanes or steep gradients.',
      friction: 'Pedestrian exposure',
    },
    {
      mode: 'Feeder',
      label: 'Tracker',
      note: 'Overloaded intermediate shared transit to reach the nearest arterial connector.',
      friction: '10–15 min waiting / crowding',
    },
    {
      mode: 'Transit',
      label: 'Bus',
      note: 'Main corridor transit segment; highly congested and irregular arrival cadence.',
      friction: 'Transfer friction',
    },
    {
      mode: 'Walk',
      label: 'Walking',
      note: 'Last-mile walk from main road stop into interior destination.',
      friction: 'Poor pedestrian infra',
    },
    {
      mode: 'Arrival',
      label: 'Destination',
      note: 'Workplace, college, hospital or marketplace reached after multiple disjointed legs.',
      friction: 'Compounded fatigue',
    },
  ],
}) {
  return (
    <div className="cs-journeymap">
      <Reveal className="cs-journeymap__header">
        <span className="cs-eyebrow">Commuter Journey Mapping</span>
        <h4 className="cs-journeymap__title">{title}</h4>
        <p className="cs-journeymap__subtitle">{subtitle}</p>
      </Reveal>

      <div className="cs-journeymap__flow">
        {steps.map((step, i) => (
          <Reveal key={i} className="cs-journeymap__step" delay={i * 100}>
            <div className="cs-journeymap__node-wrap">
              <div className="cs-journeymap__node">
                <span className="cs-journeymap__step-num">0{i + 1}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="cs-journeymap__connector" aria-hidden="true">
                  <span className="cs-journeymap__arrow">→</span>
                </div>
              )}
            </div>

            <div className="cs-journeymap__card">
              <div className="cs-journeymap__card-top">
                <span className="cs-journeymap__mode">{step.mode}</span>
                <span className="cs-journeymap__label">{step.label}</span>
              </div>
              <p className="cs-journeymap__note">{step.note}</p>
              {step.friction && (
                <div className="cs-journeymap__friction">
                  <span className="cs-journeymap__friction-dot" />
                  <span>{step.friction}</span>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
