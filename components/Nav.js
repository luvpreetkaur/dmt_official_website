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
        <Link href="/about">Dive Deep</Link>
      </nav>
    </header>
  );
}
