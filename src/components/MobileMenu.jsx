import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import useFocusTrap from "../hooks/useFocusTrap";
import StackRail from "./StackRail";
import Wordmark from "./Wordmark";
import GoldRule from "./GoldRule";
import { NAV_ITEMS } from "../config/navigation";

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden md:hidden"
      style={{ background: "var(--ybz-scrim)" }}
      onClick={toggleMenu}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div
        ref={focusTrapRef}
        className="absolute inset-y-0 right-0 flex h-[100dvh] w-4/5 flex-col gap-8 overflow-y-auto overscroll-contain border-l border-hairline bg-ink p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Section 5 flips the rail to the mirrored edge; this panel enters
            from the right, so the rail sits on its leading edge. */}
        <StackRail />

        <div className="flex items-center justify-between">
          <Wordmark />
          <button
            type="button"
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center border border-edge text-bone transition-colors duration-150 hover:border-hairline"
            style={{ borderRadius: "var(--ybz-r-sm)" }}
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <nav
          className="flex flex-col gap-1 text-lg font-medium"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleMenu}
              className="flex h-12 items-center border-l-2 border-transparent px-4 text-slate-body transition-colors duration-150 hover:border-[var(--ybz-accent-rule)] hover:text-bone"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <GoldRule />
          <Link
            to="/lets-talk"
            onClick={toggleMenu}
            className="ybz-btn ybz-btn-accent w-full"
          >
            Let&apos;s talk
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
