import PropTypes from "prop-types";

/** A metric: mono figure over a short label. Used in ledgers and project stats. */
const Figure = ({ value, label, size = "md", className = "" }) => (
  <div className={className}>
    <p className={`ybz-figure ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
      {value}
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
