import PropTypes from "prop-types";

/**
 * The headline marker — brand-kit/BRAND.md section 6. A short solid signal rule
 * under page and section headlines. Static: it marks a heading, it does not
 * perform. The file keeps its v2.4 name so imports stay stable.
 */
const GoldRule = ({ className = "" }) => <hr className={`ybz-rule ${className}`} />;

GoldRule.propTypes = {
  className: PropTypes.string,
};

export default GoldRule;
