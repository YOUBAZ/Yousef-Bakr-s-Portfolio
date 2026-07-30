import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Link } from "react-router-dom";
import { useGesture } from "@use-gesture/react";
import { useSpring as useButtonSpring, animated } from "@react-spring/web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND, PROOF_STACK } from "../config/brand";
import { experienceTimeline } from "../data/experience";
import GoldRule from "../components/GoldRule";

const _motion = motion;
const _animated = animated;

const Home = () => {
  const featuredProjects = useMemo(
    () => [
      {
        title: "SafeStay",
        copy: "Three-tier platform for verified student housing. Server-side state machines drive multi-party contract signing, so a half-signed contract cannot exist in the database.",
        tags: ["NestJS", "Next.js", "Flutter", "PostgreSQL"],
      },
      {
        title: "EduShift AI",
        copy: "Configurable prompt-engineering platform with versioned AI simulations and automated competency scoring. One simulation became four production products.",
        tags: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
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
    ],
    []
  );

  const timeline = experienceTimeline;

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

  const cardsRef = useRef(null);
  const [gridRef] = useAutoAnimate({ duration: 240 });
  const timelineRef = useRef(null);

  const [magneticSpring, magneticApi] = useButtonSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 210, friction: 18 },
  }));

  const bindMagnetic = useGesture({
    onMove: ({ event, hovering }) => {
      if (!hovering) return;
      const target = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - (target.left + target.width / 2);
      const y = event.clientY - (target.top + target.height / 2);
      magneticApi.start({ xys: [x / 10, y / 10, 1.03] });
    },
    onHover: ({ active }) => {
      if (!active) {
        magneticApi.start({ xys: [0, 0, 1] });
      }
    },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // One motion rule, 600ms ease-out, no bounce — see index.css.
      if (cardsRef.current) {
        gsap.from(".feature-card", {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        });
      }

      if (timelineRef.current) {
        gsap.from(".timeline-step", {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const rippleTransform = magneticSpring.xys.to(
    (x, y, scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  );

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
      <div className="bg-ink text-slate-body">
        {/* ---------------------------------------------------------------
            Hero. Section 5's three devices carry the identity: the stack
            rail, the gold rule under the headline, and the footer strip
            (which lives in Footer.jsx). Purple appears only as the bloom.
            --------------------------------------------------------------- */}
        <section className="relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
          <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />

          <div className="mx-auto max-w-5xl space-y-8">
            <p className="ybz-eyebrow">{BRAND.descriptorLockup}</p>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                className="max-w-4xl font-display text-4xl leading-[1.15] text-bone sm:text-5xl lg:text-6xl"
              >
                {BRAND.positioning}
              </motion.h1>

              <GoldRule />

              <p className="max-w-2xl text-lg leading-8 sm:text-xl">
                {BRAND.tagline} I work across{" "}
                <span className="text-bone">{BRAND.stackFull}</span> — but the
                stack is the least interesting part. What a boundary costs when
                it goes in the wrong place is the part worth writing down.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* The one gold action per screen. */}
              <animated.div
                {...bindMagnetic()}
                style={{ transform: rippleTransform }}
                className="inline-flex"
              >
                <Link to="/lets-talk" className="ybz-btn-primary">
                  Start a conversation
                  <ArrowUpRight size={18} />
                </Link>
              </animated.div>

              <Link to="/contact" className="ybz-btn-ghost">
                <Mail size={18} />
                Contact
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            Proof. Every line carries its source — that is what turns a
            claim into evidence, and section 8 accepts nothing less.
            --------------------------------------------------------------- */}
        <section className="border-y border-edge bg-obsidian px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="space-y-4">
              <p className="ybz-eyebrow">Proof</p>
              <h2 className="max-w-3xl font-display text-3xl text-bone sm:text-4xl">
                Four claims, each with a source.
              </h2>
              <GoldRule />
            </div>

            <dl className="grid gap-6 md:grid-cols-2">
              {PROOF_STACK.map((item) => (
                <motion.div
                  key={item.source}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                  className="ybz-card p-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="ybz-figure text-3xl">{item.figure}</span>
                    <span className="ybz-meta">{item.figureLabel}</span>
                  </div>
                  <dt className="mt-4 leading-7 text-bone">{item.claim}</dt>
                  <dd className="ybz-meta mt-3 normal-case tracking-normal">
                    {item.source}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        <section
          ref={cardsRef}
          className="space-y-10 px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl space-y-4">
            <p className="ybz-eyebrow">Selected work</p>
            <h2 className="max-w-3xl font-display text-3xl text-bone sm:text-4xl">
              What I built, and the decision inside it.
            </h2>
            <GoldRule />
          </div>

          <div
            ref={gridRef}
            className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2"
          >
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="feature-card ybz-card ybz-card-interactive flex h-full flex-col p-6"
              >
                <h3 className="font-display text-xl text-bone">
                  {project.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7">{project.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-edge px-3 py-1 font-mono text-xs text-muted"
                      style={{ borderRadius: "var(--ybz-r-sm)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto max-w-6xl">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ybz-accent-type)] transition-opacity hover:opacity-80"
            >
              All projects
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        <section
          ref={timelineRef}
          className="border-t border-edge bg-obsidian px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="space-y-4">
              <p className="ybz-eyebrow">Now</p>
              <h2 className="max-w-3xl font-display text-3xl text-bone sm:text-4xl">
                Where the work happens.
              </h2>
              <GoldRule />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {timeline.map((item) => (
                <div key={item.title} className="timeline-step ybz-card p-6">
                  <div className="mb-5 flex items-center gap-4">
                    {item.companyLogo ? (
                      <div
                        // A dedicated plate token, not --ybz-bone: bone inverts
                        // to midnight in light mode, and these third-party logos
                        // are drawn for a light ground. Never pure white either
                        // — section 3.5 rule 4.
                        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-edge bg-logo-plate p-2"
                        style={{ borderRadius: "var(--ybz-r-sm)" }}
                      >
                        <img
                          src={item.companyLogo}
                          alt={`${item.companyLabel} logo`}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center border border-hairline font-mono text-sm text-[var(--ybz-accent-type)]"
                        style={{
                          borderRadius: "var(--ybz-r-sm)",
                          letterSpacing: "0.14em",
                        }}
                      >
                        {item.companyBadge}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-display text-lg text-bone">
                        {item.companyLabel}
                      </p>
                      <p className="ybz-meta">{item.period}</p>
                    </div>
                  </div>

                  <h3 className="font-display text-lg text-bone">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-sm leading-7">{item.detail}</p>
                  <p className="ybz-meta mt-4 normal-case tracking-normal">
                    {item.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
