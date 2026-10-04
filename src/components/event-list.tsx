'use client';
import { useState } from 'react';
import { events } from '@/content/events';
import { EventCard } from './event-card';
const filters = ['All events', 'Pitch competition', 'Workshop', 'Founder talk'];
export function EventList() {
  const [filter, setFilter] = useState('All events');
  const visible = events.filter((event) => filter === 'All events' || event.category === filter);
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter events by category">
        {filters.map((item) => (
          <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {visible.length} demo {visible.length === 1 ? 'event' : 'events'} · November – December 2026
      </p>
      <div className="event-grid">
        {visible.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </>
  );
}
