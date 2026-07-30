import PropTypes from "prop-types";
import { BRAND } from "../config/brand";

/**
 * The signet — BRAND.md section 6, "anything, by default".
 *
 * The SVG carries its own gold gradient and purple bloom in <defs>, so it drops
 * in untouched. Section 6 forbids recolouring, outlining, rotating, stretching,
 * shadowing or nesting it in another shape, and sets a 24px floor in a layout.
 * `size` is guarded against that floor rather than trusted.
 */
const MIN_SIZE = 24;

const Signet = ({ size = 32, className = "" }) => {
  const px = Math.max(size, MIN_SIZE);

  return (
    <img
      src="/brand/signet-primary.svg"
      alt={`${BRAND.name} signet`}
      width={px}
      height={px}
      className={className}
      style={{ width: px, height: px }}
    />
  );
};

Signet.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Signet;
