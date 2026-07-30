import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Github } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import GoldRule from "../components/GoldRule";

const _motion = motion;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [gridRef] = useAutoAnimate({ duration: 240 });

  const projectsSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    const baseSchema = [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/projects`,
        url: `${siteMeta.siteUrl}/projects`,
        name: "Projects",
        description:
          "Source-linked projects spanning AI prompt platforms, content dashboards, commerce and media browsing.",
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
        description="Source-linked projects: Promptopia, Blog Post, E-commerce App and IMDB Clone. Each card routes to the repository."
        keywords={[
          "projects",
          "React portfolio",
          "Next.js projects",
          "open source",
        ]}
        url="/projects"
        schema={projectsSchema}
      />
      <div className="bg-ink text-slate-body">
        <section className="relative isolate overflow-hidden px-6 pb-12 pt-12 sm:px-10 lg:px-16">
          <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />

          <div className="mx-auto max-w-5xl space-y-6">
            <p className="ybz-eyebrow">Projects</p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
              className="max-w-3xl font-display text-4xl leading-tight text-bone sm:text-5xl"
            >
              Every card routes to the source.
            </motion.h1>
            <GoldRule />
            <p className="max-w-2xl leading-8">
              There are no live deployments behind these, so the repository is
              the claim. Read the commits rather than the screenshot.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 lg:px-16">
          <div
            ref={gridRef}
            className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2"
          >
            {isLoadingProjects &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="ybz-card h-64 animate-pulse"
                />
              ))}

            {!isLoadingProjects &&
              projects.map((project, index) => (
                <motion.article
                  key={project.id ?? project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0, 0, 0.2, 1],
                  }}
                  className="ybz-card ybz-card-interactive group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-edge bg-ink">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-contain p-4"
                      loading="lazy"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="ybz-meta border border-edge bg-ink/80 px-3 py-1 backdrop-blur">
                        {project.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl text-bone">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7">
                      {project.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech?.map((tag) => (
                        <span
                          key={tag}
                          className="border border-edge px-3 py-1 font-mono text-xs text-muted"
                          style={{ borderRadius: "var(--ybz-r-sm)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.repo && (
                      <div className="mt-8">
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ybz-btn-ghost !py-2.5 text-sm"
                        >
                          <Github size={16} />
                          Source
                        </a>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}

            {!isLoadingProjects && !loadError && projects.length === 0 && (
              <div className="ybz-card border-dashed p-10 text-center text-muted">
                No projects were found. Check the project data source.
              </div>
            )}

            {loadError && (
              <div className="ybz-card border-hairline p-6 text-center text-muted">
                {loadError}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
