import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FlyerExperience from '@/components/FlyerExperience';
import EventFeature from '@/components/EventFeature';
import PastEvents from '@/components/PastEvents';
import { getSiteData, splitEvents } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'Events | Divyah Moments of Trance' };

export default async function EventsPage() {
  const { settings: s, events, artists } = await getSiteData();
  const { upcoming, past } = splitEvents(events);
  const [next, ...later] = upcoming;
  return (
    <>
      <Nav />
      {next && <FlyerExperience event={next} presenter={s.hero_title} fallbackTicket={s.ticket_url} artists={artists} />}
      <main className="page">
        {!next && (
          <>
            <h1 className="page-title">Events</h1>
            <p className="empty">No events announced yet. Follow us for the next drop.</p>
          </>
        )}
        {later.length > 0 && (
          <section className="section">
            <h2>More upcoming</h2>
            <div className="stack">
              {later.map((e) => <EventFeature key={e.id} event={e} fallbackTicket={s.ticket_url} artists={artists} />)}
            </div>
          </section>
        )}
        {past.length > 0 && (
          <section className="section">
            <h2>Past</h2>
            <PastEvents events={past} />
          </section>
        )}
      </main>
      <Footer settings={s} />
    </>
  );
}
