// The site's living backdrop: reflective water in true perspective with
// beat ripples and a 3D lotus blooming on it, sky lanterns rising slowly,
// drifting 3D lotus petals, twinkling stars and fireflies pulled into the
// portal.

import Lotus from './Lotus';

const TAU = Math.PI * 2;
const f = (n) => n.toFixed(1);
const RAINBOW = ['#FF3D9A', '#ff7a1a', '#FFB020', '#b6ff3b', '#29F0E0', '#7B2CFF'];
const INK = '#0c0620';

// A curl that starts at (ex, ey) and spirals inwards.
function curl(ex, ey, tangent, r0, dir, turns = 1.7) {
  const perp = tangent + (dir * Math.PI) / 2;
  const cx = ex + r0 * Math.cos(perp);
  const cy = ey + r0 * Math.sin(perp);
  const t0 = perp + Math.PI;
  let d = '';
  for (let i = 1; i <= 36; i++) {
    const t = i / 36;
    const a = t0 + dir * t * turns * TAU;
    const r = r0 * (1 - 0.82 * t);
    d += ` L${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`;
  }
  return { d, cx, cy };
}

/* ---------- reflective water with floating diyas and lily pads ---------- */
function Water() {
  return (
    <div className="water-wrap">
      <div className="water">
        {[0, 1, 2, 3].map((i) => <span key={i} className="ripple" style={{ '--k': i }} />)}
        <span className="water-shine" />
      </div>
    </div>
  );
}

const LANTERNS = Array.from({ length: 10 }, (_, i) => ({
  x: 6 + ((i * 41) % 88),
  s: 14 + (i % 4) * 7,
  d: 26 + (i % 5) * 6,
  dl: -((i * 4.7) % 30),
}));

function Lanterns() {
  return (
    <div className="lanterns">
      {LANTERNS.map((l, i) => (
        <span key={i} style={{ '--x': `${l.x}%`, '--s': `${l.s}px`, '--d': `${l.d}s`, '--dl': `${l.dl}s` }} />
      ))}
    </div>
  );
}

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 29 + 7) % 100,
  dx: ((i % 5) - 2) * 6,
  d: 11 + (i % 4) * 2.5,
  dl: -((i * 1.9) % 13),
  c: RAINBOW[i % RAINBOW.length],
}));

function Petals() {
  return (
    <div className="petals">
      {PETALS.map((p, i) => (
        <span key={i} style={{ '--x': `${p.x}%`, '--dx': `${p.dx}vw`, '--d': `${p.d}s`, '--dl': `${p.dl}s`, '--c': p.c }} />
      ))}
    </div>
  );
}

/* ---------- sky: sparkles and spirals ---------- */
const SPARKS = [
  [8, 8, 30], [22, 20, 18], [34, 6, 22], [62, 10, 20], [76, 6, 28], [90, 18, 20], [14, 44, 16], [86, 46, 18], [48, 4, 14], [70, 30, 14],
];
function Sky() {
  return (
    <div className="sc-sky">
      {SPARKS.map(([x, y, s], i) => (
        <svg key={i} className={i % 3 === 2 ? 'sc-spiral' : 'sc-star'} viewBox="0 0 100 100"
          style={{ left: `${x}%`, top: `${y}%`, width: s * 1.6, height: s * 1.6, '--k': i }}>
          {i % 3 === 2 ? (
            <path d={`M50 50${curl(50, 14, 0, 18, 1, 2.2).d}`} fill="none" stroke={RAINBOW[i % RAINBOW.length]} strokeWidth="9" strokeLinecap="round" />
          ) : (
            <path d="M50 2C55 38 62 45 98 50C62 55 55 62 50 98C45 62 38 55 2 50C38 45 45 38 50 2Z"
              fill={i % 2 ? '#FFB020' : '#fff7d6'} stroke={INK} strokeWidth="6" />
          )}
        </svg>
      ))}
    </div>
  );
}

const FIREFLIES = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  d: 7 + (i % 5) * 1.6,
  dl: -((i * 1.3) % 9),
  s: 5 + (i % 4) * 2,
  c: RAINBOW[i % RAINBOW.length],
}));

// portal: fireflies get pulled into the centre (homepage, Our Story);
// without it they simply rise (events page, where the flyer is the centre).
export default function Scene({ portal = true }) {
  return (
    <div className={`sc${portal ? ' sc-portal' : ''}`} aria-hidden="true">
      <Sky />
      <Lanterns />
      <Water />
      {portal && <Lotus className="lotus-water" />}
      <Petals />
      <div className="sc-flies">
        {FIREFLIES.map((p, i) => (
          <span key={i} style={{ '--x': `${p.x}%`, '--d': `${p.d}s`, '--dl': `${p.dl}s`, '--s': `${p.s}px`, '--c': p.c }} />
        ))}
      </div>
    </div>
  );
}
