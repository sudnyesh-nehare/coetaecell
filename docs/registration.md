# Public registration flow

Cybersecurity Masterclass · November 2026 · ₹100 per student.

`/events/cybersecurity-masterclass/register` offers participant details → review only. The review includes participant details, event details, fee and ₹100 total. “Proceed to Payment” is disabled with “Online payment integration will be enabled shortly.” No registration is submitted, seat reserved, ID generated, confirmation issued or email sent.

The six required fields are full name, email, mobile number, college, department and year. No login or team details are required. Validation lives in `src/lib/registration/participant.ts`. React state retains the draft across Events navigation; refresh clears it. No personal data is persisted or transmitted. Without JavaScript, the form is hidden and an explanation is shown.

The unused demo adapter and payment/result components remain isolated for reference; the public flow does not import or expose them. No backend, payment provider, database, or email integration is implemented.
