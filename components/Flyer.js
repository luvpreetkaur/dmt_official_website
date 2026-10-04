// Flyer image, or a generated trippy placeholder when none is uploaded.
export default function Flyer({ url, title, eager = false }) {
  if (url) {
    return (
      <img
        className="flyer"
        src={url}
        alt={`Flyer: ${title}`}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
      />
    );
  }
  return <div className="flyer flyer-ph" role="img" aria-label={`${title} (flyer coming soon)`} />;
}
