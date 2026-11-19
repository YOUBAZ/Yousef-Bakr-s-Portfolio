import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import Wordmark from "./Wordmark";
import GoldRule from "./GoldRule";
import { Button } from "./ui";
import { BRAND, CONTACT_BLOCK } from "../config/brand";
import { NAV_ITEMS } from "../config/navigation";

const socialLinks = [
  { icon: Github, label: "GitHub", href: BRAND.github },
  { icon: Linkedin, label: "LinkedIn", href: BRAND.linkedinUrl },
  { icon: Mail, label: "Email", href: `mailto:${BRAND.email}` },
];

const pad = (n) => String(n).padStart(2, "0");

/**
 * The footer strip — brand-kit/BRAND.md section 6: hairline top border,
 * Merge Y + name + role on the left, mono page counter on the right.
 * On a site the counter is the page's position in the primary navigation,
 * the same job it does on a carousel slide.
 */
const Footer = () => {
  const { pathname } = useLocation();
  const index = NAV_ITEMS.findIndex((item) =>
    item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)
  );

  return (
    <footer className="border-t border-hairline bg-ink text-slate-body">
      <div className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
            <div className="space-y-6">
              <Link
                to="/"
                className="inline-block"
                aria-label={`${BRAND.name}, home`}
                onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
              >
                <Wordmark size="lg" />
              </Link>
              <GoldRule />
              <div className="max-w-md space-y-2">
                <p className="ybz-body">{BRAND.positioning}</p>
                <p className="text-sm text-muted">{BRAND.tagline}</p>
              </div>
            </div>

            <nav aria-label="Footer">
              <p className="ybz-eyebrow">Navigate</p>
              <ul className="mt-4 space-y-3 text-sm">
                {NAV_ITEMS.filter((item) => item.path !== "/").map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-slate-body transition-colors duration-150 hover:text-bone"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="ybz-eyebrow">Connect</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant="secondary"
                    size="sm"
                    icon={link.icon}
                    iconPosition="start"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>

              {/* Section 11's contact block, in its fixed order. */}
              <ul className="mt-6 space-y-1">
                {CONTACT_BLOCK.map((entry) => (
                  <li key={entry.href}>
                    <a
                      href={entry.href}
                      className="ybz-source transition-colors duration-150 hover:text-accent"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-edge pt-6">
            <p className="ybz-meta">
              © {new Date().getFullYear()} {BRAND.name} · {BRAND.role}
            </p>
            {index >= 0 && (
              <p className="ybz-meta text-accent" aria-hidden="true">
                {pad(index + 1)} / {pad(NAV_ITEMS.length)}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
