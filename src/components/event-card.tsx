import Link from 'next/link';
import { canRegister, eventDate, type Event } from '@/content/events';
import { ImagePanel } from './ui';
export function EventCard({ event }: { event: Event }) {
  return (
    <article className="event-card">
      <Link
        href={`/events/${event.slug}`}
        className="event-image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ImagePanel
          image={event.image}
          reveal={false}
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="date-badge">
          <strong>{event.month}</strong>
          <span>2026</span>
        </span>
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="event-card-meta">
        <span>{event.category}</span>
        <span>{event.fee}</span>
      </div>
      {event.sample && <p className="sample-event-note">Sample event preview</p>}
      <h3>
        <Link href={`/events/${event.slug}`}>{event.title}</Link>
      </h3>
      <p className="event-venue">
        {eventDate(event.date)} · {event.time}
      </p>
      <p className="event-venue">{event.venue}</p>
      <div className="event-card-bottom">
        <span>
          <i className="status-dot" />
          {event.registration === 'Open' ? 'Registration Open' : event.registration}
        </span>
        <Link href={`/events/${event.slug}`} aria-label={`View event: ${event.title}`}>
          {canRegister(event) ? 'View & register' : 'View event'} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
