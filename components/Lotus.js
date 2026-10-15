'use client';

import { useEffect, useRef } from 'react';

// A lotus seen from above at an angle, slowly turning and breathing open.
// Each petal's 3D pose is computed here and drawn with a flat 2D matrix plus
// an explicit stacking order, so it looks 3D but never relies on the GPU's
// 3D sorting (which makes crossing petals flicker on phones). Same on all devices.
const LAYERS = [
  { n: 14, tilt: 12, w: 70, h: 150, cls: 'outer', off: 0 },
  { n: 12, tilt: 34, w: 62, h: 124, cls: 'mid', off: 15 },
  { n: 9, tilt: 58, w: 50, h: 88, cls: 'inner', off: 0 },
];
const VIEW = 66; // degrees the flower is tipped towards the viewer
const TURN_SECONDS = 60;
const BREATH_SECONDS = 8.6;
const RAD = Math.PI / 180;

const PETALS = LAYERS.flatMap((L) =>
  Array.from({ length: L.n }, (_, i) => ({ ...L, rot: (i * 360) / L.n + L.off })),
);

// rotateX(VIEW) · rotateZ(rot) · rotateX(-tilt), projected straight onto the screen.
function pose(rot, tilt, h) {
  const v = VIEW * RAD;
  const r = rot * RAD;
  const t = -tilt * RAD;
  const cv = Math.cos(v), sv = Math.sin(v), cr = Math.cos(r), sr = Math.sin(r), ct = Math.cos(t), st = Math.sin(t);
  // first two columns of rotateZ(r)·rotateX(t)
  const m00 = cr, m01 = -sr * ct, m10 = sr, m11 = cr * ct, m21 = st;
  // then rotateX(v)
  const a = m00, c = m01;
  const b = cv * m10, d = cv * m11 - sv * m21;
  const z = sv * m11 + cv * m21; // depth of the petal's length axis (towards viewer is +)
  const depth = z * (-h / 2); // the petal's middle sits h/2 along that axis
  return {
    transform: `matrix(${a.toFixed(4)}, ${b.toFixed(4)}, ${c.toFixed(4)}, ${d.toFixed(4)}, 0, 0)`,
    zIndex: 1000 + Math.round(depth),
  };
}

const openAt = (t) => 2 + 8 * Math.sin((t / BREATH_SECONDS) * 2 * Math.PI);

export default function Lotus({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...root.querySelectorAll('.petal')];
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const tick = (now) => {
      frame = 0;
      if (!visible) return;
      const t = (now - start) / 1000;
      const spin = (t / TURN_SECONDS) * 360;
      const open = openAt(t);
      els.forEach((el, i) => {
        const p = PETALS[i];
        const s = pose(p.rot + spin, p.tilt + open, p.h);
        el.style.transform = s.transform;
        el.style.zIndex = s.zIndex;
      });
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(root.parentElement || root); // the lotus anchor itself has no size
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); io.disconnect(); };
  }, []);

  return (
    <div className={`lotus ${className}`} ref={ref}>
      <span className="lotus-aura" />
      {PETALS.map((p, i) => {
        const s = pose(p.rot, p.tilt + openAt(0), p.h);
        return (
          <span key={i} className={`petal petal-${p.cls}`}
            style={{ '--w': p.w, '--h': p.h, '--i': i, transform: s.transform, zIndex: s.zIndex }} />
        );
      })}
      <span className="lotus-core" />
    </div>
  );
}
