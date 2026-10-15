import Reveal from './Reveal.jsx';
import TextSlot from './TextSlot.jsx';

/**
 * QuoteBlock — pull-quote or field interview excerpt.
 * Props: quote, source, role
 */
export default function QuoteBlock({ quote, source, role }) {
  return (
    <Reveal as="blockquote" className="cs-quote">
      <span className="cs-quote__mark" aria-hidden="true">“</span>
      <div className="cs-quote__body">
        {quote ? <p className="cs-quote__text">{quote}</p> : <TextSlot lines={3} size="quote" label="Quote" />}
        <footer className="cs-quote__footer">
          <span className="cs-quote__rule" aria-hidden="true" />
          {source ? (
            <cite className="cs-quote__source">
              {source}
              {role && <span className="cs-quote__role">{role}</span>}
            </cite>
          ) : (
            <span className="cs-quote__source cs-quote__source--pending">Source pending</span>
          )}
        </footer>
      </div>
    </Reveal>
  );
}
