import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import useFocusTrap from "../hooks/useFocusTrap";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  const focusTrapRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const { body } = document;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = () => toggleMenu();
    const container = focusTrapRef.current;

    container?.addEventListener("escape-trap", handleEscape);
    return () => container?.removeEventListener("escape-trap", handleEscape);
  }, [toggleMenu, focusTrapRef]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Certificates", path: "/certificates" },
    { name: "CV", path: "/cv" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur md:hidden"
      onClick={toggleMenu}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div
        ref={focusTrapRef}
        className="absolute inset-y-0 right-0 flex h-[100dvh] w-3/4 flex-col gap-8 overflow-y-auto overscroll-contain rounded-l-3xl border-l border-white/15 bg-slate-950/95 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Yousef Bakr</p>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              portfolio
            </p>
          </div>
          <button
            onClick={toggleMenu}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 text-lg font-medium text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleMenu}
              className="rounded-2xl border border-transparent px-4 py-3 transition hover:border-white/10 hover:bg-white/5"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-3 text-sm text-slate-400">
          <p>Open for remote collaborations across time zones.</p>
          <Link
            to="/lets-talk"
            onClick={toggleMenu}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
