import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ThemedHero from '@/components/ThemedHero';
import Lineup from '@/components/Lineup';
import Gallery from '@/components/Gallery';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;

export default async function Home() {
  const { demo, settings: s, artists, gallery } = await getSiteData();
  const aboutTeaser = (s.about_body || '').split(/\n\s*\n/)[0];

  return (
    <>
      <Nav />
      {demo && (
        <p className="demo-banner">Preview content. Connect Supabase and edit from /admin to go live.</p>
      )}
      <main>
        <ThemedHero title={s.hero_title} subtitle={s.hero_tagline} full>
          <Link className="btn btn-primary" href="/events">{s.hero_cta_label}</Link>
        </ThemedHero>

        {artists.length > 0 && (
          <section id="lineup" className="section">
            <h2>Lineup</h2>
            <Lineup artists={artists} />
          </section>
        )}

        {gallery.length > 0 && (
          <section id="gallery" className="section">
            <h2>Gallery</h2>
            <Gallery items={gallery} />
          </section>
        )}

        <section className="section about-teaser">
          <h2>{s.about_title}</h2>
          <p>{aboutTeaser}</p>
          <Link className="btn btn-ghost" href="/about">Read more</Link>
        </section>
      </main>
      <Footer settings={s} />
    </>
  );
}
