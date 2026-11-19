import { useMemo } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND, PROOF_STACK } from "../config/brand";
import { experienceTimeline } from "../data/experience";
import GoldRule from "../components/GoldRule";
import {
  Button,
  Card,
  DecisionRecord,
  Section,
  SectionHeader,
  StackLine,
  TextLink,
} from "../components/ui";

const featuredProjects = [
  {
    title: "SafeStay",
    copy: "Three-tier platform for verified student housing. Server-side state machines drive multi-party contract signing, so a half-signed contract cannot exist in the database.",
    tags: ["NestJS", "Next.js", "Flutter", "PostgreSQL"],
  },
  {
    title: "EduShift AI",
    copy: "Configurable prompt-engineering platform with versioned AI simulations and automated competency scoring. One simulation became four production products.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
    link: "/projects/edushift-ai",
  },
  {
    title: "Promptopia",
    copy: "AI prompt-sharing platform. NextAuth sessions over MongoDB, with the create/browse/manage loop kept to a single social feed.",
    tags: ["Next.js", "React", "NextAuth", "MongoDB"],
  },
  {
    title: "Blog Post",
    copy: "Content dashboard separating posts, users and admin flows behind an Express API rather than letting the client hold authorisation.",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
  },
];

/* Every row is a fact already published on the site: the SafeStay project
   copy, the About page's "how I work" and the proof stack. */
const heroRecord = {
  id: "Decision record",
  project: "SafeStay",
  status: "Accepted",
  rows: [
    {
      term: "Context",
      value:
        "Several parties sign one housing contract, at different times, from a Flutter app and a Next.js console.",
    },
    {
      term: "Decision",
      value:
        "Signing runs as a server-side state machine in the API. The client renders state; it does not own it.",
    },
    {
      term: "Result",
      value: "A half-signed contract cannot exist in the database.",
      emphasis: true,
    },
  ],
  footer: (
    <>
      <span>3-tier platform</span>
      <span>20+ table schema</span>
    </>
  ),
};

const Home = () => {
  const timeline = experienceTimeline.filter((entry) => entry.current);

  const homeSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    return [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/#home`,
        url: `${siteMeta.siteUrl}/`,
        name: `${BRAND.name} — ${BRAND.role}`,
        description: BRAND.positioning,
        inLanguage: locale,
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
        ],
      },
    ];
  }, []);

  return (
    <>
      <Seo
        title={BRAND.role}
        description={BRAND.positioning}
        keywords={[
          "software engineer",
          "architecture decisions",
          "NestJS",
          "Next.js",
          "system design",
        ]}
        url="/"
        schema={homeSchema}
      />

      {/* Hero. Text on the left, the decision record on the right: the claim
          and the evidence for it, side by side. */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 sm:px-10 lg:px-16 lg:pb-28 lg:pt-24">

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="ybz-enter space-y-6">
            <p className="ybz-eyebrow">{BRAND.descriptor}</p>
            <h1 className="ybz-display-1 lg:text-5xl">{BRAND.positioning}</h1>
            <GoldRule />
            <p className="ybz-lede">
              {BRAND.tagline} I work across{" "}
              <span className="text-bone">{BRAND.stackFull}</span>. The stack is
              the least interesting part. What a boundary costs when it goes in
              the wrong place is the part worth writing down.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button to="/lets-talk" icon={ArrowUpRight}>
                Start a conversation
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                icon={Mail}
                iconPosition="start"
              >
                Contact
              </Button>
            </div>
          </div>

          <div className="ybz-enter" style={{ animationDelay: "60ms" }}>
            <DecisionRecord {...heroRecord} />
          </div>
        </div>
      </section>

      {/* Proof, as a ledger. Every line carries its source — section 8. */}
      <Section tone="raised">
        <SectionHeader
          eyebrow="Proof"
          title="Three claims, each with a source."
        />

        <dl className="ybz-card divide-y divide-edge">
          {PROOF_STACK.map((item) => (
            <div
              key={item.source}
              className="grid gap-2 px-6 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <div>
                <p className="ybz-figure text-4xl">{item.figure}</p>
                <p className="ybz-meta mt-2">{item.figureLabel}</p>
              </div>
              <div className="space-y-2">
                <dt className="ybz-body text-bone">{item.claim}</dt>
                <dd className="ybz-source">{item.source}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Section>

      {/* Selected work, as an index: name and stack on the left, the decision
          on the right. */}
      <Section>
        <SectionHeader
          eyebrow="Selected work"
          title="What I built, and the decision inside it."
        />

        <ol className="border-t border-edge">
          {featuredProjects.map((project) => (
            <li
              key={project.title}
              className="grid gap-3 border-b border-edge py-8 md:grid-cols-[16rem_1fr] md:gap-10"
            >
              <div className="space-y-2">
                <h3 className="ybz-title">{project.title}</h3>
                <StackLine items={project.tags} />
              </div>
              <div className="space-y-3">
                <p className="ybz-body max-w-2xl">{project.copy}</p>
                {project.link && (
                  <TextLink to={project.link}>Case study</TextLink>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <TextLink to="/projects">All projects</TextLink>
        </div>
      </Section>

      {/* Where the work happens now. */}
      <Section tone="raised" className="border-b-0">
        <SectionHeader eyebrow="Now" title="Where the work happens." />

        <div className="grid gap-6 lg:grid-cols-2">
          {timeline.map((item) => (
            <Card key={item.title}>
              <div className="mb-6 flex items-center gap-4">
                {item.companyLogo ? (
                  <div className="ybz-plate h-14 w-14 p-2">
                    <img
                      src={item.companyLogo}
                      alt={`${item.companyLabel} logo`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center border border-hairline font-mono text-sm text-accent"
                    style={{ borderRadius: "var(--ybz-r-sm)" }}
                  >
                    {item.companyBadge}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-medium text-bone">{item.companyLabel}</p>
                  <p className="ybz-meta">{item.period}</p>
                </div>
              </div>

              <h3 className="ybz-title">{item.role}</h3>
              <p className="ybz-body mt-2">{item.detail}</p>
              <p className="ybz-source mt-4">{item.source}</p>
              {item.link && (
                <TextLink to={item.link} className="mt-4">
                  Case study
                </TextLink>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Home;
