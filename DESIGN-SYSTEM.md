# Design system

How the portfolio is built. `brand-kit/BRAND.md` (v3.0) decides colour, type and
identity; this file decides how the site applies them. If the two disagree,
BRAND.md wins and this file is wrong.

## Direction

| | |
|---|---|
| Product | A software engineer's record of shipped systems and the decisions inside them, for hiring managers, tech leads and founders |
| Character | Exact, unhurried, evidentiary |
| World | The engineering spec sheet and the decision record. Ink on paper, one signal colour |
| Moments | The decision record in the Home hero. The proof ledger. Nothing else gets colour |
| Signature | The Merge Y, the signal marker under every headline, mono section labels |

## Layers

1. **Brand tokens** — `--ybz-*` in `src/index.css`, mirroring `brand-kit/brand.json`.
   Change `brand.json` first, then the value here. The token names are kept from
   v2.4 so components did not have to change; `src/index.css` maps each one to its
   v3 role.
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
| `PageHeader` | Top of every interior page. Label, h1, signal marker, lede, optional `actions`. Carries the page's one entrance animation |
| `Section` | A page band. Owns gutter (`px-6 sm:px-10 lg:px-16`), rhythm (`py-20`) and width (`max-w-6xl`, or `width="read"`). `tone="raised"` is the surface band; never two in a row |
| `SectionHeader` | Label, h2, signal marker, optional lede. 40px to the content |
| `Card` | 4px radius, hairline edge. `interactive` steps the border to ink on hover. `padded={false}` when it opens with an image frame |
| `Button` | `primary` (ink fill, the one per screen), `secondary`, `accent` (navbar only, ink outline). One height, 48px; `size="sm"` is 40px |
| `TextLink` | Inline ink link, underline turns signal on hover |
| `StackLine` | A stack as `NestJS · Next.js · Flutter` in mono. Tags are never chips |
| `Figure` | A metric: mono figure in signal text over a short label |
| `DecisionRecord` | The Home hero object. A surface that follows the theme. Facts only |
| `Signet` | The Merge Y, drawn from `brand-kit/brand.json`. `mono` for the all-ink version |
| `CoverImage` | A generated blog or project cover in the active theme. Put it in `ybz-frame ybz-frame--cover` so the frame matches the cover's ground. Regenerate covers with `brand-kit/tools/build_covers.py` |
| `Wordmark` | Merge Y + name + descriptor: the primary logo |

## Classes

| Class | Role |
|---|---|
| `ybz-display-1` | Page h1. 36 → 44 → 60px Plex Sans 600, -0.01em |
| `ybz-display-2` | Section h2. 26 → 32px Plex Sans 600 |
| `ybz-title` | Card and row titles. Plex Sans 500, 20px |
| `ybz-lede` / `ybz-body` | 20px intro paragraph / 16px running text, line height 1.6 |
| `ybz-eyebrow` | Section label. Plex Mono 13px, signal as text, sentence case |
| `ybz-meta` | Mono, sentence case, muted. Periods, counters, short labels |
| `ybz-source` | Mono, muted. URLs, stacks, citations |
| `ybz-figure` | Mono numbers, tabular, signal as text |
| `ybz-rule` | The headline marker: 2px × 32px, signal |
| `ybz-btn` + variant | Buttons. Use `Button` instead |
| `ybz-input` | Form fields, same geometry as buttons |
| `ybz-chip` | Filter toggles. Set `aria-pressed` |
| `ybz-inset` | A box inside a card (a slot, a nested panel, a preview frame). Takes the fill the card is not using |
| `ybz-plate` | Light plate behind a third-party logo |
| `ybz-frame` | Surface mat behind screenshots and certificates |
| `ybz-enter` | The one load animation |

## Rules

- **Colour.** Only `--ybz-*` tokens or Tailwind's bridged names (`text-bone`,
  `text-slate-body`, `text-muted`, `text-accent`, `bg-ink`, `bg-obsidian`,
  `bg-card`, `border-edge`, `border-hairline`). Signal on type is always
  `text-accent` (`--ybz-accent-type`). Signal is never a fill behind text.
- **Figure and ground.** A box never has the same fill as what sits behind it.
  The tokens handle it: `--ybz-card` is surface on a paper section and paper on
  a raised band (`.bg-obsidian` swaps it), and `--ybz-inset` is always the other
  one. So use `ybz-card` / `bg-card` for boxes and `ybz-inset` / `bg-inset` for
  boxes inside them. Never hard-code a box fill, and never leave a bordered box
  inside a card unfilled.
- **Theme.** Light is the default and has no attribute. Dark sets
  `data-theme="dark"` on `<html>`, from the visitor's choice or their system.
- **Type.** IBM Plex Sans, Plex Mono, Plex Sans Arabic. Weights 400 to 600. No
  italic, no all-caps, nothing under 13px on public pages.
- **Spacing.** Tailwind's 4px scale only. No arbitrary `[13px]` values.
- **Radius.** 2 (small controls), 4 (buttons, cards, inputs), 8 (large panels). Nothing is a pill.
- **Icons.** lucide, 16px in text and buttons, 18px standalone, stroke 1.75, text-role colour.
- **Motion.** `--ybz-ease`; 150ms feedback, 420ms entrance. Transition colour,
  border, background, opacity, transform by name — never `transition-all`. No hover
  lift, no glow, no scale on hover, no scroll-linked motion, no loops. One entrance
  per page, in `PageHeader`.
- **Images.** Third-party screenshots sit in `ybz-frame` at a fixed aspect ratio.
- **Copy.** Peer voice, sentence case, no exclamation marks, no emoji, no unsourced
  claims, no age-led framing.

## Checks

```bash
npm run lint
npm run brand:check
python3 brand-kit/tools/verify.py
```

Then the `brand-kit/BRAND.md` section 12 self-check.
