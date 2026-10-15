import { useState, useRef } from 'react';
import Reveal from './Reveal.jsx';

/**
 * BackDoor — Architectural double-door entrance from project case study to 3D Garage.
 *
 * Props:
 *   projectId: 'bharat-mobility' | 'ebs-tech'
 *   projectTitle: string
 */
export default function BackDoor({ projectId, projectTitle = 'the project' }) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  // Focus target in the 3D Garage: Bay 0 for Bharat Mobility, Bay 1 for EBS Guardian
  const bayIndex = projectId === 'bharat-mobility' ? 0 : 1;

  const handleOpenDoor = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 850ms controlled architectural opening sequence before transition
    timerRef.current = setTimeout(() => {
      if (window.router && typeof window.router.navigate === 'function') {
        window.router.navigate('/#immersive-garage', { targetBay: bayIndex });
      } else {
        const garage = document.getElementById('immersive-garage');
        if (garage) {
          garage.scrollIntoView({ behavior: 'smooth' });
        }
        if (typeof window.walkToStudioBay === 'function') {
          setTimeout(() => window.walkToStudioBay(bayIndex), 500);
        }
      }
    }, 850);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenDoor();
    }
  };

  return (
    <section className="cs-backdoor" aria-label="Behind the Design - Garage Entrance" data-project={projectId}>
      <Reveal className="cs-backdoor__inner">
        <div className="cs-backdoor__header">
          <span className="cs-backdoor__kicker">BEHIND THE DESIGN</span>
          <h3 className="cs-backdoor__title">Explore the project inside the Garage.</h3>
        </div>

        <div
          role="button"
          tabIndex={0}
          className={`cs-backdoor__portal ${isOpen ? 'is-open' : ''}`}
          onClick={handleOpenDoor}
          onKeyDown={handleKeyDown}
          aria-label={`Open the architectural double door to enter the 3D Garage for ${projectTitle}`}
          aria-expanded={isOpen}
        >
          {/* Symmetrical Architectural Portal Frame */}
          <div className="cs-backdoor__frame">
            {/* Restrained warm studio daylight spilling from behind */}
            <div className="cs-backdoor__interior" aria-hidden="true">
              <div className="cs-backdoor__glow" />
              <div className="cs-backdoor__sunbeam" />
            </div>

            {/* Left Door Panel */}
            <div className="cs-backdoor__panel cs-backdoor__panel--left" aria-hidden="true">
              <div className="cs-backdoor__panel-face">
                <span className="cs-backdoor__handle cs-backdoor__handle--left" />
              </div>
            </div>

            {/* Right Door Panel */}
            <div className="cs-backdoor__panel cs-backdoor__panel--right" aria-hidden="true">
              <div className="cs-backdoor__panel-face">
                <span className="cs-backdoor__handle cs-backdoor__handle--right" />
              </div>
            </div>

            {/* Central Seam & Light Leak */}
            <div className="cs-backdoor__seam" aria-hidden="true" />
          </div>

          {/* Action Trigger */}
          <div className="cs-backdoor__action">
            <span className="cs-backdoor__action-text">
              {isOpen ? 'ENTERING GARAGE…' : 'ENTER GARAGE'}
            </span>
            <span className="cs-backdoor__action-arrow" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
