import fs from 'node:fs';
import path from 'node:path';

// The logo lives in /public as logo.png / logo.jpg / logo.webp. Until one is
// added, nothing renders, so pages never show a broken image.
const LOGO = ['logo.png', 'logo.jpg', 'logo.webp'].find((f) => fs.existsSync(path.join(process.cwd(), 'public', f)));

// Round logo "coin" that slowly turns in 3D inside a spinning rainbow ring.
// size: 'sm' for the nav, 'lg' for the homepage hero.
export default function Logo({ size = 'sm' }) {
  if (!LOGO) return null;
  return (
    <span className={`logo3d logo3d-${size}`} aria-hidden={size === 'lg' ? 'true' : undefined}>
      <span className="logo3d-ring" />
      <span className="logo3d-coin">
        <img src={`/${LOGO}`} alt={size === 'sm' ? 'Divyah Moments of Trance' : ''} />
        <span className="logo3d-glare" />
      </span>
    </span>
  );
}
