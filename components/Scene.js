// The site's living backdrop, drawn in the spirit of the Glow With The Flow
// flyer and trippy pop paintings: outlined rainbow smoke with all-seeing eyes
// (pupils follow the mouse), a divine 3D lotus breathing open on a perspective
// water surface with beat ripples, drifting 3D petals, twinkling stars and
// fireflies pulled into the portal. Colours follow the page palette.

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

/* ---------- all-seeing eye ---------- */
function Eye({ x, y, r, k = 0 }) {
  const w = r * 1.9;
  const lid = `M${f(x - w)} ${f(y)}Q${f(x)} ${f(y - r * 1.5)} ${f(x + w)} ${f(y)}Q${f(x)} ${f(y + r * 1.5)} ${f(x - w)} ${f(y)}Z`;
  return (
    <g className="sc-eye" style={{ '--k': k }}>
      {[-0.7, -0.35, 0, 0.35, 0.7].map((a, i) => (
        <line key={i} x1={f(x + Math.sin(a) * w * 0.7)} y1={f(y - r * 0.72)} x2={f(x + Math.sin(a) * w * 1.05)} y2={f(y - r * 1.35)}
          stroke={INK} strokeWidth={r * 0.16} strokeLinecap="round" />
      ))}
      <path d={lid} fill="#fff7d6" stroke={INK} strokeWidth={r * 0.18} />
      <g className="sc-pupil">
        {RAINBOW.slice(0, 4).map((c, i) => <circle key={c} cx={x} cy={y} r={r * (0.78 - i * 0.14)} fill={c} />)}
        <circle cx={x} cy={y} r={r * 0.24} fill={INK} />
        <circle cx={x - r * 0.18} cy={y - r * 0.2} r={r * 0.1} fill="#fff" />
      </g>
    </g>
  );
}

/* ---------- rainbow smoke with eyes ---------- */
function cloud(cx, cy, rx, ry, bumps, phase) {
  let d = '';
  for (let i = 0; i <= 160; i++) {
    const a = (i / 160) * TAU;
    const k = 1 + 0.13 * Math.abs(Math.sin((bumps * (a + phase)) / 2));
    d += `${i ? 'L' : 'M'}${f(cx + rx * k * Math.cos(a))} ${f(cy + ry * k * Math.sin(a))}`;
  }
  return `${d}Z`;
}

function Smoke({ side }) {
  return (
    <svg className={`sc-smoke sc-smoke-${side}`} viewBox="-20 -20 440 340" aria-hidden="true">
      {RAINBOW.map((c, i) => {
        const s = 1 - i * 0.145;
        return (
          <path key={c} className="sc-puff" style={{ '--k': i }} fill={c} stroke={INK} strokeWidth="4" strokeLinejoin="round"
            d={cloud(200 + i * 6, 150 - i * 4, 180 * s, 120 * s, 9 - (i % 3), i * 0.6)} />
        );
      })}
      <Eye x={205} y={142} r={20} k={2} />
    </svg>
  );
}

/* ---------- divine 3D lotus on a perspective water surface ---------- */
const LAYERS = [
  { n: 14, tilt: 12, w: 70, h: 150, cls: 'outer', off: 0 },
  { n: 12, tilt: 34, w: 62, h: 124, cls: 'mid', off: 15 },
  { n: 9, tilt: 58, w: 50, h: 88, cls: 'inner', off: 0 },
];

function Lotus() {
  return (
    <div className="lotus">
      <div className="lotus-stage">
        {LAYERS.flatMap((L) =>
          Array.from({ length: L.n }, (_, i) => (
            <span key={`${L.cls}${i}`} className={`petal petal-${L.cls}`}
              style={{ '--rot': `${(i * 360) / L.n + L.off}deg`, '--tilt': `${L.tilt}deg`, '--w': L.w, '--h': L.h }} />
          )),
        )}
        <span className="lotus-core" />
      </div>
    </div>
  );
}

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
// lotus: the 3D lotus blooming on the water (left out where the flyer sits).
export default function Scene({ portal = true, lotus = true }) {
  return (
    <div className={`sc${portal ? ' sc-portal' : ''}`} aria-hidden="true">
      <Sky />
      <Smoke side="l" />
      <Smoke side="r" />
      <Water />
      {lotus && <Lotus />}
      <Petals />
      <div className="sc-flies">
        {FIREFLIES.map((p, i) => (
          <span key={i} style={{ '--x': `${p.x}%`, '--d': `${p.d}s`, '--dl': `${p.dl}s`, '--s': `${p.s}px`, '--c': p.c }} />
        ))}
      </div>
    </div>
  );
}
