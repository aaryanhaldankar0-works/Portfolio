import useReveal from '../hooks/useReveal.js';

/**
 * Reveal — shared entrance-motion wrapper.
 * Any element can be wrapped to fade/slide in on scroll.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, isRevealed] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`cs-reveal${isRevealed ? ' is-revealed' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { '--cs-reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
