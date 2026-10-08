import { Fragment } from 'react';
import { InstagramIcon } from './LineupChips';

// Each artist gets their own motif + palette + way their name moves.
// Known names get a motif drawn from the name; anyone else cycles through.
const BY_NAME = {
  'spinal fusion': 'spiral', // spiral / spine
  nitin: 'rings', // pulse rings
  'kalinga son': 'wheel', // Konark sun wheel (Kalinga)
  zameer: 'eye', // inner eye / conscience
  spand: 'wave', // spanda: vibration
};
const ORDER = ['spiral', 'rings', 'wheel', 'eye', 'wave'];

function igHandle(url) {
  const m = (url || '').match(/instagram\.com\/([\w.]+)/);
  return m ? `@${m[1]}` : null;
}

const C = 100; // svg centre
const range = (n) => Array.from({ length: n }, (_, i) => i);

function spiralPath(turns, phase) {
  const pts = range(turns * 40).map((i) => {
    const t = (i / 40) * Math.PI * 2;
    const r = 4 + t * 3.1;
    return `${(C + r * Math.cos(t + phase)).toFixed(1)},${(C + r * Math.sin(t + phase)).toFixed(1)}`;
  });
  return `M${pts.join(' L')}`;
}

function Motif({ kind }) {
  switch (kind) {
    case 'spiral':
      return (
        <g className="m-spin">
          <path d={spiralPath(4.6, 0)} className="m-stroke-a" />
          <path d={spiralPath(4.6, Math.PI)} className="m-stroke-b" />
          {range(12).map((i) => (
            <circle key={i} cx={C + 88 * Math.cos((i * Math.PI) / 6)} cy={C + 88 * Math.sin((i * Math.PI) / 6)} r="3" className="m-fill-a" />
          ))}
        </g>
      );
    case 'rings':
      return (
        <g>
          {range(5).map((i) => <circle key={i} cx={C} cy={C} r="22" className="m-ring" style={{ '--k': i }} />)}
          <circle cx={C} cy={C} r="14" className="m-fill-a m-core" />
          <circle cx={C} cy={C} r="92" className="m-stroke-b" strokeDasharray="2 8" />
        </g>
      );
    case 'wheel':
      return (
        <g className="m-spin-slow">
          <circle cx={C} cy={C} r="88" className="m-stroke-a m-thick" />
          <circle cx={C} cy={C} r="76" className="m-stroke-b" />
          <circle cx={C} cy={C} r="18" className="m-fill-a" />
          <circle cx={C} cy={C} r="26" className="m-stroke-a" />
          {range(24).map((i) => {
            const a = (i * Math.PI) / 12;
            return (
              <line key={i} x1={C + 26 * Math.cos(a)} y1={C + 26 * Math.sin(a)} x2={C + 76 * Math.cos(a)} y2={C + 76 * Math.sin(a)}
                className={i % 3 === 0 ? 'm-stroke-a m-thick' : 'm-stroke-b'} />
            );
          })}
          {range(32).map((i) => (
            <circle key={i} cx={C + 82 * Math.cos((i * Math.PI) / 16)} cy={C + 82 * Math.sin((i * Math.PI) / 16)} r="2.4" className="m-fill-b" />
          ))}
        </g>
      );
    case 'eye':
      return (
        <g>
          <g className="m-rays">
            {range(16).map((i) => {
              const a = (i * Math.PI) / 8;
              return <line key={i} x1={C + 60 * Math.cos(a)} y1={C + 60 * Math.sin(a)} x2={C + 92 * Math.cos(a)} y2={C + 92 * Math.sin(a)} className="m-stroke-b" />;
            })}
          </g>
          <g className="m-blink">
            <path d="M24 100 Q100 34 176 100 Q100 166 24 100 Z" className="m-stroke-a m-thick m-eye-white" />
            <circle cx={C} cy={C} r="26" className="m-fill-a m-iris" />
            <circle cx={C} cy={C} r="10" className="m-pupil" />
            <circle cx={C - 8} cy={C - 9} r="4" fill="#fff" />
          </g>
        </g>
      );
    default: // wave
      return (
        <g>
          {range(36).map((i) => {
            const a = (i * Math.PI) / 18;
            return (
              <g key={i} transform={`rotate(${(a * 180) / Math.PI} ${C} ${C})`}>
                <rect x={C - 2.5} y={C - 92} width="5" height="34" rx="2.5" className="m-bar" style={{ '--k': i }} />
              </g>
            );
          })}
          <path d={`M40 100 ${range(13).map((i) => `Q${45 + i * 10} ${i % 2 ? 70 : 130} ${50 + i * 10} 100`).join(' ')}`} className="m-stroke-a m-wave" />
        </g>
      );
  }
}

export default function ArtistSpotlight({ artists }) {
  return (
    <ol className="as-list">
      {artists.map((a, i) => {
        const kind = BY_NAME[a.name.trim().toLowerCase()] || ORDER[i % ORDER.length];
        const handle = igHandle(a.link_url);
        return (
          <li key={a.id || a.name} className={`as-row as-${kind} reveal`}>
            <div className="as-orb" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="as-motif"><Motif kind={kind} /></svg>
              {a.photo_url && <img src={a.photo_url} alt="" className="as-photo" />}
            </div>
            <div className="as-text">
              <span className="as-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="as-name">
                {a.name.split(' ').map((word, w) => (
                  <Fragment key={w}>
                    {w > 0 && ' '}
                    <span className="as-word">
                      {[...word].map((ch, k) => (
                        <span key={k} className="as-ch" style={{ '--n': w * 6 + k }}>{ch}</span>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </h3>
              {a.link_url && (
                <a className="as-link" href={a.link_url} target="_blank" rel="noopener noreferrer" aria-label={`${a.name} on Instagram`}>
                  <InstagramIcon />{handle || 'Instagram'}
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
