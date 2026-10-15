import Reveal from './Reveal.jsx';
import TextSlot from './TextSlot.jsx';

/**
 * LargeStatement — a single oversized editorial line that sets the tone of a chapter.
 * Props: text, emphasis (substring rendered in accent), note (small mono footnote)
 */
export default function LargeStatement({ text, emphasis, note, align = 'left' }) {
  let content = text;
  if (text && emphasis && text.includes(emphasis)) {
    const [before, after] = text.split(emphasis);
    content = (
      <>
        {before}
        <em className="cs-accent">{emphasis}</em>
        {after}
      </>
    );
  }

  return (
    <Reveal className={`cs-statement cs-statement--${align}`}>
      {text ? (
        <p className="cs-statement__text">{content}</p>
      ) : (
        <TextSlot lines={2} size="statement" label="Statement" />
      )}
      {note && <span className="cs-statement__note">{note}</span>}
    </Reveal>
  );
}
