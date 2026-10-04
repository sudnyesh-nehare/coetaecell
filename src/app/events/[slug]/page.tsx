import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { events, eventDate } from '@/content/events';
import { CTAButton, DemoNotice, ImagePanel } from '@/components/ui';
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
  const pitch = event.category === 'Pitch competition';
  const workshop = event.category === 'Workshop';
  const schedule = pitch
    ? [
        ['10:00 AM', 'Arrive, settle in, meet your community'],
        ['10:30 AM', 'Opening session & pitch essentials'],
        ['11:30 AM', 'Team pitches & feedback'],
        ['2:30 PM', 'Final presentations & conversation'],
        ['3:30 PM', 'Reflections & closing session'],
      ]
    : workshop
      ? [
          ['11:00 AM', 'Welcome & problem discovery'],
          ['11:30 AM', 'Understand your users'],
          ['12:30 PM', 'Build and share your first concept'],
          ['1:30 PM', 'Peer feedback & next steps'],
        ]
      : [
          ['2:00 PM', 'Welcome & introduction'],
          ['2:15 PM', 'The founder conversation'],
          ['3:00 PM', 'Audience questions'],
          ['3:20 PM', 'Takeaways & closing'],
        ];
  return (
    <div className="event-detail">
      <section className="container event-hero">
        <Link href="/events" className="back-link">
          ← All events
        </Link>
        <div className="event-title-row">
          <div>
            <p className="eyebrow">
              {event.category} <span className="tiny-tag">DEMO EVENT</span>
            </p>
            <h1>
              {event.title}
              <span className="accent">.</span>
            </h1>
            <p className="event-lead">{event.description}</p>
          </div>
          <span className="event-hero-date">
            <strong>{event.day}</strong>
            {event.month} 2026
          </span>
        </div>
        <ImagePanel image={event.image} priority sizes="100vw" className="event-cover" />
        <div className="event-facts">
          {[
            ['DATE', eventDate(event.date)],
            ['TIME', event.time],
            ['VENUE', event.venue],
            ['ENTRY', event.fee],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="eyebrow">{label}</span>
              <p>{value}</p>
            </div>
          ))}
          <CTAButton href="#registration">Registration details</CTAButton>
        </div>
        <DemoNotice>
          Faculty review demo · The programme, date, venue, and fee are unconfirmed. No
          registrations or payments are being accepted.
        </DemoNotice>
      </section>
      <div className="container event-body">
        <div className="event-editorial">
          <section>
            <p className="eyebrow">THE EXPERIENCE</p>
            <h2>
              {pitch
                ? 'Every big thing starts somewhere.'
                : workshop
                  ? 'Build your confidence by building something.'
                  : 'The story behind the starting line.'}
            </h2>
            <p>
              {pitch
                ? 'You don’t need a perfect business plan. You need a problem you care about and the curiosity to explore a solution. The First Pitch is a proposed space for students to share early ideas and learn through constructive feedback.'
                : event.description}
            </p>
            <p>
              {pitch
                ? 'Bring your perspective, meet fellow students, and practise telling the story behind your idea. This sample programme is designed around learning, experimentation, and a supportive room.'
                : 'The proposed session makes room for questions, conversation, and practical takeaways. The final programme and facilitator will be announced after approval.'}
            </p>
          </section>
          <section>
            <p className="eyebrow">HOW THE DAY COULD UNFOLD</p>
            <h2>The programme.</h2>
            <p className="small-note">Illustrative schedule · All times in IST</p>
            <ol className="timeline">
              {schedule.map(([time, title]) => (
                <li key={time}>
                  <time>{time}</time>
                  <span>{title}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="detail-two-col">
            <div>
              <h3>Who can join?</h3>
              <p>
                Proposed for COETA students across disciplines.{' '}
                {pitch
                  ? 'Solo participants and teams of up to three are envisioned. No prior startup experience needed.'
                  : 'No prior entrepreneurship experience needed.'}{' '}
                Final eligibility will be confirmed before registration opens.
              </p>
            </div>
            <div>
              <h3>A few ground rules.</h3>
              <p>
                Share original work, acknowledge your sources, and treat every participant with
                respect.{' '}
                {pitch &&
                  'The demo format allows five minutes to pitch and three minutes for questions.'}{' '}
                Final rules are pending approval.
              </p>
            </div>
          </section>
          <section className="detail-two-col">
            <div>
              <h3>{pitch ? 'Recognition & prizes' : 'What you’ll take away'}</h3>
              <p>
                {pitch
                  ? 'An opportunity to practise, receive feedback, and connect with peers. Prizes and certificates are not confirmed.'
                  : 'Fresh perspectives, practical exercises, and ideas to keep exploring after the session. Certificates are not confirmed.'}
              </p>
            </div>
            <div>
              <h3>{pitch ? 'Judges & mentors' : 'Speakers & facilitators'}</h3>
              <p>
                The lineup will be shared after confirmation. No speakers, judges, or affiliations
                are announced in this preview.
              </p>
            </div>
          </section>
          <section>
            <p className="eyebrow">A LITTLE MORE CLARITY</p>
            <h2>Good questions.</h2>
            <div className="faq">
              {[
                [
                  'Can I register now?',
                  'Not yet. This is a frontend preview for review. Registration will open only after the official event is confirmed.',
                ],
                [
                  'Do I need an existing startup?',
                  'No. The proposed programme welcomes students exploring entrepreneurship for the first time.',
                ],
                [
                  'Is the event free?',
                  'Free entry is shown as demo content. The confirmed fee and any payment instructions will be published before registration opens.',
                ],
                [
                  'Where can I get updates?',
                  'Return to the events page for confirmed announcements. Official contact and social channels will be added after verification.',
                ],
              ].map(([q, a]) => (
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
        </div>
        <aside className="event-sidebar">
          <div className="registration-panel" id="registration" tabIndex={-1}>
            <p className="eyebrow">YOUR NEXT FIRST STEP</p>
            <h2>
              Make room
              <br />
              for your idea.
            </h2>
            <p>
              {eventDate(event.date)}
              <br />
              {event.time}
            </p>
            <div className="registration-status">
              <span className="status-dot" />
              <strong>Registration not open</strong>
            </div>
            <p>
              This is a demo event. No form or payment is available yet. Confirmed details will
              appear here before registration opens.
            </p>
            <CTAButton href="/events" secondary>
              Explore other events
            </CTAButton>
            <span className="small-note">No personal data is collected.</span>
          </div>
        </aside>
      </div>
      <div className="mobile-registration">
        <div>
          <strong>{event.title}</strong>
          <span>Demo · Registration not open</span>
        </div>
        <Link href="#registration" className="button">
          Details ↗
        </Link>
      </div>
    </div>
  );
}
