/** @jsxImportSource react */
/** Use when the requested event collection is empty; populated collections render cards. */
export function NoEvents({ upcoming = true }: { upcoming?: boolean }) {
  return (
    <div className="event-empty" role="status">
      <h2>{upcoming ? 'No upcoming events' : 'No events in this selection'}</h2>
      <p>
        {upcoming
          ? 'New events are being planned. Check back soon.'
          : 'Choose another category or timing to explore.'}
      </p>
    </div>
  );
}
