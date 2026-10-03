import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getSiteData } from '@/lib/data';

export const revalidate = 30;
export const metadata = { title: 'About | Divyah Moments of Trance' };

export default async function AboutPage() {
  const { settings: s } = await getSiteData();
  const paragraphs = (s.about_body || '').split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      <Nav />
      <main className="page about">
        <h1 className="page-title">{s.about_title}</h1>
        <div className={s.about_image_url ? 'about-grid' : ''}>
          <div className="prose">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {s.about_image_url && <img className="about-img" src={s.about_image_url} alt="" />}
        </div>
      </main>
      <Footer settings={s} />
    </>
  );
}
