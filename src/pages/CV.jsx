import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  ExternalLink,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
  Globe,
} from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";

const pdfSrc = encodeURI(
  "/images/CV/Yousef Bakr Zaki Alsaidi (Fullstack).pdf"
);

const resumeStats = [
  {
    label: "Product launches",
    value: "40+",
    detail: "LMS, SaaS, simulation, & data platforms shipped end-to-end.",
  },
  {
    label: "Stack coverage",
    value: "Full-stack",
    detail: "React/Next.js fronts, Node/Express services, SQL/Mongo data.",
  },
  {
    label: "Cloud & DevOps",
    value: "AWS + K8s",
    detail: "Dockerized CI/CD, IaC, observability, and compliance controls.",
  },
];

const summaryBullets = [
  "Systems analyst translating business requirements into measurable architectures.",
  "Full-stack engineer bridging React/Next.js front-ends with Node.js, Express.js, and GraphQL APIs.",
  "Cloud architect comfortable with AWS, Docker, Kubernetes, and automated governance.",
  "Advisor for LMS, simulation, and B2B SaaS initiatives needing telemetry and AI integrations.",
];

const focusAreas = [
  {
    icon: FileText,
    title: "Delivery narrative",
    description:
      "Highlights engagements where I owned research, system diagrams, development, launch, and retrospectives.",
    bullets: [
      "Product discovery & stakeholder interviews",
      "System mapping + KPI instrumentation",
      "Full-stack implementation & QA stewardship",
    ],
  },
  {
    icon: Layers,
    title: "Architecture depth",
    description:
      "Goes beyond buzzwords with diagrams, domain models, and the trade-offs that shaped each release.",
    bullets: [
      "Event-driven, realtime, & resilient APIs",
      "Data governance, migrations, rollbacks",
      "Multi-tenant, compliance-aware platforms",
    ],
  },
  {
    icon: Workflow,
    title: "Process enablement",
    description:
      "Documents how I set up automation, runbooks, and observability that future squads rely on.",
    bullets: [
      "CI/CD pipelines with Docker & IaC",
      "Auto-scaling, alerting, & cost controls",
      "Team enablement & paired delivery rituals",
    ],
  },
];

const capabilityGrid = [
  {
    title: "Product families",
    details: [
      "Learning management systems (LMS)",
      "Medical simulation & telehealth hubs",
      "Workflow-heavy SaaS for ops & finance",
      "Data platforms with analytics surfaces",
    ],
  },
  {
    title: "Core stacks",
    details: [
      "React.js / Next.js / Remix front-ends",
      "Node.js, Express.js, NestJS backends",
      "RESTful, GraphQL, Socket.io realtime APIs",
      "PostgreSQL, MySQL, MongoDB, Redis data",
    ],
  },
  {
    title: "Cloud & DevOps",
    details: [
      "AWS (ECS, Lambda, RDS, S3, Bedrock)",
      "Docker, Kubernetes, Terraform/IaC",
      "Observability with Grafana, OpenTelemetry",
      "Security reviews, SSO, compliance readiness",
    ],
  },
];

const Cv = () => {
  const resumeSchema = [
    {
      "@type": "DigitalDocument",
      "@id": `${siteMeta.siteUrl}/cv`,
      url: `${siteMeta.siteUrl}/cv`,
      name: "CV - Yousef Bakr",
      description:
        "Curriculum vitae for software engineer and systems analyst Yousef Bakr covering LMS, SaaS, cloud, and simulation deliveries.",
      potentialAction: [
        {
          "@type": "ViewAction",
          target: [`${siteMeta.siteUrl}${pdfSrc}`],
        },
        {
          "@type": "DownloadAction",
          target: [`${siteMeta.siteUrl}${pdfSrc}`],
        },
      ],
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
          name: "CV",
          item: `${siteMeta.siteUrl}/cv`,
        },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="CV"
        description="View or download the latest CV for Yousef Bakr, a software engineer and systems analyst specializing in full-stack delivery, cloud automation, and LMS/simulation platforms."
        keywords={[
          "Yousef Bakr CV",
          "software engineer resume",
          "systems analyst curriculum vitae",
          "full-stack engineer Egypt",
        ]}
        url="/cv"
        schema={resumeSchema}
      />
      <div className="bg-slate-950 text-white">
        <section className="px-6 pt-12 pb-12 sm:px-10 lg:px-16">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-900/40 lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300">
                <Sparkles size={16} />
                CV
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                A systems-first CV for teams needing measurable software leadership.
              </h1>
              <p className="text-slate-300">
                Every line inside the PDF ties back to delivering resilient experiences—React/Next.js interfaces,
                Node.js/Express.js or GraphQL services, SQL/MongoDB data layers, and AWS/Docker/Kubernetes automation.
                Use it to align on discovery, leadership capacity, and the business results I keep accountable.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                {summaryBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={pdfSrc}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]"
                >
                  <Download size={18} />
                  Download CV (PDF)
                </a>
                <a
                  href={pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <ExternalLink size={18} />
                  Open in new tab
                </a>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Snapshot
              </p>
              <div className="grid gap-4">
                {resumeStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-slate-950/30 p-4"
                  >
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">{stat.detail}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-white/20 p-4 text-sm text-slate-300">
                  References, case studies, and diagrams are ready upon request
                  for security-restricted programs.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-10 lg:px-16">
          <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                <object
                  data={pdfSrc}
                  type="application/pdf"
                  className="h-[28rem] w-full rounded-xl"
                  aria-label="Yousef Bakr CV preview"
                >
                  <div className="flex h-[28rem] w-full flex-col items-center justify-center rounded-xl bg-slate-900 text-center text-sm text-slate-400">
                    <p>PDF preview unavailable in this browser.</p>
                    <p className="mt-2">
                      <a
                        href={pdfSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-300 underline"
                      >
                        Open the CV in a new tab
                      </a>{" "}
                      or download it instead.
                    </p>
                  </div>
                </object>
              </div>
            </motion.div>

            <motion.div
              className="space-y-5 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                What&apos;s inside
              </p>
              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  Sections cover executive summary, specialized skill matrix,
                  select engagements, tooling, certifications, and team leadership.
                </p>
                <p>
                  The appendix includes architecture diagrams, KPI snapshots,
                  and compliance workflows to support regulated programs.
                </p>
              </div>
              <div className="space-y-4">
                {focusAreas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-2xl bg-white/10 p-2 text-sky-300">
                          <Icon size={18} />
                        </span>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        {item.description}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-10 lg:px-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/40">
            <div className="flex flex-col gap-6 lg:flex-row">
              {capabilityGrid.map((group) => (
                <div key={group.title} className="flex-1 space-y-3">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
                    <ShieldCheck size={16} />
                    {group.title}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {group.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-10 lg:px-16">
          <motion.div
            className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-950 p-8 text-center shadow-2xl shadow-slate-950/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Next steps
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Need a systems partner for your next release?
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-300">
              Bring the CV into your stakeholder reviews, then reach out with timelines,
              stacks, and success criteria. I respond with discovery direction, estimates,
              and how I can slot into your team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]"
              >
                Talk through your roadmap
              </Link>
              <a
                href={pdfSrc}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                <Globe size={18} />
                Share CV internally
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Cv;
