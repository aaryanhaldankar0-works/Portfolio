import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — toggles `isRevealed` once the element scrolls into view.
 * Used by every case study component for the shared entrance motion.
 * Honours `prefers-reduced-motion` by revealing immediately.
 */
export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isRevealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isRevealed];
}
