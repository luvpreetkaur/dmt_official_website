import HeroStage from './HeroStage';
import FloatingObjects from './FloatingObjects';
import Reveal from './Reveal';
import Lineup from './Lineup';
import { fmtFull } from '@/lib/data';

// Splits an image into R, G and B copies so they can drift apart (chromatic
// aberration) and recombine; plus a slow liquid warp. Used by .fx-* in CSS.
function Filters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="fx-r"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
      <filter id="fx-g"><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
      <filter id="fx-b"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" /></filter>
      <filter id="fx-liquid" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="2" seed="7" result="noise">
          <animate attributeName="baseFrequency" dur="14s" repeatCount="indefinite"
            values="0.006 0.009; 0.009 0.006; 0.006 0.009" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export default function FlyerExperience({ event, presenter, fallbackTicket, artists = [] }) {
  const ticket = event.ticket_url || fallbackTicket;
  const where = [event.venue, event.city].filter(Boolean).join(', ');
  const byName = new Map(artists.map((a) => [a.name.trim().toLowerCase(), a]));
  const lineup = (event.lineup || '').split(',').map((n) => n.trim()).filter(Boolean)
    .map((n) => byName.get(n.toLowerCase()) || { name: n });

  return (
    <>
      <HeroStage id="events" className="fx-stage">
        <Filters />
        {event.flyer_url && <img className="fx-bg" src={event.flyer_url} alt="" aria-hidden="true" />}
        <div className="eh-beams" aria-hidden="true" />
        <div className="eh-light eh-light-a" aria-hidden="true" />
        <div className="eh-light eh-light-b" aria-hidden="true" />
        <FloatingObjects />

        <div className="fx-art-wrap">
          <div className="eh-halo" aria-hidden="true" />
          <div className="fx-art">
            {event.flyer_url ? (
              <div className="fx-liquid">
                <img className="fx-img" src={event.flyer_url} alt={`Flyer: ${event.title}`} fetchPriority="high" />
                <img className="fx-img fx-ch fx-ch-r" src={event.flyer_url} alt="" aria-hidden="true" />
                <img className="fx-img fx-ch fx-ch-g" src={event.flyer_url} alt="" aria-hidden="true" />
                <img className="fx-img fx-ch fx-ch-b" src={event.flyer_url} alt="" aria-hidden="true" />
              </div>
            ) : (
              <div className="flyer flyer-ph" role="img" aria-label={event.title} />
            )}
            <div className="eh-glare" aria-hidden="true" />
          </div>
        </div>

        {ticket && (
          <a className="btn btn-primary fx-float-ticket" href={ticket} target="_blank" rel="noopener noreferrer">
            Get tickets
          </a>
        )}
        <span className="ab-cue" aria-hidden="true" />
      </HeroStage>

      <Reveal className="fx-info">
        <section className="fx-details">
          {presenter && <p className="eh-eyebrow reveal">{presenter} presents</p>}
          <h1 className="fx-title reveal">{event.title}</h1>
          <p className="fx-when reveal">{fmtFull(event.starts_at)}</p>
          {where && <p className="fx-where reveal">{where}</p>}
          {event.description && <p className="fx-desc reveal">{event.description}</p>}
          {ticket && (
            <p className="reveal">
              <a className="btn btn-primary fx-ticket" href={ticket} target="_blank" rel="noopener noreferrer">Get tickets</a>
            </p>
          )}
        </section>

        {lineup.length > 0 && (
          <section className="fx-lineup" aria-labelledby="fx-lineup-h">
            <h2 id="fx-lineup-h" className="fx-lineup-h reveal">Lineup</h2>
            <div className="reveal"><Lineup artists={lineup} /></div>
          </section>
        )}
      </Reveal>
    </>
  );
}
