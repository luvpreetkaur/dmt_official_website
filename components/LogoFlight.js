'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Homepage only: when a link to another page is clicked, the big centre logo
// flies up to the top-left nav spot (where the next page's logo sits), then
// the page changes underneath it and the flying copy fades away.
const FLIGHT_MS = 700;

export default function LogoFlight() {
  const router = useRouter();

  useEffect(() => {
    let clone = null;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === '/') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const from = document.querySelector('.hh-logo .logo3d');
      const to = document.querySelector('.nav-home .logo3d');
      if (!from || !to) return;
      const f = from.getBoundingClientRect();
      const t = to.getBoundingClientRect();
      if (f.bottom < 0 || f.top > innerHeight) return; // centre logo scrolled away

      e.preventDefault();
      e.stopPropagation();
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);

      // flying copy of the logo, starting exactly over the centre one
      clone = from.cloneNode(true);
      clone.classList.remove('logo3d-lg');
      clone.classList.add('logo-flyer');
      clone.style.cssText = `--sz:${f.width}px; left:${f.left}px; top:${f.top}px;`;
      document.body.appendChild(clone);
      document.documentElement.classList.add('logo-flying');

      const dx = t.left + t.width / 2 - (f.left + f.width / 2);
      const dy = t.top + t.height / 2 - (f.top + f.height / 2);
      const s = t.width / f.width;
      const flight = clone.animate(
        [
          { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          { transform: `translate(${dx * 0.55}px, ${dy * 0.35}px) scale(${(1 + s) / 1.6}) rotate(-200deg)`, offset: 0.55 },
          { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(-360deg)` },
        ],
        { duration: FLIGHT_MS, easing: 'cubic-bezier(.55, 0, .2, 1)', fill: 'forwards' },
      );
      let gone = false;
      const go = () => { if (!gone) { gone = true; router.push(href); } };
      flight.onfinish = go;
      setTimeout(go, FLIGHT_MS + 150); // backgrounded tabs pause animations
    };

    window.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('click', onClick, true);
      document.documentElement.classList.remove('logo-flying');
      // the new page (and its nav logo) is in place: let the copy melt into it
      if (clone) {
        const c = clone;
        c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, delay: 60, fill: 'forwards' }).onfinish = () => c.remove();
        setTimeout(() => c.remove(), 600);
      }
    };
  }, [router]);

  return null;
}
