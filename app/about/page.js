import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ThemedHero from '@/components/ThemedHero';
import Reveal from '@/components/Reveal';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'About | Divyah Moments of Trance' };

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
  const paragraphs = (s.about_body || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  // A closing paragraph written one line per thought becomes the manifesto.
  const lastLines = (paragraphs[paragraphs.length - 1] || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const manifesto = paragraphs.length > 1 && lastLines.length >= 3 ? lastLines : null;
  const [lead, ...story] = manifesto ? paragraphs.slice(0, -1) : paragraphs;

  return (
    <>
      <Nav />
      <main className="about-page">
        <ThemedHero eyebrow={s.about_title} title={name} />

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
