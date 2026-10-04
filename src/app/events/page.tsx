import type { Metadata } from 'next';
import { EventList } from '@/components/event-list';
import { DemoNotice } from '@/components/ui';
export const metadata: Metadata = { title: 'Events' };
export default function EventsPage() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <p className="eyebrow">THE E-CELL CALENDAR</p>
        <h1>
          Be there for
          <br />
          <span className="accent">what’s next.</span>
        </h1>
        <p>
          Fresh perspectives. Hands-on experiences. Your next big idea.
          <br />
          Find a reason to step out of the classroom.
        </p>
      </div>
      <DemoNotice>
        Demo calendar · All dates, venues, and fees are illustrative. Registration is not open.
      </DemoNotice>
      <EventList />
      <div className="listing-end">
        <span className="eyebrow">MORE IN THE MAKING</span>
        <p>
          This is just the beginning.
          <br />
          The official event calendar is on its way.
        </p>
      </div>
    </div>
  );
}
