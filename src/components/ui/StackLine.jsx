import PropTypes from "prop-types";

/**
 * A stack, set the way the brand sets sources: mono, muted. Items are spaced,
 * not dotted: a separator at a line end would hang ("Flutter ·"), and a gap
 * cannot. Each item stays on one line.
 */
const StackLine = ({ items, className = "" }) => {
  if (!items?.length) return null;
  return (
    <p className={`ybz-source flex flex-wrap gap-x-4 gap-y-1 ${className}`}>
      <span className="sr-only">Stack: </span>
      {items.map((item, i) => (
        <span key={item} className="whitespace-nowrap">
          {item}
          {i < items.length - 1 && <span className="sr-only">,</span>}
        </span>
      ))}
    </p>
  );
};

StackLine.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default StackLine;
