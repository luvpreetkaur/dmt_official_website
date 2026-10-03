import { fmtDay, fmtYear } from '@/lib/data';

export default function EventRow({ event, fallbackTicket }) {
  const ticket = event.ticket_url || fallbackTicket;
  return (
    <li className="row-event">
      <div className="row-date">
        <strong>{fmtDay(event.starts_at)}</strong>
        <span>{fmtYear(event.starts_at)}</span>
      </div>
      <div className="row-info">
        <h3>{event.title}</h3>
        <p>{[event.venue, event.city].filter(Boolean).join(', ')}</p>
      </div>
      {ticket && (
        <a className="btn btn-ghost" href={ticket} target="_blank" rel="noopener noreferrer">Tickets</a>
      )}
    </li>
  );
}
