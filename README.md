# Yousef Bakr — portfolio

> I build production software — and publish the architecture decisions behind it.

[![Live](https://img.shields.io/badge/live-vercel-020617)](https://yousef-bakr-s-portfolio.vercel.app)
[![React 19](https://img.shields.io/badge/React-19-020617)](https://react.dev)
[![Vite 7](https://img.shields.io/badge/Vite-7-020617)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-020617)](./LICENSE)

A React portfolio built against a written brand system. Every colour, typeface and
identity string in this repo derives from that system, and a build gate fails the
project if one drifts.

## The brand system

The design is not a set of preferences held in someone's head. It is
[`CLAUDE.md`](./CLAUDE.md) in this repo, generated from a `brand.json` that lives
outside it, and it governs colour, typography, layout, voice and a set of red lines.

Three rules explain most of what the code looks like:

- **One accent.** Midnight `#020617` on 85% of every surface, gold `#F4C025` on the
  15% that matters. Purple appears only as an ambient bloom, never as type or a
  border. No teal, no fuchsia, no emerald.
- **Gold is never a text colour on a light ground.** It reads 1.55:1 on paper. Every
  accent applied to type goes through `--ybz-accent-type`, which rebinds to antique
  `#8A6206` in light mode. That single indirection is the whole light-theme contract.
- **Three typefaces, each in one role.** Playfair Display for headlines and nothing
  else, Montserrat for all running text, JetBrains Mono for code, metrics and
  counters. Cairo replaces both in RTL.

Tokens live in [`src/index.css`](./src/index.css) and are bridged into Tailwind with
`@theme inline`, so `bg-ink` emits `var(--ybz-ink)` rather than a baked hex — which is
what lets the light theme override it.

Identity strings live in exactly one place, [`src/config/brand.js`](./src/config/brand.js).
A second copy is how a retired name once ended up in the JSON-LD while the footer said
something else.

### Layout signatures

Three devices carry the identity, and no others are invented:

| Device | Where |
|---|---|
| The stack rail | One per page, pinned to the viewport edge, doubling as a scroll-progress indicator |
| The gold rule | Under every headline, drawing itself in on first entry |
| The footer strip | Signet, name, role — reused as the header composition |

## Verification

```bash
npm run brand:check
```

Fails the build on any colour outside the palette, any retired identity string, and on
the location appearing anywhere but the structured `homeLocation` field. It exists
because a stale value looks authoritative — the same reason the brand kit ships its own
verifier.

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 7 |
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS 4, CSS-first via `@theme` |
| Motion | Framer Motion, GSAP ScrollTrigger |
| Content | react-markdown, remark-gfm, react-syntax-highlighter |
| Forms | EmailJS |
| Icons | Lucide |

No component library. daisyUI was removed because it claims the `data-theme`
attribute, which the light theme keys on — one attribute cannot drive two systems.

## Setup

Requires Node 18+.

```bash
git clone https://github.com/YOUBAZ/Yousef-Bakr-s-Portfolio.git
cd Yousef-Bakr-s-Portfolio
npm install

cp .env.example .env    # then add your EmailJS credentials
npm run dev
```

## Scripts

```bash
npm run dev           # dev server with hot reload
npm run build         # production build
npm run preview       # serve the production build
npm run lint          # eslint
npm run brand:check   # palette, identity and location gate
```

## Structure

```
src/
├── components/
│   ├── Signet.jsx       the mark; guards the 24px floor
│   ├── StackRail.jsx    layout signature 1, also scroll progress
│   ├── GoldRule.jsx     layout signature 2
│   ├── ThemeToggle.jsx
│   ├── Seo.jsx          all metadata and JSON-LD, one component
│   ├── Navbar.jsx  MobileMenu.jsx  Footer.jsx
│   ├── BlogCard.jsx  BlogContent.jsx  BlogEditor.jsx
│   ├── ContactForm.jsx  ErrorBoundary.jsx  Loading.jsx  ScrollToTop.jsx
│   └── ProtectedRoute.jsx
├── pages/               every route lazy-loaded
├── config/
│   ├── brand.js         identity strings, single source
│   ├── seo.js           site metadata and default schemas
│   ├── email.js  scheduling.js
├── hooks/
│   ├── useTheme.js      theme state; dark is the default
│   └── useFocusTrap.js
├── data/                experience timeline, animation variants
├── utils/               blog helpers, env validation
└── index.css            brand tokens, both themes, and the primitives
```

Content lives in `public/data/` as JSON: `blogs.json`, `projects.json`,
`certificates.json`. Brand assets — favicons, the OG card, logo SVGs — are generated
output and sit in `public/` and `public/brand/`.

## Themes

Both grounds are specified: midnight `#020617` and paper `#F7F5F0`, never black, never
white. Dark is the default and carries no attribute, so `:root` stays the base case.
An explicit choice persists to `localStorage` and always beats the OS preference; an
inline script in `index.html` resolves the theme before first paint.

Measured against paper, matching the brand's own figures: headings 18.51:1, body
9.11:1, captions 5.54:1, antique accents 5.03:1, bronze rules 3.30:1.

Code blocks stay midnight on light pages. One dark object per light page is the
signature — a light code block belongs to anyone.

## Bundle

Measured against the pre-brand build:

| | Before | After |
|---|---|---|
| Built assets | 2688 KB | 1660 KB |
| Main chunk | 1320 KB | 364 KB |
| Home chunk | 1076 KB | 191 KB |

Three.js, react-parallax-tilt, react-simple-typewriter, lottie-react, daisyUI and
react-helmet-async were removed rather than restyled. The syntax highlighter loads with
the blog routes, which are the only ones that render code.

## Accessibility

Every palette pair is contrast-checked against WCAG 2.1 rather than estimated; the
figures are in [ACCESSIBILITY-AUDIT.md](./ACCESSIBILITY-AUDIT.md). Focus indicators use
the accent and are visible in both themes. `prefers-reduced-motion` drops every
animation except the scroll-progress rail, which still tracks because progress is
information rather than decoration.

## Deployment

Vercel, with `vercel.json` handling SPA rewrites and the sitemap content type. Any
static host works — build and serve `dist/`.

Environment variables go in the host's dashboard, not in the repo:
`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`,
and optionally `VITE_SCHEDULER_URL`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Anything touching colour, type or identity
has to pass `npm run brand:check`, and the reasoning for those rules is in
[CLAUDE.md](./CLAUDE.md).

## Licence

MIT — see [LICENSE](./LICENSE).

## Contact

yousef-bakr-s-portfolio.vercel.app · [linkedin.com/in/yousef-bakr](https://www.linkedin.com/in/yousef-bakr) · youbakrzaki@gmail.com
