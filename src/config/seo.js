import { BRAND } from "./brand";

export const siteMeta = {
  siteName: "Yousef Bakr",
  title: "Yousef Bakr · Software Engineer",
  description: BRAND.positioning,
  siteUrl: BRAND.siteUrl,
  locale: "en_US",
  siteLanguage: "en",
  // The generated OG card, not a portrait. BRAND.md section 17, issue 2.
  ogImage: "/og-1200x630-light.png",
  profileImage: "/images/about/profile.jpg",
  twitterHandle: BRAND.x,
  contactEmail: BRAND.email,
  // No geo terms: section 1 keeps the location out of descriptors and metadata.
  // It survives only in the structured homeLocation field below.
  keywords: [
    "Yousef Bakr",
    "Yousef Bakr software engineer",
    "software engineer",
    "architecture decisions",
    "NestJS engineer",
    "Next.js engineer",
    "React engineer",
    "TypeScript engineer",
    "PostgreSQL",
    "Docker",
    "production software",
    "system design",
    "SafeStay",
    "EduShift AI",
  ],
};

export const defaultSchemas = [
  {
    "@type": "Person",
    name: BRAND.name,
    jobTitle: BRAND.role,
    url: BRAND.siteUrl,
    description: BRAND.positioning,
    email: `mailto:${BRAND.email}`,
    image: `${BRAND.siteUrl}${siteMeta.ogImage}`,
    sameAs: [BRAND.github, BRAND.linkedinUrl],
    worksFor: {
      "@type": "Organization",
      name: BRAND.employer,
    },
    knowsAbout: [
      "Software architecture",
      "TypeScript",
      "NestJS",
      "Next.js",
      "React",
      "PostgreSQL",
      "Docker",
    ],
    // The one place the location appears. Section 1 exempts a structured
    // location field — this is the schema.org equivalent of LinkedIn's.
    homeLocation: {
      "@type": "Place",
      name: "Cairo, Egypt",
    },
  },
  {
    "@type": "WebSite",
    name: "Yousef Bakr",
    url: BRAND.siteUrl,
    description: BRAND.positioning,
    inLanguage: "en-US",
  },
];
