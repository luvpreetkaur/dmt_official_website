import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import EventFeature from '@/components/EventFeature';
import PastEvents from '@/components/PastEvents';
import { getSiteData, splitEvents } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'Events | Divyah Moments of Trance' };

export default async function EventsPage() {
  const { settings: s, events } = await getSiteData();
  const { upcoming, past } = splitEvents(events);
  return (
    <>
      <Nav />
      <main className="page">
        <h1 className="page-title">Events</h1>
        <section className="section">
          <h2>Upcoming</h2>
          {upcoming.length === 0 && <p className="empty">No events announced yet.</p>}
          <div className="stack">
            {upcoming.map((e) => <EventFeature key={e.id} event={e} fallbackTicket={s.ticket_url} />)}
          </div>
        </section>
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
