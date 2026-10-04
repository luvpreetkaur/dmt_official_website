import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Mandala from '@/components/Mandala';
import EventHero from '@/components/EventHero';
import EventRow from '@/components/EventRow';
import PastEvents from '@/components/PastEvents';
import Lineup from '@/components/Lineup';
import Gallery from '@/components/Gallery';
import { getSiteData, splitEvents } from '@/lib/data';

export const revalidate = 30;

export default async function Home() {
  const { demo, settings: s, events, artists, gallery } = await getSiteData();
  const { upcoming, past } = splitEvents(events);
  const [next, ...later] = upcoming;
  const aboutTeaser = (s.about_body || '').split(/\n\s*\n/)[0];

  return (
    <>
      <Nav />
      {demo && (
        <p className="demo-banner">Preview content. Connect Supabase and edit from /admin to go live.</p>
      )}
      <main>
        {next ? (
          <EventHero event={next} presenter={s.hero_title} fallbackTicket={s.ticket_url} />
        ) : (
          <>
            <section className="hero">
              <Mandala />
              <div className="hero-glow" aria-hidden="true" />
              <div className="hero-text">
                <h1>{s.hero_title}</h1>
                <p>{s.hero_tagline}</p>
                <Link className="btn btn-primary" href="/#events">{s.hero_cta_label}</Link>
              </div>
            </section>
            <section id="events" className="section">
              <h2>Upcoming events</h2>
              <p className="empty">No events announced yet. Follow us for the next drop.</p>
            </section>
          </>
        )}

        {later.length > 0 && (
          <section className="section">
            <h2>More upcoming</h2>
            <ul className="rows">
              {later.map((e) => <EventRow key={e.id} event={e} fallbackTicket={s.ticket_url} />)}
            </ul>
          </section>
        )}

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

        {past.length > 0 && (
          <section className="section">
            <h2>Past events</h2>
            <PastEvents events={past.slice(0, 6)} />
            {past.length > 6 && (
              <p className="more"><Link className="btn btn-ghost" href="/events">All past events</Link></p>
            )}
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
