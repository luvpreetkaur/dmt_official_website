import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ThemedHero from '@/components/ThemedHero';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;

export default async function Home() {
  const { demo, settings: s } = await getSiteData();
  const aboutTeaser = (s.about_body || '').split(/\n\s*\n/)[0];

  return (
    <>
      <Nav />
      {demo && (
        <p className="demo-banner">Preview content. Connect Supabase and edit from /admin to go live.</p>
      )}
      <main>
        <ThemedHero title={s.hero_title} subtitle={s.hero_tagline} full logo>
          <Link className="btn btn-primary" href="/events">{s.hero_cta_label}</Link>
        </ThemedHero>

        <section className="section about-teaser">
          <h2>{s.about_title}</h2>
          <p>{aboutTeaser}</p>
          <Link className="btn btn-ghost" href="/about">Dive deep</Link>
        </section>
      </main>
      <Footer settings={s} />
    </>
  );
}
