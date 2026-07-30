import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import Signet from "./Signet";
import { BRAND, CONTACT_BLOCK } from "../config/brand";
import GoldRule from "./GoldRule";

const socialLinks = [
  { icon: Github, label: "GitHub", href: BRAND.github },
  { icon: Linkedin, label: "LinkedIn", href: BRAND.linkedinUrl },
  { icon: Mail, label: "Email", href: `mailto:${BRAND.email}` },
];

const navShortcuts = [
  { label: "Projects", path: "/projects" },
  { label: "Writing", path: "/blog" },
  { label: "Certificates", path: "/certificates" },
  { label: "CV", path: "/cv" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

/**
 * The footer strip — BRAND.md section 5, device 3. Hairline top border, signet
 * + name + role on the left, mono counter on the right in gold.
 *
 * What used to live here and does not any more: four unsourced capability
 * badges, a line volunteering the location (section 1 keeps it private), and a
 * "Built with React, Next.js, Node.js…" sign-off — a stack list on an asset,
 * naming two frameworks this site does not use.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-hairline bg-ink text-slate-body">
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            >
              <Signet size={40} />
              <div>
                <p className="font-display text-lg font-bold text-bone">
                  {BRAND.name}
                </p>
                <p
                  className="font-mono text-[0.65rem] uppercase text-muted"
                  style={{ letterSpacing: "0.14em" }}
                >
                  {BRAND.descriptorLockup}
                </p>
              </div>
            </Link>

            <GoldRule className="mt-6" />

            <p className="mt-5 max-w-md text-sm leading-7">
              {BRAND.positioning}
            </p>
            <p className="mt-3 max-w-md text-sm italic text-muted">
              {BRAND.tagline}
            </p>
          </div>

          <div>
            <p className="ybz-eyebrow">Navigate</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {navShortcuts.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-slate-body transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="ybz-eyebrow">Connect</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-edge px-4 py-3 text-bone transition-all hover:-translate-y-0.5 hover:border-hairline"
                    style={{ borderRadius: "var(--ybz-r-sm)" }}
                  >
                    <Icon size={18} />
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Section 11's contact block, in its fixed order. */}
            <div className="mt-6 flex flex-col gap-1.5 text-xs">
              {CONTACT_BLOCK.map((entry) => (
                <a
                  key={entry.href}
                  href={entry.href}
                  className="text-muted transition-colors hover:text-[var(--ybz-accent-type)]"
                >
                  {entry.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-edge pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="ybz-meta">
            © {currentYear} {BRAND.name}
          </p>
          <p className="ybz-meta">{BRAND.role}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
