// The event's stage art, lit like it will be on the night: UV glow, laser
// fans and a beat-pulsing portal in the DJ booth's doorway, fog at its feet
// and its reflection on the water. Pure 2D CSS, so it looks the same on
// phones and laptops.
const LASERS = [
  { a: -58, c: '#FF3D9A', d: 0 },
  { a: -38, c: '#29F0E0', d: -0.4 },
  { a: -18, c: '#b6ff3b', d: -0.8 },
  { a: 18, c: '#b6ff3b', d: -1.2 },
  { a: 38, c: '#29F0E0', d: -1.6 },
  { a: 58, c: '#FF3D9A', d: -2 },
];

export default function StageShowcase({ src, credit, note }) {
  return (
    <section className="st reveal" aria-labelledby="st-h">
      <div className="st-head">
        {credit && <p className="eh-eyebrow">Stage design by {credit}</p>}
        <h2 id="st-h" className="st-title">The Artistic Stage</h2>
        {note && <p className="st-note">{note}</p>}
      </div>

      <div className="st-scene">
        <div className="st-uv" aria-hidden="true" />
        <div className="st-lasers" aria-hidden="true">
          {LASERS.map((l, i) => (
            <span key={i} style={{ '--a': `${l.a}deg`, '--c': l.c, '--dl': `${l.d}s` }} />
          ))}
        </div>

        <div className="st-stage">
          <img className="st-art" src={src} alt={credit ? `Stage design by ${credit}` : 'Stage design'} loading="lazy" />
          <span className="st-portal" aria-hidden="true"><span /><span /><span /></span>
        </div>

        <div className="st-water" aria-hidden="true">
          <img className="st-reflect" src={src} alt="" loading="lazy" />
          <span className="st-ripple" />
          <span className="st-ripple" />
        </div>
        <div className="st-fog" aria-hidden="true"><span /><span /><span /></div>
      </div>
    </section>
  );
}
