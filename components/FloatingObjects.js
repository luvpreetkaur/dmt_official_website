// Floating objects around the flyer. x/y are % of the section, s is size in px,
// d is drift duration in s. "far" objects are smaller, blurred and move less.
export const FLYER_OBJECTS = [
  { k: 'gem', x: 6, y: 14, s: 58, d: 13, r: -18, c: 'cool' },
  { k: 'orb', x: 18, y: 70, s: 44, d: 11, r: 0, c: 'cool', far: true },
  { k: 'mush', x: 3, y: 78, s: 64, d: 15, r: -8, c: 'hot' },
  { k: 'spark', x: 27, y: 8, s: 22, d: 4, r: 0 },
  { k: 'diamond', x: 39, y: 86, s: 40, d: 12, r: 14, c: 'hot', far: true },
  { k: 'gem', x: 47, y: 6, s: 34, d: 10, r: 22, c: 'hot', far: true },
  { k: 'orb', x: 90, y: 12, s: 60, d: 14, r: 0, c: 'hot' },
  { k: 'diamond', x: 93, y: 52, s: 50, d: 12, r: -12, c: 'cool' },
  { k: 'mush', x: 82, y: 84, s: 52, d: 16, r: 10, c: 'cool', far: true },
  { k: 'spark', x: 70, y: 22, s: 18, d: 5, r: 0 },
  { k: 'spark', x: 12, y: 44, s: 16, d: 6, r: 0 },
  { k: 'spark', x: 60, y: 92, s: 20, d: 4.5, r: 0 },
  { k: 'gem', x: 66, y: 64, s: 28, d: 9, r: 30, c: 'cool', far: true },
];

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
        <symbol id="eh-gem-cool" viewBox="0 0 100 100"><Gem fill="url(#eh-cool)" /></symbol>
        <symbol id="eh-gem-hot" viewBox="0 0 100 100"><Gem fill="url(#eh-hot)" /></symbol>
        <symbol id="eh-diamond-cool" viewBox="0 0 100 100"><Diamond fill="url(#eh-cool)" /></symbol>
        <symbol id="eh-diamond-hot" viewBox="0 0 100 100"><Diamond fill="url(#eh-hot)" /></symbol>
        <symbol id="eh-orb-cool-s" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="url(#eh-orb-cool)" /></symbol>
        <symbol id="eh-orb-hot-s" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="url(#eh-orb-hot)" /></symbol>
        <symbol id="eh-mush-cool" viewBox="0 0 100 100"><Mushroom fill="url(#eh-cool)" /></symbol>
        <symbol id="eh-mush-hot" viewBox="0 0 100 100"><Mushroom fill="url(#eh-hot)" /></symbol>
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
      </defs>
    </svg>
  );
}

function Gem({ fill }) {
  return (
    <>
      <polygon points="50,4 88,27 88,73 50,96 12,73 12,27" fill={fill} />
      <polygon points="50,4 88,27 50,42 12,27" fill="#fff" fillOpacity=".35" />
      <polygon points="12,27 50,42 50,96 12,73" fill="#000" fillOpacity=".12" />
      <path d="M50 42V96M12 27L50 42L88 27" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" fill="none" />
    </>
  );
}

function Diamond({ fill }) {
  return (
    <>
      <polygon points="50,4 92,38 50,96 8,38" fill={fill} />
      <polygon points="50,4 92,38 50,48 8,38" fill="#fff" fillOpacity=".35" />
      <path d="M8 38L50 48L92 38M50 48V96" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" fill="none" />
    </>
  );
}

function Mushroom({ fill }) {
  return (
    <>
      <path d="M41 55L59 55L57 91Q50 97 43 91Z" fill="#efe9ff" fillOpacity=".9" />
      <path d="M6 58C6 18 94 18 94 58Q50 66 6 58Z" fill={fill} />
      <circle cx="32" cy="40" r="5" fill="#fff" fillOpacity=".8" />
      <circle cx="56" cy="32" r="6.5" fill="#fff" fillOpacity=".8" />
      <circle cx="74" cy="46" r="4" fill="#fff" fillOpacity=".8" />
    </>
  );
}

const SINGLE = new Set(['spark', 'leaf', 'fern', 'lotus', 'butterfly', 'planet', 'moon', 'comet', 'galaxy']);

function hrefFor(o) {
  if (SINGLE.has(o.k)) return `#eh-${o.k}`;
  if (o.k === 'orb') return `#eh-orb-${o.c}-s`;
  return `#eh-${o.k}-${o.c}`;
}

// Leaves, lotus and butterflies below; planets, moons, comets and galaxies above.
export const NATURE_SPACE = [
  { k: 'planet', x: 8, y: 12, s: 74, d: 16, r: -8 },
  { k: 'moon', x: 87, y: 10, s: 54, d: 14, r: 12 },
  { k: 'galaxy', x: 70, y: 22, s: 46, d: 18, r: 0, far: true },
  { k: 'comet', x: 30, y: 6, s: 44, d: 9, r: 0, far: true },
  { k: 'spark', x: 22, y: 30, s: 18, d: 4, r: 0 },
  { k: 'spark', x: 80, y: 40, s: 16, d: 5, r: 0 },
  { k: 'spark', x: 52, y: 6, s: 14, d: 4.5, r: 0 },
  { k: 'butterfly', x: 88, y: 56, s: 48, d: 9, r: 10 },
  { k: 'butterfly', x: 18, y: 50, s: 34, d: 8, r: -14, far: true },
  { k: 'leaf', x: 4, y: 74, s: 70, d: 13, r: -30 },
  { k: 'fern', x: 90, y: 78, s: 80, d: 15, r: 6 },
  { k: 'lotus', x: 14, y: 86, s: 64, d: 12, r: 0 },
  { k: 'leaf', x: 76, y: 90, s: 46, d: 11, r: 40, far: true },
  { k: 'lotus', x: 60, y: 92, s: 40, d: 14, r: 0, far: true },
];

// Pass sprites={false} when another FloatingObjects on the page already defines them.
export default function FloatingObjects({ objects = FLYER_OBJECTS, sprites = true }) {
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
