import Reveal from './Reveal.jsx';

/**
 * WorkshopThreshold — the single, quiet doorway from a project's Exhibition
 * into that project's Workshop.
 *
 * Rendered once per case study, after the final chapter and before the
 * Next Project hand-off. It is not a chapter: it does not appear in section
 * navigation and never repeats. The Exhibition is complete without it.
 *
 * Props:
 *  projectId  owning project (the Workshop belongs to the project)
 *  line       primary line (quiet, short)
 *  aside      secondary line
 *  label      the one invitation
 *  href       project-scoped workshop address
 *  onEnter    callback(projectId) when the visitor chooses to enter
 */
export default function WorkshopThreshold({ projectId, line, aside, label = 'Enter the workshop', href, onEnter }) {
  const handleClick = (e) => {
    if (!onEnter) return;
    e.preventDefault();
    onEnter(projectId);
  };

  return (
    <section className="cs-threshold" aria-label="Workshop entrance" data-project={projectId}>
      <Reveal className="cs-threshold__inner">
        <span className="cs-threshold__rule" aria-hidden="true" />
        {line && <p className="cs-threshold__line">{line}</p>}
        {aside && <p className="cs-threshold__aside">{aside}</p>}

        <a
          id={`${projectId}-workshop-entrance`}
          className="cs-threshold__door"
          href={href || `#${projectId}/workshop`}
          onClick={handleClick}
        >
          <span className="cs-threshold__frame" aria-hidden="true">
            <span className="cs-threshold__light" />
          </span>
          <span className="cs-threshold__label">{label}</span>
          <span className="cs-threshold__arrow" aria-hidden="true">→</span>
        </a>
      </Reveal>
    </section>
  );
}
