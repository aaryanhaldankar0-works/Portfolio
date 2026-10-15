import { useEffect, useState } from 'react';

/**
 * useActiveSection — scroll-spy for the case study.
 * Returns the id of the section currently crossing the reading line
 * and the overall reading progress (0–1) through the container.
 */
export default function useActiveSection(ids, containerRef) {
  const [activeId, setActiveId] = useState(null);
  const [progress, setProgress] = useState(0);
  const key = ids.join('|');

  // Active section (reading line ≈ 40% from the top of the viewport)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Reading progress through the project sections
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Prefer measuring the project chapters (.cs-chapters)
      const chaptersEl = document.querySelector('.cs-chapters');
      if (chaptersEl) {
        const rect = chaptersEl.getBoundingClientRect();
        const navOffset = 104; // 52px top bar + 52px sticky nav
        const scrolled = navOffset - rect.top;
        const total = rect.height - (window.innerHeight - navOffset);
        if (scrolled <= 0) {
          setProgress(0);
        } else if (total > 0) {
          setProgress(Math.min(Math.max(scrolled / total, 0), 1));
        } else {
          setProgress(scrolled > 0 ? 1 : 0);
        }
        return;
      }

      // Fallback: full container measurement
      const el = containerRef?.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      setProgress(value);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return { activeId, progress };
}
