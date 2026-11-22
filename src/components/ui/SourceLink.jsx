import PropTypes from "prop-types";

/**
 * A proof source the reader can check. Mono, muted, underlined; the underline
 * turns signal on hover, as every link does. Without an href it renders as text.
 */
const SourceLink = ({ href, children, className = "" }) => {
  const classes = `ybz-source ${className}`;
  if (!href) return <span className={classes}>{children}</span>;
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`${classes} underline decoration-edge underline-offset-4 transition-colors duration-150 hover:decoration-[var(--ybz-signal)]`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

SourceLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SourceLink;
