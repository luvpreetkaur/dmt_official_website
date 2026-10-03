'use client';
import MediaField from './MediaField';

// India time helpers: events are always entered and shown in IST, wherever the admin is.
export function isoToIstInput(iso) {
  if (!iso) return '';
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(iso)).reduce((a, x) => ((a[x.type] = x.value), a), {});
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}
export function istInputToIso(v) {
  return v ? new Date(`${v}:00+05:30`).toISOString() : null;
}

export default function Fields({ fields, values, onChange }) {
  return fields.map((f) => {
    const id = `f-${f.name}`;
    const set = (v) => onChange(f.name, v);
    const v = values[f.name] ?? '';
    return (
      <div className="field" key={f.name}>
        <label htmlFor={id}>{f.label}</label>
        {f.type === 'textarea' && <textarea id={id} value={v} onChange={(e) => set(e.target.value)} required={f.required} />}
        {f.type === 'media' && <MediaField id={id} value={v} onChange={set} accept={f.accept} />}
        {f.type === 'select' && (
          <select id={id} value={v} onChange={(e) => set(e.target.value)}>
            {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        )}
        {f.type === 'datetime' && (
          <input id={id} type="datetime-local" value={isoToIstInput(v)} onChange={(e) => set(istInputToIso(e.target.value))} required={f.required} />
        )}
        {f.type === 'number' && <input id={id} type="number" value={v} onChange={(e) => set(e.target.value === '' ? 0 : Number(e.target.value))} />}
        {(!f.type || f.type === 'text' || f.type === 'url') && (
          <input id={id} type={f.type === 'url' ? 'url' : 'text'} value={v} onChange={(e) => set(e.target.value)} required={f.required} />
        )}
        {f.help && <small>{f.help}</small>}
      </div>
    );
  });
}
