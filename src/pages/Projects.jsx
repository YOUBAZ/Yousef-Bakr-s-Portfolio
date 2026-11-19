import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
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
  CoverImage,
} from "../components/ui";

/* Production work has a case study or measured highlights. Everything else is
   an earlier build: it keeps its source link but not a screenshot card, so the
   flagship work carries the page. */
const isProduction = (project) =>
  Boolean(project.brief || project.highlights?.length);

/* One production project. The flagship (first in the data) spans both columns
   on lg and sets the screenshot beside the text. Only the flagship's case-study
   button is filled, so the page has one primary action. */
const ProjectCard = ({ project, flagship = false }) => (
  <Card
    as="article"
    interactive
    padded={false}
    className={
      flagship
        ? "flex flex-col lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_1fr]"
        : "flex h-full flex-col"
    }
  >
    <div
      className={`ybz-frame ybz-frame--cover aspect-[16/10] ${
        flagship
          ? "lg:aspect-auto lg:border-b-0 lg:border-r lg:border-edge"
          : ""
      }`}
    >
      <CoverImage src={project.image} alt={project.title} />
    </div>

    <div className="flex flex-1 flex-col p-6">
      <p className="ybz-meta">{project.role}</p>
      <h3 className="ybz-title mt-2">
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
      <p className="ybz-body mt-3 flex-1">{project.summary}</p>

      {project.highlights?.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4 border-y border-edge py-4">
          {project.highlights.map((h) => (
            <Figure key={h.label} value={h.value} label={h.label} />
          ))}
        </div>
      )}

      <StackLine items={project.tech} className="mt-6" />

      {(project.brief || project.live || project.repo) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.brief && (
            <Button
              to={`/projects/${project.id}`}
              size="sm"
              variant={flagship ? "primary" : "secondary"}
              icon={ArrowUpRight}
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
  </Card>
);

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  flagship: PropTypes.bool,
};

/* An earlier build: one row in an index, no screenshot. */
const EarlierBuild = ({ project }) => (
  <li className="grid gap-3 border-b border-edge py-6 sm:grid-cols-[14rem_1fr_auto] sm:gap-8">
    <div className="min-w-0">
      <h3 className="ybz-title">{project.title}</h3>
      <p className="ybz-meta mt-1">{project.role}</p>
    </div>
    <div className="min-w-0 space-y-3">
      <p className="ybz-body">{project.summary}</p>
      <StackLine items={project.tech} />
    </div>
    {(project.repo || project.live) && (
      <div className="sm:pt-1">
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
        title="Every card routes to the proof."
        lede="Live systems link to the running product. Open-source work links to the repository. Where the code belongs to a client, the deployment is the claim."
      />

      <Section className="pt-0">
        <div
          className="grid gap-6 lg:grid-cols-2"
          aria-busy={isLoadingProjects || undefined}
        >
          {isLoadingProjects &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="ybz-card h-64 opacity-60"
                aria-hidden="true"
              />
            ))}

          {!isLoadingProjects &&
            production.map((project, index) => (
              <ProjectCard
                key={project.id ?? project.title}
                project={project}
                flagship={index === 0}
              />
            ))}

          {!isLoadingProjects && (loadError || projects.length === 0) && (
            <Card className="lg:col-span-2">
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
