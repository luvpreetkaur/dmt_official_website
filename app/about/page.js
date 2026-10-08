import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ThemedHero from '@/components/ThemedHero';
import Transmissions from '@/components/Transmissions';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'Dive Deep | Divyah Moments of Trance' };

export default async function AboutPage() {
  const { settings: s } = await getSiteData();
  return (
    <>
      <Nav />
      <main className="tx">
        <ThemedHero eyebrow={s.about_title} title={s.hero_title || 'Divyah Moments of Trance'} logo />
        <Transmissions />
        <p className="ab-cta">
          <Link className="btn btn-primary" href="/events">Upcoming events</Link>
        </p>
      </main>
      <Footer settings={s} />
    </>
  );
}
