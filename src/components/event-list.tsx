/** @jsxImportSource react */
'use client';
import { useState } from 'react';
import { events, type Event } from '@/content/events';
import { EventCard } from './event-card';
import { NoEvents } from './no-events';
export function EventList({ items = events }: { items?: Event[] }) {
  const filters = ['All events', ...new Set(items.map((event) => event.category))];
  const [filter, setFilter] = useState('All events');
  const [phase, setPhase] = useState('Upcoming');
  const phases = [
    'Upcoming',
    ...(items.some((event) => event.phase === 'Ongoing') ? ['Ongoing'] : []),
    'Past',
  ];
  const visible = items
    .filter(
      (event) => event.phase === phase && (filter === 'All events' || event.category === filter),
    )
    .toSorted((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <div
        className="filter-bar event-phase-filters"
        role="group"
        aria-label="Filter events by timing"
      >
        {phases.map((item) => (
          <button key={item} aria-pressed={phase === item} onClick={() => setPhase(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="filter-bar" role="group" aria-label="Filter events by category">
        {filters.map((item) => (
          <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {visible.length} {visible.length === 1 ? 'event' : 'events'} · {phase.toLowerCase()} · 2026
      </p>
      {/* Automatically enable the empty state when upcoming events or filtered results are empty. */}
      {visible.length === 0 && (
        <NoEvents upcoming={phase === 'Upcoming' && filter === 'All events'} />
      )}
      <div className="event-grid">
        {visible.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </>
  );
}
