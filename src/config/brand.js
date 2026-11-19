/**
 * Identity strings, mirrored from the brand kit's single source:
 *   brand-kit/brand.json (v3.0)
 *
 * brand-kit/BRAND.md section 1 keeps these facts in exactly one place. This
 * module is that one place for the site. If a fact changes, change it in
 * brand.json first, then here — never edit a component's copy directly.
 *
 * Retired and not to be reintroduced anywhere (brand-check-ignore: this block
 * names the retired strings in order to ban them):
 *   the old surname forms      — retired in v2.0
 *   "Full-Stack ..." as a role — a capability, not an identity
 *   the analyst title          — never the headline noun
 *   any location in a descriptor — see LOCATION_RULE below
 */

export const BRAND = {
  name: "Yousef Bakr",
  role: "Software Engineer",
  descriptor: "Software Engineer",

  tagline: "Engineering that earns its complexity.",
  positioning:
    "I build production software — and publish the architecture decisions behind it.",

  stackShort: "NestJS · Next.js · React",
  stackFull: "TypeScript · NestJS · Next.js · React · Docker · PostgreSQL",

  employer: "MindShift MENA",
  product: "EduShift AI",

  site: "yousef-bakr-s-portfolio.vercel.app",
  siteUrl: "https://yousef-bakr-s-portfolio.vercel.app",
  linkedin: "linkedin.com/in/yousef-bakr",
  linkedinUrl: "https://www.linkedin.com/in/yousef-bakr",
  github: "https://github.com/YOUBAZ",
  x: "@yousefbakr",
  email: "youbakrzaki@gmail.com",
};

/**
 * Section 1: "Based in Egypt — private. Never on a banner, OG card, lockup,
 * deck footer or descriptor." The reasoning is that a city in a descriptor
 * reads as a boundary rather than a fact.
 *
 * The one exemption section 1 grants is a structured location field, on the
 * grounds that LinkedIn already carries one. schema.org homeLocation is that
 * field, so it stays in the JSON-LD graph and nowhere else.
 */
export const LOCATION_RULE = "structured-data-only";

/**
 * The proof stack, brand-kit/BRAND.md section 2. Every claim carries its
 * source. Do not add a claim here without one.
 *
 * Framing rule (section 2): lead with the shipped product, never with age, and
 * keep rank off the page. The v2.4 age-led item was removed for that reason.
 */
export const PROOF_STACK = [
  {
    claim:
      "Scaled EduShift AI from a single simulation into 4 production learning products, adopted by 6+ organisations including the She's Next Entrepreneurship Competition.",
    source: "edushiftai.com · MindShift MENA, 2025–2026",
    figure: "4",
    figureLabel: "production products",
  },
  {
    claim: "Best Team Award, DECI Bootcamp.",
    source: "IBM, 2023",
    figure: "2023",
    figureLabel: "IBM DECI Bootcamp",
  },
  {
    claim:
      "Architected SafeStay: 3-tier platform, 20+ table schema, server-side state machines for multi-party contract signing.",
    source: "NestJS · Next.js · Flutter, 2026–",
    figure: "20+",
    figureLabel: "table schema",
  },
];

/** Section 11 — used in this order everywhere: signature, card, footer, CTA. */
export const CONTACT_BLOCK = [
  { label: BRAND.site, href: BRAND.siteUrl },
  { label: BRAND.linkedin, href: BRAND.linkedinUrl },
  { label: BRAND.email, href: `mailto:${BRAND.email}` },
];
