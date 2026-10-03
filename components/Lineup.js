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
            {a.origin && <p className="artist-origin">{a.origin}</p>}
            {a.bio && <p className="artist-bio">{a.bio}</p>}
          </>
        );
        return (
          <li key={a.id} className="artist">
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
