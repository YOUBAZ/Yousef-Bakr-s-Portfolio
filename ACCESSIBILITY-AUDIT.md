# Accessibility audit

Re-run after the brand v2.4 rebuild. Contrast figures are computed from the tokens in
`src/index.css` against WCAG 2.1, not estimated — the script that produces them is
reproduced at the end of this file so any number here can be checked.

**Scope of this audit.** It covers colour contrast, alt text, keyboard reachability,
ARIA and landmarks, by static analysis of the source. It has **not** been run against a
screen reader, a real assistive-technology user, or an automated browser tool such as
axe or Lighthouse. Nothing here should be read as a compliance certification.

---

## Colour contrast

### Dark theme — on midnight `#020617`

| Role | Foreground | Ground | Ratio | Needs | |
|---|---|---|---|---|---|
| Headings (bone) | `#F5F3EF` | `#020617` | 18.20:1 | 4.5 | pass |
| Body (slate) | `#A8B0BE` | `#020617` | 9.24:1 | 4.5 | pass |
| Captions (muted) | `#7C8698` | `#020617` | 5.50:1 | 4.5 | pass |
| Accent on type (gold) | `#F4C025` | `#020617` | 11.92:1 | 4.5 | pass |
| Body on card | `#A8B0BE` | `#14161F` | 8.26:1 | 4.5 | pass |
| Captions on card | `#7C8698` | `#14161F` | 4.91:1 | 4.5 | pass |
| Ink on gold button | `#020617` | `#F4C025` | 11.92:1 | 4.5 | pass |

### Light theme — on paper `#F7F5F0`

| Role | Foreground | Ground | Ratio | Needs | |
|---|---|---|---|---|---|
| Headings | `#020617` | `#F7F5F0` | 18.51:1 | 4.5 | pass |
| Body | `#3B4354` | `#F7F5F0` | 9.11:1 | 4.5 | pass |
| Captions | `#5A6376` | `#F7F5F0` | 5.54:1 | 4.5 | pass |
| Accent on type (antique) | `#8A6206` | `#F7F5F0` | 5.03:1 | 4.5 | pass |
| Rules, icon strokes (bronze) | `#B07E05` | `#F7F5F0` | 3.30:1 | 3.0 | pass |
| Ink on gold button | `#020617` | `#F4C025` | 11.92:1 | 4.5 | pass |

Gold `#F4C025` as type on paper reads **1.55:1** and is never used that way. Every
accent on type resolves through `--ybz-accent-type`, which rebinds to antique in light mode.

### Code blocks — midnight in both themes

| Token | Colour | Dark page `#0D0F16` | Light page `#0E1017` |
|---|---|---|---|
| Language label / comment | `#7C8698` | 5.21:1 | 5.18:1 |
| String | `#A8B0BE` | 8.77:1 | 8.70:1 |
| Number | `#E0A906` | 8.98:1 | 8.91:1 |
| Function | `#F5F3EF` | 17.27:1 | 17.15:1 |
| Keyword | `#F2CC5A` | 12.36:1 | 12.27:1 |
| Base text | `#C9D1E1` | 12.48:1 | 12.39:1 |


### Deliberate low-contrast surfaces

| Surface | Ratio | Why it is acceptable |
|---|---|---|
| `--ybz-edge` hairline borders | ~1.2:1 | Decorative separation; never the only signal for anything |
| Purple bloom `#401A66` | — | Background atmosphere, never type and never a border |
| Code block on midnight | 1.05:1 | The block is identified by its hairline border and its type, not by ground contrast |

---

## Alt text

11 `<img>` tags across the source. All carry an `alt` attribute; none is an empty
string. Checked with a multi-line-aware parser, because a line-based grep reports false
positives on JSX where the tag spans several lines.

The signet renders through `src/components/Signet.jsx`, which sets alt centrally, so it
cannot be omitted at a call site.

---

## Keyboard

| Check | State |
|---|---|
| Skip-to-content link | Present — off-screen until focused, then lands as a gold action in the top-left |
| Focus indicators | 2px outline in `--ybz-accent-rule`, 2px offset; gold on midnight, bronze on paper |
| Focus trap in the mobile menu | Present, via `useFocusTrap` |
| Escape closes the mobile menu | Present |
| Icon-only buttons labelled | All carry `aria-label` — menu, close, scroll-to-top, theme toggle |
| Tab order | Follows document order; no positive `tabIndex` anywhere in the source |

The skip link was added in this pass. Seven navigation items precede the content on
every page, and without it a keyboard user tabbed through all of them on every
navigation.

---

## Landmarks and ARIA

`<header>`, `<nav>`, `<main id="main">` and `<footer>` are each present once per page.
The mobile menu is a `role="dialog"` with `aria-modal="true"` and an `aria-label`.

The scroll-progress rail is `aria-hidden="true"` — it duplicates information the
scrollbar already conveys, so exposing it would be noise.

---

## Motion

`prefers-reduced-motion: reduce` collapses every animation and transition to 0.01ms
globally, and the JavaScript-driven animations check `useReducedMotion()` directly
rather than relying on the CSS rule:

- The stack rail drops its entrance wipe and its spring smoothing
- The gold rule renders statically instead of drawing in
- The navbar's active-route indicator moves with zero duration

One deliberate exception: the rail still **tracks** scroll position under reduced
motion. Progress is information rather than decoration, and removing it would remove
the information, not the movement.

---

## Known gaps

| Gap | Note |
|---|---|
| No screen-reader pass | Not tested with NVDA, JAWS or VoiceOver |
| No automated browser audit | axe and Lighthouse have not been run against the rebuilt site |
| Heading order not verified per route | The token layer styles `h1`–`h6` consistently, but no check enforces that levels are not skipped |
| Certificate modal | Opens as a dialog but has not been verified for focus return on close |
| Colour-only status in the admin dashboard | Draft and published differ by accent versus muted plus the label text; the label carries the meaning, but this is worth a second look |

---

## Reproducing the contrast figures

```python
def lin(c):
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def luminance(hex_colour):
    h = hex_colour.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(fg, bg):
    a, b = luminance(fg), luminance(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)
```

Thresholds: 4.5:1 for normal text, 3:1 for large text (24px, or 18.66px bold) and for
UI component boundaries.

---

Audited by static analysis of the source at the brand v2.4 rebuild. Re-run after any
change to `src/index.css`, and note that `npm run brand:check` catches palette drift but
not contrast regressions — a colour can be in the palette and still be used against the
wrong ground.
