'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MediaField({ value, onChange, accept = 'image/*', id }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr('');
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { cacheControl: '31536000' });
    if (error) setErr(error.message);
    else onChange(supabase.storage.from('media').getPublicUrl(path).data.publicUrl);
    setBusy(false);
    e.target.value = '';
  }

  const isImg = value && /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(value);

  return (
    <div>
      <div className="media-row">
        {isImg && <img className="thumb" src={value} alt="" />}
        <input id={id} type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Paste a link, or upload" />
        <label className="btn btn-ghost btn-sm">
          {busy ? 'Uploading...' : 'Upload'}
          <input type="file" accept={accept} onChange={onFile} hidden disabled={busy} />
        </label>
      </div>
      {err && <p className="msg err">{err}</p>}
    </div>
  );
}
