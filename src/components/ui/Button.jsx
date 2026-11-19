import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "ybz-btn-primary",
  secondary: "ybz-btn-ghost",
  accent: "ybz-btn-accent",
};

/**
 * One button geometry, three colourings.
 *
 *   primary   — the single ink-filled action on a screen
 *   secondary — everything that sits next to it
 *   accent    — the persistent navbar CTA (ink outline)
 *
 * Renders a router Link for `to`, an anchor for `href`, a button otherwise.
 * External hrefs open in a new tab.
 */
const Button = ({
  variant = "primary",
  size = "md",
  to,
  href,
  icon: Icon,
  iconPosition = "end",
  className = "",
  children,
  ...rest
}) => {
  const classes = [
    "ybz-btn",
    VARIANTS[variant],
    size === "sm" ? "ybz-btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && iconPosition === "start" && (
        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
      {children}
      {Icon && iconPosition === "end" && (
        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "accent"]),
  size: PropTypes.oneOf(["md", "sm"]),
  to: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
