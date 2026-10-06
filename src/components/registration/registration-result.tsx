import { CTAButton } from '@/components/ui';
import { eventDate, formatAmount, type Event } from '@/content/events';
import type { DemoConfirmation } from '@/lib/registration/demo-service';
export function RegistrationResult({
  event,
  confirmation,
  onRetry,
}: {
  event: Event;
  confirmation?: DemoConfirmation;
  onRetry: () => void;
}) {
  if (!confirmation)
    return (
      <>
        <p className="checkout-result-copy">
          Registration has not been confirmed. No money was charged. Your entered details are still
          available while you stay within Events.
        </p>
        <div className="checkout-actions">
          <button type="button" className="button" onClick={onRetry}>
            Retry Payment <span aria-hidden="true">↗</span>
          </button>
          <CTAButton href={`/events/${event.slug}`} secondary>
            Back to Event
          </CTAButton>
        </div>
      </>
    );
  return (
    <>
      <p className="checkout-result-copy">
        Your demo registration is complete. This confirmation is a preview, not an admission ticket.
      </p>
      <dl className="checkout-facts confirmation-facts">
        {[
          ['Event', event.title],
          ['Registration ID', confirmation.id],
          ['Participant name', confirmation.participant.fullName],
          ['Email', confirmation.participant.email],
          ['Event date', eventDate(event.date)],
          ['Time', event.time],
          ['Venue', event.venue],
          ['Amount', `${formatAmount(confirmation.amount)} DEMO`],
          ['Payment status', `${confirmation.paymentStatus} · simulated`],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="receipt-note">
        No registration was submitted, no seat was reserved and no money was charged.
      </p>
      <p className="checkout-help">
        No email has been sent. Save this demo ID if needed; refreshing clears this confirmation.
      </p>
      <div className="checkout-actions">
        <CTAButton href={`/events/${event.slug}`}>Back to Event</CTAButton>
        <CTAButton href="/events" secondary>
          Explore More Events
        </CTAButton>
      </div>
    </>
  );
}
