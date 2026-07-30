import PropTypes from "prop-types";
import { Moon, Sun } from "lucide-react";

/**
 * The theme switch.
 *
 * Deliberately not gold and not blue. Gold is the one dominant accent and is
 * spent on the primary action; blue is reserved for navigation and contact by
 * section 3.5 rule 2. A theme switch is chrome, so it takes the hairline
 * treatment the rest of the chrome uses and gains its accent only on hover.
 */
const ThemeToggle = ({ theme, onToggle, className = "" }) => {
  const nextTheme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`border border-edge p-2 text-muted transition-colors hover:border-hairline hover:text-[var(--ybz-accent-type)] ${className}`}
      style={{ borderRadius: "var(--ybz-r-sm)" }}
      aria-label={`Switch to the ${nextTheme} theme`}
      title={`Switch to the ${nextTheme} theme`}
    >
      <Icon size={18} />
    </button>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ThemeToggle;
