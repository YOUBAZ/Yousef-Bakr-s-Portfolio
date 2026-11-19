import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";
import { BRAND } from "../config/brand";
import { NAV_ITEMS } from "../config/navigation";

/**
 * Wordmark left, links, one outlined CTA, theme switch. The active link is
 * marked by the signal rule under it, never a filled pill.
 */
const Navbar = ({ toggleMobileMenu, theme, toggleTheme }) => (
  <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
    <div className="pointer-events-auto mx-auto max-w-6xl">
      <div
        className="flex h-16 items-center justify-between border border-edge px-5 backdrop-blur"
        style={{
          background: "var(--ybz-chrome)",
          borderRadius: "var(--ybz-r-md)",
        }}
      >
        <Link to="/" aria-label={`${BRAND.name}, home`}>
          <Wordmark descriptorClassName="hidden sm:block" />
        </Link>

        <nav
          className="hidden items-center gap-1 text-sm font-medium md:flex"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "relative flex h-9 items-center px-3 transition-colors duration-150",
                  isActive ? "text-bone" : "text-slate-body hover:text-bone",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-1 h-0.5"
                      style={{ background: "var(--ybz-accent-rule)" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/lets-talk"
            className="ybz-btn ybz-btn-accent ybz-btn--sm ml-3"
          >
            Let&apos;s talk
          </Link>
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="flex h-11 w-11 items-center justify-center border border-edge text-bone transition-colors duration-150 hover:border-hairline"
            style={{ borderRadius: "var(--ybz-r-sm)" }}
            aria-label="Open navigation"
          >
            <Menu size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  </header>
);

Navbar.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
