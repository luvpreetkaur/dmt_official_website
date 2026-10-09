// Endless ticker band. The phrases are rendered twice so the loop is seamless.
export default function Marquee({ items, reverse = false, className = '' }) {
  const row = items.flatMap((t, i) => [
    <span key={`t${i}`} className="mq-item">{t}</span>,
    <span key={`s${i}`} className="mq-star" aria-hidden="true">✦</span>,
  ]);
  return (
    <div className={`mq ${reverse ? 'mq-rev' : ''} ${className}`}>
      <div className="mq-track">
        <div className="mq-run">{row}</div>
        <div className="mq-run" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}
