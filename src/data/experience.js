/**
 * brand.json is explicit that MindShift MENA is one employer and EduShift AI is
 * one product built there — an earlier brief listed them as two employers, and
 * this file carried that error. Merged, with the company name spelled as the
 * brand sets it ("MindShift MENA", not "MindShiftMENA").
 *
 * Every detail line carries something checkable. Section 8: if a sentence
 * cannot be checked, cut it.
 */
export const experienceTimeline = [
  {
    period: "09/2025 — present",
    title: "Software Engineer · MindShift MENA",
    role: "Software Engineer",
    detail:
      "Building EduShift AI. Scaled it from a single simulation into 4 production learning products, now used by 6+ organisations including the She's Next Entrepreneurship Competition.",
    source: "edushiftai.com · MindShift MENA, 2025–2026",
    companyLabel: "MindShift MENA",
    companyLogo:
      "/images/about/MindShift-Logo-Design-color-impact-V-PNG.png",
    productLogo: "/images/about/edushiftaiLogo.png",
    productLabel: "EduShift AI",
  },
  {
    period: "2026 — present",
    title: "Building SafeStay",
    role: "Building SafeStay",
    detail:
      "Three-tier platform for verified student housing: NestJS API, Next.js console, Flutter app. 20+ table schema with server-side state machines for multi-party contract signing, KYC gating and cron-driven payment reminders.",
    source: "NestJS · Next.js · Flutter, 2026–",
    companyLabel: "SafeStay",
    companyBadge: "SS",
  },
];
