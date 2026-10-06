import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { events, eventDate, eventSections, canRegister } from '@/content/events';
import { TextReveal } from '@/components/motion/primitives';
import { CTAButton, ImagePanel } from '@/components/ui';
export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  return { title: event?.title ?? 'Event not found', description: event?.description };
}
export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  const sections = eventSections(event);
  const open = canRegister(event);
  const registrationHref = `/events/${event.slug}/register`;
  return (
    <div className="event-detail">
      <section className="container event-hero">
        <Link href="/events" className="back-link">
          ← All events
        </Link>
        <div className="event-title-row">
          <div>
            <p className="eyebrow">{event.category}</p>
            <h1>
              <TextReveal text={event.title.replace(' ', '\n')} initial />
            </h1>
            {event.sample && (
              <p className="sample-event-note">
                Sample event preview · Details subject to confirmation
              </p>
            )}
            {event.subtitle && <p className="event-subtitle">{event.subtitle}</p>}
            <p className="event-lead">
              {eventDate(event.date)} · COET Akola
              <br />
              {event.fee}
            </p>
            <CTAButton href={open ? registrationHref : '#registration'}>
              {open ? 'Register Now' : 'Registration details'}
            </CTAButton>
          </div>
          <span className="event-hero-date">
            <strong>{event.month}</strong>
            2026
          </span>
        </div>
        <ImagePanel image={event.image} priority sizes="100vw" className="event-cover" />
        <div className="event-facts">
          {[
            ['DATE', eventDate(event.date)],
            ['TIME', event.time],
            ['VENUE', event.venue],
            ['ENTRY', event.fee],
            ['REGISTRATION', event.registration],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="eyebrow">{label}</span>
              <p>{value}</p>
            </div>
          ))}
          <CTAButton href={open ? registrationHref : '#registration'}>
            {open ? 'Register Now' : 'Registration details'}
          </CTAButton>
        </div>
        <p className="payment-availability">
          {open
            ? 'Online payment integration will be enabled shortly. You can enter and review your details; no registration is submitted or seat reserved yet.'
            : 'Registration is not open for this sample event. Final details will be announced.'}
        </p>
      </section>
      <div className="container event-body">
        <div className="event-editorial">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.note && <p className="sample-event-note">{section.note}</p>}
              {section.text && <p>{section.text}</p>}
              {section.items && (
                <ul className="topic-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section>
            <h2>Event details.</h2>
            <p>
              {eventDate(event.date)} · {event.fee}
              <br />
              COET Akola
              <br />
              Exact schedule to be announced.
            </p>
          </section>
          {!!event.faq?.length && (
            <section>
              <p className="eyebrow">A LITTLE MORE CLARITY</p>
              <h2>Good questions.</h2>
              <div className="faq">
                {event.faq.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="event-sidebar">
          <div className="registration-panel" id="registration" tabIndex={-1}>
            <p className="eyebrow">YOUR NEXT FIRST STEP</p>
            <h2>{open ? 'Take your next step.' : 'Registration upcoming.'}</h2>
            <p>
              {eventDate(event.date)}
              <br />
              {event.time}
            </p>
            <div className="registration-status">
              <span className="status-dot" />
              <strong>
                {open
                  ? 'Registration Open'
                  : event.phase === 'Past'
                    ? 'Registration closed'
                    : 'Registration upcoming'}
              </strong>
            </div>
            <p>{event.fee}. Online payment integration is being finalized.</p>
            <CTAButton href={open ? registrationHref : '/events'} secondary={!open}>
              {open ? 'Register Now' : 'Explore other events'}
            </CTAButton>
            <span className="small-note">
              {open
                ? 'Registration currently stops at review. No registration is submitted or seat reserved.'
                : 'This sample preview does not accept registrations.'}
            </span>
          </div>
        </aside>
      </div>
      <div className="mobile-registration">
        <div>
          <strong>{event.title}</strong>
          <span>{open ? `${event.fee} · Open` : event.registration}</span>
        </div>
        <Link href={open ? registrationHref : '#registration'} className="button">
          {open ? 'Register ↗' : 'Details ↗'}
        </Link>
      </div>
    </div>
  );
}
