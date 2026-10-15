import Reveal from './Reveal.jsx';

/**
 * NextProject — closing band that hands the reader to the next project.
 * Props: project { id, title, category, tagline }, onNavigate(id), label
 */
export default function NextProject({ project, onNavigate, label = 'Next Project' }) {
  if (!project) return null;

  const handleClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(project.id);
    }
  };

  const displayTitle =
    project.id === 'ebs-tech' ? 'Emergency Communication Systems (EBS Tech)' : project.title;

  return (
    <Reveal as="aside" className="cs-next" aria-label={label}>
      <a href="#featured" className="cs-next__link" onClick={handleClick}>
        <span className="cs-next__label">{label}</span>
        <span className="cs-next__row">
          <span className="cs-next__title">{displayTitle}</span>
          <span className="cs-next__arrow" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </span>
        <span className="cs-next__meta">
          {project.category && <span className="cs-eyebrow">{project.category}</span>}
          {project.tagline && <span className="cs-next__tagline">{project.tagline}</span>}
        </span>
        <span className="cs-next__sweep" aria-hidden="true" />
      </a>
    </Reveal>
  );
}
