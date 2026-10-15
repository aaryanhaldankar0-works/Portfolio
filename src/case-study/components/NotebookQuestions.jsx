import Reveal from './Reveal.jsx';
import Media from './Media.jsx';

/**
 * NotebookQuestions — a field journal / designer's notebook module.
 * Represents raw street-level inquiries with ruled ledger lines,
 * handwritten styling, and optional notebook sketch/photo inserts.
 *
 * Props:
 *  title       section or notebook page header (e.g. "FIELD INQUIRY LOG — DEHRADUN CORRIDOR")
 *  date        optional field timestamp
 *  questions   string[] list of commuter interview questions
 *  notes       string[] quick marginal observations
 *  media       optional notebook spread placeholder/asset
 */
export default function NotebookQuestions({
  title = 'COMMUTER INQUIRY NOTES',
  date = 'FIELD INTERVIEWS',
  questions = [],
  notes = [],
  media,
}) {
  return (
    <div className="cs-notebook">
      <Reveal className="cs-notebook__paper">
        {/* Notebook top spiral / binder metadata */}
        <div className="cs-notebook__spine" aria-hidden="true">
          <div className="cs-notebook__punches">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="cs-notebook__punch" />
            ))}
          </div>
        </div>

        <div className="cs-notebook__header">
          <div className="cs-notebook__meta">
            <span className="cs-notebook__tag">{title}</span>
            <span className="cs-notebook__date">{date}</span>
          </div>
          <span className="cs-notebook__stamp">OBSERVATION ARCHIVE</span>
        </div>

        <div className="cs-notebook__content">
          <div className="cs-notebook__left">
            <span className="cs-notebook__sub">Core Field Questions</span>
            <ol className="cs-notebook__questions">
              {questions.map((q, i) => (
                <li key={i} className="cs-notebook__item">
                  <span className="cs-notebook__num">Q{i + 1}</span>
                  <p className="cs-notebook__text">{q}</p>
                </li>
              ))}
            </ol>

            {notes.length > 0 && (
              <div className="cs-notebook__annotations">
                <span className="cs-notebook__anno-tag">Marginal Observations</span>
                {notes.map((n, i) => (
                  <p key={i} className="cs-notebook__anno-text">
                    * {n}
                  </p>
                ))}
              </div>
            )}
          </div>

          {media && (
            <div className="cs-notebook__right">
              <div className="cs-notebook__polaroid">
                <Media media={media} />
                <span className="cs-notebook__caption">Field notes & commuter interaction</span>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
