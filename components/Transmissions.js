import { Fragment } from 'react';
import Reveal from './Reveal';
import Mandala from './Mandala';
import FloatingObjects from './FloatingObjects';
import { TRANSMISSIONS } from '@/lib/transmissions';

const OBJECTS = [
  { k: 'gem', x: 6, y: 18, s: 46, d: 13, r: -16, c: 'cool' },
  { k: 'orb', x: 90, y: 24, s: 52, d: 14, r: 0, c: 'hot' },
  { k: 'mush', x: 8, y: 78, s: 50, d: 15, r: -6, c: 'hot', far: true },
  { k: 'diamond', x: 88, y: 76, s: 40, d: 12, r: 12, c: 'cool', far: true },
  { k: 'spark', x: 20, y: 40, s: 18, d: 4, r: 0 },
  { k: 'spark', x: 78, y: 52, s: 16, d: 5, r: 0 },
];

// Every letter of the question floats on its own phase.
function Wavy({ text }) {
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
export default function Transmissions() {
  const total = String(TRANSMISSIONS.length).padStart(2, '0');
  return (
    <>
      {TRANSMISSIONS.map((t, ti) => (
        <section key={t.id} className={`tx-chapter tx-${t.tone}`} aria-labelledby={`tx-${t.id}`}>
          <div className="tx-bg" aria-hidden="true">
            <div className="tx-kaleido" />
            <div className="tx-tunnel"><span /><span /><span /><span /></div>
            <Mandala className="tx-mandala" />
            <FloatingObjects objects={OBJECTS} sprites={false} />
          </div>

          <div className="tx-title">
            <p className="tx-count">{String(ti + 1).padStart(2, '0')} / {total}</p>
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
