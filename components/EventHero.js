import HeroStage from './HeroStage';
import Flyer from './Flyer';
import FloatingObjects from './FloatingObjects';
import LineupChips from './LineupChips';
import { fmtFull } from '@/lib/data';

export default function EventHero({ event, presenter, fallbackTicket, artists }) {
  const ticket = event.ticket_url || fallbackTicket;
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
          <LineupChips lineup={event.lineup} artists={artists} className="eh-chips" />
          {ticket && (
            <div className="eh-actions">
              <a className="btn btn-primary" href={ticket} target="_blank" rel="noopener noreferrer">
                Get tickets
              </a>
            </div>
          )}
        </div>
      </div>
    </HeroStage>
  );
}
