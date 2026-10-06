import { eventDate, formatAmount, type Event } from '@/content/events';
import type { Participant } from '@/lib/registration/participant';
export function EventSummary({ event }: { event: Event }) {
  return (
    <aside className="checkout-summary" aria-label="Event summary">
      <p className="eyebrow">YOUR NEXT FIRST STEP</p>
      <h2>{event.title}</h2>
      <p>{event.subtitle}</p>
      <dl className="checkout-facts">
        {[
          ['Date', eventDate(event.date)],
          ['Time', event.time],
          ['Venue', event.venue],
          ['Registration fee', event.fee],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div className="checkout-total">
          <dt>Total amount</dt>
          <dd>{formatAmount(event.amount)}</dd>
        </div>
      </dl>
      <p className="checkout-help">
        Individual registration · {event.fee}. Reviewing your details does not submit a registration
        or reserve a seat.
      </p>
    </aside>
  );
}
export function ParticipantSummary({ participant }: { participant: Participant }) {
  return (
    <dl className="checkout-facts participant-summary">
      {[
        ['Full Name', participant.fullName],
        ['Email', participant.email],
        ['Mobile Number', participant.mobile],
        ['College', participant.college],
        ['Department', participant.department],
        ['Year', participant.year],
      ].map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
