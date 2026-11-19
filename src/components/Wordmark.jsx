import PropTypes from "prop-types";
import Signet from "./Signet";
import { BRAND } from "../config/brand";

/**
 * Merge Y + name (+ descriptor): the primary logo, brand-kit/BRAND.md section 5.
 * The name is IBM Plex Sans SemiBold, tracked -0.01em, as the outlined wordmark
 * sets it. The Merge Y is 1.45 times the cap height, so it reads as part of the
 * lockup, not a separate icon. The descriptor is Plex Mono, sentence case.
 */
const Wordmark = ({
  size = "md",
  descriptor = true,
  descriptorClassName = "",
}) => (
  <span className="flex items-center gap-3">
    <Signet size={size === "lg" ? 34 : 28} decorative />
    <span className="leading-tight">
      <span
        className={`block font-display font-semibold tracking-[-0.01em] text-bone ${size === "lg" ? "text-xl" : "text-lg"}`}
      >
        {BRAND.name}
      </span>
      {descriptor && (
        <span className={`ybz-meta block ${descriptorClassName}`}>
          {BRAND.descriptor}
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
