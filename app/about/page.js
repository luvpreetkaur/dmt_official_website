import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
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
        <h1 className="sr-only">Dive Deep</h1>
        <Transmissions logo />
        <p className="ab-cta">
          <Link className="btn btn-primary" href="/events">Upcoming events</Link>
        </p>
      </main>
      <Footer settings={s} />
    </>
  );
}
