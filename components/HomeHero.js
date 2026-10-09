import Link from 'next/link';
import HeroStage from './HeroStage';
import Mandala from './Mandala';
import FloatingObjects from './FloatingObjects';
import Logo from './Logo';
import { Wavy } from './Transmissions';

const HOME_OBJECTS = [
  { k: 'gem', x: 6, y: 16, s: 60, d: 13, r: -16, c: 'cool' },
  { k: 'mush', x: 9, y: 70, s: 66, d: 15, r: -6, c: 'hot' },
  { k: 'orb', x: 20, y: 38, s: 42, d: 12, r: 0, c: 'hot', far: true },
  { k: 'spark', x: 28, y: 12, s: 22, d: 4, r: 0 },
  { k: 'diamond', x: 89, y: 18, s: 52, d: 12, r: 12, c: 'hot' },
  { k: 'orb', x: 86, y: 64, s: 64, d: 14, r: 0, c: 'cool' },
  { k: 'gem', x: 76, y: 40, s: 32, d: 10, r: 26, c: 'cool', far: true },
  { k: 'spark', x: 72, y: 84, s: 20, d: 5, r: 0 },
  { k: 'spark', x: 94, y: 44, s: 16, d: 6, r: 0 },
  { k: 'mush', x: 64, y: 8, s: 38, d: 16, r: 8, c: 'cool', far: true },
  { k: 'spark', x: 14, y: 90, s: 18, d: 4.5, r: 0 },
  { k: 'diamond', x: 36, y: 88, s: 30, d: 11, r: -20, c: 'cool', far: true },
];

// Homepage opener: a tunnel of light pulsing to a trance tempo around the logo.
export default function HomeHero({ title, tagline, cta }) {
  return (
    <HeroStage className="hh tx-chapter">
      <div className="hh-bg" aria-hidden="true">
        <div className="tx-kaleido" />
        <div className="tx-tunnel"><span /><span /><span /><span /></div>
        <div className="ab-sun" />
        <div className="eh-beams" />
        <Mandala className="hh-mandala" />
        <div className="hh-spot" />
      </div>
      <FloatingObjects objects={HOME_OBJECTS} />

      <div className="hh-content">
        <div className="hh-logo">
          <span className="hh-beat" aria-hidden="true" />
          <span className="hh-beat" aria-hidden="true" />
          <span className="hh-beat" aria-hidden="true" />
          <Logo size="lg" />
        </div>
        <h1 className="hh-title tx-q"><Wavy text={title} /></h1>
        {tagline && <p className="hh-tag">{tagline}</p>}
        <div className="hh-ctas">
          <Link className="btn btn-primary hh-btn" href="/events">{cta}</Link>
          <Link className="btn btn-ghost hh-btn" href="/about">Dive deep</Link>
        </div>
      </div>
      <span className="ab-cue" aria-hidden="true" />
    </HeroStage>
  );
}
