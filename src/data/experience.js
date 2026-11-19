/**
 * Positions, mirrored from LinkedIn (Experience + Volunteering, 11/2026).
 *
 * brand.json is explicit that MindShift MENA is one employer and EduShift AI is
 * one product built there. Spelled as the brand sets it ("MindShift MENA").
 *
 * Rules carried over from BRAND.md:
 *  - Section 1: no locations on any entry, even where LinkedIn shows one.
 *  - Section 8: every detail line carries something checkable. No emoji.
 *
 * `current: true` entries are what the home page shows under "Now".
 * `link` points at an internal case study when one exists.
 */
export const experienceTimeline = [
  {
    period: "11/2026 — present",
    title: "TechOps Director · MSP Tech Club, Capital University",
    role: "TechOps Director",
    detail:
      "Runs technical operations for the club. Built its public site and member system: permission-based roles, event registration with a waitlist, and QR check-in at the door.",
    source: "msp-helwan.vercel.app · Next.js · NestJS · PostgreSQL",
    companyLabel: "MSP Tech Club",
    companyLogo: "/images/projects/MSP-Tech-Club.jpeg",
    link: "/projects/msp-tech-club",
    current: true,
  },
  {
    period: "09/2026 — present",
    title: "Software Engineer – Webmaster · IEEE Helwan Student Branch",
    role: "Software Engineer – Webmaster",
    detail:
      "Building the branch's central web system, bringing every chapter onto one platform, with per-chapter dashboards tracking events, milestones and committee KPIs.",
    source: "IEEE Helwan Student Branch, 2026–",
    companyLabel: "IEEE Helwan Student Branch",
    companyLogo: "/images/about/IEEE-Helwan-Logo.png",
    current: true,
  },
  {
    period: "03/2026 — present",
    title: "Software Engineer · MindShift MENA",
    role: "Software Engineer",
    detail:
      "Expanded EduShift AI from one simulation into 4 production learning products: Business Acumen, ERP, Leadership (LeadShift) and Project Management. Built the prompt-engineering platform behind them: versioned simulations, LLM-based competency scoring and generated learner reports. Also shipped an event system with InstaPay payments, promo codes, scheduled email campaigns and digital check-in.",
    source:
      "edushiftai.com · used by 6+ organisations, including the She's Next Entrepreneurship Competition",
    companyLabel: "MindShift MENA",
    companyLogo: "/images/about/MindShift-Logo-Design-color-impact-V-PNG.png",
    productLogo: "/images/about/edushiftaiLogo.png",
    productLabel: "EduShift AI",
    link: "/projects/edushift-ai",
    current: true,
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
    current: true,
  },
  {
    period: "07/2026 — 08/2026",
    title: "Flutter Summer Intern · RoboTech ASU",
    role: "Flutter Summer Intern",
    detail:
      "Built a mobile commerce app as a modular monolith: Cubit state per feature, Dio over REST, offline-first storage in Hive, and Firebase Auth with Firestore sync.",
    source: "RoboTech ASU, 2026",
    companyLabel: "RoboTech ASU",
    companyBadge: "RT",
  },
  {
    period: "09/2025 — 03/2026",
    title: "Software Engineer Intern · MindShift MENA",
    role: "Software Engineer Intern",
    detail:
      "Co-designed and tested edushiftai.com and shipped its flagship Business Fundamentals Simulation. Wrote the API behind it: RBAC, multi-tenant sessions, and live computation of the income statement, balance sheet and cash flow from learner decisions. Built trainer and admin dashboards for live competition events.",
    source: "edushiftai.com · MindShift MENA, 2025–2026",
    companyLabel: "MindShift MENA",
    companyLogo: "/images/about/MindShift-Logo-Design-color-impact-V-PNG.png",
  },
];

/** Leadership, memberships and non-engineering roles. */
export const leadershipRoles = [
  {
    period: "02/2026 — 08/2026",
    title: "Entrepreneurship Committee Member · ALPHA - ASU",
    detail:
      "Best Entrepreneurship Team for Pulse, a smart IoT startup. Remarkable Effort certificate for an individual business project, from idea to investor deck.",
  },
  {
    period: "2026",
    title: "Participant · NASA Space Apps Challenge",
  },
  {
    period: "08/2026 — 09/2026",
    title: "Sales Intern · iCareer",
  },
  {
    period: "06/2026 — 11/2026",
    title: "Member, business development and B2B · AIESEC in Egypt",
  },
  {
    period: "06/2026 — 11/2026",
    title: "Member · Rotaract",
  },
  {
    period: "02/2026 — 07/2026",
    title: "AI Committee Member · RoboTech ASU",
  },
];

/** LinkedIn "Volunteering". */
export const volunteering = [
  {
    period: "11/2026",
    title: "Volunteer · Global Entrepreneurship Festival",
  },
  {
    period: "04/2026",
    title: "Activities Coordinator · ASU Career Center",
    detail: "Career Expo.",
  },
  {
    period: "09/2024 — present",
    title: "Event Organizer · Egypt Fellows Community",
  },
  {
    period: "09/2024",
    title: "Moderator · PyramidBITS",
    detail: "TransforME event.",
  },
  {
    period: "08/2024",
    title: "Event Organizer · ALX Arabia",
    detail: "ALX Ventures event, check-in team.",
  },
];
