'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Fields from './Fields';

export default function Crud({ table, noun, fields, orderBy, ascending = true, blank, describe }) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState({ text: '', err: false });

  async function load() {
    const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending });
    if (error) setMsg({ text: error.message, err: true });
    else setRows(data);
  }
  useEffect(() => { load(); }, []); // eslint-disable-line

  async function save(e) {
    e.preventDefault();
    const { id, created_at, ...rest } = editing;
    const payload = {};
    fields.forEach((f) => {
      const v = rest[f.name];
      payload[f.name] = typeof v === 'string' ? v.trim() || (f.required ? '' : null) : v;
    });
    const q = id ? supabase.from(table).update(payload).eq('id', id) : supabase.from(table).insert(payload);
    const { error } = await q;
    if (error) return setMsg({ text: error.message, err: true });
    setEditing(null);
    setMsg({ text: 'Saved. The live site updates within about 30 seconds.', err: false });
    load();
  }

  async function remove(row) {
    if (!confirm(`Delete this ${noun}? This cannot be undone.`)) return;
    const { error } = await supabase.from(table).delete().eq('id', row.id);
    if (error) setMsg({ text: error.message, err: true });
    else { setMsg({ text: 'Deleted.', err: false }); load(); }
  }

  if (editing) {
    return (
      <form className="panel" onSubmit={save}>
        <Fields fields={fields} values={editing} onChange={(k, v) => setEditing({ ...editing, [k]: v })} />
        <div className="actions">
          <button className="btn btn-primary" type="submit">Save {noun}</button>
          <button className="btn btn-ghost" type="button" onClick={() => setEditing(null)}>Cancel</button>
        </div>
        {msg.err && <p className="msg err">{msg.text}</p>}
      </form>
    );
  }

  return (
    <div className="panel">
      <button className="btn btn-primary btn-sm" onClick={() => { setMsg({ text: '', err: false }); setEditing({ ...blank }); }}>
        Add {noun}
      </button>
      {msg.text && <p className={`msg ${msg.err ? 'err' : ''}`}>{msg.text}</p>}
      {rows.length === 0 && <p className="sub">Nothing here yet. Add your first {noun}.</p>}
      <ul className="list">
        {rows.map((r) => {
          const d = describe(r);
          return (
            <li key={r.id}>
              <div className="grow">
                <div>{d.title}</div>
                {d.sub && <div className="sub">{d.sub}</div>}
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => { setMsg({ text: '', err: false }); setEditing(r); }}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => remove(r)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
