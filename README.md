Change Made by Lee 10/22/2026 at 3:45PM PDT
# Pop & Ladle landing site (popladle.com) 

Next.js 16 port of the approved V20 landing site and V25 thank-you page. The
pages render pixel-identical to the static originals (checked with full-page
screenshot diffs at 375, 768, 1280 and 1920 px). The backend is
[pop-ladle](https://github.com/ikonictonic/pop-ladle); this app has no database
or email code of its own.

## Pages

| Route | What it is |
|---|---|
| `/` | Landing page, FAQ, early-access signup in the footer |
| `/contact` | Contact form |
| `/privacy` | Draft Privacy Notice (counsel review pending) |
| `/thank-you` | After signup: asks the visitor to confirm by email |
| `/guide-link-expired` | Where a dead guide link from the welcome email lands |
| `/confirm-email` | Link in the confirmation email; confirms through the backend |
| `/preferences` | Link in marketing email: change interest or unsubscribe |

`/index.html`, `/contact.html`, `/privacy.html` and `/thank-you.html` redirect to
the new routes.

## How the styling works

The V20, V22 and V25 stylesheets are copied unchanged into `styles/` (only `url()` paths
became root-absolute) and they reuse class names across pages. To keep each page
exactly as approved:

- Each page imports one entry file from `styles/pages/` that lists its
  stylesheets in the original `<link>` order. `/thank-you` imports
  `thank-you-v23.css` (the V25 package's stylesheet). `/confirm-email`,
  `/preferences` and the 404 page get `thank-you-v22.css` through
  `components/WelcomeShell.tsx`.
- Internal links are plain `<a>` tags, not `next/link`. Every navigation is a
  full page load, so one page's CSS never carries over to the next. The ESLint
  rule that would flag this is turned off in `eslint.config.mjs` for that reason.
- The privacy page no longer loads `contact-polish.css`. None of its rules
  match anything on that page, and sharing it with `/contact` let the bundler
  load it ahead of `contact-v11.css` there.

## Signup flow

1. The footer form posts to `/api/early-access` with the consent wording
   version from `lib/site.ts`. Change that wording and you must add the new
   version on the backend too (`CONSENT_TEXTS` in
   `pop-ladle/src/features/subscribers/subscriberService.js`).
2. The backend stores a pending signup and emails a confirmation link, and the
   browser goes to `/thank-you`.
3. `/confirm-email?token=…` confirms. The backend then subscribes the Plunk
   contact and sends the welcome email once, with a personal 48-hour link to
   the guide (`/api/subscriber/guide?token=…`).
4. The interest question lives on `/preferences` and saves through
   `/api/subscriber/preference`. Choosing meal planning starts the
   meal-planning workflow.

`/api/early-access`, `/api/subscriber/*` and `/api/contact` are rewritten to
`${API_URL}/api/v1/...` (see `next.config.ts`), so the browser only talks to
this origin. Nothing else under `/api` is proxied.

Cookie consent (`components/ConsentManager.tsx`, `lib/tags.ts`) is the same
logic as the static site: Google Analytics, Meta and LinkedIn load only after
the matching category is accepted, and withdrawing a category reloads the page.

## Run it locally

```bash
cp .env.example .env.local      # point API_URL at a running pop-ladle
npm install
npm run dev                     # http://localhost:3000
```

Without a backend the site still renders; the forms answer "The signup service
is being connected." For the backend, see
`src/features/subscribers/README.md` in pop-ladle. With no `RESEND_API_KEY` it
logs emails, including confirmation links, to its console.

`npm run lint` and `npm run build` must pass before deploying.

## Deploying

- Set `API_URL` and `SITE_URL` in the build environment: the rewrites are
  fixed at build time.
- Social links for the thank-you page live in `lib/site.ts`; empty ones stay
  hidden.
- Prelaunch items from the handoff that are outside this repo: Resend domain,
  properties, automation and webhook setup; postal address (`MAILING_ADDRESS`
  on the backend); counsel review of the Privacy Notice, which now names Resend
  instead of Plunk.
