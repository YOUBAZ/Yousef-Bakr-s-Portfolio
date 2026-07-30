import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import StackRail from "../components/StackRail";
import { siteMeta } from "../config/seo";
import { BRAND, PROOF_STACK } from "../config/brand";
import { experienceTimeline } from "../data/experience";

const _motion = motion;

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
      <div className="relative overflow-x-hidden bg-ink text-slate-body">
        <section className="relative isolate overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />
          <StackRail className="left-1 sm:left-3" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              <p className="ybz-eyebrow">About</p>
              <h1 className="max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl lg:text-5xl">
                {BRAND.positioning}
              </h1>
              <hr className="ybz-rule" />

              {/* Section 11's About copy, which is already written and on-voice. */}
              <div className="max-w-2xl space-y-4 leading-8">
                <p>
                  I build production software: APIs that carry real traffic,
                  front-ends that survive contact with real users, and the
                  boundaries between them.
                </p>
                <p>
                  Currently a software engineer at {BRAND.employer}, working
                  full-stack across {BRAND.stackShort}, and building SafeStay. I
                  took my first engineering role at eighteen and have spent the
                  time since shipping, breaking and repairing systems in
                  production.
                </p>
                <p>
                  I write here about the decisions rather than the tools — why a
                  boundary went where it went, what it cost when it went in the
                  wrong place, and what the traces looked like afterwards. If
                  you lead a team and want a second opinion on an architecture
                  call, my inbox is open.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="ybz-card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="ybz-eyebrow">Visuals</p>
                <p className="ybz-figure text-xs text-muted">
                  {activeImageIndex + 1}/{aboutGallery.length}
                </p>
              </div>

              <div
                className="relative aspect-[4/5] overflow-hidden border border-edge bg-ink lg:aspect-[16/10]"
                style={{ borderRadius: "var(--ybz-r-md)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage.src}
                    className="absolute inset-0 flex items-center justify-center p-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute left-3 top-3">
                  <span className="ybz-meta border border-edge bg-ink/80 px-3 py-1 backdrop-blur">
                    {activeImage.label}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                {aboutGallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className="h-[3px] transition-all duration-300"
                    style={{
                      width: activeImageIndex === index ? 32 : 12,
                      background:
                        activeImageIndex === index
                          ? "var(--ybz-accent-rule)"
                          : "var(--ybz-edge)",
                    }}
                    aria-label={`Show ${image.label}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proof, with sources. */}
        <section className="border-y border-edge bg-obsidian px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="space-y-4">
              <p className="ybz-eyebrow">Proof</p>
              <h2 className="font-display text-3xl text-bone">
                Four claims, each with a source.
              </h2>
              <hr className="ybz-rule" />
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {PROOF_STACK.map((item) => (
                <div key={item.source} className="ybz-card p-5">
                  <dt className="leading-7 text-bone">{item.claim}</dt>
                  <dd className="ybz-meta mt-3 normal-case tracking-normal">
                    {item.source}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="space-y-4">
              <p className="ybz-eyebrow">How I work</p>
              <h2 className="font-display text-3xl text-bone">
                Four positions I would defend in review.
              </h2>
              <hr className="ybz-rule" />
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {principles.map((principle) => (
                <motion.div
                  key={principle.label}
                  className="ybz-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                >
                  <h3 className="font-display text-xl text-bone">
                    {principle.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7">{principle.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-edge bg-obsidian px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="ybz-card space-y-6 p-6">
              <p className="ybz-eyebrow">Timeline</p>
              <div className="space-y-5">
                {timeline.map((entry) => (
                  <div
                    key={entry.title}
                    className="border-l-2 border-hairline pl-5"
                  >
                    <p className="ybz-meta">{entry.period}</p>
                    <h3 className="mt-2 font-display text-lg text-bone">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7">{entry.detail}</p>
                    <p className="ybz-meta mt-3 normal-case tracking-normal">
                      {entry.source}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ybz-card space-y-6 p-6">
              <p className="ybz-eyebrow">Toolset</p>
              <div className="flex flex-wrap gap-2">
                {toolset.map((tool) => (
                  <span
                    key={tool}
                    className="border border-edge px-3 py-2 font-mono text-xs text-muted"
                    style={{ borderRadius: "var(--ybz-r-sm)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <hr className="ybz-rule" />
              <p className="text-sm leading-7">
                Next on the list: .NET and MAUI, Spring Boot, and embedded
                firmware — chosen because they force different trade-offs than
                the ones I already know how to make.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
