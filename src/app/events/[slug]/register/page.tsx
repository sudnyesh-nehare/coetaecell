import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { events, canRegister } from '@/content/events';
import { RegistrationFlow } from '@/components/registration/registration-flow';
import { CTAButton } from '@/components/ui';
export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: { index: false, follow: true },
    title: `Register · ${events.find((event) => event.slug === slug)?.title ?? 'Event not found'}`,
  };
}
export default async function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  if (!canRegister(event))
    return (
      <div className="container page-content">
        <div className="page-intro">
          <p className="eyebrow">EVENT</p>
          <h1>Registration unavailable.</h1>
          <p>
            Registration is {event.registration.toLowerCase()} for {event.title}.
          </p>
        </div>
        <CTAButton href={`/events/${event.slug}`}>Back to Event</CTAButton>
      </div>
    );
  return <RegistrationFlow event={event} />;
}
