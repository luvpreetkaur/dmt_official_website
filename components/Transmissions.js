import { Fragment } from 'react';
import Reveal from './Reveal';
import Mandala from './Mandala';
import FloatingObjects, { NATURE_SPACE } from './FloatingObjects';
import Logo from './Logo';
import { TRANSMISSIONS } from '@/lib/transmissions';

// Every letter of the question floats on its own phase.
export function Wavy({ text }) {
  return text.split(' ').map((word, w) => (
    <Fragment key={w}>
      {w > 0 && ' '}
      <span className="tx-word">
        {[...word].map((ch, i) => (
          <span key={i} className="tx-ch" style={{ '--n': w * 6 + i }}>{ch}</span>
        ))}
      </span>
    </Fragment>
  ));
}

// Full-screen chapters built from the words in the @dmt.india reels.
// logo: show the 3D logo above the first question.
export default function Transmissions({ logo = false }) {
  return (
    <>
      {TRANSMISSIONS.map((t, ti) => (
        <section key={t.id} className={`tx-chapter tx-${t.tone}`} aria-labelledby={`tx-${t.id}`}>
          <div className="tx-bg" aria-hidden="true">
            <div className="tx-kaleido" />
            <div className="tx-tunnel"><span /><span /><span /><span /></div>
            <Mandala className="tx-mandala" />
            <FloatingObjects objects={NATURE_SPACE} sprites={ti === 0} />
          </div>

          <div className="tx-title">
            {logo && ti === 0 && <Logo size="lg" />}
            <h2 id={`tx-${t.id}`} className="tx-q" data-text={t.question}><Wavy text={t.question} /></h2>
            <span className="ab-cue" aria-hidden="true" />
          </div>

          <Reveal className="tx-body">
            {t.blocks.map((b, bi) => (
              <div key={bi} className={`tx-block${b.big ? ' tx-big' : ''}`}>
                {b.lines.map((line, li) => (
                  <p key={li} className="reveal" style={{ '--i': li }}>{line}</p>
                ))}
              </div>
            ))}
          </Reveal>
        </section>
      ))}
    </>
  );
}
