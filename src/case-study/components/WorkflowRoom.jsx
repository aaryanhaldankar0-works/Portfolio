import Reveal from './Reveal.jsx';

/**
 * WorkflowRoom — Workshop Zone 04: Process & Methodology Room.
 *
 * Designed as a studio pinboard tracking the 8-stage evolutionary pipeline:
 * Research → Sketch → Vizcom → Iteration → Engineering → CAD → Rendering → Presentation.
 *
 * Transparently articulates that AI accelerated visual exploration, while
 * all spatial, ergonomic, and mechanical engineering decisions remained human.
 */
export default function WorkflowRoom({
  intro,
  principle = 'AI accelerated exploration. Engineering decisions remained human.',
  stages = [],
  futureMilestones = [],
}) {
  return (
    <div className="wf">
      {intro && <p className="wf-intro fn-hand">{intro}</p>}

      {/* Integrity Manifesto Callout */}
      {principle && (
        <Reveal className="wf-manifesto">
          <span className="ws-tape">Tooling Integrity Principle</span>
          <h3 className="wf-manifesto__text">“{principle}”</h3>
          <p className="wf-manifesto__sub">
            Generative algorithms were employed transparently to compress visual iteration from days to seconds. No machine algorithm designed the chassis, calculated roll stability, or determined human comfort.
          </p>
        </Reveal>
      )}

      {/* The 8-Stage Evolutionary Pipeline */}
      <div className="wf-pipeline">
        <div className="wf-pipeline__spine" aria-hidden="true" />

        {stages.map((stage, idx) => (
          <Reveal
            key={stage.id || idx}
            className={`wf-card wf-card--${idx % 2 === 0 ? 'left' : 'right'}`}
            delay={(idx % 3) * 70}
          >
            <div className="wf-card__inner">
              {/* Card Header & Badges */}
              <header className="wf-card__header">
                <div className="wf-card__num-wrap">
                  <span className="wf-card__pin" aria-hidden="true" />
                  <span className="wf-card__num">{stage.num}</span>
                  <h4 className="wf-card__title">{stage.title}</h4>
                </div>
                <div className="wf-card__badges">
                  <span className="wf-badge wf-badge--actor">{stage.actor}</span>
                  <span className="wf-badge wf-badge--type">{stage.badge}</span>
                </div>
              </header>

              <p className="wf-card__headline">{stage.headline}</p>

              {/* Media Artifact (if present) */}
              {stage.media && stage.media.src && (
                <div className="wf-card__media-wrap">
                  <img
                    src={stage.media.src}
                    alt={stage.media.label || stage.title}
                    loading="lazy"
                    className="wf-card__image"
                  />
                  {stage.media.label && (
                    <span className="wf-card__media-label">{stage.media.label}</span>
                  )}
                </div>
              )}

              <p className="wf-card__desc">{stage.desc}</p>

              {/* Honest AI evaluation callout for Vizcom */}
              {stage.honestNote && (
                <div className="wf-card__honest-box">
                  <strong className="wf-card__honest-title">Honest Methodology Note:</strong>
                  <p>{stage.honestNote}</p>
                </div>
              )}

              {/* Tooling footer */}
              {stage.tooling && (
                <footer className="wf-card__footer">
                  <span className="wf-card__tooling-label">Tooling:</span>
                  <span className="wf-card__tooling-text">{stage.tooling}</span>
                </footer>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Future Milestones Section */}
      {futureMilestones && futureMilestones.length > 0 && (
        <div className="wf-future-section">
          <span className="ws-tape">Upcoming Project Milestones</span>
          <div className="wf-future-grid">
            {futureMilestones.map((m, mIdx) => (
              <Reveal key={mIdx} className="wf-future-card" delay={mIdx * 80}>
                <div className="wf-future-card__badge">{m.badge}</div>
                <h4 className="wf-future-card__title">{m.title}</h4>
                <p className="wf-future-card__desc">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
