import Link from 'next/link';
import HeroStage from './HeroStage';
import Flyer from './Flyer';
import FloatingObjects from './FloatingObjects';
import { fmtFull } from '@/lib/data';

export default function EventHero({ event, presenter, fallbackTicket }) {
  const ticket = event.ticket_url || fallbackTicket;
  const lineup = (event.lineup || '').split(',').map((x) => x.trim()).filter(Boolean);
  const where = [event.venue, event.city].filter(Boolean).join(', ');

  return (
    <HeroStage id="events" className="event-hero">
      {event.flyer_url && (
        <img className="eh-backdrop" src={event.flyer_url} alt="" aria-hidden="true" />
      )}
      <div className="eh-beams" aria-hidden="true" />
      <div className="eh-light eh-light-a" aria-hidden="true" />
      <div className="eh-light eh-light-b" aria-hidden="true" />
      <div className="eh-light eh-light-c" aria-hidden="true" />

      <FloatingObjects />

      <div className="eh-inner">
        <div className="eh-stage">
          <div className="eh-halo" aria-hidden="true" />
          <div className="eh-bob">
            <div className="eh-card">
              <Flyer url={event.flyer_url} title={event.title} eager />
              <div className="eh-glare" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="eh-text">
          {presenter && <p className="eh-eyebrow">{presenter} presents</p>}
          <p className="eh-date">{fmtFull(event.starts_at)}</p>
          <h1 className="eh-title">{event.title}</h1>
          {where && <p className="eh-where">{where}</p>}
          {event.description && <p className="eh-desc">{event.description}</p>}
          {lineup.length > 0 && (
            <ul className="chips eh-chips" aria-label="Lineup">
              {lineup.map((n) => <li key={n}>{n}</li>)}
            </ul>
          )}
          <div className="eh-actions">
            {ticket && (
              <a className="btn btn-primary" href={ticket} target="_blank" rel="noopener noreferrer">
                Get tickets
              </a>
            )}
            <Link className="btn btn-ghost" href="/events">All events</Link>
          </div>
        </div>
      </div>
    </HeroStage>
  );
}
