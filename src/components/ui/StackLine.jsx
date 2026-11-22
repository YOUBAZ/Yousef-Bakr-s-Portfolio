import PropTypes from "prop-types";

/**
 * A stack, set the way the brand sets sources: mono, muted. Items are spaced,
 * not dotted, so no separator hangs at a line end. Each item is an atomic
 * inline-block with a trailing margin: the line may break only between items,
 * a wrapped line starts flush (no leading space), and the balanced wrap splits
 * the items evenly rather than leaving one alone ("PostgreSQL").
 */
const StackLine = ({ items, className = "" }) => {
  if (!items?.length) return null;
  return (
    <p className={`ybz-source [text-wrap:balance] ${className}`}>
      <span className="sr-only">Stack: </span>
      {items.map((item, i) => (
        <span key={item} className="mr-4 inline-block whitespace-nowrap last:mr-0">
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
