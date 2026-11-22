import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Inline link with a trailing arrow. Router link for `to`, anchor for `href`.
 * The arrow says where it goes: → stays on this site, ↗ leaves it.
 */
const TextLink = ({ to, href, children, className = "", arrow = true }) => {
  const Arrow = to ? ArrowRight : ArrowUpRight;
  const content = (
    <>
      {children}
      {arrow && <Arrow size={16} strokeWidth={1.75} aria-hidden="true" />}
    </>
  );
  const classes = `ybz-link ${className}`;

  if (to)
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
};

TextLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  arrow: PropTypes.bool,
};

export default TextLink;
