import PropTypes from "prop-types";

/**
 * The stack rail — BRAND.md section 5, device 1.
 *
 * A vertical 6px bar split into segments, derived from the logo's stem blocks.
 * In a single view it is three segments at 100 / 55 / 30% opacity. Flips to the
 * right in RTL, which the parent handles by setting `side`.
 *
 * Section 17 issue 5 notes there was no rule for how the rail animates, so each
 * component invented one. The rule here: segments wipe in top-down over 600ms
 * with a 120ms stagger, ease-out, no bounce — and nothing at all under
 * prefers-reduced-motion, which the global rule in index.css already enforces.
 */
const SEGMENTS = [
  { grow: 1, opacity: 1 },
  { grow: 0.75, opacity: 0.55 },
  { grow: 0.5, opacity: 0.3 },
];

const StackRail = ({ side = "left", className = "", animate = true }) => (
  <div
    aria-hidden="true"
    className={[
      "pointer-events-none absolute inset-y-0 flex w-[6px] flex-col gap-1.5 py-8",
      side === "left" ? "left-0" : "right-0",
      className,
    ].join(" ")}
  >
    {SEGMENTS.map((segment, index) => (
      <span
        key={segment.opacity}
        className="w-full rounded-full"
        style={{
          flexGrow: segment.grow,
          background: "var(--ybz-accent-rule)",
          opacity: segment.opacity,
          transformOrigin: "top",
          animation: animate
            ? `ybz-rail-fill .6s cubic-bezier(0,0,.2,1) ${index * 0.12}s both`
            : undefined,
        }}
      />
    ))}
  </div>
);

StackRail.propTypes = {
  side: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  animate: PropTypes.bool,
};

export default StackRail;
