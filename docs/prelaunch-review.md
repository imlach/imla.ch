# Pre-launch review, 23 September 2026

The current direction is ready for a production release after Ross's final review. This pass updates preview only.

## Fixed

- Mobile navigation could overlap headings when film titles or navigation wrapped. It now takes up its own space below 900px.
- Long links caused horizontal overflow in both published journal articles at 320px. They now wrap.
- Film galleries now use native modal dialogs, with labelled still buttons, keyboard arrows, Escape, scroll locking and focus restoration.
- Muted shared text colours have stronger contrast; reduced-motion preferences disable transitions and animations.
- Removed the two unfilled SKIN credit rows.
- Social cards use appropriate Live/film imagery, with image descriptions and dimensions. Public pages have canonical production URLs; RSS uses the In the weeds title and is discoverable from the page head.
- Added a custom 404 page with routes back into the work.
- The research board is available in development and preview only. Its route and peer reference assets are omitted from production builds and it is excluded from sitemaps.
- Preview builds set noindex on every page and disallow crawling in robots.txt. Production robots.txt allows crawling and points to the production sitemap.

## Verification

- Production build: 17 HTML pages, including the custom 404; no research board or peer reference assets.
- Preview build: 18 HTML pages, including the research board and custom 404.
- Built-output audit passed in both modes: internal links, fragments and assets, image alt attributes, single page headings, descriptions, canonical URLs, indexing directives, sitemap and both RSS entries.
- All 16 public content pages checked at 320px: no horizontal overflow or navigation/heading overlap.
- Visual checks of mobile film/journal layouts and desktop Live page.
- Gallery opening, keyboard tab order, arrow navigation, Escape, close button and focus/scroll restoration checked in the in-app browser.
- Landing Image and Experience switching, browser Back, direct Image entry, Live alias after reload, and Live hero click-through checked.

This is a focused browser and build review, not an exhaustive assistive-technology or cross-browser certification. External video providers and email delivery have not been tested end to end.

## Editorial follow-up

The first Live case study remains deliberately deferred until Ross chooses the work and provides its name, date, visual idea, media and credits. Do not invent content to fill the gap. The existing Live hero was retained; final portfolio photography and its credits should be settled alongside that selection.

Root hash links correctly choose the landing perspective. Their social preview is shared because URL fragments are not sent to the server; section-specific share cards are available at /cinematography/ and /live/.

## Build modes

- Production: `npm run build --prefix astro`
- Preview: `SITE_PREVIEW=true npm run build --prefix astro`
- Local development: `npm run dev --prefix astro` (includes /directions/)

The preview workflow supplies SITE_PREVIEW. The production workflow leaves it unset.
