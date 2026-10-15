import Reveal from './Reveal.jsx';

/**
 * FleetManagement — visualizes the AI-driven municipal fleet management ecosystem.
 * Highlights: Demand prediction, footfall telemetry, dynamic 4-seater vs 6-seater allocation,
 * and fleet optimization.
 *
 * Core rule: "AI is the fleet manager. Not the designer."
 */
export default function FleetManagement({
  title = 'AI FLEET OPTIMISATION & DISPATCH ENGINE',
  subtitle = 'AI was not used to style vehicle proportions. Its true role is operational: orchestrating continuous real-time fleet allocation across fluctuating urban demand.',
  statement = 'AI is the fleet manager. Not the designer.',
  pillars = [
    {
      num: '01',
      title: 'Demand Prediction',
      badge: 'Predictive',
      desc: 'Machine learning models forecast passenger surges by cross-referencing historical commute trends, marketplace cycles, train arrival schedules, and weather patterns.',
    },
    {
      num: '02',
      title: 'Footfall Telemetry',
      badge: 'Real-Time',
      desc: 'Infrared doorstep counters and ticketing turnstiles continuously stream anonymized crowd density metrics to the central dispatch node without tracking personal identity.',
    },
    {
      num: '03',
      title: 'Dynamic Vehicle Allocation',
      badge: 'Dispatch',
      desc: 'Automatically routes the right vehicle capacity to the right corridor — matching 4-seater and 6-seater pods dynamically to passenger volume.',
    },
    {
      num: '04',
      title: 'Continuous Fleet Optimisation',
      badge: 'Loop',
      desc: 'Minimizes dead mileage and energy waste by redistributing idle vehicles toward anticipated transit nodes before commuter queues form.',
    },
  ],
  vehicles = [
    {
      capacity: '4 Seater Pod',
      tag: 'LEAN DEMAND & NARROW LANES',
      role: 'Off-Peak & Feeder Dispatch',
      badge: 'High Agility',
      useCase:
        'Deployed during mid-day troughs, late-night hours, and through ultra-narrow residential alleyways where running a larger cabin wastes energy and obstructs local traffic.',
      attributes: [
        { label: 'Corridor Type', value: 'Alleyways & Local Feeders' },
        { label: 'Demand Window', value: 'Mid-Day Troughs / Night' },
        { label: 'Operational Goal', value: 'Zero Empty Running' },
      ],
    },
    {
      capacity: '6 Seater Pod',
      tag: 'PEAK COMMUTE & TRUNK ARTERIES',
      role: 'Surge Capacity Dispatch',
      badge: 'Maximum Throughput',
      useCase:
        'Deployed during morning office rushes, school opening bells, and weekly marketplace fairs along main commercial spines to clear passenger platforms rapidly.',
      attributes: [
        { label: 'Corridor Type', value: 'Main Arterials & Ring Roads' },
        { label: 'Demand Window', value: 'Peak Commute Hours' },
        { label: 'Operational Goal', value: 'Platform Queue Clearance' },
      ],
    },
  ],
}) {
  return (
    <div className="cs-fleet">
      <Reveal className="cs-fleet__header">
        <span className="cs-eyebrow">Operational Intelligence</span>
        <h4 className="cs-fleet__title">{title}</h4>
        <p className="cs-fleet__subtitle">{subtitle}</p>
      </Reveal>

      {statement && (
        <Reveal className="cs-fleet__callout">
          <span className="cs-fleet__callout-tag">SYSTEM DELINEATION</span>
          <p className="cs-fleet__callout-text">“{statement}”</p>
        </Reveal>
      )}

      <div className="cs-fleet__pillars">
        {pillars.map((p, i) => (
          <Reveal key={p.num} className="cs-fleet__pillar-card" delay={i * 80}>
            <div className="cs-fleet__pillar-top">
              <span className="cs-fleet__pillar-num">{p.num}</span>
              <span className="cs-fleet__pillar-badge">{p.badge}</span>
            </div>
            <h5 className="cs-fleet__pillar-title">{p.title}</h5>
            <p className="cs-fleet__pillar-desc">{p.desc}</p>
          </Reveal>
        ))}
      </div>

      <div className="cs-fleet__allocation">
        <Reveal className="cs-fleet__alloc-header">
          <span className="cs-eyebrow">Dynamic Capacity Allocation</span>
          <h5 className="cs-fleet__alloc-title">4 Seater vs. 6 Seater Orchestration</h5>
          <p className="cs-fleet__alloc-lede">
            Rather than deploying uniform oversized buses that run half-empty for 70% of the day, the AI fleet engine
            continuously dispatches matched capacities based on live corridor footfall.
          </p>
        </Reveal>

        <div className="cs-fleet__vehicles-grid">
          {vehicles.map((v, i) => (
            <Reveal key={i} className="cs-fleet__vcard" delay={i * 120}>
              <div className="cs-fleet__vcard-top">
                <span className="cs-fleet__vcard-tag">{v.tag}</span>
                <span className="cs-fleet__vcard-badge">{v.badge}</span>
              </div>
              <h4 className="cs-fleet__vcard-cap">{v.capacity}</h4>
              <span className="cs-fleet__vcard-role">{v.role}</span>
              <p className="cs-fleet__vcard-desc">{v.useCase}</p>

              <div className="cs-fleet__vcard-attrs">
                {v.attributes.map((attr, idx) => (
                  <div key={idx} className="cs-fleet__vcard-attr">
                    <span className="cs-fleet__attr-label">{attr.label}</span>
                    <span className="cs-fleet__attr-val">{attr.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
