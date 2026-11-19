import PropTypes from "prop-types";
import Signet from "./Signet";
import { BRAND } from "../config/brand";

/**
 * Signet + name (+ descriptor). The name is the wordmark — logo artwork set in
 * Playfair 700 as the lockup sets it — so it is the one place Playfair runs
 * under 30px. The descriptor is mono at the 12px floor, +0.14em (section 4).
 */
const Wordmark = ({
  size = "md",
  descriptor = true,
  descriptorClassName = "",
}) => (
  <span className="flex items-center gap-3">
    <Signet size={size === "lg" ? 40 : 32} />
    <span className="leading-tight">
      <span
        className={`block font-display font-bold text-bone ${size === "lg" ? "text-xl" : "text-lg"}`}
      >
        {BRAND.name}
      </span>
      {descriptor && (
        <span className={`ybz-meta block ${descriptorClassName}`}>
          {BRAND.descriptorLockup}
        </span>
      )}
    </span>
  </span>
);

Wordmark.propTypes = {
  size: PropTypes.oneOf(["md", "lg"]),
  descriptor: PropTypes.bool,
  descriptorClassName: PropTypes.string,
};

export default Wordmark;
