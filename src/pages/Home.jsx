import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND, PROOF_STACK } from "../config/brand";
import GoldRule from "../components/GoldRule";
import { FigureValue } from "../components/ui/Figure";
import {
  Button,
  ClosingCta,
  CoverImage,
  DecisionRecord,
  Section,
  SectionHeader,
  SourceLink,
  StackLine,
  TextLink,
} from "../components/ui";

/* Production work only; earlier builds live on /projects. Each line states a
   different decision, so no sentence on this page says the same thing twice. */
const featuredProjects = [
  {
    title: "SafeStay",
    copy: "Verified student housing across a NestJS API, a Next.js console and a Flutter app, with identity verification gating the flows.",
    tags: ["NestJS", "Next.js", "Flutter", "PostgreSQL"],
    link: "/projects/safestay",
    // Not public yet: the thumbnail is its architecture diagram.
    thumb: "/images/projects/safestay-diagram.png",
  },
  {
    title: "EduShift AI",
    copy: "LMS and business-simulation platform. Simulations are versioned, so a running cohort is never moved onto a changed prompt.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
    link: "/projects/edushift-ai",
    thumb: "/images/projects/edushift-ai-screen.jpg",
  },
  {
    title: "MSP Tech Club system",
    copy: "Invite-only member system for a university club. Permissions, not role names, guard every route, so no member can promote themselves.",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
    link: "/projects/msp-tech-club",
    thumb: "/images/projects/msp-tech-club-screen.jpg",
  },
  {
    title: "AutoBusiness",
    copy: "Bilingual course store. Orders move through a state machine under row locks, so approving a payment twice cannot grant access twice.",
    tags: ["Next.js", "NestJS", "MariaDB"],
    link: "/projects/autobusiness",
    thumb: "/images/projects/autobusiness-screen.jpg",
  },
];

/* The hero object. Every row is published on the SafeStay case study. */
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
      <Link
        to="/projects/safestay"
        className="inline-flex items-center gap-1 text-bone underline decoration-edge underline-offset-4 hover:decoration-[var(--ybz-signal)]"
      >
        Read the case study
        <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </>
  ),
};

const Home = () => {
  const homeSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    return [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/#home`,
        url: `${siteMeta.siteUrl}/`,
        name: siteMeta.title,
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

      {/* Hero, on the 12-column grid the ruler above marks out. The claim
          runs across ten columns at full display size, wrapped "pretty" rather
          than balanced so its lines fill the width instead of leaving an
          empty top-right corner; under it, the lede in columns 1–5 and the
          evidence for the claim in columns 7–12. */}
      <section className="relative px-6 pb-16 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pb-24 lg:pt-12">
        <div className="mx-auto grid max-w-6xl gap-y-10 md:grid-cols-12 md:gap-x-6 lg:gap-y-14">
          <div className="ybz-enter space-y-6 md:col-span-12 lg:col-span-10">
            <p className="ybz-eyebrow">{BRAND.descriptor}</p>
            <h1 className="ybz-display-1 [text-wrap:pretty]">{BRAND.positioning}</h1>
            <GoldRule />
          </div>

          <div className="ybz-enter space-y-8 self-start md:col-span-12 lg:col-span-5">
            <p className="ybz-lede">
              Software engineer at {BRAND.employer} and founder of SafeStay. I
              build the API, the data model and the front end, in TypeScript,
              NestJS, Next.js and PostgreSQL.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button to="/contact" icon={ArrowRight}>
                Contact
              </Button>
              <Button to="/projects" variant="secondary">
                See the work
              </Button>
            </div>
          </div>

          <div
            className="ybz-enter md:col-span-12 lg:col-span-6 lg:col-start-7"
            style={{ animationDelay: "60ms" }}
          >
            <DecisionRecord {...heroRecord} />
          </div>
        </div>
      </section>

      {/* Proof, as a ledger. Every figure measures an outcome and links to
          where it can be checked. */}
      <Section tone="raised">
        <SectionHeader
          eyebrow="Proof"
          title="Three claims, each with a source."
        />

        {/* Three columns of four on the page grid, straight on the band: the
            figures are the content, so they get the size, not a box. */}
        <dl className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-6">
          {PROOF_STACK.map((item, index) => (
            <div
              key={item.claim}
              className={`flex min-w-0 flex-col pt-6 md:col-span-4 ${
                index === 0 ? "ybz-key-rule" : "border-t border-mid"
              }`}
            >
              <p className="ybz-figure text-5xl leading-none">
                <FigureValue value={item.figure} />
              </p>
              <p className="ybz-meta mt-3">{item.figureLabel}</p>
              <dt className="ybz-body mt-6 text-bone">{item.claim}</dt>
              <dd className="mt-3">
                <SourceLink href={item.href}>{item.source}</SourceLink>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Selected work. Each row is one link to its case study. */}
      <Section>
        <SectionHeader
          eyebrow="Selected work"
          note="Production only"
          title="What I built, and the decision inside it."
        />

        {/* Rows on the page grid (3 / 7 / 2), flush with the container edge
            like every other block. */}
        <ol className="border-t border-edge">
          {featuredProjects.map((project) => (
            <li
              key={project.title}
              className="group relative grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 border-b border-edge py-6 md:grid-cols-12 md:gap-x-6 md:py-8"
            >
              {/* The product, or how it is built, so a skimmer sees the work.
                  Greyscale here, full colour on the case study: four product
                  palettes in a row would outshout the page's one signal. */}
              <div className="ybz-frame aspect-[16/10] self-start overflow-hidden rounded-sm border border-edge md:col-span-2">
                <CoverImage
                  src={project.thumb}
                  alt=""
                  className="ybz-photo !object-cover !object-top"
                />
              </div>
              <div className="min-w-0 space-y-2 md:col-span-3">
                <h3 className="ybz-title">
                  {/* The link covers the whole row; the title is its name. */}
                  <Link
                    to={project.link}
                    className="underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>
                <StackLine items={project.tags} />
              </div>
              <p className="ybz-body col-span-2 md:col-span-5">
                {project.copy}
              </p>
              {/* Visible at every width: on a phone it is the cue that the
                  row opens the case study. */}
              <span
                aria-hidden="true"
                className="col-span-2 flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-bone underline decoration-edge underline-offset-4 transition-colors duration-150 group-hover:decoration-[var(--ybz-signal)] md:col-span-2 md:min-h-0 md:justify-self-end"
              >
                Case study
                <ArrowRight size={16} strokeWidth={1.75} />
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <TextLink to="/projects">All projects</TextLink>
        </div>
      </Section>

      {/* The same close as every case study. */}
      <Section tone="raised" className="border-b-0">
        <ClosingCta />
      </Section>
    </>
  );
};

export default Home;
