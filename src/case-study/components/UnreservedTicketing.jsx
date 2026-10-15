import Reveal from './Reveal.jsx';

/**
 * UnreservedTicketing — presents the friction-free unreserved ticketing framework
 * inspired by the Mumbai Suburban Railway (Mumbai Local), showing the dramatic
 * user journey improvement and the telemetry feedback loop into AI fleet management.
 */
export default function UnreservedTicketing({
  title = 'FRICTION-FREE COMMUTE ARCHITECTURE',
  subtitle = 'Drawing lessons from the highest-density transit network on earth to eliminate digital gating, app dependencies, and boarding delays in secondary cities.',
  inspiration = {
    eyebrow: 'Inspiration from Mumbai Local',
    heading: 'The World’s Most Resilient Mass Transit Model',
    text: 'The Mumbai Suburban Railway moves over 7.5 million passengers every day without requiring seat reservations, surge pricing, or smartphone app pre-booking. Commuters simply possess an unreserved ticket or pass, walk up to the platform, and board the next train within seconds. Bharat Mobility Pod adopts this exact open-throughput philosophy for Tier 2 and Tier 3 cities — ensuring zero technological or financial exclusion.',
  },
  journeyComparison = {
    title: 'COMMUTER JOURNEY TRANSFORMATION',
    traditional: {
      tag: 'Conventional Ride-Hailing / App Model',
      steps: [
        'Open app & wait for GPS signal',
        'Input drop location & wait for surge pricing calculation',
        'Wait 8–15 minutes for driver acceptance & matching',
        'Verify OTP, negotiate change, or face sudden cancellation',
        'High mental friction & 15+ min boarding delay',
      ],
    },
    unreserved: {
      tag: 'Bharat Mobility Unreserved Model',
      steps: [
        'Walk to nearest designated curb stop or transit node',
        'Tap unified smartcard, NFC pass, or scan physical coin token',
        'Step onto the ultra-low flat floor of the arriving pod',
        'Immediate departure with automated route allocation',
        'Friction-free boarding completed in under 5 seconds',
      ],
    },
  },
  telemetry = {
    title: 'THE CLOSED-LOOP TELEMETRY PIPELINE',
    subtitle: 'Every physical tap becomes an anonymized real-time demand sensor feeding directly into the AI Fleet Manager.',
    steps: [
      {
        num: '01',
        title: 'Tap-On Event',
        desc: 'Passenger taps at curb node; transaction timestamps exact boarding location and travel direction.',
      },
      {
        num: '02',
        title: 'Aggregated Stream',
        desc: 'Edge turnstiles batch density spikes every 30 seconds, flagging localized footfall surges.',
      },
      {
        num: '03',
        title: 'Fleet Redistribution',
        desc: 'AI Fleet Manager reroutes nearby 4-seater or 6-seater pods before station queues back up.',
      },
    ],
  },
}) {
  return (
    <div className="cs-ticketing">
      <Reveal className="cs-ticketing__header">
        <span className="cs-eyebrow">Ticketing & Flow Architecture</span>
        <h4 className="cs-ticketing__title">{title}</h4>
        <p className="cs-ticketing__subtitle">{subtitle}</p>
      </Reveal>

      {inspiration && (
        <Reveal className="cs-ticketing__inspire">
          <div className="cs-ticketing__inspire-tag">{inspiration.eyebrow}</div>
          <h5 className="cs-ticketing__inspire-head">{inspiration.heading}</h5>
          <p className="cs-ticketing__inspire-text">{inspiration.text}</p>
        </Reveal>
      )}

      <div className="cs-ticketing__comparison">
        <Reveal className="cs-ticketing__comp-head">
          <span className="cs-eyebrow">User Journey Transformation</span>
          <h5 className="cs-ticketing__comp-title">{journeyComparison.title}</h5>
        </Reveal>

        <div className="cs-ticketing__comp-grid">
          <Reveal className="cs-ticketing__comp-col cs-ticketing__comp-col--bad" delay={0}>
            <span className="cs-ticketing__col-tag">{journeyComparison.traditional.tag}</span>
            <ul className="cs-ticketing__step-list">
              {journeyComparison.traditional.steps.map((st, i) => (
                <li key={i} className="cs-ticketing__step-item cs-ticketing__step-item--bad">
                  <span className="cs-ticketing__step-dot">✕</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="cs-ticketing__comp-col cs-ticketing__comp-col--good" delay={100}>
            <span className="cs-ticketing__col-tag">{journeyComparison.unreserved.tag}</span>
            <ul className="cs-ticketing__step-list">
              {journeyComparison.unreserved.steps.map((st, i) => (
                <li key={i} className="cs-ticketing__step-item cs-ticketing__step-item--good">
                  <span className="cs-ticketing__step-dot">✓</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="cs-ticketing__telemetry">
        <Reveal className="cs-ticketing__telem-head">
          <span className="cs-eyebrow">Real-Time Fleet Feedback</span>
          <h5 className="cs-ticketing__telem-title">{telemetry.title}</h5>
          <p className="cs-ticketing__telem-sub">{telemetry.subtitle}</p>
        </Reveal>

        <div className="cs-ticketing__telem-grid">
          {telemetry.steps.map((s, i) => (
            <Reveal key={s.num} className="cs-ticketing__telem-card" delay={i * 90}>
              <div className="cs-ticketing__telem-top">
                <span className="cs-ticketing__telem-num">{s.num}</span>
                <span className="cs-ticketing__telem-arrow">→</span>
              </div>
              <h5 className="cs-ticketing__telem-name">{s.title}</h5>
              <p className="cs-ticketing__telem-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
