import Link from 'next/link';
import Logo from './Logo';

// home: the big centre logo stands in for the corner one (which keeps its
// spot invisibly so the logo can fly there when leaving the page).
export default function Nav({ home = false }) {
  return (
    <header className="nav">
      <Link href="/" className={`nav-home${home ? ' nav-home-ghost' : ''}`} aria-label="Divyah Moments of Trance, home" tabIndex={home ? -1 : undefined}>
        <Logo />
      </Link>
      <nav className="nav-links" aria-label="Main">
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/about">Our Story</Link>
      </nav>
    </header>
  );
}
