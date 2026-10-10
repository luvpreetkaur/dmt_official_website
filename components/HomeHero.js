import Link from 'next/link';
import HeroStage from './HeroStage';
import Mandala from './Mandala';
import FloatingObjects, { NATURE_SPACE } from './FloatingObjects';
import Logo from './Logo';
import { Wavy } from './Transmissions';

// Homepage opener: a tunnel of light pulsing to a trance tempo around the logo.
export default function HomeHero({ title, cta }) {
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
      <FloatingObjects objects={NATURE_SPACE} />

      <div className="hh-content">
        <div className="hh-logo">
          <span className="hh-beat" aria-hidden="true" />
          <span className="hh-beat" aria-hidden="true" />
          <span className="hh-beat" aria-hidden="true" />
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
