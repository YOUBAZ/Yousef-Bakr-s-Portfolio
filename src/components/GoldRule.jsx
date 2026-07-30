import PropTypes from "prop-types";
import { motion, useReducedMotion } from "framer-motion";

const _motion = motion;

/**
 * The gold rule — BRAND.md section 5, device 2. A 2px bar, 120px wide, fading
 * to transparent left to right, sitting under a headline.
 *
 * It draws itself when it first enters view, left to right, which is the
 * direction the gradient already runs and the direction the reader is already
 * moving. Nothing else moves with it. Once drawn it stays drawn — `once: true`,
 * because a rule that redraws every time you scroll past is a decoration
 * asking for attention rather than a device marking a heading.
 *
 * Mirrored in RTL by the [dir="rtl"] block in index.css, which reverses the
 * gradient; the draw direction follows from transform-origin below.
 */
const GoldRule = ({ className = "" }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <hr className={`ybz-rule ${className}`} />;

  return (
    <motion.hr
      className={`ybz-rule ${className}`}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    />
  );
};

GoldRule.propTypes = {
  className: PropTypes.string,
};

export default GoldRule;
