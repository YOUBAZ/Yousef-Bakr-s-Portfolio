# CLAUDE.md — Yousef Bakr

Read `brand-kit/BRAND.md` (v3.0) before producing anything. `brand-kit/brand.json`
has the exact values; never guess a hex. The v2.4 kit in `v5/files/` is retired and
kept for history only.

## Identity
- Name: **Yousef Bakr**. Never "Yousef Bakr Zaki".
- Role: **Software Engineer**. Never "Full-Stack Engineer" or "Systems Analyst" as the headline noun.
- Founder of **SafeStay**. Software engineer at **MindShift MENA**.
- Descriptor: `Software Engineer`, sentence case, in IBM Plex Mono.
- Slogan: "Engineering that earns its complexity." Use it as the third line on any identity asset.
- **Never append a location** to the descriptor or any asset. No "Cairo", no "Egypt".
  The audience is worldwide. (MindShift MENA is a company name, not a location.)
- **Never set the stack as a list on an asset** (banner, card, OG, cover). Name the
  stack in prose only.

## Framing
- Audience order: hiring managers and tech leads at large engineering organisations
  first, founders second.
- Lead with shipped products and their sourced figures, never with age.
- No price, no "affordable", no "fast and cheap". Claim speed only with a dated example.
- Keep rank off the page: not "junior", not "senior". Describe the work.

## Colour
- Light is the default: paper `#F4F3EF`, ink `#15171B`. Dark: `#121417` and `#ECEBE6`.
  Never pure black or white.
- One signal colour: `#D2481C` (light) / `#E2582B` (dark). Graphics only: the Merge Y
  branch, markers, key-figure rules. About 5% of a composition at most.
- **Signal is never body text on paper** (4.0:1). For signal as text use
  `--ybz-accent-type` (`#A8360E` light, `#EE7A52` dark).
- Signal is never a fill behind text. No gradients, glows, glass or purple.
- Links are ink with an underline that turns signal on hover. No separate link colour.
- Never introduce a colour outside `brand-kit/brand.json`.

## Type
IBM Plex Sans for headlines (600, -0.01em) and all running text. IBM Plex Mono for
figures, code, labels and metadata. IBM Plex Sans Arabic for Arabic. Sentence case
everywhere, no all-caps, including labels. No other typeface.

## Marks
The primary logo is the Merge Y beside the wordmark. The Merge Y alone is the symbol
(avatar, favicon, footer). Files are generated into `brand-kit/logo/` by
`brand-kit/tools/build_marks.py`; never hand-edit them. On the site, `Signet` draws
the Merge Y from `brand.json`.

## Layout
Spec sheet: a header strip, a visible 12-column hairline grid on heroes and covers,
a short signal marker under headlines, mono margin notes, and a footer strip with the
Merge Y + name + role + counter. Left-aligned. Radii 2/4/8; square is the default.

## Voice
Peer reporting findings, never an applicant seeking approval. Evidence before opinion.
Short sentences, precise nouns. Sentence case. No emoji. Never claim seniority. Close
on a question a senior engineer could actually answer.

## Red lines
No personal life, religion, politics, comedy, sarcasm, memes, self-mockery or coarse
language — in either language, including replies.

## Before you finish
```bash
python3 brand-kit/tools/verify.py
npm run brand:check
```
Then state the `brand-kit/BRAND.md` section 12 self-check result.
