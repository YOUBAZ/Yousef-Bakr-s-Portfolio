import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Signet from "./Signet";
import { BRAND } from "../config/brand";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Writing", path: "/blog" },
  { name: "Certificates", path: "/certificates" },
  { name: "CV", path: "/cv" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/**
 * The footer strip composition from BRAND.md section 5, reused as the header:
 * signet + name + role on the left. Name in Playfair, role in JetBrains Mono at
 * +0.14em, which is the section 4 scale.
 */
const Navbar = ({ toggleMobileMenu, theme, toggleTheme }) => {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        <div
          className="flex items-center justify-between border border-edge px-5 py-3 backdrop-blur"
          style={{
            background: "var(--ybz-chrome)",
            borderRadius: "var(--ybz-r-md)",
          }}
        >
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${BRAND.name} — home`}
          >
            <Signet size={34} />
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-bone">
                {BRAND.name}
              </p>
              <p
                className="hidden font-mono text-[0.6rem] uppercase text-muted sm:block"
                style={{ letterSpacing: "0.14em" }}
              >
                {BRAND.descriptorLockup}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "relative px-3 py-2 transition-colors",
                    // Active state is a gold rule, not a filled pill —
                    // section 16 lists "everything rounded into pills" as off-brand.
                    isActive
                      ? "text-bone after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:bg-[var(--ybz-accent-rule)]"
                      : "text-slate-body hover:text-bone",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}
            {/* Blue lives here and nowhere else: section 3.5 rule 2 permits it
                only on something a person can click. Padding may shrink; the
                16px font size may not — below it the CTA gradient stops
                clearing contrast, which is why the token file pins it. */}
            <Link to="/lets-talk" className="ybz-btn-nav ml-3 !px-4 !py-2.5">
              Let&apos;s talk
            </Link>
            <ThemeToggle
              theme={theme}
              onToggle={toggleTheme}
              className="ml-2"
            />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={toggleMobileMenu}
              className="border border-edge p-2 text-bone transition-colors hover:border-hairline"
              style={{ borderRadius: "var(--ybz-r-sm)" }}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
