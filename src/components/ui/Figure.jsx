import PropTypes from "prop-types";

/**
 * A figure's value. A unit after the number ("3 days") stays in Plex Mono, so
 * every figure on a row is one face, but at half size and muted, so it reads
 * as the unit and does not take a full-size mono cell.
 */
export const FigureValue = ({ value }) => {
  const m = String(value).match(/^([~\d.,+/%]+)\s+(\D.*)$/);
  if (!m) return value;
  return (
    <>
      {m[1]}
      <span className="ml-1.5 text-[0.5em] font-medium text-muted">{m[2]}</span>
    </>
  );
};

FigureValue.propTypes = {
  value: PropTypes.node.isRequired,
};

/** A metric: mono figure over a short label. Used in ledgers and project stats. */
const Figure = ({ value, label, size = "md", className = "" }) => (
  <div className={className}>
    <p className={`ybz-figure ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
      <FigureValue value={value} />
    </p>
    <p className="ybz-meta mt-1">{label}</p>
  </div>
);

Figure.propTypes = {
  value: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["md", "lg"]),
  className: PropTypes.string,
};

export default Figure;
