// A pop-psychedelic landscape in the spirit of the Glow With The Flow flyer and
// classic trippy paintings: bold dark outlines, echoing rainbow bands, melting
// striped hills that flow, rainbow trees of life with spiral branches,
// rainbow smoke and all-seeing eyes whose pupils follow the mouse.
// Colours follow the page palette (--a/--b/--c) and glows share the beat.

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

/* ---------- rainbow tree of life ---------- */
const TRUNK = 'M150 905 C162 800 108 700 150 600 C188 512 140 430 176 350 C202 290 180 232 206 178';
const BRANCHES = [
  [150, 600, 86, 584, 58, 500, 26, -1, 15],
  [158, 566, 238, 566, 304, 470, 30, 1, 15],
  [166, 424, 92, 420, 60, 330, 23, -1, 12],
  [176, 362, 268, 372, 334, 296, 27, 1, 12],
  [194, 252, 132, 244, 108, 150, 20, -1, 10],
  [200, 222, 290, 232, 322, 128, 24, 1, 10],
  [206, 182, 240, 140, 232, 58, 17, 1, 8],
];

function Tree({ side }) {
  const branches = BRANCHES.map(([sx, sy, qx, qy, ex, ey, r0, dir, w]) => {
    const c = curl(ex, ey, Math.atan2(ey - qy, ex - qx), r0, dir);
    return { d: `M${sx} ${sy} Q${qx} ${qy} ${ex} ${ey}${c.d}`, w, cx: c.cx, cy: c.cy, r0 };
  });
  const strokes = (extra) => (
    <>
      <path d={TRUNK} strokeWidth={34 + extra} />
      <path d="M150 905 C130 880 100 884 76 902 M150 905 C172 878 206 880 230 902" strokeWidth={14 + extra} />
      {branches.map((b, i) => <path key={i} d={b.d} strokeWidth={b.w + extra} />)}
    </>
  );
  const leaves = branches.flatMap((b, i) =>
    [0, 1, 2, 3, 4, 5].map((k) => {
      const a = (k / 6) * TAU + i * 0.7;
      const r = b.r0 * 1.55 + (k % 2) * 10;
      return { x: b.cx + r * Math.cos(a), y: b.cy + r * Math.sin(a), s: 7 + ((i + k) % 3) * 3, c: RAINBOW[(i + k) % RAINBOW.length], k: i * 6 + k };
    }),
  );
  return (
    <div className={`sc-tree sc-tree-${side}`}>
      <svg className="sc-tree-glow" viewBox="0 0 420 920" preserveAspectRatio="xMidYMax meet">
        <g className="sc-glow-g" fill="none" strokeLinecap="round">{strokes(26)}</g>
      </svg>
      <svg className="sc-tree-body" viewBox="0 0 420 920" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id={`sc-bark-${side}`} x1="0" y1="1" x2="0" y2="0">
            {RAINBOW.map((c, i) => <stop key={c} offset={i / (RAINBOW.length - 1)} stopColor={RAINBOW[RAINBOW.length - 1 - i]} />)}
          </linearGradient>
        </defs>
        {/* echo outlines, dark ink line, then the rainbow wood */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="sc-echo">{strokes(18)}</g>
          <g stroke={INK}>{strokes(8)}</g>
          <g stroke={`url(#sc-bark-${side})`}>{strokes(0)}</g>
          <g stroke="#fff" strokeOpacity=".45" strokeWidth="2.5" transform="translate(-4 -3)">
            {branches.map((b, i) => <path key={i} d={b.d} />)}
          </g>
        </g>
        <Eye x={152} y={700} r={13} k={0} />
        <Eye x={178} y={470} r={10} k={1} />
        {leaves.map((p) => (
          <circle key={p.k} className="sc-leaf" cx={f(p.x)} cy={f(p.y)} r={p.s} fill={p.c} stroke={INK} strokeWidth="3" style={{ '--k': p.k }} />
        ))}
      </svg>
    </div>
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

/* ---------- melting rainbow hills that flow ---------- */
// Each band is a wave twice the screen width that slides sideways forever.
function wave(base, amp, period, phase, amp2) {
  let d = '';
  for (let x = 0; x <= 3200; x += 20) {
    const y = base + amp * Math.sin((TAU * x) / period + phase) + amp2 * Math.sin((TAU * x) / 800 + phase * 2);
    d += `${x ? 'L' : 'M'}${x} ${f(y)}`;
  }
  return d;
}
const BANDS = [
  { c: '#7B2CFF', base: 70, amp: 16, period: 400, t: 46 },
  { c: '#29F0E0', base: 120, amp: 18, period: 320, t: 38 },
  { c: '#b6ff3b', base: 170, amp: 14, period: 400, t: 32 },
  { c: '#FFB020', base: 220, amp: 18, period: 320, t: 28 },
  { c: '#ff7a1a', base: 268, amp: 15, period: 400, t: 24 },
  { c: '#FF3D9A', base: 316, amp: 17, period: 320, t: 20 },
];

function Hills() {
  return (
    <div className="sc-hills">
      {BANDS.map((b, i) => {
        const line = wave(b.base, b.amp, b.period, i * 1.3, 6);
        return (
          <svg key={b.c} className="sc-band" viewBox="0 0 3200 400" preserveAspectRatio="none"
            style={{ '--t': `${b.t}s`, '--dir': i % 2 ? 'reverse' : 'normal' }}>
            <path d={`${line}V400H0Z`} fill={b.c} />
            <path d={line} fill="none" stroke={INK} strokeWidth="5" vectorEffect="non-scaling-stroke" />
            <path d={line} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" vectorEffect="non-scaling-stroke" transform="translate(0 7)" />
          </svg>
        );
      })}
      <div className="sc-hills-fade" />
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

const FIREFLIES = Array.from({ length: 18 }, (_, i) => ({
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
      <Smoke side="l" />
      <Smoke side="r" />
      <Hills />
      <Tree side="l" />
      <Tree side="r" />
      <div className="sc-flies">
        {FIREFLIES.map((p, i) => (
          <span key={i} style={{ '--x': `${p.x}%`, '--d': `${p.d}s`, '--dl': `${p.dl}s`, '--s': `${p.s}px`, '--c': p.c }} />
        ))}
      </div>
    </div>
  );
}
