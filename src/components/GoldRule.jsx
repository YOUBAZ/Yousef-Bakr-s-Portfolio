import PropTypes from "prop-types";

/**
 * The gold rule — BRAND.md section 5, device 2. A 2px bar, 120px wide, fading
 * to transparent left to right, sitting under a headline. Static: it marks a
 * heading, it does not perform. Mirrored in RTL by the [dir="rtl"] block in
 * index.css.
 */
const GoldRule = ({ className = "" }) => <hr className={`ybz-rule ${className}`} />;

GoldRule.propTypes = {
  className: PropTypes.string,
};

export default GoldRule;
