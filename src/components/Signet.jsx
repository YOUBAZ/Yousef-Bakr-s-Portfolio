import PropTypes from "prop-types";
import brand from "../../brand-kit/brand.json";
import { BRAND } from "../config/brand";

/**
 * The Merge Y — brand-kit/BRAND.md section 5, the symbol.
 *
 * Drawn inline from the geometry in brand-kit/brand.json, so the site and the
 * kit can never disagree. The main line takes the ink token and the branch the
 * signal token, which is how it follows the theme without two files.
 *
 * Section 5 forbids recolouring the main line, rotating, mirroring, outlining
 * or adding effects, and sets a 16px floor. `size` is guarded against it.
 * `mono` draws the all-ink version for places where signal would clash.
 */
const { main, branch, bounds } = brand.marks.glyph;
const MIN_SIZE = brand.marks.glyph.min_size_px;

const toPath = (points) => `M${points.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
const MAIN_D = toPath(main);
const BRANCH_D = toPath(branch);

// Square crop around the bounds with a 2-unit margin, as the kit's files use.
const [x0, y0, x1, y1] = bounds;
const side = Math.max(x1 - x0, y1 - y0) + 4;
const VIEW_BOX = `${(x0 + x1) / 2 - side / 2} ${(y0 + y1) / 2 - side / 2} ${side} ${side}`;

const Signet = ({ size = 32, mono = false, className = "", decorative = false }) => {
  const px = Math.max(size, MIN_SIZE);

  return (
    <svg
      viewBox={VIEW_BOX}
      width={px}
      height={px}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : `${BRAND.name} logo`}
      focusable="false"
    >
      <path d={MAIN_D} fill="var(--ybz-bone)" />
      <path d={BRANCH_D} fill={mono ? "var(--ybz-bone)" : "var(--ybz-signal)"} />
    </svg>
  );
};

Signet.propTypes = {
  size: PropTypes.number,
  mono: PropTypes.bool,
  className: PropTypes.string,
  /** True when a visible name sits next to it, so screen readers skip it. */
  decorative: PropTypes.bool,
};

export default Signet;
