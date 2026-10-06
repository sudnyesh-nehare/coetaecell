import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { informationPages, initiatives } from '@/content/site';
import { CTAButton } from '@/components/ui';
import { NecJourney } from '@/components/nec-journey';
import { TextReveal } from '@/components/motion/primitives';
type PageKey = keyof typeof informationPages;
function isPageKey(key: string): key is PageKey {
  return Object.prototype.hasOwnProperty.call(informationPages, key);
}
export function generateStaticParams() {
  return Object.keys(informationPages)
    .filter((page) => page !== 'team')
    .map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: isPageKey(page)
      ? page === 'nec'
        ? 'NEC'
        : page.charAt(0).toUpperCase() + page.slice(1)
      : 'Page not found',
  };
}
export default async function InformationPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!isPageKey(page)) notFound();
  if (page === 'nec') return <NecJourney />;
  const content = informationPages[page];
  return (
    <div className="container page-content">
      <section className="page-intro">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>
          <TextReveal text={content.title} initial />
        </h1>
        <p>{content.description}</p>
      </section>
      {page === 'initiatives' && (
        <div className="initiative-grid placeholder-initiatives">
          {initiatives.map((item) => (
            <article className="initiative-card" key={item.number}>
              <span className="eyebrow">
                {item.number} / {item.category}
              </span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      )}
      <section className="placeholder-body">
        <p className="eyebrow">A FOUNDATION FOR WHAT COMES NEXT</p>
        <div>
          <h2>{content.heading}</h2>
          <p>{content.body}</p>
          <CTAButton href={page === 'contact' ? 'https://coeta.ac.in/' : '/events'} secondary>
            {page === 'contact' ? 'Official college website' : 'Explore Events'}
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
