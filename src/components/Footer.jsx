import { Link } from "react-router-dom";
import { Facebook, Github, Linkedin, Sparkles } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/YOUBAZ" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yousef-bakr/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/yousefbakrzaki/",
  },
];

const navShortcuts = [
  { label: "Projects", path: "/projects" },
  { label: "Certificates", path: "/certificates" },
  { label: "CV", path: "/cv" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Let's Talk", path: "/lets-talk" },
];

const capabilityBadges = [
  "Full-stack delivery",
  "LMS & simulations",
  "Cloud automation",
  "AI integrations",
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr,1fr]">
          <div>
            <Link
              to="/"
              className="flex items-center gap-3 text-white transition hover:text-sky-200"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            >
              <span className="rounded-2xl bg-white/10 p-2 text-sky-300">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="text-lg font-semibold">Yousef Bakr</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  software engineer
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-400">
              A multi-stack portfolio engineered with React, Next.js, Node.js, Express.js,
              SQL/NoSQL data, and AWS/Docker/Kubernetes pipelines so LMS, simulation,
              and SaaS partners can see how I bridge UX and systems analysis.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {capabilityBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Navigate
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {navShortcuts.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Connect
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <Icon size={18} />
                    {link.label}
                  </a>
                );
              })}
            </div>
            <p className="mt-5 text-sm text-slate-400">
              Based in Egypt, collaborating remotely with teams worldwide on software engineering,
              system analysis, and platform modernization.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} Yousef Bakr. Built with React, Next.js, Node.js,
            Tailwind, and a healthy dose of automation.
          </p>
          <p>Reliability-first craft with accessibility, security, and observability baked in.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
