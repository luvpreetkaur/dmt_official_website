import { InstagramIcon } from './LineupChips';

// "https://www.instagram.com/dmt.india/" -> "@dmt.india"
function igHandle(url) {
  const m = (url || '').match(/instagram\.com\/([\w.]+)/);
  return m ? `@${m[1]}` : 'Instagram';
}

export default function Footer({ settings }) {
  const s = settings;
  const wa = (s.whatsapp || '').replace(/\D/g, '');
  const links = [
    s.youtube && ['YouTube', s.youtube],
    s.facebook && ['Facebook', s.facebook],
    s.soundcloud && ['SoundCloud', s.soundcloud],
    wa && ['WhatsApp', `https://wa.me/${wa}`],
    s.email && ['Email', `mailto:${s.email}`],
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="footer-name">Divyah Moments of Trance</div>
      {s.instagram && (
        <a className="ig-portal" href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Follow ${igHandle(s.instagram)} on Instagram`}>
          <span className="ig-ring" aria-hidden="true" />
          <span className="ig-inner">
            <InstagramIcon />
            <span>
              <small>Follow the journey</small>
              {igHandle(s.instagram)}
            </span>
          </span>
          {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="ig-spark" style={{ '--k': i }} aria-hidden="true">✦</span>)}
        </a>
      )}
      {links.length > 0 && (
        <ul className="footer-links">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      )}
      <p className="footer-note">{s.footer_note}</p>
    </footer>
  );
}
