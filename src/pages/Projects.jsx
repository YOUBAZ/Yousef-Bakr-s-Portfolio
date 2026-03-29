import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Github, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { siteMeta } from "../config/seo";

const _motion = motion;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [gridRef] = useAutoAnimate({ duration: 240 });
  const stats = [
    { label: "GitHub repos", value: "4" },
    { label: "Thumbnail-led cards", value: "4" },
    { label: "Live demos", value: "0" },
    { label: "Source-linked", value: "100%" },
  ];

  const projectsSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    const baseSchema = [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/projects`,
        url: `${siteMeta.siteUrl}/projects`,
        name: "Projects & Case Studies",
        description:
          "A curated set of GitHub-hosted projects with screenshot thumbnails spanning AI prompts, blogs, commerce, and movie browsing.",
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
        name: "Featured Projects",
        itemListElement: projects.slice(0, 8).map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          description: project.summary,
          url: project.repo || `${siteMeta.siteUrl}/projects#${project.id ?? index + 1}`,
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
        title="Projects & Case Studies"
        description="Four GitHub projects by Yousef Bakr, presented with thumbnail-led cards and source links for Promptopia, Blog Post, E-commerce App, and IMDB Clone."
        keywords={[
          "GitHub projects",
          "React and Next.js portfolio",
          "Blog Post project",
          "E-commerce app project",
        ]}
        url="/projects"
        schema={projectsSchema}
      />
      <div className="bg-slate-950 text-white">
        <section className="px-6 pt-12 pb-12 sm:px-10 lg:px-16">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={16} />
            GitHub repos
          </motion.p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Four GitHub projects presented with full-page thumbnails and source-code links.
              </h1>
              <p className="mt-4 text-slate-300">
                Each card keeps the screenshot intact, avoids cropping, and routes straight to the repository because there are no live deployments.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
                >
                  <p className="uppercase tracking-[0.25em] text-xs text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Selected GitHub builds with screenshot-led previews.
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Source-first cards for Promptopia, Blog Post, E-commerce App, and IMDB Clone.
            </h2>
          </div>
          <div ref={gridRef} className="grid gap-6 lg:grid-cols-2">
            {isLoadingProjects &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="h-64 rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="h-full w-full animate-pulse rounded-3xl bg-white/10" />
                </div>
              ))}

            {!isLoadingProjects &&
              projects.map((project, index) => (
                <Tilt key={project.id ?? project.title} glareEnable className="h-full">
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${project.gradient}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950/80">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur">
                          {project.year}
                        </span>
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur">
                          {project.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 text-white">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <p className="mt-3 text-sm text-white/90">{project.summary}</p>
                      <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
                        {project.tech?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/20 px-3 py-1 text-white/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8">
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
                          >
                            <Github size={16} />
                            Source on GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Tilt>
              ))}

            {!isLoadingProjects && !loadError && projects.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 p-10 text-center text-slate-400">
                No GitHub repos were found. Check the project data source.
              </div>
            )}

            {loadError && (
              <div className="rounded-3xl border border-rose-400/40 bg-rose-500/10 p-6 text-center text-rose-200">
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
