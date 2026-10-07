import Flyer from './Flyer';
import LineupChips from './LineupChips';
import { fmtFull } from '@/lib/data';

export default function EventFeature({ event, fallbackTicket, artists }) {
  const ticket = event.ticket_url || fallbackTicket;
  return (
    <article className="feature">
      <Flyer url={event.flyer_url} title={event.title} />
      <div className="feature-body">
        <p className="feature-date">{fmtFull(event.starts_at)}</p>
        <h3>{event.title}</h3>
        <p className="feature-where">{[event.venue, event.city].filter(Boolean).join(', ')}</p>
        {event.description && <p className="feature-desc">{event.description}</p>}
        <LineupChips lineup={event.lineup} artists={artists} />
        {ticket && (
          <a className="btn btn-primary" href={ticket} target="_blank" rel="noopener noreferrer">
            Get tickets
          </a>
        )}
      </div>
    </article>
  );
}
