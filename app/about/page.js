import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Mandala from '@/components/Mandala';
import HeroStage from '@/components/HeroStage';
import FloatingObjects from '@/components/FloatingObjects';
import Reveal from '@/components/Reveal';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'About | Divyah Moments of Trance' };

// Kept to the edges so the centred title stays clear.
const ABOUT_OBJECTS = [
  { k: 'gem', x: 7, y: 16, s: 54, d: 13, r: -16, c: 'cool' },
  { k: 'mush', x: 10, y: 72, s: 60, d: 15, r: -6, c: 'hot' },
  { k: 'orb', x: 22, y: 40, s: 40, d: 12, r: 0, c: 'hot', far: true },
  { k: 'spark', x: 30, y: 12, s: 20, d: 4, r: 0 },
  { k: 'diamond', x: 88, y: 18, s: 48, d: 12, r: 12, c: 'hot' },
  { k: 'orb', x: 86, y: 66, s: 58, d: 14, r: 0, c: 'cool' },
  { k: 'gem', x: 76, y: 44, s: 30, d: 10, r: 26, c: 'cool', far: true },
  { k: 'spark', x: 70, y: 82, s: 18, d: 5, r: 0 },
  { k: 'spark', x: 94, y: 42, s: 16, d: 6, r: 0 },
  { k: 'mush', x: 64, y: 10, s: 36, d: 16, r: 8, c: 'cool', far: true },
];

// Wraps every occurrence of `phrase` in a highlight span.
function highlight(text, phrase) {
  if (!phrase || !text.includes(phrase)) return text;
  return text.split(phrase).flatMap((part, i) => (i ? [<span key={i} className="ab-hl">{phrase}</span>, part] : [part]));
}

// "Where music becomes language." -> last word glows.
function glowLastWord(line) {
  const m = line.match(/^(.*\s)?(\S+?)([.!?,]*)$/);
  if (!m) return line;
  return <>{m[1]}<span className="ab-word">{m[2]}</span>{m[3]}</>;
}

export default async function AboutPage() {
  const { settings: s } = await getSiteData();
  const name = s.hero_title || 'Divyah Moments of Trance';
  const initials = name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]);
  const paragraphs = (s.about_body || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  // A closing paragraph written one line per thought becomes the manifesto.
  const lastLines = (paragraphs[paragraphs.length - 1] || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const manifesto = paragraphs.length > 1 && lastLines.length >= 3 ? lastLines : null;
  const [lead, ...story] = manifesto ? paragraphs.slice(0, -1) : paragraphs;

  return (
    <>
      <Nav />
      <main className="about-page">
        <HeroStage className="ab-hero">
          <div className="ab-sun" aria-hidden="true" />
          <div className="eh-beams" aria-hidden="true" />
          <div className="eh-light eh-light-a" aria-hidden="true" />
          <div className="eh-light eh-light-b" aria-hidden="true" />
          <Mandala className="ab-mandala" />
          <FloatingObjects objects={ABOUT_OBJECTS} />
          <div className="ab-hero-text">
            <p className="eh-eyebrow">{s.about_title}</p>
            <h1 className="ab-title">{name}</h1>
            {initials.length > 1 && (
              <p className="ab-initials" aria-hidden="true">
                {initials.map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>)}
              </p>
            )}
          </div>
          <span className="ab-cue" aria-hidden="true" />
        </HeroStage>

        <Reveal className="ab-body">
          {lead && (
            <section className="ab-lead reveal">
              <p>{highlight(lead, name)}</p>
            </section>
          )}

          {story.map((p, i) => (
            <section key={i} className="ab-story reveal">
              <p>{p}</p>
            </section>
          ))}

          {s.about_image_url && <img className="ab-img reveal" src={s.about_image_url} alt="" />}

          {manifesto && (
            <section className="ab-manifesto" aria-label="What we stand for">
              <p className="ab-m-intro reveal">{manifesto[0]}</p>
              <ul>
                {manifesto.slice(1).map((line, i) => (
                  <li key={i} className="reveal" style={{ '--i': i }}>{glowLastWord(line)}</li>
                ))}
              </ul>
            </section>
          )}

          <p className="ab-cta reveal">
            <Link className="btn btn-primary" href="/events">Upcoming events</Link>
          </p>
        </Reveal>
      </main>
      <Footer settings={s} />
    </>
  );
}
