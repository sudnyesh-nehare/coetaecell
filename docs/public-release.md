# Targeted frontend refinement

The existing E-CELL / COET AKOLA branding, responsive layout, GSAP system, event routes, review-only registration and team page architecture are retained.

## Team roster and replacement

`src/content/team.ts` contains **one Faculty Coordinator plus 25 student records**. The 25 comprise **two student leaders, four sample team heads, and 19 sample members**. President and Vice President are included in the 25.

Prof. Rutuja Deshmukh is the confirmed Faculty Coordinator. **All 25 student names, roles and group assignments are temporary sample data, not verified appointments.** Aarav Sharma (President) and Ananya Patil (Vice President) are sample names specifically used for the preview. Each student has `temporary: true`. A visible preview note identifies student names and avatars as samples.

Replace sample records centrally, including names, roles, groups, approved images and optional department/LinkedIn; set `temporary: false` only after confirmation. No placeholder photographs are presented as real portraits. The shared geometric avatar is used whenever `image` is absent, so there are no broken image URLs.

The homepage selects only the three featured profiles. `/team` renders all 26 records in four levels: Faculty Coordinator, Leadership, Team Heads, Our Team. Faculty portraits are capped at 420px on desktop, leadership at 330px, heads at 245px, with smaller square member portraits. All uploaded images use cover cropping. On mobile the first three profiles stack; regular members use two columns where comfortable and one at 320px.

## NEC journey

The navbar and primary homepage CTA now lead to `/nec`. The official NEC website is a smaller secondary link.

Historical context was supplied by the task owner: NEC 2024 Basic Track participation; continued participation in 2025 with a President-led 25-member team; entrepreneurship activities/workshops/events; E-Summit 2025 participation at IIT Bombay; and a team/member 2nd Prize in Pitch Perfect 2025. These are not attributed to the sample identities, and wider activities are not labeled official NEC tasks. No affiliation, endorsement or sponsorship is claimed.

`src/content/nec.ts` centralizes the timeline, activities, milestones and optional evidence. `necEvidence` is empty; no gallery or blank evidence slots render until approved assets are added.

## Events and registration

- **Idea Pitching Competition:** October 2026, visibly labeled sample preview, registration upcoming. Fee, exact schedule, team size, submission details and official judging rules remain unconfirmed. Generic criteria are explicitly indicative. No cash prize, sponsor or judge is invented.
- **Cybersecurity Masterclass:** November 2026, ₹100 per student, Registration Open. Prerequisites: basic computer familiarity, interest in cybersecurity, no advanced security experience required. No programming requirement is added.

`src/content/events.ts` holds event types and optional content. A shared selector renders populated sections appropriate to masterclass/workshop, competition or talk. Missing speaker, rounds, rules and schedule sections are omitted. Listings sort chronologically. The masterclass remains the homepage feature.

`NoEvents` is reused by both the listing and homepage feature. Empty upcoming data automatically renders “No upcoming events / New events are being planned. Check back soon.” No JSX needs to be commented out. Tests exercise empty arrays directly.

The masterclass registration remains Details → Review → stop. Payment is disabled, no registration number or payment outcome is generated, and data remains in memory. The sample competition does not accept registration before details are finalized. See `registration.md`.

## Motion and alignment

Visible Pause/Play/motion-instruction wording is removed. Continuous motion retains small icon-only controls with accessible names for keyboard and assistive-technology users. Reduced-motion preferences disable movement and hide these controls; no-JavaScript content remains available.

Faculty reveal, coordinated leadership entrance and head/member grid staggers reuse the existing GSAP context. The member-grid stagger is bounded to 0.3 seconds rather than adding a long delay per person. Navbar lockup/baselines, shared portrait sizing, event-card flex alignment, metadata, section spacing and NEC timeline columns are retained or refined through shared layout rules.

## Real information still needed

- All 25 student identities, actual role/group assignments, portraits and optional department/LinkedIn.
- Approved Faculty Coordinator portrait.
- Competition confirmation, date/time, fee, eligibility, team size, rules, judging criteria and submission details.
- Masterclass exact schedule, venue, eligibility and any confirmed instructor.
- Approved NEC evidence/photographs, achievement recipients and publication-ready supporting details.
- Dedicated E-Cell contact details.

No backend, database, real payment processing or deployment is included.

## Files changed in this targeted pass

| Area                              | Files                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Central data                      | `src/content/team.ts`, `events.ts`, `site.ts`, new `nec.ts`                                                                                              |
| Team                              | `src/components/people-showcase.tsx`                                                                                                                     |
| Events                            | `src/components/event-card.tsx`, `event-list.tsx`, new `featured-event.tsx`, new `no-events.tsx`                                                         |
| NEC                               | New `src/components/nec-journey.tsx`                                                                                                                     |
| Page integration                  | `src/app/page.tsx`, `src/app/[page]/page.tsx`, `src/app/events/[slug]/page.tsx`                                                                          |
| Shared presentation               | `src/app/public.css`                                                                                                                                     |
| Motion                            | `src/components/motion/marquee.tsx`, `motion-controller.tsx`                                                                                             |
| Generic registration copy/pricing | `src/components/registration/registration-flow.tsx`, `registration-summary.tsx`; null-fee guard in unused `src/lib/registration/demo-service.ts`         |
| Artwork                           | New `public/images/events/idea-pitch.svg`                                                                                                                |
| Tests                             | `tests/public-refinement.spec.ts`, `tests/responsive.spec.ts`, new `tests/targeted-refinement.spec.ts`; existing motion and registration suites retained |
| Documentation                     | `README.md`, `docs/public-release.md`                                                                                                                    |

Pre-existing workspace edits were preserved. No new dependencies were installed.

## Validation results

- Lint, TypeScript checks and production build passed.
- All **69 browser checks are passing**: the final full run passed 68 checks; the remaining no-JavaScript FAQ check passed after correcting its test selector and rerunning it against the unchanged build.
- Responsive coverage includes **320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px** for all public routes, including the competition and full roster. No horizontal overflow or clipped headings remain in these checks.
- Coverage includes roster counts and hierarchy, portrait sizes, featured-only homepage, event-specific sections, empty event arrays, internal NEC navigation, reduced motion, no JavaScript, form validation and disabled payment.
- Desktop/mobile team, NEC, event and registration screenshots were inspected. A 768px NEC card-width issue was fixed through a responsive grid minimum rather than individual heading offsets.
- Formatting and `git diff --check` passed. Browser validation used Chromium; other browser engines and physical-device testing were not performed.
