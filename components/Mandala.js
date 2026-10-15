// Pure SVG, no client JS. Layers counter-rotate via CSS (see globals.css).
// neon: streaks of light race along the petal outlines, each ring lit in turn
// so the glow chases round the pattern.
const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn((i * 360) / n, i));

const OUTER = 'M0 -351 C 20 -351, 20 -479, 0 -479 C -20 -479, -20 -351, 0 -351 Z';
const MID = 'M0 -190 C 62 -270, 62 -345, 0 -385 C -62 -345, -62 -270, 0 -190 Z';
const INNER = 'M0 -70 C 95 -150, 95 -240, 0 -310 C -95 -240, -95 -150, 0 -70 Z';
const SEED = 'M0 0 A 78 78 0 1 1 0 -156 A 78 78 0 1 1 0 0 Z';

// one ring of glowing streaks; delays step round the ring so the light flows
function Neon({ n, d, color, dur, rev = false, width = 5 }) {
  return (
    <g className="m-neon" stroke="currentColor" style={{ color }} strokeWidth={width} fill="none" strokeLinecap="round">
      {ring(n, (a, i) => (
        <path key={i} d={d} pathLength="100" transform={`rotate(${a})`}
          className={rev ? 'm-neon-rev' : undefined}
          style={{ '--nd': `${dur}s`, '--dl': `${(-(i / n) * dur * 2).toFixed(2)}s` }} />
      ))}
    </g>
  );
}

export default function Mandala({ className = '', neon = false }) {
  return (
    <svg className={`mandala ${className}`} viewBox="0 0 1000 1000" aria-hidden="true">
      <defs>
        <linearGradient id="mg-hot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF3D9A" />
          <stop offset="1" stopColor="#7B2CFF" />
        </linearGradient>
        <linearGradient id="mg-cool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#29F0E0" />
          <stop offset="1" stopColor="#7B2CFF" />
        </linearGradient>
        <radialGradient id="mg-eye">
          <stop offset="0" stopColor="#FFB020" />
          <stop offset="1" stopColor="#FF3D9A" />
        </radialGradient>
      </defs>

      <g className="m-spin-a">
        <g transform="translate(500 500)" fill="none" strokeWidth="1.6">
          <circle r="486" stroke="#29F0E0" strokeOpacity=".5" strokeDasharray="2 12" />
          {ring(36, (a, i) => (
            <ellipse key={i} cx="0" cy="-415" rx="20" ry="64" stroke="url(#mg-cool)" transform={`rotate(${a})`} />
          ))}
          {neon && <Neon n={36} d={OUTER} color="#29F0E0" dur={3.428} width={4.5} />}
        </g>
      </g>

      <g className="m-spin-b">
        <g transform="translate(500 500)" fill="none" strokeWidth="1.6">
          {ring(18, (a, i) => (
            <path key={i} d={MID} stroke="url(#mg-hot)" transform={`rotate(${a})`} />
          ))}
          <circle r="395" stroke="#FF3D9A" strokeOpacity=".35" />
          {neon && <Neon n={18} d={MID} color="#FF3D9A" dur={2.571} rev />}
        </g>
      </g>

      <g className="m-spin-c">
        <g transform="translate(500 500)" fill="#7B2CFF" fillOpacity=".07" strokeWidth="1.8" stroke="url(#mg-cool)">
          {ring(12, (a, i) => (
            <path key={i} d={INNER} transform={`rotate(${a})`} />
          ))}
          {neon && <Neon n={12} d={INNER} color="#b6ff3b" dur={3.428} width={6} />}
        </g>
      </g>

      <g className="m-spin-b">
        <g transform="translate(500 500)" fill="none" stroke="#EFE9FF" strokeOpacity=".4" strokeWidth="1.2">
          {ring(6, (a, i) => (
            <circle key={i} r="78" cy="-78" transform={`rotate(${a})`} />
          ))}
          <circle r="156" />
          {neon && <Neon n={6} d={SEED} color="#FFB020" dur={1.714} width={4.5} />}
        </g>
      </g>

      <g transform="translate(500 500)">
        <circle r="30" fill="url(#mg-eye)" />
        <circle r="46" fill="none" stroke="#FFB020" strokeOpacity=".7" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
