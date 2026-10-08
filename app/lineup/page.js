import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ThemedHero from '@/components/ThemedHero';
import Lineup from '@/components/Lineup';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'Lineup | Divyah Moments of Trance' };

export default async function LineupPage() {
  const { settings: s, artists } = await getSiteData();
  return (
    <>
      <Nav />
      <main>
        <ThemedHero eyebrow="The artists" title="Lineup" />
        <section className="section">
          {artists.length > 0 ? <Lineup artists={artists} /> : <p className="empty">Lineup coming soon.</p>}
        </section>
      </main>
      <Footer settings={s} />
    </>
  );
}
