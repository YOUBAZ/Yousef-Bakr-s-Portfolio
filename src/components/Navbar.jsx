import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, Sparkles } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates" },
  { name: "CV", path: "/cv" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = ({ toggleMobileMenu }) => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 pointer-events-none">
      <div className="mx-auto max-w-6xl pointer-events-auto">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-3 text-white shadow-xl shadow-slate-950/20 backdrop-blur">
          <Link
            to="/"
            className="group flex items-center gap-3 text-base font-semibold tracking-wide"
            aria-label="Yousef Bakr home"
          >
            <span className="rounded-2xl bg-white/10 p-2 text-sky-300 transition group-hover:bg-white/20">
              <Sparkles size={18} />
            </span>
            <div className="leading-tight">
              <p className="text-white group-hover:text-sky-200 transition">
                Yousef Bakr
              </p>
              <p className="hidden text-xs font-normal uppercase tracking-[0.35em] text-slate-400 sm:block">
                portfolio
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 transition",
                    isActive
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/10",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/lets-talk"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]"
            >
              Let's Talk
            </Link>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white shadow-sm backdrop-blur md:hidden"
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
