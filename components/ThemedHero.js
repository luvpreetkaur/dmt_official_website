import Mandala from './Mandala';
import HeroStage from './HeroStage';
import FloatingObjects from './FloatingObjects';

// Kept to the edges so the centred title stays clear.
const HERO_OBJECTS = [
  { k: 'gem', x: 7, y: 16, s: 54, d: 13, r: -16, c: 'cool' },
  { k: 'mush', x: 10, y: 72, s: 60, d: 15, r: -6, c: 'hot' },
  { k: 'orb', x: 22, y: 40, s: 40, d: 12, r: 0, c: 'hot', far: true },
  { k: 'spark', x: 30, y: 12, s: 20, d: 4, r: 0 },
  { k: 'diamond', x: 88, y: 18, s: 48, d: 12, r: 12, c: 'hot' },
  { k: 'orb', x: 86, y: 66, s: 58, d: 14, r: 0, c: 'cool' },
  { k: 'gem', x: 76, y: 44, s: 30, d: 10, r: 26, c: 'cool', far: true },
  { k: 'spark', x: 70, y: 82, s: 18, d: 5, r: 0 },
  { k: 'spark', x: 94, y: 42, s: 16, d: 6, r: 0 },
  { k: 'mush', x: 64, y: 10, s: 36, d: 16, r: 8, c: 'cool', far: true },
];

// Sunrise + mandala + floating objects hero shared by the home and about pages.
export default function ThemedHero({ eyebrow, title, subtitle, full = false, children }) {
  return (
    <HeroStage className={`ab-hero${full ? ' ab-hero-full' : ''}`}>
      <div className="ab-sun" aria-hidden="true" />
      <div className="eh-beams" aria-hidden="true" />
      <div className="eh-light eh-light-a" aria-hidden="true" />
      <div className="eh-light eh-light-b" aria-hidden="true" />
      <Mandala className="ab-mandala" />
      <FloatingObjects objects={HERO_OBJECTS} />
      <div className="ab-hero-text">
        {eyebrow && <p className="eh-eyebrow">{eyebrow}</p>}
        <h1 className="ab-title">{title}</h1>
        {subtitle && <p className="ab-sub">{subtitle}</p>}
        {children}
      </div>
      <span className="ab-cue" aria-hidden="true" />
    </HeroStage>
  );
}
