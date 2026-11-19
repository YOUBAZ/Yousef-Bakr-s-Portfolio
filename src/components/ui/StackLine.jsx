import PropTypes from "prop-types";

/**
 * A stack, set the way the brand sets sources: mono, muted, separated by a
 * middle dot. Replaces bordered tag chips, which rounded into pills.
 */
const StackLine = ({ items, className = "" }) => {
  if (!items?.length) return null;
  return (
    <p className={`ybz-source ${className}`}>
      <span className="sr-only">Stack: </span>
      {items.join(" · ")}
    </p>
  );
};

StackLine.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default StackLine;
