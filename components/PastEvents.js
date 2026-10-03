import Flyer from './Flyer';
import { fmtDay, fmtYear } from '@/lib/data';

export default function PastEvents({ events }) {
  return (
    <ul className="past-grid">
      {events.map((e) => (
        <li key={e.id} className="past-card">
          <Flyer url={e.flyer_url} title={e.title} />
          <h3>{e.title}</h3>
          <p>
            {fmtDay(e.starts_at)} {fmtYear(e.starts_at)}
            {e.city ? `, ${e.city}` : ''}
          </p>
        </li>
      ))}
    </ul>
  );
}
