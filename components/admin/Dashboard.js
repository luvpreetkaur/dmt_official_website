'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import SettingsForm from './SettingsForm';
import Crud from './Crud';
import { fmtFull } from '@/lib/data';

const homeFields = [
  { name: 'hero_title', label: 'Homepage headline' },
  { name: 'hero_tagline', label: 'Tagline under the headline', type: 'textarea' },
  { name: 'hero_cta_label', label: 'Homepage button text' },
  { name: 'footer_note', label: 'Footer line' },
];
const aboutFields = [
  { name: 'about_title', label: 'About page title' },
  { name: 'about_body', label: 'About text', type: 'textarea', help: 'Leave a blank line between paragraphs. The first paragraph also shows on the homepage.' },
  { name: 'about_image_url', label: 'About image (optional)', type: 'media' },
];
const linkFields = [
  { name: 'ticket_url', label: 'Default ticketing link', type: 'url', help: 'Used for any event that has no ticket link of its own.' },
  { name: 'instagram', label: 'Instagram link', type: 'url' },
  { name: 'youtube', label: 'YouTube link', type: 'url' },
  { name: 'facebook', label: 'Facebook link', type: 'url' },
  { name: 'soundcloud', label: 'SoundCloud link', type: 'url' },
  { name: 'whatsapp', label: 'WhatsApp number', help: 'With country code, e.g. 919876543210' },
  { name: 'email', label: 'Contact email' },
];
const eventFields = [
  { name: 'title', label: 'Event name', required: true },
  { name: 'starts_at', label: 'Date and time (India time)', type: 'datetime', required: true },
  { name: 'venue', label: 'Venue' },
  { name: 'city', label: 'City' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'lineup', label: 'Lineup', help: 'Artist names separated by commas.' },
  { name: 'flyer_url', label: 'Flyer', type: 'media' },
  { name: 'ticket_url', label: 'Ticket link for this event', type: 'url', help: 'Leave empty to use the default ticketing link.' },
];
const artistFields = [
  { name: 'name', label: 'Artist name', required: true },
  { name: 'origin', label: 'Country or city' },
  { name: 'bio', label: 'Short bio', type: 'textarea' },
  { name: 'photo_url', label: 'Photo', type: 'media' },
  { name: 'link_url', label: 'Link (SoundCloud, Instagram...)', type: 'url' },
  { name: 'sort_order', label: 'Order', type: 'number', help: 'Lower numbers show first.' },
];
const galleryFields = [
  { name: 'kind', label: 'Type', type: 'select', options: [{ value: 'image', label: 'Photo' }, { value: 'video', label: 'Video' }] },
  { name: 'url', label: 'File or link', type: 'media', accept: 'image/*,video/*', required: true, help: 'For videos, paste a YouTube link or upload an MP4.' },
  { name: 'caption', label: 'Caption' },
  { name: 'sort_order', label: 'Order', type: 'number', help: 'Lower numbers show first.' },
];

const TABS = ['Homepage', 'Events', 'Lineup', 'Gallery', 'About', 'Links'];

export default function Dashboard({ email }) {
  const [tab, setTab] = useState('Homepage');
  return (
    <div className="admin">
      <div className="admin-top">
        <h1>DMT admin</h1>
        <div className="actions" style={{ marginTop: 0 }}>
          <a className="btn btn-ghost btn-sm" href="/" target="_blank" rel="noopener noreferrer">View site</a>
          <button className="btn btn-ghost btn-sm" onClick={() => supabase.auth.signOut()}>Sign out ({email})</button>
        </div>
      </div>
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className="tab" onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {tab === 'Homepage' && <SettingsForm fields={homeFields} />}
      {tab === 'About' && <SettingsForm fields={aboutFields} />}
      {tab === 'Links' && <SettingsForm fields={linkFields} />}
      {tab === 'Events' && (
        <Crud key="events" table="events" noun="event" fields={eventFields} orderBy="starts_at" ascending={false}
          blank={{ title: '', starts_at: null, venue: '', city: '', description: '', lineup: '', flyer_url: '', ticket_url: '' }}
          describe={(r) => ({ title: r.title, sub: `${fmtFull(r.starts_at)}${r.city ? `, ${r.city}` : ''}` })} />
      )}
      {tab === 'Lineup' && (
        <Crud key="artists" table="artists" noun="artist" fields={artistFields} orderBy="sort_order"
          blank={{ name: '', origin: '', bio: '', photo_url: '', link_url: '', sort_order: 0 }}
          describe={(r) => ({ title: r.name, sub: r.origin })} />
      )}
      {tab === 'Gallery' && (
        <Crud key="gallery" table="gallery" noun="item" fields={galleryFields} orderBy="sort_order"
          blank={{ kind: 'image', url: '', caption: '', sort_order: 0 }}
          describe={(r) => ({ title: r.caption || r.url.slice(0, 60), sub: r.kind === 'video' ? 'Video' : 'Photo' })} />
      )}
    </div>
  );
}
