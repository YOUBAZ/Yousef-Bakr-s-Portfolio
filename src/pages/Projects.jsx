import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Github, ExternalLink, Sparkles } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [gridRef] = useAutoAnimate({ duration: 240 });
  const stats = [
    { label: "Avg delivery", value: "6 weeks" },
    { label: "Teams supported", value: "15+" },
    { label: "UX audits", value: "32" },
    { label: "Stack coverage", value: "WebGL / SaaS" },
  ];

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
    <div className="bg-slate-950 text-white">
      <section className="px-6 pt-28 pb-12 sm:px-10 lg:px-16">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={16} />
          Case studies
        </motion.p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Interfaces engineered for motion, clarity, and measurable impact.
            </h1>
            <p className="mt-4 text-slate-300">
              Each build pairs a tailored motion system with resilient code to
              keep teams shipping faster—from immersive marketing canvases to
              data-dense SaaS consoles.
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
            Featured Builds
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Animated cards detailing the craft, stack, and outcomes.
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
                  className={`flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br ${project.gradient} p-6`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/80">
                      {project.year}
                    </p>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-white/90">{project.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
                    {project.tech?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/25 px-3 py-1 text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 transition hover:bg-white/20"
                      >
                        <Github size={16} />
                        Repo
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/0 bg-white/25 px-4 py-2 transition hover:bg-white/40"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </motion.article>
              </Tilt>
            ))}

          {!isLoadingProjects && !loadError && projects.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 p-10 text-center text-slate-400">
              New prototypes are in progress. Check back soon for fresh case studies.
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
  );
};

export default Projects;
