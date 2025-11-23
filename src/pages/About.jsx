import { motion } from "framer-motion";
import { Sparkles, Workflow, Code2, Compass } from "lucide-react";

const principles = [
  {
    icon: Sparkles,
    label: "Motion-first systems",
    copy:
      "Micro-interactions choreographed to support comprehension, performance, and delight without sacrificing focus.",
  },
  {
    icon: Code2,
    label: "Scale-ready frontend",
    copy:
      "Typed React with reusable composition patterns, ensuring design system parity and rapid iteration.",
  },
  {
    icon: Workflow,
    label: "Collaborative flow",
    copy:
      "Tight feedback loops with design, product, and data stakeholders so each release lands on time.",
  },
  {
    icon: Compass,
    label: "Product empathy",
    copy:
      "Every screen maps back to KPIs—conversion lifts, onboarding velocity, or qualitative user delight.",
  },
];

const timeline = [
  {
    period: "2024 - Present",
    title: "Senior Front-end Engineer · Studio Nebula",
    detail:
      "Leading motion-heavy marketing sites and data-rich SaaS frontends for VC-backed startups.",
  },
  {
    period: "2021 - 2024",
    title: "Creative Developer · Independent",
    detail:
      "Partnered with agencies and founders to ship immersive portfolios, knowledge bases, and bespoke dashboards.",
  },
  {
    period: "2018 - 2021",
    title: "Product Engineer · Atlas Labs",
    detail:
      "Built design systems, analytics tooling, and developer experience improvements for internal teams.",
  },
];

const toolset = [
  "React 19 / Vite",
  "TypeScript",
  "Framer Motion",
  "Three.js & R3F",
  "Tailwind CSS",
  "GSAP / Lenis",
  "Radix / Headless UI",
  "GraphQL / REST",
  "Testing Library",
];

const About = () => {
  return (
    <div className="bg-slate-950 text-white">
      <section className="px-6 pt-24 pb-12 sm:px-10 lg:px-16">
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
                Crafting immersive web experiences that move with purpose.
              </h1>
              <p className="text-slate-300">
                I am Yousef Bakr, a creative developer focused on translating
                brand stories and product complexity into motion-rich,
                high-performance interfaces. My work blends systems thinking,
                design acuity, and engineering rigor to unlock faster launches
                and more memorable customer moments.
              </p>
              <p className="text-slate-300">
                From marketing front doors to production-grade dashboards,
                every pixel is backed by design tokens, accessible patterns,
                and measurable outcomes.
              </p>
            </motion.div>

          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
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

              <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 lg:flex-1">
                <img
                  src="/images/about/profile.jpg"
                  alt="Yousef Bakr portrait"
                  className="w-full rounded-2xl object-contain"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                <p className="absolute bottom-4 left-4 text-sm uppercase tracking-[0.35em] text-white">
                  Cairo · Remote
                </p>
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
                  key={entry.period}
                  className="rounded-2xl border border-white/5 bg-white/5 p-5"
                >
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
              Currently exploring WebGPU transitions and AI-assisted prototyping
              workflows. Open to collaborating with teams that value craft,
              measurable outcomes, and rapid iteration.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
