import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";
import { BRAND } from "../config/brand";
import { NAV_ITEMS } from "../config/navigation";

/**
 * The header strip — brand-kit/BRAND.md section 6. Full width, flush to the
 * top, the page ground above a hairline: a document's running head, not a
 * floating box. Wordmark and revision on the left, aligned to the page grid;
 * links, one outlined CTA and the theme switch on the right. The active link
 * is marked by an ink rule under it.
 */
const Navbar = ({ toggleMobileMenu, theme, toggleTheme }) => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-edge bg-ink px-6 sm:px-10 lg:px-16">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
      <div className="flex items-center gap-5">
        <Link to="/" aria-label={`${BRAND.name}, home`} className="flex min-h-11 items-center">
          <Wordmark descriptorClassName="hidden sm:block" />
        </Link>
        <span
          className="ybz-meta hidden border-l border-edge pl-5 xl:inline"
          aria-hidden="true"
        >
          {BRAND.revision}
        </span>
      </div>

      <nav
        className="hidden items-center gap-1 text-sm font-medium md:flex"
        aria-label="Primary"
      >
        {NAV_ITEMS.filter((item) => item.path !== "/contact").map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "relative flex h-9 items-center px-3 transition-colors duration-150",
                isActive ? "text-bone" : "text-muted hover:text-bone",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {item.name}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-1 h-0.5 bg-bone"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
        <Link
          to="/contact"
          className="ybz-btn ybz-btn-accent ybz-btn--sm ml-3"
        >
          Contact
        </Link>
        <ThemeToggle theme={theme} onToggle={toggleTheme} className="ml-2" />
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="flex h-11 w-11 items-center justify-center border border-edge text-bone transition-colors duration-150 hover:border-mid"
          style={{ borderRadius: "var(--ybz-r-sm)" }}
          aria-label="Open navigation"
        >
          <Menu size={18} strokeWidth={1.75} />
        </button>
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
