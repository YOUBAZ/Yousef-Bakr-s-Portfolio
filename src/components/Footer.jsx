import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import Wordmark from "./Wordmark";
import GoldRule from "./GoldRule";
import { Button } from "./ui";
import { BRAND } from "../config/brand";
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
              <ul className="mt-2 text-sm">
                {NAV_ITEMS.filter((item) => item.path !== "/").map((link) => (
                  <li key={link.path}>
                    {/* 44px tall rows: a finger-sized target without extra gaps. */}
                    <Link
                      to={link.path}
                      className="flex min-h-11 items-center text-slate-body underline-offset-4 lg:min-h-8 transition-colors duration-150 hover:text-bone hover:underline"
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

              {/* The address as text, so it can be copied where mailto: does nothing. */}
              <p className="ybz-source mt-4 select-all">{BRAND.email}</p>
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
