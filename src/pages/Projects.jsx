import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import {
  Button,
  Card,
  Figure,
  PageHeader,
  Section,
  StackLine,
} from "../components/ui";

/* One project. The flagship (first in the data) spans both columns on lg and
   sets the screenshot beside the text, so the remaining six close the grid in
   three even rows. */
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
      className={`ybz-frame aspect-[16/10] ${
        flagship
          ? "lg:aspect-auto lg:min-h-80 lg:border-b-0 lg:border-r lg:border-edge"
          : ""
      }`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="p-4"
        loading="lazy"
      />
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
            projects.map((project, index) => (
              <ProjectCard
                key={project.id ?? project.title}
                project={project}
                flagship={index === 0}
              />
            ))}

          {!isLoadingProjects && !loadError && projects.length === 0 && (
            <Card className="ybz-body border-dashed text-center text-muted lg:col-span-2">
              No projects were found. Check the project data source.
            </Card>
          )}

          {loadError && (
            <Card className="ybz-body text-center text-muted lg:col-span-2">
              {loadError}
            </Card>
          )}
        </div>
      </Section>
    </>
  );
};

export default Projects;
