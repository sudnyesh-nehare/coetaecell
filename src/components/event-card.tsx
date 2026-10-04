import Link from 'next/link';
import type { Event } from '@/content/events';
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
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="date-badge">
          <strong>{event.day}</strong>
          <span>{event.month} ’26</span>
        </span>
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="event-card-meta">
        <span>{event.category}</span>
        <span>{event.fee}</span>
      </div>
      <h3>
        <Link href={`/events/${event.slug}`}>{event.title}</Link>
      </h3>
      <p className="event-venue">{event.venue}</p>
      <div className="event-card-bottom">
        <span>
          <i className="status-dot" />
          {event.registration}
        </span>
        <Link
          href={`/events/${event.slug}#registration`}
          aria-label={`Registration details for ${event.title}`}
        >
          Registration details <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
