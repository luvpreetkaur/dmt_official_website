import { supabase, isConfigured } from '@/lib/supabase';

// Hit daily by the Vercel cron in vercel.json so the free Supabase project
// never counts as inactive (inactive free projects get paused).
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isConfigured) return Response.json({ ok: false, reason: 'supabase not configured' }, { status: 503 });
  const { error } = await supabase.from('site_settings').select('id').limit(1);
  if (error) return Response.json({ ok: false, reason: error.message }, { status: 502 });
  return Response.json({ ok: true, at: new Date().toISOString() });
}
