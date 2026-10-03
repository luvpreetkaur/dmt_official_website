import Link from 'next/link';

export default function Footer({ settings }) {
  const s = settings;
  const wa = (s.whatsapp || '').replace(/\D/g, '');
  const links = [
    s.instagram && ['Instagram', s.instagram],
    s.youtube && ['YouTube', s.youtube],
    s.facebook && ['Facebook', s.facebook],
    s.soundcloud && ['SoundCloud', s.soundcloud],
    wa && ['WhatsApp', `https://wa.me/${wa}`],
    s.email && ['Email', `mailto:${s.email}`],
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="footer-name">Divyah Moments of Trance</div>
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
      <Link href="/admin" className="footer-admin">Admin</Link>
    </footer>
  );
}
