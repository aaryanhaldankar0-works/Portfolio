import Reveal from './Reveal.jsx';

/**
 * UnionIntegration — presents the socio-economic framework of collaborating with
 * existing transport unions rather than displacing them.
 *
 * Core rule: "Do not replace unions. Integrate them."
 * Pillars: Maintenance, Operations, Transit Hubs, System Management.
 */
export default function UnionIntegration({
  title = 'COLLABORATIVE TRANSIT GOVERNANCE',
  subtitle = 'Silicon Valley mobility models attempt to disrupt and dismantle local driver unions through predatory contractor gig-work. Bharat Mobility Pod takes the opposite path: co-opting and integrating existing unions as core stakeholders.',
  statement = 'Do not replace unions. Integrate them.',
  pillars = [
    {
      num: '01',
      title: 'Operations',
      badge: 'Livelihood Security',
      tagline: 'From Gig Instability to Dignified Employment',
      desc: 'Existing informal Vikram, Tracker, and auto-rickshaw drivers transition into salaried, union-represented fleet operators. They receive guaranteed shift hours, standardized compensation, and municipal health coverage instead of predatory algorithmic commission deductions.',
    },
    {
      num: '02',
      title: 'Maintenance',
      badge: 'Local Upskilling',
      tagline: 'Empowering Roadside Garages as Certified Nodes',
      desc: 'Instead of centralized closed corporate service centers, local neighborhood mechanics and roadside repair garages are upskilled and certified to maintain modular skateboard brakes, suspension links, and low-voltage electrical systems — preserving the local micro-economy.',
    },
    {
      num: '03',
      title: 'Transit Hubs',
      badge: 'Civic Infrastructure',
      tagline: 'Formalizing Informal Ranks into Dignified Hubs',
      desc: 'Chaotic curbside ranks and informal street-corner pickup points are upgraded into permanent municipal transit hubs. These shelters feature fast-charging bays, shaded passenger boarding platforms, clean water access, and dedicated driver rest pavilions managed by union chapters.',
    },
    {
      num: '04',
      title: 'System Management',
      badge: 'Co-Governance',
      tagline: 'Democratic Route Planning & Depot Oversight',
      desc: 'Union leadership sits on the municipal dispatch council, participating directly in route allocation, seasonal scheduling adjustments, and depot dispute arbitration. Drivers are co-owners of system governance rather than passive algorithmic subjects.',
    },
  ],
}) {
  return (
    <div className="cs-union">
      <Reveal className="cs-union__header">
        <span className="cs-eyebrow">Socio-Economic Integration</span>
        <h4 className="cs-union__title">{title}</h4>
        <p className="cs-union__subtitle">{subtitle}</p>
      </Reveal>

      {statement && (
        <Reveal className="cs-union__callout">
          <span className="cs-union__callout-tag">ETHICAL STAKEHOLDER PRINCIPLE</span>
          <p className="cs-union__callout-text">“{statement}”</p>
        </Reveal>
      )}

      <div className="cs-union__grid">
        {pillars.map((p, i) => (
          <Reveal key={p.num} className="cs-union__card" delay={i * 90}>
            <div className="cs-union__card-top">
              <span className="cs-union__num">{p.num}</span>
              <span className="cs-union__badge">{p.badge}</span>
            </div>
            <h5 className="cs-union__card-title">{p.title}</h5>
            <span className="cs-union__card-tagline">{p.tagline}</span>
            <p className="cs-union__card-desc">{p.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
