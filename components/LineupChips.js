// Lineup names from an event; a name matching an artist with a link becomes clickable.
export default function LineupChips({ lineup, artists = [], className = '' }) {
  const names = (lineup || '').split(',').map((x) => x.trim()).filter(Boolean);
  if (names.length === 0) return null;
  const links = new Map(artists.filter((a) => a.link_url).map((a) => [a.name.trim().toLowerCase(), a.link_url]));

  return (
    <ul className={`chips ${className}`} aria-label="Lineup">
      {names.map((n) => {
        const url = links.get(n.toLowerCase());
        return (
          <li key={n}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${n} on Instagram`}>
                {/instagram\.com/.test(url) && <InstagramIcon />}
                {n}
              </a>
            ) : (
              n
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function InstagramIcon() {
  return (
    <svg className="chip-ig" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}
