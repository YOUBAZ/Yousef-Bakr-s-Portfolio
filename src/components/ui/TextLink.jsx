import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/** Inline accent link with a trailing arrow. Router link for `to`, anchor for `href`. */
const TextLink = ({ to, href, children, className = "", arrow = true }) => {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
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
