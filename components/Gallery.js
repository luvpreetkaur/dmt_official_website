import { youtubeId } from '@/lib/data';

// instagram.com/<user>/reel/<code>/ or /p/<code>/ -> embeddable player URL
function instagramEmbed(url) {
  const m = (url || '').match(/instagram\.com\/(?:[^/]+\/)?(reel|p)\/([\w-]+)/);
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null;
}

export default function Gallery({ items }) {
  return (
    <div className="gallery">
      {items.map((g) => {
        const yt = g.kind === 'video' ? youtubeId(g.url) : null;
        const ig = g.kind === 'video' && !yt ? instagramEmbed(g.url) : null;
        return (
          <figure key={g.id} className="gallery-item">
            {g.kind === 'video' ? (
              yt ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${yt}`}
                  title={g.caption || 'Video'}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : ig ? (
                <iframe
                  className="ig-embed"
                  src={ig}
                  title={g.caption || 'Instagram reel'}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                />
              ) : (
                <video src={g.url} controls preload="metadata" playsInline />
              )
            ) : (
              <img src={g.url} alt={g.caption || 'Divyah Moments of Trance'} loading="lazy" />
            )}
            {g.caption && <figcaption>{g.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}
