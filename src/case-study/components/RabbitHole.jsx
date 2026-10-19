import Reveal from './Reveal.jsx';

/**
 * RabbitHole — Compact architectural entrance to the original Deep Dive / Workshop.
 *
 * Positioned toward the right side of the project-ending layout, immediately
 * before the existing Garage double doors.
 *
 * Props:
 *  projectId  'bharat-mobility' | 'ebs-tech'
 *  workshop   workshop config object { line, aside, label, href, zones }
 *  onEnter    callback(projectId) triggering view change to 'workshop'
 */
export default function RabbitHole({ projectId, workshop = {}, onEnter }) {
  const line = workshop.line || 'The finished pod is only the last page.';
  const aside =
    workshop.aside ||
    'Behind this door: the field notes, wrong turns, sketch iterations, chassis decisions, and full prototype evolution.';
  const label = workshop.label || 'Step into the workshop';

  const handleClick = (e) => {
    e.preventDefault();
    if (onEnter) onEnter(projectId);
  };

  return (
    <section
      className="cs-rabbithole"
      aria-label="Deep dive process entrance"
      data-project={projectId}
    >
      <Reveal className="cs-rabbithole__wrapper">
        <div className="cs-rabbithole__content">
          <div className="cs-rabbithole__meta">
            <span className="cs-rabbithole__kicker">PROCESS ARCHIVE · DEEP DIVE</span>
            <span className="cs-rabbithole__tag">5 Studio Zones</span>
          </div>

          <h3 className="cs-rabbithole__title">{line}</h3>
          <p className="cs-rabbithole__aside">{aside}</p>

          <a
            id={`${projectId}-workshop-entrance`}
            className="cs-rabbithole__door"
            href={`#${projectId}/workshop`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={`${label} — Enter the original design process archive`}
          >
            {/* Narrow architectural doorway frame with amber studio light spill */}
            <div className="cs-rabbithole__aperture" aria-hidden="true">
              <span className="cs-rabbithole__beam" />
              <span className="cs-rabbithole__plaque">05</span>
            </div>

            <div className="cs-rabbithole__action">
              <span className="cs-rabbithole__label">{label}</span>
              <span className="cs-rabbithole__hint">Field Notebook · Sketchbook · Engineering · AI · Prototype</span>
            </div>

            <span className="cs-rabbithole__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
