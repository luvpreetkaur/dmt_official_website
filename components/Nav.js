import Link from 'next/link';
import Logo from './Logo';

export default function Nav() {
  return (
    <header className="nav">
      <Link href="/" className="nav-home" aria-label="Divyah Moments of Trance, home">
        <Logo />
      </Link>
      <nav className="nav-links" aria-label="Main">
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/#lineup">Lineup</Link>
        <Link href="/#gallery">Gallery</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
