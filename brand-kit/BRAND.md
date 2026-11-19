# BRAND: Yousef Bakr

**Version 3.0 · 2026-11-19 · territory: Spec sheet**

This replaces v2.4 (`v5/files/yousef-bakr-brand-v2.4/`, kept for history only). The
live site and the root `CLAUDE.md` follow this file. See section 11.

`brand.json` is the machine copy of sections 1, 3, 4 and 5. Every hex in this kit comes
from it. Logo files are generated from it by `tools/build_marks.py`, so you never edit
them by hand. `tools/verify.py` checks the kit against it.

**If you are an AI agent:** read sections 1 to 9 and section 12 before producing anything.

---

## 1. Identity: the facts

| Field | Value |
|---|---|
| Name | Yousef Bakr. Never "Yousef Bakr Zaki". |
| Role | Software Engineer. Never "Full-Stack Engineer" or "Systems Analyst" as the headline noun. |
| Descriptor | Software Engineer, set in IBM Plex Mono under the wordmark. |
| Slogan | Engineering that earns its complexity. |
| Employer | Software engineer at MindShift MENA |
| Founder of | SafeStay |
| Flagship evidence | EduShift AI |
| Location | Private. Never on any asset. The audience is worldwide. |

## 2. Positioning

### Who it is for, in order

1. **Hiring managers and tech leads at large engineering organisations.** These are the
   people who read portfolios and recommend hires. Recruiters screen for them.
2. **Founders who need a production system built.** They are served by the same
   evidence. There is no separate offer and no price on any public asset.

### The one thing

He ships production software that real organisations use, and he can explain why it
is built the way it is.

### Positioning line

> Software engineer who ships production systems and explains every trade-off in
> time, risk and users.

### Proof

| Claim | Source |
|---|---|
| Scaled EduShift AI from a single simulation into 4 production learning products | edushiftai.com · MindShift MENA, 2025–2026 |
| EduShift AI is adopted by 6+ organisations to train teams in soft and technical skills, including the She's Next Entrepreneurship Competition | edushiftai.com · MindShift MENA, 2025–2026 |
| Architected SafeStay: 3-tier platform, 20+ table schema, server-side state machines for multi-party contract signing | SafeStay, 2026– |
| Best Team Award, DECI Bootcamp | IBM, 2023 |

### Framing rules

- **Lead with the shipped product, never with age.** "Started at 15, hired at 18" is
  a prodigy story and anchors the reader on "junior". If time matters, state it as
  years of practice.
- **No price, no "affordable", no "fast and cheap".** Speed is claimed only with a
  dated example.
- **Rank stays off the page.** Not "junior", and not "senior". Describe the work.

## 3. Colour

One signal colour on ink and paper. Light is the default.

### 3.1 Light (default)

| Token | Hex | Role |
|---|---|---|
| `--yb-ground` | `#F4F3EF` | Page background. Warm paper, never pure white. |
| `--yb-surface` | `#EAE8E2` | Cards, code blocks, table headers. |
| `--yb-ink` | `#15171B` | Headlines and body. 16.2:1 on ground. |
| `--yb-muted` | `#5E626A` | Secondary text, captions, margin notes. 5.5:1. |
| `--yb-rule` | `#D3D0C8` | Hairlines and grid lines. Never text. |
| `--yb-signal` | `#D2481C` | Graphics only: markers, the Merge Y branch, key-figure rules. 4.0:1. |
| `--yb-signal-type` | `#A8360E` | Signal as text: section numbers, key figures. 5.9:1. |

### 3.2 Dark

| Token | Hex | Role |
|---|---|---|
| `--yb-ground` | `#121417` | Page background. Never pure black. |
| `--yb-surface` | `#24282D` | Cards, code blocks, table headers. |
| `--yb-ink` | `#ECEBE6` | Headlines and body. 15.5:1 on ground. |
| `--yb-muted` | `#9A9EA5` | Secondary text. 6.9:1. |
| `--yb-rule` | `#363B42` | Hairlines and grid lines. Never text. |
| `--yb-signal` | `#E2582B` | Graphics. 5.0:1. |
| `--yb-signal-type` | `#EE7A52` | Signal as text. 6.6:1. |

### 3.3 Hard rules (measured)

- **Figure and ground.** A box never shares a fill with what is behind it. On a
  surface band, boxes take the ground colour; boxes inside boxes take the other.
  Dark mode uses a larger step than light (9.7 against 3.8 L*), because the eye
  separates near-black tones less well than near-white ones.
- `--yb-signal` is never body text on the light ground (4.0:1). Use `--yb-signal-type`.
- Signal covers no more than about 5% of any composition. One key figure, the Merge Y branch
  node and section markers. Never a fill behind text, never a gradient.
- Links are ink with an underline. Hover moves the underline to signal. There is no
  separate link colour.
- No colour outside this table. No gradients, glows or glass effects.

## 4. Typography

One family, three cuts. IBM Plex was drawn for engineering documentation, and it
covers Arabic.

| Role | Face | Weight | Size (px) |
|---|---|---|---|
| Display | IBM Plex Sans | 600 | 60 |
| H1 | IBM Plex Sans | 600 | 44 |
| H2 | IBM Plex Sans | 600 | 32 |
| H3 | IBM Plex Sans | 500 | 25 |
| Lead | IBM Plex Sans | 400 | 20 |
| Body | IBM Plex Sans | 400 | 16, line height 1.6, measure 68ch |
| Label, metadata, figures | IBM Plex Mono | 500 | 13 |
| Code | IBM Plex Mono | 400 | 14 |
| Arabic | IBM Plex Sans Arabic | 400 / 600 | Same scale, line height 1.8 |

- Headlines are tracked -0.01em. Sentence case everywhere. No all-caps, including labels.
- Figures in tables and metrics use Plex Mono so columns align.
- No other typeface. Playfair Display, Montserrat, Cairo and JetBrains Mono are retired.

## 5. Marks

| File | Use |
|---|---|
| `logo/lockup-horizontal-on-*.svg` | **Primary logo.** Merge Y and wordmark. Site header, CV, deck cover, email signature. |
| `logo/glyph-on-*.svg` | **Symbol.** Merge Y alone. Avatar, favicon, footer signet, small spaces. |
| `logo/glyph-mono-on-*.svg` | Merge Y in ink only. Over photos, on one-colour print, anywhere signal would clash. |
| `logo/wordmark-on-*.svg` | Name only. Where the symbol already appears nearby. |
| `logo/lockup-on-*.svg` | Wordmark over descriptor. Document headers and title pages. |
| `logo/favicon.svg` | Merge Y. Follows the system theme. |

`on-light` files go on the light ground, and `on-dark` files go on the dark ground.

### The wordmark

"Yousef Bakr" in IBM Plex Sans SemiBold, tracked -0.01em, converted to outlines.

### The Merge Y

The Y is a merge diagram. The right arm and stem are one piece, the main line. The
left arm is the branch, in signal, meeting the main line across a hairline seam. The
initial and the idea of work merged into production are one shape.

- **Construction:** a 48-unit grid. Flat terminals sit on cap height (y 4) and the
  baseline (y 44). Both arms run at the same angle and the same 12-unit width; the stem
  is 12 units wide. The seam is a 1.6-unit cut parallel to the main arm's inner edge.
- **In the horizontal lockup:** the Merge Y is 1.45 times the wordmark's cap height,
  centred on it, with a 0.4em gap.
- **Colour:** main line in ink, branch in signal. Use the all-ink version where the
  signal branch would fight the background.
- **Minimum size:** 16px. Below 24px the seam closes up; that is expected.
- **Never** recolour the main line, put the branch in ink while the main line is in
  signal, close the seam at large sizes, rotate, mirror, outline or add effects.

### Clear space

Leave at least the wordmark's cap height of clear space on every side.

## 6. Layout signature

The identity looks like a well-made engineering document.

- **Header strip** on every page and asset: name, role, revision (`Rev 2026.11`), in
  Plex Mono 13, muted, above a hairline.
- **Numbered sections:** `01`, `02` in Plex Mono, in `--yb-signal-type`, set to the left
  of each H2. Where sections are not a sequence (a website's pages), a short mono label
  takes the number's place, in the same colour.
- **Headline marker:** a 2px × 32px rule in `--yb-signal` under page and section
  headlines.
- **Visible grid:** 12 columns with hairlines in `--yb-rule`. Show it in heroes, OG cards
  and covers. Hide it in running text.
- **Margin notes:** sources, dates and figures in Plex Mono, muted, in the outer column.
- **Footer strip:** Merge Y, name, role and a page counter.
- **Left-aligned.** Nothing centred except a single figure in a chart.
- **Radii:** 2, 4 and 8px. Square is the default.
- **Spacing:** 4, 8, 12, 16, 24, 32, 48, 64, 96.

## 7. Voice

A peer reporting findings. Evidence comes before opinion.

- Short sentences and precise nouns. Name the system, the number and the date.
- Talk in the business's terms: time, risk and users. This is the "engineer who can
  sit with the CEO" signal.
- Sentence case. No emoji. No exclamation marks.
- Never claim seniority. Never lead with age.
- Close on a question a senior engineer could actually answer.

## 8. Red lines

No personal life, religion, politics, comedy, sarcasm, memes, self-mockery or coarse
language, in either language, including replies.

## 9. Anti-references

**Never look like these:**

- **The neon developer portfolio:** purple-to-blue gradients, glass cards, glowing
  cursors, terminal green.
- **The freelancer agency:** "we bring your ideas to life", 3D blobs, price tiers,
  stock handshakes.

**Allowed, but not the direction:**

- Luxury gold, black and a high-contrast serif. This is where v2.4 sat.
- Pastel SaaS templates with illustrated people.

## 10. Copy bank

| Slot | Copy |
|---|---|
| LinkedIn headline | Software Engineer at MindShift MENA · Scaled EduShift AI to 4 production products used by 6+ organisations · Founder of SafeStay |
| One-liner | Software engineer who ships production systems and explains every trade-off in time, risk and users. |
| Lockup third line | Engineering that earns its complexity. |

The long and short bios are not written yet.

## 11. Adoption

Adopted on the site on 2026-11-19 (branch `feat/brand-v3`):

1. The root `CLAUDE.md` and `DESIGN-SYSTEM.md` point to this file.
2. Site tokens in `src/index.css` mirror section 3; `src/config/brand.js` mirrors
   section 1. `npm run brand:check` reads its palette from `brand.json`.
3. Fonts are IBM Plex Sans, Plex Mono and Plex Sans Arabic.
4. The favicon, app icons and header mark are the Merge Y. `Signet` draws it from
   `brand.json`.
5. Both OG cards are regenerated on the section 6 grid.

6. Blog banners and project covers are generated by `tools/build_covers.py` from
   `public/data/*.json`, in a light and a `-dark` version each. The site's
   `CoverImage` shows the one for the active theme. The v2.4 banners are deleted.

Nothing on the site uses v2.4 artwork. Third-party logos (client and
organisation marks on the experience timeline) are their owners' identities and
stay as they are.

## 12. Self-check before delivery

```bash
python3 brand-kit/tools/verify.py
```

1. Every colour is in section 3, including "close enough" shades.
2. `--yb-signal` is never body text on the light ground.
3. Only IBM Plex Sans, Plex Mono and Plex Sans Arabic are used.
4. The ground is a token, never pure black or pure white.
5. Signal covers about 5% of the composition or less.
6. The header strip and the numbered sections are present.
7. No emoji, no title case, no all-caps, no exclamation marks.
8. The name reads Yousef Bakr and the role reads Software Engineer.
9. No age-led framing, no price, no claimed seniority.
10. Nothing touches the red lines in section 8.
11. A hiring manager at a large company would read it as a peer's work.
