import { supabase, isConfigured } from './supabase';
import { demoSettings, demoEvents, demoArtists, demoGallery } from './demo';

export async function getSiteData() {
  if (!isConfigured) {
    return { demo: true, settings: demoSettings, events: demoEvents, artists: demoArtists, gallery: demoGallery };
  }
  const [s, e, a, g] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
    supabase.from('events').select('*').order('starts_at', { ascending: true }),
    supabase.from('artists').select('*').order('sort_order', { ascending: true }),
    supabase.from('gallery').select('*').order('sort_order', { ascending: true }),
  ]);
  return {
    demo: false,
    settings: s.data || demoSettings,
    events: e.data || [],
    artists: a.data || [],
    gallery: g.data || [],
  };
}

export function splitEvents(events) {
  const cutoff = Date.now() - 12 * 3600 * 1000; // an event stays "upcoming" until 12h after start
  const upcoming = events.filter((ev) => new Date(ev.starts_at).getTime() >= cutoff);
  const past = events
    .filter((ev) => new Date(ev.starts_at).getTime() < cutoff)
    .sort((x, y) => new Date(y.starts_at) - new Date(x.starts_at));
  return { upcoming, past };
}

const TZ = 'Asia/Kolkata';

export function fmtDay(iso) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: TZ }).format(new Date(iso));
}
export function fmtFull(iso) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: TZ,
  }).format(new Date(iso));
}
export function fmtYear(iso) {
  return new Intl.DateTimeFormat('en-IN', { year: 'numeric', timeZone: TZ }).format(new Date(iso));
}

export function youtubeId(url = '') {
  const m = (url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}
