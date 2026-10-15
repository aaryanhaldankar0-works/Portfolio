import Reveal from './Reveal.jsx';

/**
 * DesignQuestion — opens each exhibition chapter with a focused inquiry.
 * Props:
 *  index   chapter number (e.g. "01")
 *  question the guiding design question
 *  context optional brief framing context
 */
export default function DesignQuestion({ index, question, context }) {
  return (
    <Reveal className="cs-question-card">
      <div className="cs-question-card__header">
        <span className="cs-badge cs-badge--mono">
          DESIGN QUESTION {index ? `· ${index}` : ''}
        </span>
        <span className="cs-question-card__indicator" aria-hidden="true">
          <span className="cs-question-card__pulse" />
          ACTIVE INQUIRY
        </span>
      </div>
      <h4 className="cs-question-card__title">{question}</h4>
      {context && <p className="cs-question-card__context">{context}</p>}
    </Reveal>
  );
}
