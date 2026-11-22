import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
import {
  Button,
  Card,
  Figure,
  PageHeader,
  Section,
  SectionHeader,
  StackLine,
  TextLink,
} from "../components/ui";

/* Production work has a case study or measured highlights. Everything else is
   an earlier build: it keeps its source link but not a screenshot card, so the
   flagship work carries the page. */
const isProduction = (project) =>
  Boolean(project.brief || project.highlights?.length);

/* One production project, as a record on the page grid: name in columns 1–3,
   the claim, its figures (columns 4, 7 and 10) and its links in 4–12. No
   generated cover: the cover repeats the title and the figure at a size no one
   can read, so the record already says everything it would. Only the first
   record's case-study button is filled, so the page has one primary action. */
const ProjectRecord = ({ project, lead = false }) => (
  <li className="grid gap-y-6 border-b border-edge py-10 md:grid-cols-12 md:gap-x-6">
    <div className="space-y-2 md:col-span-3">
      <p className="ybz-meta">{project.role}</p>
      <h3 className="ybz-title text-2xl">
        {project.brief ? (
          <Link
            to={`/projects/${project.id}`}
            className="underline-offset-4 hover:underline"
          >
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>

      {/* The headline figure holds the left column, so the name does not sit
          alone beside a tall body. On the lead record it carries the page's
          one signal rule. */}
      {project.highlights?.[0] && (
        <Figure
          value={project.highlights[0].value}
          label={project.highlights[0].label}
          size="lg"
          className={`!mt-8 pt-4 ${lead ? "ybz-key-rule" : "border-t border-mid"}`}
        />
      )}
    </div>

    <div className="space-y-6 md:col-span-9">
      <p className="ybz-body max-w-[var(--ybz-w-read)]">{project.summary}</p>

      {project.highlights?.length > 1 && (
        <div className="grid grid-cols-3 gap-x-6 border-t border-edge pt-5">
          {project.highlights.slice(1).map((h) => (
            <Figure key={h.label} value={h.value} label={h.label} />
          ))}
        </div>
      )}

      <StackLine items={project.tech} />

      {(project.brief || project.live || project.repo) && (
        <div className="flex flex-wrap gap-3 pt-2">
          {project.brief && (
            <Button
              to={`/projects/${project.id}`}
              size="sm"
              variant={lead ? "primary" : "secondary"}
              icon={ArrowRight}
            >
              Case study
            </Button>
          )}
          {project.live && (
            <Button
              href={project.live}
              variant="secondary"
              size="sm"
              icon={ExternalLink}
              iconPosition="start"
            >
              Live
            </Button>
          )}
          {project.repo && (
            <Button
              href={project.repo}
              variant="secondary"
              size="sm"
              icon={Github}
              iconPosition="start"
            >
              Source
            </Button>
          )}
        </div>
      )}
    </div>
  </li>
);

ProjectRecord.propTypes = {
  project: PropTypes.object.isRequired,
  lead: PropTypes.bool,
};

/* An earlier build: one row in an index, on the same 3 / 7 / 2 grid as the
   Home work list. */
const EarlierBuild = ({ project }) => (
  <li className="grid gap-3 border-b border-edge py-6 md:grid-cols-12 md:gap-x-6">
    <div className="min-w-0 md:col-span-3">
      <h3 className="ybz-title">{project.title}</h3>
      <p className="ybz-meta mt-1">{project.role}</p>
    </div>
    <div className="min-w-0 space-y-3 md:col-span-7">
      <p className="ybz-body">{project.summary}</p>
      <StackLine items={project.tech} />
    </div>
    {(project.repo || project.live) && (
      <div className="md:col-span-2 md:justify-self-end md:pt-1">
        <TextLink href={project.repo || project.live}>
          {project.repo ? "Source" : "Live"}
        </TextLink>
      </div>
    )}
  </li>
);

EarlierBuild.propTypes = {
  project: PropTypes.object.isRequired,
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const projectsSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    const baseSchema = [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/projects`,
        url: `${siteMeta.siteUrl}/projects`,
        name: "Projects",
        description:
          "Live systems and source-linked projects: an LMS and simulation SaaS, a bilingual course store, a university club platform, and earlier open-source builds.",
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
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteMeta.siteUrl}/projects`,
          },
        ],
      },
    ];
    if (projects.length) {
      baseSchema.push({
        "@type": "ItemList",
        name: "Projects",
        itemListElement: projects.slice(0, 8).map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          description: project.summary,
          url:
            (project.brief && `${siteMeta.siteUrl}/projects/${project.id}`) ||
            project.live ||
            project.repo ||
            `${siteMeta.siteUrl}/projects#${project.id ?? index + 1}`,
        })),
      });
    }
    return baseSchema;
  }, [projects]);

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      try {
        const response = await fetch("/data/projects.json", {
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const payload = await response.json();
        setProjects(Array.isArray(payload.projects) ? payload.projects : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setLoadError("Unable to load projects right now.");
        }
      } finally {
        setIsLoadingProjects(false);
      }
    };

    loadProjects();
    return () => controller.abort();
  }, []);

  const production = projects.filter(isProduction);
  const earlier = projects.filter((p) => !isProduction(p));

  return (
    <>
      <Seo
        title="Projects"
        description="Live systems and source-linked projects: EduShift AI, AutoBusiness, MSP Tech Club, Promptopia and more. Each card routes to the running product or the repository."
        keywords={[
          "projects",
          "React portfolio",
          "Next.js projects",
          "open source",
        ]}
        url="/projects"
        schema={projectsSchema}
      />
      <PageHeader
        eyebrow="Projects"
        title="Every project routes to the proof."
        lede="Live systems link to the running product. Open-source work links to the repository. Where the code belongs to a client, the deployment is the claim."
      />

      <Section className="pt-0">
        <ol
          className="border-t border-edge"
          aria-busy={isLoadingProjects || undefined}
        >
          {isLoadingProjects &&
            Array.from({ length: 4 }).map((_, idx) => (
              <li
                key={`skeleton-${idx}`}
                className="h-56 border-b border-edge"
                aria-hidden="true"
              />
            ))}

          {!isLoadingProjects &&
            production.map((project, index) => (
              <ProjectRecord
                key={project.id ?? project.title}
                project={project}
                lead={index === 0}
              />
            ))}
        </ol>

        <div>
          {!isLoadingProjects && (loadError || projects.length === 0) && (
            <Card className="mt-8">
              <p className="ybz-body">
                The project list did not load. The source for every project is
                on GitHub in the meantime.
              </p>
              <TextLink href={BRAND.github} className="mt-4">
                Open GitHub
              </TextLink>
            </Card>
          )}
        </div>
      </Section>

      {!isLoadingProjects && earlier.length > 0 && (
        <Section tone="raised">
          <SectionHeader
            eyebrow="Earlier builds"
            title="Open-source work from before production."
          />
          <ul className="border-t border-edge">
            {earlier.map((project) => (
              <EarlierBuild key={project.id ?? project.title} project={project} />
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Projects;
