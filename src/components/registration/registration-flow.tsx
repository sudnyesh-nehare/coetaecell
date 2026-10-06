'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Event } from '@/content/events';
import { TextReveal } from '@/components/motion/primitives';
import { useRegistrationState } from './registration-state';
import { ParticipantForm } from './participant-form';
import { EventSummary, ParticipantSummary } from './registration-summary';
export function RegistrationFlow({ event }: { event: Event }) {
  const [state, update] = useRegistrationState(event.slug);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(state.step);
  useEffect(() => {
    if (previousStep.current !== state.step) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
      previousStep.current = state.step;
    }
  }, [state.step]);
  const review = state.step === 'review';
  return (
    <div className="container checkout-page">
      <Link className="back-link" href={`/events/${event.slug}`}>
        ← Back to Event
      </Link>
      <div className="checkout-intro">
        <p className="eyebrow">{event.title} / REGISTRATION</p>
        <p>
          <TextReveal text={event.subtitle ?? event.title} />
        </p>
      </div>
      <p className="checkout-availability">
        Enter and review your details. Registration is not submitted and no seat is reserved at this
        stage. Details stay in memory and are cleared on refresh.
      </p>
      <noscript>
        <style>{`.checkout-page .checkout-layout, .checkout-page .checkout-progress {display:none}`}</style>
        <p className="registration-notice">
          Enable JavaScript to enter and review registration details. No registration has been
          submitted.
        </p>
      </noscript>
      <ol className="checkout-progress" aria-label="Registration progress">
        {['Details', 'Review'].map((label, index) => (
          <li
            key={label}
            aria-current={(review ? 1 : 0) === index ? 'step' : undefined}
            data-complete={review && index === 0}
          >
            <span>0{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="checkout-layout">
        <section className="checkout-step" key={state.step} aria-labelledby="step-title">
          <p className="eyebrow">STEP {review ? '02' : '01'} / 02</p>
          <h1 id="step-title" ref={heading} tabIndex={-1}>
            {review ? 'Review Registration' : 'Make it your next step.'}
          </h1>
          {review ? (
            <>
              <p className="checkout-help">Check your participant details and event summary.</p>
              <ParticipantSummary participant={state.participant} />
            </>
          ) : (
            <ParticipantForm
              participant={state.participant}
              onChange={(participant) => update({ ...state, participant })}
              onContinue={() => update({ ...state, step: 'review' })}
            />
          )}
        </section>
        <EventSummary event={event} />
        {review && (
          <div className="checkout-review-actions">
            <p id="payment-availability">Online payment integration will be enabled shortly.</p>
            <div className="checkout-actions">
              <button
                className="button payment-disabled"
                type="button"
                disabled
                aria-describedby="payment-availability"
              >
                Proceed to Payment
              </button>
              <button
                className="button button-outline"
                type="button"
                onClick={() => update({ ...state, step: 'details' })}
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
