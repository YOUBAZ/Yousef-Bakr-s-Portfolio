# Design system

How the portfolio is built. `BRAND.md` (in `v5/files/yousef-bakr-brand-v2.4/`)
decides colour, type and identity; this file decides how the site applies them.
If the two disagree, BRAND.md wins and this file is wrong.

## Direction

| | |
|---|---|
| Product | A software engineer's record of shipped systems and the decisions inside them, for senior engineers, tech leads and CTOs |
| Character | Exact, unhurried, evidentiary |
| World | The architecture decision record and the code review. Midnight and paper, one gold accent |
| Moments | The decision record in the Home hero. The proof ledger. Nothing else gets rich colour |
| Signature | The stack rail, plus the gold rule under every Playfair heading |

## Layers

1. **Brand tokens** — `--ybz-*` in `src/index.css`, copied from the kit's
   `04_tokens.css`. Never edit a value here; change `brand.json` and rebuild.
2. **System tokens** — motion (`--ybz-ease`, `--ybz-dur-*`) and widths.
3. **Primitive classes** — `ybz-*` in `src/index.css`.
4. **Components** — `src/components/ui`, imported from one place:

```jsx
import { Button, Card, PageHeader, Section, SectionHeader, StackLine, Figure, TextLink } from "../components/ui";
```

A page never hand-writes a header, card, button or tag. If it needs one that
does not exist, add it here first.

## Components

| Component | Use |
|---|---|
| `PageHeader` | Top of every interior page. Eyebrow, h1, gold rule, lede, optional `actions`. Carries the page's one entrance animation |
| `Section` | A page band. Owns gutter (`px-6 sm:px-10 lg:px-16`), rhythm (`py-20`) and width (`max-w-6xl`, or `width="read"`). `tone="raised"` is the obsidian band; never two in a row |
| `SectionHeader` | Eyebrow, h2, gold rule, optional lede. 40px to the content |
| `Card` | 20px radius, edge hairline. `interactive` adds a border step on hover. `padded={false}` when it opens with an image frame |
| `Button` | `primary` (the one gold action per screen), `secondary`, `accent` (navbar only). One height, 48px; `size="sm"` is 40px |
| `TextLink` | Inline accent link with an arrow |
| `StackLine` | A stack as `NestJS · Next.js · Flutter` in mono. Tags are never chips |
| `Figure` | A metric: mono figure over a short label |
| `DecisionRecord` | The Home hero object. Midnight in both themes. Facts only |

## Classes

| Class | Role |
|---|---|
| `ybz-display-1` | Page h1. 36 → 48 → 60px Playfair 700 |
| `ybz-display-2` | Section h2. 30 → 36px Playfair 700 |
| `ybz-title` | Card and row titles. Montserrat 600, 18px. **h3 and below are never Playfair** (30px floor) |
| `ybz-lede` / `ybz-body` | 18px intro paragraph / 15px running text |
| `ybz-eyebrow` | Uppercase, +0.30em, accent. Above a heading, or labelling a group inside a card (Timeline, Toolset). Never on buttons or body |
| `ybz-meta` | Mono, uppercase, +0.14em, muted. Periods, counters, short labels |
| `ybz-source` | Mono, sentence case, muted. URLs, stacks, citations |
| `ybz-figure` | Mono numbers, tabular |
| `ybz-btn` + variant | Buttons. Use `Button` instead |
| `ybz-input` | Form fields, same geometry as buttons |
| `ybz-chip` | Filter toggles. Set `aria-pressed` |
| `ybz-plate` | Light plate behind a third-party logo |
| `ybz-frame` | Midnight mat behind screenshots and certificates |
| `ybz-enter` | The one load animation |

## Rules

- **Colour.** Only `--ybz-*` tokens or Tailwind's bridged names (`text-bone`,
  `text-slate-body`, `text-muted`, `text-accent`, `bg-ink`, `bg-obsidian`,
  `bg-card`, `border-edge`, `border-hairline`). Accent on type is always
  `text-accent` (`--ybz-accent-type`), never `text-gold`.
- **Type.** Three faces, each in its role. Weights 400 to 600 outside Playfair.
  No italic, no `font-bold` on Montserrat, nothing under 12px.
- **Spacing.** Tailwind's 4px scale only. No arbitrary `[13px]` values.
- **Radius.** 12 (controls, plates, chips), 20 (cards), 28 (page panels). Nothing is a pill.
- **Icons.** lucide, 16px in text and buttons, 18px standalone, stroke 1.75, text-role colour.
- **Motion.** `--ybz-ease`; 160ms feedback, 200ms menus, 420ms entrance. Transition
  colour, border, background, opacity, transform by name — never `transition-all`.
  No hover lift, no glow, no scale on hover, no scroll-triggered reveals, no loops.
  One entrance per page, in `PageHeader`. The stack rail's scroll progress is the
  only scroll-linked motion.
- **Images.** Third-party screenshots sit in `ybz-frame` at a fixed aspect ratio.
- **Copy.** Peer voice, sentence case, no exclamation marks, no emoji, no unsourced claims.

## Checks

```bash
npm run lint
npm run brand:check
```

Then the BRAND.md section 15 self-check.
