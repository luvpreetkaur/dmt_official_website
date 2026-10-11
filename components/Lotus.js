// A 3D lotus: three rings of petals that breathe open and slowly turn.
const LAYERS = [
  { n: 14, tilt: 12, w: 70, h: 150, cls: 'outer', off: 0, z: 0 },
  { n: 12, tilt: 34, w: 62, h: 124, cls: 'mid', off: 15, z: 3 },
  { n: 9, tilt: 58, w: 50, h: 88, cls: 'inner', off: 0, z: 6 },
];

export default function Lotus({ className = '' }) {
  return (
    <div className={`lotus ${className}`}>
      <div className="lotus-stage">
        <span className="lotus-aura" />
        {LAYERS.flatMap((L) =>
          Array.from({ length: L.n }, (_, i) => (
            <span key={`${L.cls}${i}`} className={`petal petal-${L.cls}`}
              style={{ '--rot': `${(i * 360) / L.n + L.off}deg`, '--tilt': `${L.tilt}deg`, '--w': L.w, '--h': L.h, '--z': `${L.z}px` }} />
          )),
        )}
        <span className="lotus-core" />
      </div>
    </div>
  );
}

