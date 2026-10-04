import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { placeholderPages, initiatives } from '@/content/site';
import { CTAButton, DemoNotice } from '@/components/ui';
import { GalleryGrid } from '@/components/gallery-grid';
type PageKey = keyof typeof placeholderPages;
function isPageKey(key: string): key is PageKey {
  return key in placeholderPages;
}
export function generateStaticParams() {
  return Object.keys(placeholderPages).map((page) => ({ page }));
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
  const content = placeholderPages[page];
  return (
    <div className="container page-content">
      <section className="page-intro">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="whitespace-pre-line">{content.title}</h1>
        <p>{content.description}</p>
      </section>
      <DemoNotice>{content.note}</DemoNotice>
      {page === 'gallery' && <GalleryGrid />}
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
          <CTAButton href="/events" secondary>
            Explore the demo events
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
