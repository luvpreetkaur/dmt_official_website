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

function hrefFor(o) {
  if (o.k === 'spark') return '#eh-spark';
  if (o.k === 'orb') return `#eh-orb-${o.c}-s`;
  return `#eh-${o.k}-${o.c}`;
}

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
