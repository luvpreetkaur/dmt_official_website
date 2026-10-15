import Link from 'next/link';
import HeroStage from './HeroStage';
import Psyche from './Psyche';
import Scene from './Scene';
import Halo from './Halo';
import Logo from './Logo';
import { Wavy } from './Transmissions';

// Homepage opener: a live psychedelic shader with neon flowing through it.
export default function HomeHero({ title, cta }) {
  return (
    <HeroStage className="hh tx-chapter">
      <div className="hh-bg" aria-hidden="true">
        <Psyche />
        <div className="ab-sun" />
        <div className="hh-spot" />
      </div>
      <Scene />

      <div className="hh-content">
        <div className="hh-logo">
          <Halo />
          <Logo size="lg" />
        </div>
        <h1 className="hh-title tx-q"><Wavy text={title} /></h1>
        <div className="hh-ctas">
          <Link className="btn btn-primary hh-btn" href="/events">{cta}</Link>
          <Link className="btn btn-ghost hh-btn" href="/about">Our story</Link>
        </div>
      </div>
      <span className="ab-cue" aria-hidden="true" />
    </HeroStage>
  );
}
