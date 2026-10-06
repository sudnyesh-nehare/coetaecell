/** @jsxImportSource react */
import { events, eventDate, canRegister, type Event } from '@/content/events';
import { CTAButton } from './ui';
import { NoEvents } from './no-events';
export function FeaturedEvent({ items = events }: { items?: Event[] }) {
  const upcoming = items
    .filter((event) => event.phase === 'Upcoming')
    .toSorted((a, b) => a.date.localeCompare(b.date));
  const event = upcoming.find((item) => item.slug === 'cybersecurity-masterclass') ?? upcoming[0];
  // Removing all upcoming records enables the shared empty state on the homepage too.
  return (
    <section className="featured-section container" id="featured">
      {event ? (
        <>
          <div className="featured-label">
            <span className="eyebrow">ON THE HORIZON</span>
            <span className="tiny-tag">Registration {event.registration}</span>
          </div>
          <div className="featured-event">
            <div className="featured-date">
              <strong>{event.month}</strong>
              <span>{eventDate(event.date)}</span>
            </div>
            <div>
              <p className="eyebrow">{event.category}</p>
              <h2>{event.title}</h2>
              <p>
                {event.fee} · {eventDate(event.date)}
              </p>
              {event.sample && <p className="sample-event-note">Sample event preview</p>}
            </div>
            <div className="featured-actions">
              <CTAButton href={`/events/${event.slug}`} secondary>
                View Event
              </CTAButton>
              {canRegister(event) && (
                <CTAButton href={`/events/${event.slug}/register`}>Register</CTAButton>
              )}
            </div>
          </div>
        </>
      ) : (
        <NoEvents />
      )}
    </section>
  );
}
