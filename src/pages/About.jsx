import { formatPeriod } from "../utils/formatPeriod";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
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
    copy: "In SafeStay, contract signing is a state machine in the API. The app and the console render state rather than own it; the case study walks through why.",
  },
  {
    label: "Reversibility over correctness",
    copy: "A decision I can undo in a day is worth more than one I am 90% sure about, so I price the rollback before arguing the design.",
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


const About = () => {
  const timeline = experienceTimeline;

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
        {/* Page grid: copy in columns 1–7, the portrait in 9–12. A narrower
            portrait ends near where the copy ends, so no empty block opens up
            beside it. */}
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-x-6">
          {/* Section 11's About copy, which is already written and on-voice. */}
          <div className="space-y-4 md:col-span-7">
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
              Each case study on this site walks through the decisions inside
              one system: what it had to solve, what I chose, and what that
              choice prevents. If you are hiring, the CV has the dates and the
              details.
            </p>
          </div>

          {/* One portrait, cropped to head and shoulders and set in grey, so
              the background colour does not outshout the palette. */}
          <Card
            padded={false}
            className="self-start overflow-hidden md:col-span-4 md:col-start-9"
          >
            <img
              src="/images/about/profile.jpg"
              alt={BRAND.name}
              className="ybz-photo aspect-square w-full object-cover object-[50%_15%]"
            />
          </Card>
        </div>
      </PageHeader>


      <Section>
        <SectionHeader
          eyebrow="How I work"
          title="Four habits I build by."
        />
        <ol className="border-t border-edge">
          {principles.map((principle, index) => (
            <li
              key={principle.label}
              className="grid gap-3 border-b border-edge py-8 md:grid-cols-12 md:gap-x-6"
            >
              <div className="flex gap-4 md:col-span-3">
                <p className="ybz-meta pt-1">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="ybz-title">{principle.label}</h3>
              </div>
              <p className="ybz-body md:col-span-7">{principle.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="raised" className="border-b-0">
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="space-y-8 lg:col-span-7">
            <p className="ybz-eyebrow">Timeline</p>
            <ol className="space-y-6">
              {timeline.map((entry) => (
                <li
                  key={`${entry.title}-${entry.period}`}
                  className="border-l border-edge pl-5"
                >
                  <p className="ybz-meta">{formatPeriod(entry.period)}</p>
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

          <Card className="space-y-6 self-start lg:col-span-5">
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
