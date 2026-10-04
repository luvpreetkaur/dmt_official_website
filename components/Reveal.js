'use client';

import { useEffect, useRef } from 'react';

// Fades/slides in every descendant with class "reveal" as it scrolls into view.
// Without JS (or with reduced motion) everything simply stays visible.
export default function Reveal({ className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('reveal-ready');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
