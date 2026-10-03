import { youtubeId } from '@/lib/data';

export default function Gallery({ items }) {
  return (
    <div className="gallery">
      {items.map((g) => {
        const yt = g.kind === 'video' ? youtubeId(g.url) : null;
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
              ) : (
                <video src={g.url} controls preload="metadata" playsInline />
              )
            ) : (
              <img src={g.url} alt={g.caption || 'DMT moment'} loading="lazy" />
            )}
            {g.caption && <figcaption>{g.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}
