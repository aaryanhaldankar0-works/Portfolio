import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import FieldNotebook from './FieldNotebook.jsx';
import Sketchbook from './Sketchbook.jsx';
import EngineeringTable from './EngineeringTable.jsx';
import WorkflowRoom from './WorkflowRoom.jsx';
import PrototypeRoom from './PrototypeRoom.jsx';

/** Zone rooms that have been built. Zones without one stay as stations only. */
const ZONE_ROOMS = {
  notebook: FieldNotebook,
  sketchbook: Sketchbook,
  table: EngineeringTable,
  workflow: WorkflowRoom,
  prototype: PrototypeRoom,
};

/**
 * Workshop — the project's studio space, entered from the Exhibition threshold.
 *
 * Not a page and not a menu: a walk across a studio floor. Each zone is a
 * physical station (an object on a surface) joined by a taped floor line.
 * Zones carry only their architecture for now — content arrives later.
 *
 * Props:
 *  projectId   owning project
 *  title       project title (studio door plaque)
 *  zones       [{ id, name, object, note }]
 *              object: 'notebook' | 'sketchbook' | 'table' | 'workflow' | 'prototype'
 *  onExit      return to the Exhibition
 */

function StationObject({ object }) {
  switch (object) {
    case 'notebook':
      return (
        <div className="ws-obj ws-obj--notebook" aria-hidden="true">
          <span className="ws-notebook__spiral" />
          <span className="ws-notebook__page">
            <i /><i /><i /><i /><i />
          </span>
          <span className="ws-notebook__pencil" />
        </div>
      );
    case 'sketchbook':
      return (
        <div className="ws-obj ws-obj--sketchbook" aria-hidden="true">
          <span className="ws-sheet ws-sheet--3" />
          <span className="ws-sheet ws-sheet--2" />
          <span className="ws-sheet ws-sheet--1">
            <svg viewBox="0 0 200 120" preserveAspectRatio="none">
              <path d="M14 92 C 40 88, 52 52, 92 46 S 160 40, 186 70" />
              <path d="M18 96 L 186 96" />
              <circle cx="56" cy="96" r="13" />
              <circle cx="150" cy="96" r="13" />
            </svg>
          </span>
        </div>
      );
    case 'table':
      return (
        <div className="ws-obj ws-obj--table" aria-hidden="true">
          <span className="ws-table__sheet" />
          <span className="ws-table__ruler" />
          <span className="ws-table__square" />
        </div>
      );
    case 'workflow':
      return (
        <div className="ws-obj ws-obj--workflow" aria-hidden="true">
          <span className="ws-pin ws-pin--1" />
          <span className="ws-pin ws-pin--2" />
          <span className="ws-pin ws-pin--3" />
          <span className="ws-pin ws-pin--4" />
          <svg className="ws-workflow__string" viewBox="0 0 200 140" preserveAspectRatio="none">
            <path d="M34 34 L 104 58 L 62 104 L 166 96" />
          </svg>
        </div>
      );
    case 'prototype':
      return (
        <div className="ws-obj ws-obj--prototype" aria-hidden="true">
          <span className="ws-proto__cover" />
          <span className="ws-proto__plinth" />
          <span className="ws-proto__shadow" />
        </div>
      );
    default:
      return null;
  }
}

export default function Workshop({ projectId, title, zones = [], onExit, nextProject, onNavigateNext }) {
  const rootRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
  }, []);

  const goTo = (id) => {
    setOpenId(id);
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }));
  };

  const backToFloor = () => {
    const from = openId;
    setOpenId(null);
    requestAnimationFrame(() =>
      document.getElementById(`ws-${projectId}-${from}`)?.scrollIntoView({ behavior: 'auto', block: 'center' })
    );
  };

  const openIndex = zones.findIndex((z) => z.id === openId);
  const openZone = zones[openIndex];
  const Room = openZone && ZONE_ROOMS[openZone.object];

  if (openZone && Room) {
    return (
      <section ref={rootRef} className={`ws ws--room ws--${openZone.object}`} data-project={projectId} tabIndex={-1}>
        <span className="ws-lamp" aria-hidden="true" />
        <header className="ws-room__head">
          <button type="button" className="ws-exit__door" onClick={backToFloor}>
            <span aria-hidden="true">←</span> Studio floor
          </button>
          <span className="ws-tape">Zone {String(openIndex + 1).padStart(2, '0')}</span>
          <h2 className="ws-entry__title">{openZone.name}</h2>
        </header>
        <Room {...(openZone.content || {})} />
        <footer className="ws-exit">
          <button type="button" className="ws-exit__door" onClick={backToFloor}>
            <span aria-hidden="true">←</span> Back to the studio floor
          </button>
        </footer>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="ws"
      data-project={projectId}
      aria-label={`${title} — Workshop`}
      tabIndex={-1}
    >
      <span className="ws-lamp" aria-hidden="true" />

      {/* Entering: the studio door plaque */}
      <header className="ws-entry">
        <Reveal className="ws-entry__inner">
          <span className="ws-tape ws-tape--plaque">Workshop · {title}</span>
          <h2 className="ws-entry__title">The studio.</h2>
          <p className="ws-entry__note">
            Nothing here is finished. This is where the pod was argued over, drawn, broken and drawn again.
          </p>
        </Reveal>
      </header>

      {/* The floor: five stations joined by a taped line */}
      <ol className="ws-floor">
        {zones.map((zone, i) => (
          <li
            key={zone.id}
            id={`ws-${projectId}-${zone.id}`}
            className={`ws-station ws-station--${i % 2 ? 'right' : 'left'}`}
          >
            <Reveal className="ws-station__inner">
              <span className="ws-station__marker" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="ws-station__surface">
                <StationObject object={zone.object} />
              </div>

              <div className="ws-station__tag">
                <span className="ws-tape">Zone {String(i + 1).padStart(2, '0')}</span>
                <h3 className="ws-station__name">
                  {ZONE_ROOMS[zone.object] && zone.content ? (
                    <button type="button" className="ws-station__open" onClick={() => goTo(zone.id)}>
                      {zone.name} <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    zone.name
                  )}
                </h3>
                {zone.note && <p className="ws-station__note">{zone.note}</p>}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Leaving: the way back out */}
      <footer className="ws-exit">
        <div className="ws-exit__options">
          <button type="button" id={`${projectId}-workshop-exit`} className="ws-exit__door" onClick={onExit}>
            <span aria-hidden="true">←</span> Back to {title ? `${title} Exhibition` : 'Project Exhibition'}
          </button>
          {nextProject && (
            <button
              type="button"
              className="ws-exit__door ws-exit__door--next"
              onClick={onNavigateNext || onExit}
              title={`Advance to ${nextProject.title || 'Next Project'}`}
            >
              Next Project: {nextProject.title || 'Emergency Communication Systems'} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </footer>
    </section>
  );
}
