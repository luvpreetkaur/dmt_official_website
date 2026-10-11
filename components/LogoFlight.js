'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// The D.M.T. logo travels between the homepage centre and the nav corner.
// Leaving Home: the centre logo flies up into the corner spot, then the page
// changes underneath it. Arriving Home from another page (links or the back
// button): the logo flies from the corner down into the centre.
const FLIGHT_MS = 700;
const PREV_KEY = 'dmt-prev-path';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const inView = (r) => r.bottom > 0 && r.top < innerHeight;

function flyer(from, rect) {
  const el = from.cloneNode(true);
  el.classList.remove('logo3d-lg', 'logo3d-sm');
  el.classList.add('logo-flyer');
  el.style.cssText = `--sz:${rect.width}px; left:${rect.left}px; top:${rect.top}px;`;
  document.body.appendChild(el);
  return el;
}

function fadeAway(el) {
  el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, delay: 60, fill: 'forwards' });
  setTimeout(() => el.remove(), 600); // also covers paused (background) tabs
}

export default function LogoFlight({ home }) {
  const router = useRouter();

  // remember where we came from, and land the logo when arriving Home
  useEffect(() => {
    let prev = null;
    try {
      prev = sessionStorage.getItem(PREV_KEY);
      sessionStorage.setItem(PREV_KEY, location.pathname);
    } catch {}
    if (!home || !prev || prev === '/' || reduced()) return undefined;

    const corner = document.querySelector('.nav-home .logo3d');
    const centre = document.querySelector('.hh-logo .logo3d');
    if (!corner || !centre) return undefined;
    const c = corner.getBoundingClientRect();
    const h = centre.getBoundingClientRect();
    if (!inView(h)) return undefined;

    const root = document.documentElement;
    root.classList.add('logo-landing');
    // full-size copy at the centre, starting shrunk over the corner spot
    const el = flyer(centre, h);
    const dx = c.left + c.width / 2 - (h.left + h.width / 2);
    const dy = c.top + c.height / 2 - (h.top + h.height / 2);
    const s = c.width / h.width;
    let done = false;
    const land = () => {
      if (done) return;
      done = true;
      root.classList.remove('logo-landing');
      root.classList.add('logo-landed');
      setTimeout(() => root.classList.remove('logo-landed'), 600);
      fadeAway(el);
    };
    const anim = el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(360deg)` },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.65}px) scale(${(1 + s) / 1.6}) rotate(160deg)`, offset: 0.45 },
        { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
      ],
      { duration: FLIGHT_MS, easing: 'cubic-bezier(.55, 0, .2, 1)', fill: 'forwards' },
    );
    anim.onfinish = land;
    const t = setTimeout(land, FLIGHT_MS + 150);
    return () => { clearTimeout(t); land(); };
  }, [home]);

  // leaving Home: centre logo flies into the corner
  useEffect(() => {
    if (!home) return undefined;
    let clone = null;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === '/') return;
      if (reduced()) return;

      const from = document.querySelector('.hh-logo .logo3d');
      const to = document.querySelector('.nav-home .logo3d');
      if (!from || !to) return;
      const f = from.getBoundingClientRect();
      const t = to.getBoundingClientRect();
      if (!inView(f)) return;

      e.preventDefault();
      e.stopPropagation();
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);

      clone = flyer(from, f);
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
      if (clone) fadeAway(clone); // the next page's corner logo is in place underneath
    };
  }, [home, router]);

  return null;
}
