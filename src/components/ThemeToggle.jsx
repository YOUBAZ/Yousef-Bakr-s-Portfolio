import PropTypes from "prop-types";
import { Moon, Sun } from "lucide-react";

/**
 * The theme switch. Chrome, so it takes the hairline treatment and gains the
 * accent only on hover. Same 40px square as the mobile menu button.
 */
const ThemeToggle = ({ theme, onToggle, className = "" }) => {
  const nextTheme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex h-11 w-11 lg:h-10 lg:w-10 items-center justify-center border border-edge text-muted transition-colors duration-150 hover:border-mid hover:text-bone ${className}`}
      style={{ borderRadius: "var(--ybz-r-sm)" }}
      aria-label={`Switch to the ${nextTheme} theme`}
      title={`Switch to the ${nextTheme} theme`}
    >
      <Icon size={18} strokeWidth={1.75} />
    </button>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ThemeToggle;
