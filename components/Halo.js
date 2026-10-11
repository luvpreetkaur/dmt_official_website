// Three glowing rings orbiting the logo on different axes, each carrying a
// bead of light: a divine gyroscope in real 3D.
export default function Halo() {
  return (
    <span className="halo" aria-hidden="true">
      <span className="halo-ring halo-r1" />
      <span className="halo-ring halo-r2" />
      <span className="halo-ring halo-r3" />
    </span>
  );
}
