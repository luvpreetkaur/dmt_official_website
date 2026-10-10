import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HomeHero from '@/components/HomeHero';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;

const BAND_A = ['One dancefloor', 'One frequency', 'One family', 'Where the dancefloor becomes home'];
const BAND_B = ['Psytrance is not a genre', "It's a journey", 'Born on the dancefloor', 'A movement for the culture'];

export default async function Home() {
  const { demo, settings: s } = await getSiteData();

  return (
    <>
      <Nav />
      {demo && (
        <p className="demo-banner">Preview content. Connect Supabase and edit from /admin to go live.</p>
      )}
      <main>
        <HomeHero title={s.hero_title} cta={s.hero_cta_label} />

        <section className="hh-bands" aria-label="What we stand for">
          <Marquee items={BAND_A} className="mq-a" />
          <Marquee items={BAND_B} reverse className="mq-b" />
        </section>

        <Reveal className="hh-statement">
          <p className="hh-st-line reveal">We were not created in a boardroom.</p>
          <p className="hh-st-line hh-st-big reveal" style={{ '--i': 1 }}>We were born on the dancefloor.</p>
          <p className="reveal" style={{ '--i': 2 }}>
            <Link className="btn btn-primary hh-btn" href="/about">Our story</Link>
          </p>
        </Reveal>
      </main>
      <Footer settings={s} />
    </>
  );
}
