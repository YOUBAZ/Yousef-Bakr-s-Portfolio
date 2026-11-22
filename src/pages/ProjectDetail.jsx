import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import PropTypes from "prop-types";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import {
  Button,
  Card,
  Figure,
  PageHeader,
  Section,
  SectionHeader,
  StackLine,
  CoverImage,
  ArchitectureDiagram,
  ClosingCta,
} from "../components/ui";

const LH_CATEGORIES = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["bestPractices", "Best practices"],
  ["seo", "SEO"],
];

/* A score as a ring. Signal is the stroke (a graphic), the number is ink. */
const Gauge = ({ label, score }) => {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <figure className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-24 w-24">
        <svg
          viewBox="0 0 80 80"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            strokeWidth="6"
            style={{ stroke: "var(--ybz-edge)" }}
          />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * c} ${c}`}
            style={{ stroke: "var(--ybz-accent-rule)" }}
          />
        </svg>
        <span className="ybz-figure absolute inset-0 flex items-center justify-center text-2xl">
          {score}
        </span>
      </div>
      <figcaption className="ybz-source">{label}</figcaption>
    </figure>
  );
};

Gauge.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

/* The live system is the page's one primary action; the source sits beside it. */
const LinkButtons = ({ project }) => (
  <>
    {project.live && (
      <Button href={project.live} icon={ExternalLink} iconPosition="start">
        Open the live system
      </Button>
    )}
    {project.repo && (
      <Button
        href={project.repo}
        variant="secondary"
        icon={Github}
        iconPosition="start"
      >
        Read the source
      </Button>
    )}
  </>
);

LinkButtons.propTypes = { project: PropTypes.object.isRequired };

/* Above the page header: the way back to the index. */
const BackLink = () => (
  <nav aria-label="Breadcrumb" className="px-6 pt-10 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-6xl">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-bone"
      >
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        All projects
      </Link>
    </div>
  </nav>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState(null);
  const [loadError, setLoadError] = useState(null);
  // Phones get the long reference sections folded; wider screens read them.
  const [isPhone, setIsPhone] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsPhone(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/projects.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((payload) =>
        setProjects(Array.isArray(payload.projects) ? payload.projects : [])
      )
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
          setLoadError("Unable to load this project right now.");
        }
      });
    return () => controller.abort();
  }, []);

  const index = projects ? projects.findIndex((p) => p.id === id) : -1;
  const project = index >= 0 ? projects[index] : null;
  // "Next project" loops through production case studies only, so the
  // sequence never drops from shipped work to an earlier build.
  const production = projects
    ? projects.filter((p) => p.brief || p.highlights?.length)
    : [];
  const pIndex = production.findIndex((p) => p.id === id);
  const next =
    pIndex >= 0 && production.length > 1
      ? production[(pIndex + 1) % production.length]
      : null;

  const schema = useMemo(() => {
    if (!project) return undefined;
    return [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.tagline || project.summary,
        url: `${siteMeta.siteUrl}/projects/${project.id}`,
        ...(project.live ? { sameAs: project.live } : {}),
        keywords: project.tech?.join(", "),
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
            name: "Projects",
            item: `${siteMeta.siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteMeta.siteUrl}/projects/${project.id}`,
          },
        ],
      },
    ];
  }, [project]);

  if (loadError || (projects && !project)) {
    return (
      <>
        <Seo title="Project not found" url={`/projects/${id}`} noindex />
        <PageHeader
          eyebrow="Projects"
          title={loadError || "That project is not in the list."}
          actions={
            <Button
              to="/projects"
              variant="secondary"
              icon={ArrowLeft}
              iconPosition="start"
            >
              All projects
            </Button>
          }
        />
      </>
    );
  }

  if (!project) {
    return (
      <Section>
        <div
          className="ybz-card h-96 opacity-60"
          aria-busy="true"
          aria-label="Loading project"
        />
      </Section>
    );
  }

  const facts = [
    ["Context", project.context],
    ["Engagement", project.engagement],
    ["Timeline", project.timeline],
    ["Status", project.status],
  ].filter(([, v]) => v);

  const metrics = [
    ...(project.users != null
      ? [{ label: "Users", value: String(project.users) }]
      : []),
    ...(project.metrics || []),
  ].filter(
    // A figure already in the headline strip is not repeated further down.
    // Match on the value: the same number often carries a shorter label here.
    (m) => !(project.highlights || []).some((h) => h.value === m.value)
  );

  const lh = project.lighthouse;

  /* The bands below the header, in reading order. Only the ones with data
     render, and tones alternate over what renders so two raised bands never
     touch. */
  // Beside a screenshot, the figures sit in a column next to it. Beside a
  // diagram, they would repeat what the diagram already says, so they go.
  const showStats = Boolean(project.screenshot && project.highlights?.length);

  const bands = [
    project.brief && {
      key: "brief",
      eyebrow: "The brief",
      title: "What had to be solved",
      body: <p className="ybz-lede">{project.brief}</p>,
    },
    // Numbers get their own section only when there is no stat column to
    // hold them.
    !showStats && metrics.length > 0 && {
      key: "numbers",
      eyebrow: "By the numbers",
      title: "At a glance",
      body: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label}>
              <Figure value={m.value} label={m.label} size="lg" />
            </Card>
          ))}
        </div>
      ),
    },
    project.features?.length > 0 && {
      key: "features",
      collapse: `Show the ${project.features?.length} features`,
      eyebrow: "What it does",
      title:
        project.status === "In production" ? "Features in production" : "Features",
      body: (
        <ul className="grid border-t border-edge md:grid-cols-2 md:gap-x-10">
          {project.features.map((f) => (
            <li key={f} className="ybz-body flex gap-3 border-b border-edge py-4">
              <span
                aria-hidden="true"
                className="mt-3 h-px w-4 shrink-0"
                style={{ background: "var(--ybz-muted)" }}
              />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    project.decisions?.length > 0 && {
      key: "decisions",
      eyebrow: "Engineering",
      title: "The decisions inside it",
      body: (
        <div className="grid gap-6 lg:grid-cols-3">
          {project.decisions.map((dec, i) => (
            <Card as="article" key={dec.title} className="flex flex-col">
              <span className="ybz-meta">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ybz-title mt-3">{dec.title}</h3>
              <p className="ybz-body mt-3 flex-1">{dec.body}</p>
              {dec.outcome && (
                <div className="mt-6 border-t border-edge pt-4">
                  <p className="ybz-meta">What it prevents</p>
                  <p className="ybz-body mt-2 font-semibold text-bone">
                    {dec.outcome}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      ),
    },
    lh && {
      key: "lighthouse",
      eyebrow: "Lighthouse",
      title: "How the live site scores",
      body: (
        <div className="space-y-6">
          <p className="ybz-body max-w-3xl text-muted">
            Lighthouse {lh.version} against{" "}
            <span className="font-mono break-all">{lh.url}</span>, run on{" "}
            <span className="font-mono">{lh.date}</span>. Mobile uses simulated
            slow 4G and a throttled CPU, so it reads lower than desktop by
            design.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {["mobile", "desktop"].map((form) =>
              lh[form] ? (
                <Card key={form} className="space-y-6">
                  <p className="ybz-meta">{form}</p>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {LH_CATEGORIES.map(([key, label]) => (
                      <Gauge key={key} label={label} score={lh[form][key]} />
                    ))}
                  </div>
                  {lh[form].lcp && (
                    <p className="ybz-source border-t border-edge pt-4">
                      LCP {lh[form].lcp} · CLS {lh[form].cls} · TBT{" "}
                      {lh[form].tbt}
                    </p>
                  )}
                </Card>
              ) : null
            )}
          </div>
        </div>
      ),
    },
    project.stackProse && {
      key: "stack",
      collapse: "Show the stack and architecture",
      eyebrow: "Stack",
      title: "What it runs on",
      body: (
        <div className="space-y-6">
          <p className="ybz-lede">{project.stackProse}</p>
          <StackLine items={project.tech} />
          {/* When the hero shows the product, the architecture lives here. */}
          {project.screenshot && project.architecture && (
            <Card>
              <ArchitectureDiagram
                architecture={project.architecture}
                title={project.title}
              />
            </Card>
          )}
        </div>
      ),
    },
  ].filter(Boolean);

  // The closing band takes the next tone in the alternation.
  const closeTone = bands.length % 2 === 0 ? "raised" : "base";

  return (
    <>
      <Seo
        title={project.title}
        description={project.tagline || project.summary}
        image={project.image}
        url={`/projects/${project.id}`}
        keywords={[project.title, ...(project.tech || [])]}
        schema={schema}
      />

      <BackLink />
      <PageHeader
        eyebrow={project.role}
        title={project.title}
        lede={project.tagline || project.summary}
        actions={<LinkButtons project={project} />}
      />

      {/* Screenshot, headline figures and engagement facts. */}
      <Section className="pt-0">
        <div
          className={`grid gap-6 ${
            showStats ? "lg:grid-cols-[1.5fr_1fr]" : ""
          }`}
        >
          {/* One real visual: the live product if it is public, otherwise how
              the system is built. The cover stays a thumbnail on /projects. */}
          {project.screenshot ? (
            <Card padded={false}>
              <figure>
                <div className="ybz-frame aspect-[16/10]">
                  <img
                    src={project.screenshot.src}
                    alt={`${project.title}, the live product`}
                    className="!object-cover !object-top"
                  />
                </div>
                <figcaption className="ybz-source px-5 py-3">
                  {project.screenshot.caption}
                </figcaption>
              </figure>
            </Card>
          ) : project.architecture ? (
            <Card>
              <ArchitectureDiagram
                architecture={project.architecture}
                title={project.title}
              />
            </Card>
          ) : (
            <Card padded={false}>
              <div className="ybz-frame ybz-frame--cover aspect-[16/10] border-b-0">
                <CoverImage src={project.image} alt={`${project.title} cover`} />
              </div>
            </Card>
          )}

          {showStats && (
            <Card className="flex flex-col justify-center divide-y divide-edge py-2">
              {[...project.highlights, ...metrics].map((h) => (
                <Figure
                  key={h.label}
                  value={h.value}
                  label={h.label}
                  size="lg"
                  className="py-5"
                />
              ))}
            </Card>
          )}
        </div>

        {facts.length > 0 && (
          <dl className="ybz-card mt-6 grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className="space-y-1">
                <dt className="ybz-meta">{label}</dt>
                <dd className="ybz-body text-bone">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Section>

      {bands.map((band, i) => (
        <Section key={band.key} tone={i % 2 === 0 ? "raised" : "base"}>
          <SectionHeader eyebrow={band.eyebrow} title={band.title} />
          {band.collapse && isPhone ? (
            <details className="group">
              <summary className="ybz-link min-h-11 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">{band.collapse}</span>
                <span className="hidden group-open:inline">Hide</span>
              </summary>
              <div className="pt-4">{band.body}</div>
            </details>
          ) : (
            band.body
          )}
        </Section>
      ))}

      {/* Close ---------------------------------------------------------- */}
      <Section tone={closeTone} className="border-b-0">
        <ClosingCta />

        {next && next.id !== project.id && (
          <Link
            to={`/projects/${next.id}`}
            className="ybz-card ybz-card-interactive mt-6 flex items-center justify-between gap-6 p-6"
          >
            <span>
              <span className="ybz-meta block">Next project</span>
              <span className="ybz-title mt-1 block">{next.title}</span>
            </span>
            <ArrowRight
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0 text-muted"
            />
          </Link>
        )}
      </Section>
    </>
  );
};

export default ProjectDetail;
