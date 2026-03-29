import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Workflow, Code2, Compass } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { experienceTimeline } from "../data/experience";

const _motion = motion;

const principles = [
  {
    icon: Compass,
    label: "Systems-first architecture",
    copy:
      "Translate LMS journeys, simulation loops, and compliance requirements into domain models, KPIs, and service blueprints before writing code.",
  },
  {
    icon: Code2,
    label: "Full-stack delivery",
    copy:
      "React.js/Next.js fronts paired with Node.js, Express.js, RESTful + GraphQL APIs, and SQL or MongoDB storage governed by clean OOP patterns.",
  },
  {
    icon: Workflow,
    label: "Cloud & DevOps",
    copy:
      "Docker, Kubernetes, and AWS pipelines with IaC, logging, and automated testing keep releases observable, secure, and rollback ready.",
  },
  {
    icon: Sparkles,
    label: "Experience intelligence",
    copy:
      "AI integrations, telemetry, and UX research personalize training, simulate edge cases, and make complex data approachable.",
  },
];

const toolset = [
  "React.js / Next.js / Remix",
  "Node.js / Express.js / NestJS",
  "Socket.io & realtime streaming",
  "RESTful APIs / GraphQL APIs",
  "PostgreSQL / MySQL / SQL Server",
  "MongoDB / Redis / Supabase",
  "Docker / Kubernetes / AWS",
  "Kafka / Event-driven systems",
  "OOP / Clean Architecture / Testing",
];

const aboutGallery = [
  {
    src: "/images/about/profile.jpg",
    alt: "Yousef Bakr portrait",
    label: "Portrait",
    featured: true,
  },
  {
    src: "/images/about/WhatsApp Image 2026-03-29 at 9.32.54 PM.jpeg",
    alt: "Yousef Bakr at the AI Everything event in Cairo",
    label: "AI Everything",
  },
  {
    src: "/images/about/WhatsApp Image 2026-03-29 at 9.32.54 PM (1).jpeg",
    alt: "Yousef Bakr illustrated event poster variant one",
    label: "Poster 01",
  },
  {
    src: "/images/about/WhatsApp Image 2026-03-29 at 9.32.54 PM (2).jpeg",
    alt: "Yousef Bakr illustrated event poster variant two",
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
      name: "About Yousef Bakr",
      description:
        "Bio, guiding principles, and experience timeline of Yousef Bakr, a full-stack software engineer and systems analyst building LMS platforms, simulations, and SaaS products.",
      about: {
        "@type": "Person",
        name: "Yousef Bakr",
        jobTitle: "Full-stack Software Engineer & Systems Analyst",
        worksFor: {
          "@type": "Organization",
          name: "Independent / Studio Collaborations",
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
        description="Inside look at Yousef Bakr's systems mindset, multi-stack toolset, and experience building LMS platforms, simulations, and SaaS products."
        keywords={[
          "About Yousef Bakr",
          "full-stack software engineer",
          "systems analyst Egypt",
          "LMS and simulation developer",
        ]}
        url="/about"
        schema={aboutSchema}
      />
      <div className="bg-slate-950 text-white">
        <section className="px-6 pt-12 pb-12 sm:px-10 lg:px-16">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-900/30 lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-sky-300">
                About
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Engineering LMS, simulation, and SaaS systems with measurable rigor.
              </h1>
              <p className="text-slate-300">
                I am Yousef Bakr, a software engineer, backend engineer, and systems analyst who translates
                complex requirements into resilient architectures. As a full-stack web developer, front-end engineer,
                and AWS engineer, I move between user research, system diagrams, and implementation to connect
                React.js/Next.js experiences with Node.js, Express.js, SQL, and cloud-native services.
              </p>
              <p className="text-slate-300">
                Whether it is a multi-tenant LMS, a telehealth hub, or a simulation control room,
                I balance performance and governance with Socket.io, GraphQL, Kafka, AWS, Docker,
                Kubernetes, and AI integrations so teams can ship faster without sacrificing trust.
              </p>
            </motion.div>

          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid gap-6 xl:grid-cols-[0.85fr,1.15fr] xl:items-start">
              <div className="space-y-4 text-sm text-slate-200 lg:flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Highlights
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-4xl font-semibold text-white">8+</p>
                    <p className="text-slate-400">Years shipping for the web</p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-white">40+</p>
                    <p className="text-slate-400">Products & launches</p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-white">98</p>
                    <p className="text-slate-400">Lighthouse QA average</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Visuals
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    Auto-playing carousel
                  </p>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage.src}
                      className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur">
                    {activeImage.label}
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur">
                    {activeImageIndex + 1}/{aboutGallery.length}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {aboutGallery.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={[
                        "h-2.5 rounded-full transition-all duration-300",
                        activeImageIndex === index
                          ? "w-8 bg-sky-300"
                          : "w-2.5 bg-white/30 hover:bg-white/50",
                      ].join(" ")}
                      aria-label={`Show ${image.label}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-2xl bg-white/10 p-2 text-sky-300">
                    <Icon size={18} />
                  </span>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                    Focus
                  </p>
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {principle.label}
                </h3>
                <p className="mt-3 text-sm text-slate-300">{principle.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Timeline
            </p>
            <div className="space-y-6">
              {timeline.map((entry) => (
                <div
                  key={entry.title}
                  className="rounded-2xl border border-white/5 bg-white/5 p-5"
                >
                  {entry.companyLabel && (
                    <div className="mb-3 flex items-center gap-3">
                      {entry.companyLogo ? (
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-sky-300/30 bg-white p-3 shadow-xl shadow-sky-400/30 ring-1 ring-white/10 sm:h-20 sm:w-20">
                          <img
                            src={entry.companyLogo}
                            alt={`${entry.companyLabel} logo`}
                            className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(14,165,233,0.25)]"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 via-cyan-400 to-indigo-500 text-xs font-bold tracking-[0.35em] text-slate-950 shadow-xl shadow-sky-400/30 ring-1 ring-white/10 sm:h-20 sm:w-20">
                          {entry.companyBadge}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                          {entry.companyLabel}
                        </p>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                          Current experience
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {entry.period}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    {entry.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-300">{entry.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Toolset & Workflow
            </p>
            <div className="flex flex-wrap gap-2">
              {toolset.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="rounded-2xl border border-dashed border-white/20 p-5 text-slate-300">
              Currently exploring WebGPU-driven simulations, AWS Bedrock copilots,
              and automated compliance checks for regulated LMS programs. Open to
              partnering with teams that value measurable outcomes, documentation,
              and sustainable iteration.
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
  );
};

export default About;
