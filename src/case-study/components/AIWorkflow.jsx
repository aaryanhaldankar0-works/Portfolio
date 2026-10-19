import Reveal from './Reveal.jsx';

/**
 * AIWorkflow — presents AI exploration honestly in a design engineering pipeline.
 *
 * Pipeline sequence:
 *   Sketch → Vizcom → Evaluation → Engineering → CAD → Render
 *
 * Props:
 *  title       section title
 *  subtitle    introductory lede
 *  statement   highlight quote / designer manifesto
 *  steps       custom pipeline nodes (defaults to the 6 canonical stages)
 */
export default function AIWorkflow({
  title = 'THE EXPEDITED ITERATION PIPELINE',
  subtitle = 'AI was used transparently as an ideation amplifier, not an automated design solution. It reduced rendering exploration from days to seconds while leaving all engineering decisions in human hands.',
  statement = 'AI accelerated visual exploration. Engineering decisions remained human.',
  steps = [
    {
      num: '01',
      title: 'Sketch',
      role: 'Human Intent',
      badge: 'Manual',
      desc: 'Rapid physical line drawing defining primary volumes, gesture lines, and ingress proportions.',
    },
    {
      num: '02',
      title: 'Vizcom',
      role: 'AI Acceleration',
      badge: 'Generative',
      desc: 'Diffusion-assisted light surfacing and CMF exploratory passes over hand sketches in real time.',
    },
    {
      num: '03',
      title: 'Evaluation',
      role: 'Human Filter',
      badge: 'Critical',
      desc: 'Weeding out generative hallucinations, disproportions, and mechanically impossible surfacing.',
    },
    {
      num: '04',
      title: 'Engineering',
      role: 'Human Rigor',
      badge: 'Feasibility',
      desc: 'Ground clearance, rollover spaceframes, underfloor battery depth, and 50th/95th percentile human packaging.',
    },
    {
      num: '05',
      title: 'CAD',
      role: 'Human Precision',
      badge: 'Parametric',
      desc: 'Production-ready 3D surfacing, hard-point tolerances, and panel seam splits in modeling software.',
    },
    {
      num: '06',
      title: 'Render',
      role: 'Studio Output',
      badge: 'Final CMF',
      desc: 'Physically based ray-traced materials, environmental illumination, and context simulation.',
    },
  ],
}) {
  return (
    <div className="cs-aiworkflow">
      <Reveal className="cs-aiworkflow__header">
        <span className="cs-eyebrow">Methodology & Tooling</span>
        <h4 className="cs-aiworkflow__title">{title}</h4>
        <p className="cs-aiworkflow__subtitle">{subtitle}</p>
      </Reveal>

      {statement && (
        <Reveal className="cs-aiworkflow__callout">
          <span className="cs-aiworkflow__callout-tag">INTEGRITY PRINCIPLE</span>
          <p className="cs-aiworkflow__callout-text">“{statement}”</p>
        </Reveal>
      )}

      <div className="cs-aiworkflow__pipeline">
        {steps.map((s, i) => (
          <Reveal key={s.num} className="cs-aiworkflow__step" delay={i * 90}>
            <div className="cs-aiworkflow__step-header">
              <span className="cs-aiworkflow__num">{s.num}</span>
              <span className={`cs-aiworkflow__badge cs-aiworkflow__badge--${s.badge.toLowerCase().replace(/[^a-z]/g, '')}`}>
                {s.badge}
              </span>
            </div>

            <div className="cs-aiworkflow__step-main">
              <h5 className="cs-aiworkflow__step-title">{s.title}</h5>
              <span className="cs-aiworkflow__step-role">{s.role}</span>
              <p className="cs-aiworkflow__step-desc">{s.desc}</p>
            </div>

            {i < steps.length - 1 && (
              <div className="cs-aiworkflow__arrow" aria-hidden="true">
                <span className="cs-aiworkflow__arrow-h">→</span>
                <span className="cs-aiworkflow__arrow-v">↓</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
