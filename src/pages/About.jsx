import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND, PROOF_STACK } from "../config/brand";
import {
  experienceTimeline,
  leadershipRoles,
  volunteering,
} from "../data/experience";
import RoleList from "../components/RoleList";
import {
  Card,
  PageHeader,
  Section,
  SectionHeader,
  StackLine,
  TextLink,
} from "../components/ui";

/**
 * Section 8: evidence before opinion. Each principle names a mechanism rather
 * than an adjective — the previous version described "experience intelligence"
 * and "measurable rigor", which cannot be checked.
 */
const principles = [
  {
    label: "The boundary comes first",
    copy: "Where a responsibility ends decides more than which framework holds it. Get the seam wrong and every later choice pays interest on it.",
  },
  {
    label: "State belongs on the server",
    copy: "SafeStay's contract signing runs as a server-side state machine, so a half-signed agreement cannot exist in the database. The client renders state; it does not own it.",
  },
  {
    label: "Reversibility over correctness",
    copy: "A decision you can undo in a day is worth more than one you are 90% sure about. Most architecture arguments dissolve once you cost the rollback.",
  },
  {
    label: "Publish the reasoning, not the result",
    copy: "A migration that worked teaches nothing on its own. The signal that justified it, and the one that would have stopped it, are the part worth writing down.",
  },
];

// Section 1 permits the stack in prose and in the About section, where it is a
// searchable detail rather than a claim — never as a list on an asset.
const toolset = [
  "TypeScript",
  "NestJS",
  "Next.js",
  "React",
  "PostgreSQL",
  "Docker",
  "Node.js / Express.js",
  "MongoDB / Redis",
  "REST & GraphQL APIs",
];

const aboutGallery = [
  {
    src: "/images/about/profile.jpg",
    alt: "Yousef Bakr",
    label: "Portrait",
  },
  {
    src: "/images/about/WhatsApp Image 2026-03-29 at 9.32.54 PM.jpeg",
    alt: "Yousef Bakr at the AI Everything event",
    label: "AI Everything",
  },
  {
    src: "/images/about/WhatsApp Image 2026-03-29 at 9.32.54 PM (1).jpeg",
    alt: "Event poster, variant one",
    label: "Poster 01",
  },
  {
    src: "/images/about/WhatsApp Image 2026-03-29 at 9.32.54 PM (2).jpeg",
    alt: "Event poster, variant two",
    label: "Poster 02",
  },
];

const About = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = aboutGallery[activeImageIndex];
  const timeline = experienceTimeline;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % aboutGallery.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const aboutSchema = [
    {
      "@type": "WebPage",
      "@id": `${siteMeta.siteUrl}/about`,
      url: `${siteMeta.siteUrl}/about`,
      name: `About ${BRAND.name}`,
      description: BRAND.positioning,
      about: {
        "@type": "Person",
        name: BRAND.name,
        jobTitle: BRAND.role,
        worksFor: {
          "@type": "Organization",
          name: BRAND.employer,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteMeta.siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${siteMeta.siteUrl}/about`,
        },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="About"
        description={BRAND.positioning}
        keywords={["about", "software engineer", "NestJS", "Next.js"]}
        url="/about"
        schema={aboutSchema}
      />

      <PageHeader
        eyebrow="About"
        title={`${BRAND.role} at ${BRAND.employer}. Founder of SafeStay.`}
      >
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Section 11's About copy, which is already written and on-voice. */}
          <div className="space-y-4">
            <p className="ybz-lede">
              I build production software: APIs that carry real traffic,
              front-ends that survive contact with real users, and the
              boundaries between them.
            </p>
            <p className="ybz-body max-w-2xl">
              Currently a software engineer at {BRAND.employer}, working
              full-stack across {BRAND.stackShort}, and building SafeStay. Since
              September 2025 I have been shipping, breaking and repairing systems
              in production.
            </p>
            <p className="ybz-body max-w-2xl">
              I write here about the decisions rather than the tools — why a
              boundary went where it went, what it cost when it went in the
              wrong place, and what the traces looked like afterwards. If you
              lead a team and want a second opinion on an architecture call, my
              inbox is open.
            </p>
          </div>

          {/* Visuals. The images are stacked and cross-fade on opacity alone;
              the interval only changes which one is visible. */}
          <Card padded={false}>
            <div className="ybz-frame aspect-4/5 lg:aspect-16/10">
              {aboutGallery.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={index === activeImageIndex ? image.alt : ""}
                  aria-hidden={index !== activeImageIndex}
                  className="absolute inset-0 p-3 transition-opacity duration-150"
                  style={{
                    opacity: index === activeImageIndex ? 1 : 0,
                    transitionTimingFunction: "var(--ybz-ease)",
                  }}
                  loading="lazy"
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <p className="ybz-meta">{activeImage.label}</p>
              <div className="flex items-center gap-1">
                {aboutGallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className="flex h-8 items-center px-1"
                    aria-label={`Show ${image.label}`}
                    aria-pressed={activeImageIndex === index}
                  >
                    <span
                      className="block h-0.5 w-6 transition-colors duration-150"
                      style={{
                        background:
                          activeImageIndex === index
                            ? "var(--ybz-accent-rule)"
                            : "var(--ybz-edge)",
                      }}
                    />
                  </button>
                ))}
                <p className="ybz-meta ml-3">
                  {activeImageIndex + 1}/{aboutGallery.length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PageHeader>

      {/* Proof, with sources. */}
      <Section tone="raised">
        <SectionHeader
          eyebrow="Proof"
          title="Three claims, each with a source."
        />
        <dl className="grid border-t border-edge sm:grid-cols-2 sm:gap-x-10">
          {PROOF_STACK.map((item) => (
            <div
              key={item.source}
              className="space-y-2 border-b border-edge py-6"
            >
              <dt className="ybz-body text-bone">{item.claim}</dt>
              <dd className="ybz-source">{item.source}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="How I work"
          title="Four positions I would defend in review."
        />
        <ol className="border-t border-edge">
          {principles.map((principle, index) => (
            <li
              key={principle.label}
              className="grid gap-3 border-b border-edge py-8 md:grid-cols-[3rem_16rem_1fr] md:gap-8"
            >
              <p className="ybz-meta pt-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="ybz-title">{principle.label}</h3>
              <p className="ybz-body max-w-2xl">{principle.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="raised" className="border-b-0">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-8">
            <p className="ybz-eyebrow">Timeline</p>
            <ol className="space-y-6">
              {timeline.map((entry) => (
                <li
                  key={`${entry.title}-${entry.period}`}
                  className="border-l border-edge pl-5"
                >
                  <p className="ybz-meta">{entry.period}</p>
                  <h3 className="ybz-title mt-2">{entry.title}</h3>
                  <p className="ybz-body mt-2">{entry.detail}</p>
                  <p className="ybz-source mt-3">{entry.source}</p>
                  {entry.link && (
                    <TextLink to={entry.link} className="mt-3">
                      Read the case study
                    </TextLink>
                  )}
                </li>
              ))}
            </ol>
            <details className="group border-t border-edge pt-6">
              <summary className="ybz-link min-h-11 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  Show leadership and volunteering (
                  {leadershipRoles.length + volunteering.length} roles)
                </span>
                <span className="hidden group-open:inline">
                  Hide leadership and volunteering
                </span>
              </summary>
              <div className="grid gap-8 pt-6 md:grid-cols-2">
                <RoleList
                  eyebrow="Leadership and community"
                  roles={leadershipRoles}
                />
                <RoleList eyebrow="Volunteering" roles={volunteering} />
              </div>
            </details>
          </Card>

          <Card className="space-y-6 self-start">
            <p className="ybz-eyebrow">Toolset</p>
            <StackLine items={toolset} className="text-sm leading-7" />
            <p className="ybz-body border-t border-edge pt-6">
              Next on the list: .NET and MAUI, Spring Boot, and embedded
              firmware — chosen because they force different trade-offs than the
              ones I already know how to make.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default About;
