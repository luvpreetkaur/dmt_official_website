import Link from 'next/link';

export default function Nav() {
  return (
    <header className="nav">
      <nav className="nav-links" aria-label="Main">
        <Link href="/#events">Events</Link>
        <Link href="/#lineup">Lineup</Link>
        <Link href="/#gallery">Gallery</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
