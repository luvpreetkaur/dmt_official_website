'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Fields from './Fields';

export default function SettingsForm({ fields }) {
  const [values, setValues] = useState(null);
  const [msg, setMsg] = useState({ text: '', err: false });

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data, error }) => {
      if (error) setMsg({ text: error.message, err: true });
      setValues(data || {});
    });
  }, []);

  async function save(e) {
    e.preventDefault();
    const payload = { id: 1, updated_at: new Date().toISOString() };
    fields.forEach((f) => { payload[f.name] = (values[f.name] ?? '').toString().trim() || null; });
    const { error } = await supabase.from('site_settings').upsert(payload);
    setMsg(error ? { text: error.message, err: true } : { text: 'Saved. The live site updates within about 30 seconds.', err: false });
  }

  if (!values) return <p>Loading...</p>;
  return (
    <form className="panel" onSubmit={save}>
      <Fields fields={fields} values={values} onChange={(k, v) => setValues({ ...values, [k]: v })} />
      <button className="btn btn-primary" type="submit">Save changes</button>
      {msg.text && <p className={`msg ${msg.err ? 'err' : ''}`}>{msg.text}</p>}
    </form>
  );
}
