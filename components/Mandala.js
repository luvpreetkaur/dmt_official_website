// Pure SVG, no client JS. Layers counter-rotate via CSS (see globals.css).
const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn((i * 360) / n, i));

export default function Mandala({ className = '' }) {
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
        </g>
      </g>

      <g className="m-spin-b">
        <g transform="translate(500 500)" fill="none" strokeWidth="1.6">
          {ring(18, (a, i) => (
            <path
              key={i}
              d="M0 -190 C 62 -270, 62 -345, 0 -385 C -62 -345, -62 -270, 0 -190 Z"
              stroke="url(#mg-hot)"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="395" stroke="#FF3D9A" strokeOpacity=".35" />
        </g>
      </g>

      <g className="m-spin-c">
        <g transform="translate(500 500)" fill="#7B2CFF" fillOpacity=".07" strokeWidth="1.8" stroke="url(#mg-cool)">
          {ring(12, (a, i) => (
            <path
              key={i}
              d="M0 -70 C 95 -150, 95 -240, 0 -310 C -95 -240, -95 -150, 0 -70 Z"
              transform={`rotate(${a})`}
            />
          ))}
        </g>
      </g>

      <g className="m-spin-b">
        <g transform="translate(500 500)" fill="none" stroke="#EFE9FF" strokeOpacity=".4" strokeWidth="1.2">
          {ring(6, (a, i) => (
            <circle key={i} r="78" cy="-78" transform={`rotate(${a})`} />
          ))}
          <circle r="156" />
        </g>
      </g>

      <g transform="translate(500 500)">
        <circle r="30" fill="url(#mg-eye)" />
        <circle r="46" fill="none" stroke="#FFB020" strokeOpacity=".7" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
