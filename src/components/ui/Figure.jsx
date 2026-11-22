import PropTypes from "prop-types";

/**
 * A figure's value. The number is mono; a unit after it ("3 days") is set in
 * the sans at a smaller size, so the unit does not take a full mono cell and
 * "3 days" sits as tight as "4" or "6+".
 */
export const FigureValue = ({ value }) => {
  const m = String(value).match(/^([~\d.,+/%]+)\s+(\D.*)$/);
  if (!m) return value;
  return (
    <>
      {m[1]}
      <span className="ml-1.5 font-body text-[0.5em] font-medium tracking-normal">
        {m[2]}
      </span>
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
