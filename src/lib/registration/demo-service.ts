import { canRegister, type Event } from '@/content/events';

import { validateParticipant, type Participant } from './participant';
export type DemoRegistration = {
  id: string;
  eventSlug: string;
  participant: Participant;
  amount: number;
};
type DemoOrder = { id: string; registrationId: string; amount: number; currency: 'INR' };
type DemoVerification = { orderId: string; registrationId: string; successful: boolean };
export type DemoConfirmation = DemoRegistration & { paymentStatus: 'Successful'; orderId: string };

// Frontend-only adapter. No fetch, storage, credentials, or real payment provider.
// A production adapter must perform all creation, pricing and verification on the server.
export const demoRegistrationService = {
  createRegistration(event: Event, participant: Participant): DemoRegistration {
    if (
      event.amount === null ||
      !canRegister(event) ||
      Object.keys(validateParticipant(participant)).length
    )
      throw new Error('Registration details are not valid.');
    const cleaned = Object.fromEntries(
      Object.entries(participant).map(([key, value]) => [key, value.trim()]),
    ) as Participant;
    return {
      id: `DEMO-CYBER-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      eventSlug: event.slug,
      participant: cleaned,
      amount: event.amount,
    };
  },
  createPaymentOrder(registration: DemoRegistration): DemoOrder {
    return {
      id: `DEMO-${crypto.randomUUID()}`,
      registrationId: registration.id,
      amount: registration.amount,
      currency: 'INR',
    };
  },
  verifyPayment(order: DemoOrder, outcome: 'success' | 'failure'): DemoVerification {
    return {
      orderId: order.id,
      registrationId: order.registrationId,
      successful: outcome === 'success',
    };
  },
  confirmRegistration(
    registration: DemoRegistration,
    verification: DemoVerification,
  ): DemoConfirmation {
    if (!verification.successful || verification.registrationId !== registration.id)
      throw new Error('Payment has not been confirmed.');
    return { ...registration, paymentStatus: 'Successful', orderId: verification.orderId };
  },
};
