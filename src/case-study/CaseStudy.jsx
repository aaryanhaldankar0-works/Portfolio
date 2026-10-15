import { useRef, useState, useCallback } from 'react';
import { Hero, SectionNavigation, CaseSection, NextProject, BackDoor, RabbitHole, Workshop } from './components/index.js';
import { BlockRenderer } from './blocks.jsx';
import useActiveSection from './hooks/useActiveSection.js';

/**
 * CaseStudy — orchestrates a project's case study from its config.
 *
 * Props:
 *  config             project case study config (see ./projects)
 *  project            project record from PORTFOLIO_DATA (title, tagline, specs…)
 *  nextProject        project record for the "Next Project" hand-off
 *  onNavigateProject  callback(id) for moving to another project
 */
export default function CaseStudy({ config, project = {}, nextProject, onNavigateProject }) {
  const rootRef = useRef(null);
  const sections = config.sections || [];
  const { activeId, progress } = useActiveSection(
    sections.map((s) => s.id),
    rootRef
  );

  const hero = config.hero || {};
  const meta = hero.showSpecs !== false && project.specs
    ? Object.entries(project.specs).map(([label, value]) => ({ label, value }))
    : [];

  // Exhibition ↔ Workshop. The Workshop belongs to this project and lives
  // inside the same mount, so site routing is untouched.
  const [view, setView] = useState('exhibition');

  const scrollToTop = () =>
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }));

  const enterWorkshop = useCallback((id) => {
    setView('workshop');
    scrollToTop();
    window.dispatchEvent(new CustomEvent('casestudy:enter-workshop', { detail: { projectId: id } }));
  }, []);

  const exitWorkshop = useCallback(() => {
    setView('exhibition');
    requestAnimationFrame(() =>
      document.getElementById(`${config.id}-workshop-entrance`)?.scrollIntoView({ behavior: 'auto', block: 'center' })
    );
    window.dispatchEvent(new CustomEvent('casestudy:exit-workshop', { detail: { projectId: config.id } }));
  }, [config.id]);

  const accentStyle = project.accentColor ? { '--cs-accent': project.accentColor } : undefined;

  if (view === 'workshop' && config.workshop) {
    return (
      <article ref={rootRef} className="cs cs--workshop" data-project={config.id} style={accentStyle}>
        <Workshop
          projectId={config.id}
          title={hero.title || project.title}
          zones={config.workshop.zones || []}
          onExit={exitWorkshop}
          nextProject={nextProject}
          onNavigateNext={() => {
            setView('exhibition');
            requestAnimationFrame(() => {
              document.querySelector('.cs-next')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
          }}
        />
      </article>
    );
  }

  return (
    <article ref={rootRef} className="cs" data-project={config.id} style={accentStyle}>
      <Hero
        index={hero.index}
        category={hero.category || project.category}
        title={hero.title || project.title}
        tagline={hero.subtitle || project.tagline}
        meta={meta}
        media={hero.media}
        actions={hero.actions || []}
      />

      <SectionNavigation
        sections={sections.map(({ id, label, index }) => ({ id, label, index }))}
        activeId={activeId}
        progress={progress}
        title={hero.title || project.title}
      />

      <div className="cs-chapters">
        {sections.map((section) => (
          <CaseSection
            key={section.id}
            id={section.id}
            index={section.index}
            label={section.label}
            title={section.title}
            intro={section.intro}
            tone={section.tone}
          >
            {(section.blocks || []).map((block, i) => (
              <BlockRenderer key={`${section.id}-${i}`} block={block} />
            ))}
          </CaseSection>
        ))}
      </div>

      {/* 01: Compact Rabbit Hole — Entrance to Original Deep Dive */}
      {config.workshop && (
        <RabbitHole
          projectId={config.id}
          workshop={config.workshop}
          onEnter={enterWorkshop}
        />
      )}

      {/* 02: Behind the Design — Architectural Double Door to 3D Garage */}
      <BackDoor
        projectId={config.id}
        projectTitle={hero.title || project.title}
      />

      {nextProject && <NextProject project={nextProject} onNavigate={onNavigateProject} />}
    </article>
  );
}
