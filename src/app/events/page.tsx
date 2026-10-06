import type { Metadata } from 'next';
import { TextReveal } from '@/components/motion/primitives';
import { EventList } from '@/components/event-list';
export const metadata: Metadata = { title: 'Events' };
export default function EventsPage() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <p className="eyebrow">THE E-CELL CALENDAR</p>
        <h1>
          <TextReveal text={'Be there for\nwhat’s next.'} initial />
        </h1>
        <p>
          Fresh perspectives. Hands-on experiences. Your next big idea.
          <br />
          Find a reason to step out of the classroom.
        </p>
      </div>
      <EventList />
    </div>
  );
}
