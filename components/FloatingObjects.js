function Sprites() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="eh-cool" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bffcf6" />
          <stop offset=".45" stopColor="#29F0E0" />
          <stop offset="1" stopColor="#7B2CFF" />
        </linearGradient>
        <linearGradient id="eh-hot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd1ea" />
          <stop offset=".45" stopColor="#FF3D9A" />
          <stop offset="1" stopColor="#7B2CFF" />
        </linearGradient>
        <radialGradient id="eh-orb-cool" cx=".35" cy=".3" r=".75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#29F0E0" stopOpacity=".85" />
          <stop offset="1" stopColor="#7B2CFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eh-orb-hot" cx=".35" cy=".3" r=".75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#FF3D9A" stopOpacity=".85" />
          <stop offset="1" stopColor="#FFB020" stopOpacity="0" />
        </radialGradient>
        <symbol id="eh-orb-cool-s" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="url(#eh-orb-cool)" /></symbol>
        <symbol id="eh-orb-hot-s" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="url(#eh-orb-hot)" /></symbol>
        <symbol id="eh-spark" viewBox="0 0 100 100">
          <path d="M50 0C54 38 62 46 100 50C62 54 54 62 50 100C46 62 38 54 0 50C38 46 46 38 50 0Z" fill="#fff" />
        </symbol>
        {/* nature + space */}
        <linearGradient id="eh-leaf-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1fb57a" />
          <stop offset=".55" stopColor="#b6ff3b" />
          <stop offset="1" stopColor="#29F0E0" />
        </linearGradient>
        <linearGradient id="eh-petal" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFB020" />
          <stop offset=".5" stopColor="#FF3D9A" />
          <stop offset="1" stopColor="#ffd1ea" />
        </linearGradient>
        <radialGradient id="eh-planet-g" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#e9fffd" />
          <stop offset=".4" stopColor="#29F0E0" />
          <stop offset="1" stopColor="#3b4fd8" />
        </radialGradient>
        <radialGradient id="eh-galaxy-g" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".25" stopColor="#29F0E0" stopOpacity=".9" />
          <stop offset="1" stopColor="#7B2CFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="eh-tail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#29F0E0" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <symbol id="eh-leaf" viewBox="0 0 100 100">
          <path d="M50 96C18 72 14 34 50 4C86 34 82 72 50 96Z" fill="url(#eh-leaf-g)" />
          <path d="M50 92V12M50 70L30 52M50 70L70 52M50 50L33 34M50 50L67 34M50 32L40 22M50 32L60 22" stroke="#0c0620" strokeOpacity=".35" strokeWidth="2" fill="none" />
        </symbol>
        <symbol id="eh-fern" viewBox="0 0 100 100">
          <path d="M20 96Q46 60 82 8" stroke="url(#eh-leaf-g)" strokeWidth="3" fill="none" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const t = i / 7;
            const x = 24 + t * 54;
            const y = 90 - t * 78;
            const l = 20 - i * 2;
            return (
              <g key={i} fill="url(#eh-leaf-g)">
                <ellipse cx={x - l * 0.55} cy={y - 2} rx={l * 0.55} ry="4" transform={`rotate(-35 ${x} ${y})`} />
                <ellipse cx={x + l * 0.55} cy={y - 2} rx={l * 0.55} ry="4" transform={`rotate(25 ${x} ${y})`} />
              </g>
            );
          })}
        </symbol>
        <symbol id="eh-lotus" viewBox="0 0 100 100">
          <path d="M50 80C22 78 6 60 6 46C26 46 42 60 50 80Z" fill="url(#eh-petal)" opacity=".8" />
          <path d="M50 80C78 78 94 60 94 46C74 46 58 60 50 80Z" fill="url(#eh-petal)" opacity=".8" />
          <path d="M50 80C30 66 26 40 34 22C46 34 52 56 50 80Z" fill="url(#eh-petal)" />
          <path d="M50 80C70 66 74 40 66 22C54 34 48 56 50 80Z" fill="url(#eh-petal)" />
          <path d="M50 80C40 60 42 30 50 10C58 30 60 60 50 80Z" fill="url(#eh-petal)" />
          <ellipse cx="50" cy="84" rx="30" ry="5" fill="#29F0E0" opacity=".35" />
        </symbol>
        <symbol id="eh-butterfly" viewBox="0 0 100 100">
          <path d="M50 50C34 18 6 16 8 36C10 54 34 56 50 50Z" fill="url(#eh-cool)" />
          <path d="M50 50C66 18 94 16 92 36C90 54 66 56 50 50Z" fill="url(#eh-cool)" />
          <path d="M50 52C38 64 22 82 32 86C42 90 48 70 50 52Z" fill="url(#eh-hot)" />
          <path d="M50 52C62 64 78 82 68 86C58 90 52 70 50 52Z" fill="url(#eh-hot)" />
          <path d="M50 30V78M50 30L42 18M50 30L58 18" stroke="#efe9ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="eh-planet" viewBox="0 0 100 100">
          <path d="M8 58A44 12 -18 0 1 92 30" stroke="#FFB020" strokeWidth="4" fill="none" opacity=".55" />
          <circle cx="50" cy="48" r="26" fill="url(#eh-planet-g)" />
          <path d="M92 30A44 12 -18 0 1 8 58" stroke="#FFB020" strokeWidth="4" fill="none" />
        </symbol>
        <symbol id="eh-moon" viewBox="0 0 100 100">
          <path d="M62 8A42 42 0 1 0 92 70A34 34 0 1 1 62 8Z" fill="#fdf6e3" />
          <circle cx="40" cy="62" r="5" fill="#e6dccb" />
          <circle cx="30" cy="40" r="3.5" fill="#e6dccb" />
        </symbol>
        <symbol id="eh-comet" viewBox="0 0 100 100">
          <path d="M8 8L78 72" stroke="url(#eh-tail)" strokeWidth="7" strokeLinecap="round" />
          <circle cx="80" cy="74" r="9" fill="#fff" />
        </symbol>
        <symbol id="eh-galaxy" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="url(#eh-galaxy-g)" opacity=".5" />
          <path d="M50 50C50 30 70 22 84 34M50 50C50 70 30 78 16 66M50 50C30 50 22 30 34 16M50 50C70 50 78 70 66 84" stroke="#29F0E0" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".85" />
          <path d="M50 50C62 40 78 44 82 56M50 50C38 60 22 56 18 44" stroke="#FF3D9A" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".8" />
          <circle cx="50" cy="50" r="8" fill="#fff" />
        </symbol>
        {/* the five elements + friends */}
        <linearGradient id="eh-fire-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff2d55" />
          <stop offset=".5" stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#FFB020" />
        </linearGradient>
        <linearGradient id="eh-fire-in-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFB020" />
          <stop offset="1" stopColor="#fff7d6" />
        </linearGradient>
        <linearGradient id="eh-water-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9fffd" />
          <stop offset=".45" stopColor="#29F0E0" />
          <stop offset="1" stopColor="#3b4fd8" />
        </linearGradient>
        <linearGradient id="eh-earth-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a4bd6" />
          <stop offset="1" stopColor="#2a0f4f" />
        </linearGradient>
        <radialGradient id="eh-jelly-g" cx=".5" cy=".3" r=".7">
          <stop offset="0" stopColor="#ffe6f4" stopOpacity=".95" />
          <stop offset=".5" stopColor="#FF3D9A" stopOpacity=".7" />
          <stop offset="1" stopColor="#7B2CFF" stopOpacity=".3" />
        </radialGradient>
        <radialGradient id="eh-sun-g" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset=".55" stopColor="#FFB020" />
          <stop offset="1" stopColor="#ff5a36" />
        </radialGradient>
        <symbol id="eh-flame" viewBox="0 0 100 100">
          <path d="M50 96C24 96 14 74 22 56C28 42 40 36 38 12C54 24 62 40 60 54C66 48 68 40 66 30C80 44 88 64 78 80C72 92 62 96 50 96Z" fill="url(#eh-fire-g)" />
          <path d="M50 92C36 92 32 80 36 70C40 62 48 58 48 44C56 54 60 64 58 72C62 70 64 66 64 60C70 70 70 82 64 88C60 91 56 92 50 92Z" fill="url(#eh-fire-in-g)" />
        </symbol>
        <symbol id="eh-sun" viewBox="0 0 100 100">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M50 2L55 20H45Z" fill="#FFB020" transform={`rotate(${i * 30} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="27" fill="url(#eh-sun-g)" />
          <circle cx="50" cy="50" r="33" fill="none" stroke="#FFB020" strokeWidth="2" strokeDasharray="3 5" />
        </symbol>
        <symbol id="eh-droplet" viewBox="0 0 100 100">
          <path d="M50 4C50 4 20 42 20 60A30 30 0 0 0 80 60C80 42 50 4 50 4Z" fill="url(#eh-water-g)" />
          <ellipse cx="38" cy="58" rx="6" ry="11" fill="#fff" opacity=".55" transform="rotate(-18 38 58)" />
        </symbol>
        <symbol id="eh-koi" viewBox="0 0 100 100">
          <path d="M20 50C30 30 62 28 76 46C80 50 80 52 76 56C62 74 30 70 20 50Z" fill="#ff7a1a" />
          <path d="M44 34C52 40 52 60 44 66C56 64 66 58 70 50C66 42 56 36 44 34Z" fill="#fff7d6" opacity=".9" />
          <path d="M22 50L4 34Q12 50 4 66Z" fill="#FF3D9A" />
          <path d="M48 36L56 22L60 38Z M48 64L56 78L60 62Z" fill="#FFB020" />
          <circle cx="68" cy="47" r="2.6" fill="#0c0620" />
        </symbol>
        <symbol id="eh-wind" viewBox="0 0 100 100">
          <g fill="none" stroke="#e9fffd" strokeWidth="4.5" strokeLinecap="round">
            <path d="M6 38H62A13 13 0 1 0 49 25" />
            <path d="M6 56H78A11 11 0 1 1 67 67" stroke="#29F0E0" />
            <path d="M18 74H46A8 8 0 1 1 38 82" stroke="#b6ff3b" />
          </g>
        </symbol>
        <symbol id="eh-island" viewBox="0 0 100 100">
          <path d="M12 52L88 52L74 70L60 94L46 80L30 70Z" fill="url(#eh-earth-g)" />
          <path d="M40 74L38 90M62 80L64 96M28 66L24 78" stroke="#b6ff3b" strokeWidth="1.6" opacity=".7" />
          <path d="M10 52Q50 40 90 52L88 58Q50 48 12 58Z" fill="url(#eh-leaf-g)" />
          <path d="M62 50V32" stroke="#6b3b1f" strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="26" r="13" fill="url(#eh-leaf-g)" />
          <circle cx="54" cy="31" r="8" fill="#1fb57a" />
          <path d="M80 56Q84 72 82 92" stroke="#29F0E0" strokeWidth="2.4" strokeDasharray="3 4" fill="none" />
        </symbol>
        <symbol id="eh-flower" viewBox="0 0 100 100">
          <g fill="none" stroke="#FFB020" strokeWidth="1.8">
            <circle cx="50" cy="50" r="46" stroke="#29F0E0" />
            <circle cx="50" cy="50" r="15" />
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i * Math.PI) / 3;
              return <circle key={i} cx={50 + 15 * Math.cos(a)} cy={50 + 15 * Math.sin(a)} r="15" />;
            })}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i * Math.PI) / 3 + Math.PI / 6;
              return <circle key={i} cx={50 + 26 * Math.cos(a)} cy={50 + 26 * Math.sin(a)} r="15" stroke="#FF3D9A" opacity=".7" />;
            })}
          </g>
        </symbol>
        <symbol id="eh-jelly" viewBox="0 0 100 100">
          <path d="M28 42Q30 70 22 92M40 46Q46 74 38 96M60 46Q54 74 62 96M72 42Q70 70 78 92" stroke="#29F0E0" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".8" />
          <path d="M16 44C16 14 84 14 84 44Q67 38 50 44Q33 38 16 44Z" fill="url(#eh-jelly-g)" />
          <path d="M28 30Q50 18 72 30" stroke="#fff" strokeWidth="2" fill="none" opacity=".6" />
        </symbol>
      </defs>
    </svg>
  );
}




const SINGLE = new Set(['spark', 'leaf', 'fern', 'lotus', 'butterfly', 'planet', 'moon', 'comet', 'galaxy',
  'flame', 'sun', 'droplet', 'koi', 'wind', 'island', 'flower', 'jelly']);

function hrefFor(o) {
  if (SINGLE.has(o.k)) return `#eh-${o.k}`;
  if (o.k === 'orb') return `#eh-orb-${o.c}-s`;
  return `#eh-${o.k}-${o.c}`;
}

// Sky above (planets, moon, galaxy, comet, sun, Flower of Life = ether),
// the elements in the middle (fire, air, water) and earth + nature below.
export const NATURE_SPACE = [
  { k: 'planet', x: 5, y: 9, s: 112, d: 16, r: -8 },
  { k: 'moon', x: 88, y: 7, s: 84, d: 14, r: 12 },
  { k: 'galaxy', x: 72, y: 17, s: 96, d: 22, r: 0, far: true },
  { k: 'comet', x: 26, y: 3, s: 78, d: 9, r: 0, far: true },
  { k: 'flower', x: 20, y: 28, s: 86, d: 30, r: 0, far: true },
  { k: 'sun', x: 94, y: 33, s: 82, d: 26, r: 0 },
  { k: 'spark', x: 34, y: 18, s: 20, d: 4, r: 0 },
  { k: 'spark', x: 80, y: 42, s: 18, d: 5, r: 0 },
  { k: 'spark', x: 52, y: 4, s: 16, d: 4.5, r: 0 },
  { k: 'spark', x: 62, y: 84, s: 18, d: 5.5, r: 0 },
  { k: 'flame', x: 3, y: 42, s: 86, d: 7, r: -6 },
  { k: 'wind', x: 83, y: 50, s: 104, d: 10, r: 0 },
  { k: 'droplet', x: 14, y: 58, s: 60, d: 9, r: 8 },
  { k: 'jelly', x: 70, y: 60, s: 92, d: 11, r: 0, far: true },
  { k: 'butterfly', x: 90, y: 64, s: 70, d: 9, r: 10 },
  { k: 'butterfly', x: 30, y: 48, s: 48, d: 8, r: -14, far: true },
  { k: 'island', x: 3, y: 72, s: 136, d: 14, r: -4 },
  { k: 'fern', x: 91, y: 77, s: 118, d: 15, r: 6 },
  { k: 'lotus', x: 20, y: 87, s: 96, d: 12, r: 0 },
  { k: 'koi', x: 76, y: 88, s: 96, d: 8, r: -10 },
  { k: 'leaf', x: 40, y: 91, s: 70, d: 11, r: 40, far: true },
  { k: 'droplet', x: 56, y: 92, s: 40, d: 10, r: 0, far: true },
];

// Same family, kept to the sides and edges so the flyer stays clear.
export const EVENT_OBJECTS = [
  { k: 'planet', x: 2, y: 8, s: 104, d: 16, r: -8 },
  { k: 'moon', x: 91, y: 6, s: 78, d: 14, r: 12 },
  { k: 'galaxy', x: 90, y: 24, s: 86, d: 22, r: 0, far: true },
  { k: 'comet', x: 40, y: 1, s: 70, d: 9, r: 0, far: true },
  { k: 'flower', x: 3, y: 30, s: 80, d: 30, r: 0, far: true },
  { k: 'sun', x: 92, y: 38, s: 76, d: 26, r: 0 },
  { k: 'flame', x: 2, y: 46, s: 82, d: 7, r: -6 },
  { k: 'wind', x: 90, y: 54, s: 96, d: 10, r: 0 },
  { k: 'droplet', x: 6, y: 60, s: 56, d: 9, r: 8 },
  { k: 'jelly', x: 92, y: 66, s: 84, d: 11, r: 0 },
  { k: 'butterfly', x: 8, y: 66, s: 60, d: 9, r: -10 },
  { k: 'island', x: 1, y: 78, s: 124, d: 14, r: -4 },
  { k: 'fern', x: 93, y: 82, s: 108, d: 15, r: 6 },
  { k: 'lotus', x: 26, y: 93, s: 80, d: 12, r: 0, far: true },
  { k: 'koi', x: 70, y: 93, s: 84, d: 8, r: -10, far: true },
  { k: 'spark', x: 12, y: 20, s: 18, d: 4, r: 0 },
  { k: 'spark', x: 88, y: 46, s: 16, d: 5, r: 0 },
  { k: 'spark', x: 60, y: 2, s: 16, d: 4.5, r: 0 },
];

// Pass sprites={false} when another FloatingObjects on the page already defines them.
export default function FloatingObjects({ objects = NATURE_SPACE, sprites = true }) {
  return (
    <>
      {sprites && <Sprites />}
      {['far', 'near'].map((layer) => (
        <div key={layer} className={`eh-layer eh-layer-${layer}`} aria-hidden="true">
          {objects.filter((o) => (layer === 'far') === !!o.far).map((o, i) => (
            <svg
              key={i}
              className={`eh-obj eh-${o.k}`}
              style={{ '--x': `${o.x}%`, '--y': `${o.y}%`, '--s': `${o.s}px`, '--d': `${o.d}s`, '--r': `${o.r}deg`, '--dl': `${-i * 1.7}s` }}
            >
              <use href={hrefFor(o)} />
            </svg>
          ))}
        </div>
      ))}
    </>
  );
}
