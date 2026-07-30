import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Signet from "./Signet";
import { BRAND } from "../config/brand";

const _motion = motion;

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
const Navbar = ({ toggleMobileMenu }) => {
  const reduceMotion = useReducedMotion();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        <div
          className="flex items-center justify-between border border-edge px-5 py-3 backdrop-blur"
          style={{
            background: "rgba(2,6,23,.72)",
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
                    isActive ? "text-bone" : "text-slate-body hover:text-bone",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {/* A single shared element, so the rule slides between items
                        rather than blinking out and back in. It is the same gold
                        rule from section 5, just told which heading it marks. */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-rule"
                        className="absolute inset-x-3 bottom-0 h-[2px]"
                        style={{ background: "var(--ybz-accent-rule)" }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.35, ease: [0, 0, 0.2, 1] }
                        }
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            {/* Gold outline, not the gold fill: .ybz-btn-primary is the one
                gold action per screen, and this bar sits on every screen. */}
            <Link to="/lets-talk" className="ybz-btn-accent ml-3 !px-4 !py-2.5">
              Let&apos;s talk
            </Link>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="border border-edge p-2 text-bone transition-colors hover:border-hairline md:hidden"
            style={{ borderRadius: "var(--ybz-r-sm)" }}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
};

export default Navbar;
