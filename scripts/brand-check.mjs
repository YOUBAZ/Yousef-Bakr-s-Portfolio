#!/usr/bin/env node
/**
 * brand-check — the site's equivalent of the brand kit's tools/verify.py.
 *
 * BRAND.md section 15 makes the self-check mechanical for the kit's own
 * artefacts. That script reads the kit, not this site, so items 1, 4 and 9 were
 * still manual here. This closes them.
 *
 * It fails on:
 *   1. any colour — hex or Tailwind class — outside sections 3.1 to 3.4
 *   2. any retired identity string
 *   3. the location appearing anywhere but the structured homeLocation field
 *
 * Everything else in the section 15 list still needs eyes.
 *
 *   npm run brand:check
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["src", "public/data"];
const SCAN_FILES = ["index.html"];
const EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".json"]);

// --- section 3.1–3.4, plus the 3.3 derived surface stops -------------------
const PALETTE = new Set(
  [
    // dark
    "#020617", "#0B0E1A", "#14161F", "#F4C025", "#F2CC5A", "#E0A906",
    "#401A66", "#592D86", "#0284C7", "#4F46E5", "#F5F3EF", "#A8B0BE", "#7C8698",
    // light
    "#F7F5F0", "#EDEAE3", "#FFFFFF", "#B07E05", "#8A6206", "#3B4354", "#5A6376",
    // 3.3 derived surface stops
    "#1A1C25", "#0E1017", "#FBF9F5", "#07080D", "#0D0F16", "#101218",
    "#191B24", "#C9D1E1", "#24252E", "#E8E9EA", "#1B1F2E", "#DEDDDA", "#5B6376",
  ].map((h) => h.toUpperCase())
);

// Tailwind scales that carry a colour the brand does not define. `slate-body`,
// `gold`, `ink`, `bone`, `muted` and friends are ours and resolve to --ybz-*.
const BANNED_SCALES =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const UTILITIES =
  "bg|text|border|from|via|to|ring|shadow|fill|stroke|decoration|outline|divide|accent|caret|placeholder";

// The negative lookahead is what stops `text-slate-body` matching `text-slate`.
const CLASS_RE = new RegExp(
  `\\b(?:${UTILITIES})-(?:${BANNED_SCALES})-\\d{2,3}\\b|\\b(?:${UTILITIES})-(?:${BANNED_SCALES})(?![-\\w])`,
  "g"
);
const PURE_BW_RE = new RegExp(`\\b(?:${UTILITIES})-(?:white|black)(?![-\\w])`, "g");
const HEX_RE = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;

// --- section 1, retired strings -------------------------------------------
const RETIRED = [
  { pattern: /Yousef Bakr Zaki/i, why: 'name retired in v2.0 — use "Yousef Bakr"' },
  { pattern: /Alsaidi/i, why: "retired name fragment" },
  { pattern: /Full-Stack (Software )?Engineer/i, why: 'never the headline noun — use "Software Engineer"' },
  { pattern: /Systems? Analyst/i, why: "never the headline noun" },
  { pattern: /Cloud Architect/i, why: "not a role the brand claims" },
  { pattern: /youngest senior/i, why: "section 2 retired this claim outright" },
];

// --- section 1, location is private ---------------------------------------
const GEO_RE = /\bCairo\b|\bEgypt\b/i;
/** The one legal home for the location: the structured field in seo.js. */
const GEO_ALLOWED = new Set(["src/config/seo.js", "src/config/brand.js"]);

/**
 * Proper nouns that happen to contain a banned substring. These are the names
 * of real things — a typeface, an institution, a certificate issued under a
 * legal name — and the brand cannot retroactively rename them. Section 1
 * governs how this site describes itself, not what a third party called
 * something.
 */
const PROPER_NOUNS = [
  '"Cairo"',                            // the Arabic typeface, section 4
  "Cairo carries both display",         // the comment explaining it
  "Digital Egypt Builders Initiative",  // the institution that ran DEBI
];

/**
 * Certificate scans are filed under the name on the certificate. The display
 * copy must use "Yousef Bakr"; the underlying asset path cannot lie about
 * which file it points at.
 */
const isCertificateAssetPath = (rel, line) =>
  rel === "public/data/certificates.json" &&
  /^\s*"(image|id)":/.test(line);

/** An escape hatch for lines that document a rule rather than break it. */
const IGNORE_MARKER = "brand-check-ignore";

const problems = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTENSIONS.has(extname(entry))) out.push(full);
  }
  return out;
}

const files = [
  ...SCAN_DIRS.flatMap((d) => {
    try {
      return walk(join(ROOT, d));
    } catch {
      return [];
    }
  }),
  ...SCAN_FILES.map((f) => join(ROOT, f)),
];

for (const file of files) {
  const rel = relative(ROOT, file);
  const source = readFileSync(file, "utf8");
  const isTokenFile = rel === "src/index.css";

  source.split("\n").forEach((line, i) => {
    const at = `${rel}:${i + 1}`;

    if (line.includes(IGNORE_MARKER)) return;
    if (PROPER_NOUNS.some((noun) => line.includes(noun))) return;
    if (isCertificateAssetPath(rel, line)) return;

    for (const match of line.match(CLASS_RE) || []) {
      problems.push({ at, kind: "colour", detail: `"${match}" is outside the palette`, line });
    }

    // Pure white and black are section 3.5 rule 4. The token file is exempt:
    // it defines #FFFFFF as the light-theme card surface, which is in 3.2.
    if (!isTokenFile) {
      for (const match of line.match(PURE_BW_RE) || []) {
        problems.push({ at, kind: "colour", detail: `"${match}" — grounds are never pure black or white`, line });
      }
    }

    for (const raw of line.match(HEX_RE) || []) {
      const hex = (raw.length === 4
        ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
        : raw
      ).toUpperCase();
      if (!PALETTE.has(hex)) {
        problems.push({ at, kind: "colour", detail: `hex ${raw} is not in sections 3.1–3.4`, line });
      }
    }

    for (const { pattern, why } of RETIRED) {
      if (pattern.test(line)) {
        problems.push({ at, kind: "identity", detail: `"${line.match(pattern)[0]}" — ${why}`, line });
      }
    }

    if (GEO_RE.test(line) && !GEO_ALLOWED.has(rel)) {
      problems.push({
        at,
        kind: "location",
        detail: `"${line.match(GEO_RE)[0]}" — section 1 keeps the location to the structured homeLocation field`,
        line,
      });
    }
  });
}

if (problems.length === 0) {
  console.log("brand-check: clean — colour, identity and location all hold.");
  process.exit(0);
}

const byKind = problems.reduce((acc, p) => {
  (acc[p.kind] ||= []).push(p);
  return acc;
}, {});

for (const [kind, items] of Object.entries(byKind)) {
  console.error(`\n${kind.toUpperCase()} — ${items.length}`);
  for (const item of items) {
    console.error(`  ${item.at}  ${item.detail}`);
    console.error(`      ${item.line.trim().slice(0, 110)}`);
  }
}

console.error(`\nbrand-check: ${problems.length} violation(s).`);
process.exit(1);
