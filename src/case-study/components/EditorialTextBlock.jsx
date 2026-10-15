import Reveal from './Reveal.jsx';
import TextSlot from './TextSlot.jsx';

/**
 * EditorialTextBlock — long-form editorial copy.
 * Props:
 *  eyebrow   small mono kicker
 *  heading   display heading
 *  body      string | string[] (paragraphs)
 *  columns   1 | 2   (two-column reading layout on wide screens)
 *  align     'left' | 'center' | 'offset' (offset = indented editorial measure)
 *  slotLines skeleton line count used while body is empty
 */
export default function EditorialTextBlock({
  eyebrow,
  heading,
  body,
  columns = 1,
  align = 'left',
  slotLines = 5,
  showHeadingSlot = true,
  className = '',
}) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <Reveal className={`cs-editorial cs-editorial--${align} cs-editorial--cols-${columns}${className ? ` ${className}` : ''}`}>
      {eyebrow && <span className="cs-eyebrow">{eyebrow}</span>}

      {heading ? (
        <h3 className="cs-editorial__heading">{heading}</h3>
      ) : (
        showHeadingSlot && <TextSlot lines={1} size="heading" className="cs-editorial__heading-slot" />
      )}

      <div className="cs-editorial__body">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        ) : columns === 2 ? (
          <>
            <TextSlot lines={slotLines} />
            <TextSlot lines={slotLines} />
          </>
        ) : (
          <TextSlot lines={slotLines} label="Editorial copy" />
        )}
      </div>
    </Reveal>
  );
}
