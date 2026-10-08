import { InstagramIcon } from './LineupChips';

// "https://www.instagram.com/spand_music/" -> "@spand_music"
function igHandle(url) {
  const m = (url || '').match(/instagram\.com\/([\w.]+)/);
  return m ? `@${m[1]}` : null;
}

export default function Lineup({ artists }) {
  return (
    <ul className="artists">
      {artists.map((a) => {
        const inner = (
          <>
            {a.photo_url ? (
              <img src={a.photo_url} alt={a.name} loading="lazy" />
            ) : (
              <div className="artist-ph" aria-hidden="true">{a.name.slice(0, 1)}</div>
            )}
            <h3>{a.name}</h3>
            {igHandle(a.link_url) && (
              <p className="artist-ig"><InstagramIcon />{igHandle(a.link_url)}</p>
            )}
            {a.origin && <p className="artist-origin">{a.origin}</p>}
            {a.bio && <p className="artist-bio">{a.bio}</p>}
          </>
        );
        return (
          <li key={a.id || a.name} className="artist">
            {a.link_url ? (
              <a href={a.link_url} target="_blank" rel="noopener noreferrer">{inner}</a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
