# E-Cell COETA

Faculty-review frontend for the COETA Entrepreneurship Cell. Built with Next.js App Router, TypeScript, React, and Tailwind CSS 4. No backend, authentication, forms, payments, or external integrations are implemented.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are needed. For a production preview:

```sh
npm run build
npm start
```

## Checks

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests run against the production build and start the server automatically. To use an existing Chromium installation instead of downloading a browser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

The tests cover all 11 public pages at 360, 390, 430, 768, 1024, and 1440 pixels; document overflow and clipped headings; mobile keyboard navigation; category filtering; direct event links; registration section access; FAQ interaction; and unknown routes. Chromium emulation is not a substitute for testing real iOS Safari and Android devices before launch.

## Where to make changes

| Location                   | Responsibility                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `src/app/globals.css`      | Central brand tokens, fluid typography, spacing, responsive component styles, reduced motion |
| `src/content/site.ts`      | Navigation, asset mapping, initiatives, placeholder page copy                                |
| `src/content/events.ts`    | Typed event records and India-localized dates                                                |
| `src/components/`          | Shared navigation, footer, buttons, headings, image panels, gallery, event cards and filters |
| `src/app/page.tsx`         | Homepage composition                                                                         |
| `src/app/events/`          | Filterable listing and statically generated event detail routes                              |
| `src/app/[page]/page.tsx`  | Explicitly allowlisted informational routes; unknown values return 404                       |
| `public/images/`           | Local stock photographs, grouped by purpose                                                  |
| `public/fonts/`            | Self-hosted Urbanist font and SIL Open Font License                                          |
| `tests/responsive.spec.ts` | Browser regression checks                                                                    |

The remaining routes are `/about`, `/initiatives`, `/nec`, `/team`, `/gallery`, and `/contact`. All three demo events use the shared detail template; `/events/the-first-pitch` is the primary demo.

## Design decisions

The primary reference is https://kortrijkxpo.com/en. Its editorial scale, geometric typography, generous spacing, event-led composition, thin borders, and restrained interaction informed this original E-Cell design. No reference branding, copy, or proprietary imagery is included.

Brand values are CSS custom properties at the top of `globals.css`; change those first when official branding arrives. Tailwind is available for utilities; named component classes keep complex responsive styling centralized. Desktop grids become deliberately reordered, stacked mobile sections. The menu uses the native modal dialog for focus containment and Escape support. Standard document scrolling, reduced-motion preferences, visible focus states, and native FAQ disclosure controls are preserved.

The development and build scripts explicitly use Next.js’s supported Webpack bundler because Turbopack’s CSS worker failed under the review environment’s process restrictions. This does not change the application architecture.

Server components are the default. Only the mobile header and event filter require client state. Images use Next Image with explicit sizes; hero images are prioritized, other images are lazy-loaded. Fonts and stock images are stored locally so builds do not depend on a font provider.

The preview contains no invented achievements or partnerships. Impact values are deliberately unpopulated. Team members and contact channels are not fabricated. Every event is marked as demo content, and registration links lead to an explicit unavailable state. The mobile event action remains visible above the device safe area. No personal data is collected.

## Replacing demo content

1. Replace photographs under `public/images/` and update the `assets` mapping and descriptive alt text in `src/content/site.ts`. See `public/images/README.md` for sources.
2. Update event records in `src/content/events.ts`; extend their type when real registration states and approved programmes are available. Move the sample schedule/rules from the detail template into typed event records when individual real programmes are supplied.
3. Add approved institutional details, people, contact information, verified impact figures, and collaborators. Obtain consent for photos and team profiles.
4. Replace the temporary text wordmark and favicon with approved branding. Recheck contrast after token changes.
5. Confirm NEC participation before claiming an affiliation, rank, or achievement.
6. Once content is approved for publication, remove the preview messages and change the `robots` metadata in `src/app/layout.tsx` (currently **noindex, nofollow**). Add the real canonical domain and social-sharing images at launch.
7. Implement and test registration separately. Until then, do not label a demo registration link as an active form or payment flow.

## Future integrations and secrets

`.env.example` documents reserved variable names only. Copy it to `.env.local` when a future integration actually requires values. `.env`, `.env.local`, and `.env.*.local` are ignored by Git. Never prefix service-role, payment-secret, webhook-secret, or email-service credentials with `NEXT_PUBLIC_`. Server secrets must remain in server-only modules. This milestone does not read or use these values.

## Dependencies

Runtime: Next.js for routing/rendering/image optimization, React and React DOM for UI. Development: TypeScript and its types, Tailwind/PostCSS for CSS, ESLint with Next.js rules, Prettier for readable consistent formatting, and Playwright for browser checks. No UI, icon, animation, state-management, or integration SDKs are added. Commit and use the lockfile with `npm ci`.

ESLint is pinned to the compatible 9.x line: the current Next.js React lint plugin fails with ESLint 10. The initial npm audit flags a transitive development-only `braces` advisory through the Next.js lint plugin, with no compatible patched dependency currently offered. Do not apply `npm audit fix --force`: its suggested downgrade changes Next.js lint tooling to a different major version. Recheck upstream before the next maintenance release. Production dependencies should be checked with `npm audit --omit=dev`.
