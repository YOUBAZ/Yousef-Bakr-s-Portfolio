import PropTypes from "prop-types";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const _motion = motion;

/**
 * The stack rail — BRAND.md section 5, device 1.
 *
 * A vertical 6px bar on the left edge, split into segments, derived from the
 * logo's stem blocks.
 *
 * Section 5 also gives the rail a second job: "In a carousel it doubles as a
 * swipe-progress indicator: segments up to the current slide are gold, the rest
 * 10% white." `progress` is that behaviour translated to a page — segments fill
 * with scroll depth instead of slide index. It is the brand's own device doing
 * the brand's own documented job, which is why the site animates this and not
 * something invented.
 *
 * Without `progress` the rail is static decoration with an entrance wipe.
 *
 * Motion rule (section 17 issue 5 asked for exactly one): 600ms, ease-out, no
 * bounce, 120ms stagger. Under prefers-reduced-motion the entrance is dropped
 * and the progress fill stops being spring-smoothed — but it still tracks,
 * because progress is information, not decoration.
 */
const SEGMENTS = [
  { grow: 1, opacity: 1 },
  { grow: 0.75, opacity: 0.55 },
  { grow: 0.5, opacity: 0.3 },
];

// Each segment's slice of total scroll, proportional to its length.
const TOTAL_GROW = SEGMENTS.reduce((sum, s) => sum + s.grow, 0);
const RANGES = SEGMENTS.reduce((acc, segment) => {
  const start = acc.length ? acc[acc.length - 1].end : 0;
  acc.push({ start, end: start + segment.grow / TOTAL_GROW });
  return acc;
}, []);

/** One segment. Split out so useTransform is never called inside a loop. */
const ProgressSegment = ({ progress, grow, opacity, start, end }) => {
  const height = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <span
      className="relative w-full overflow-hidden"
      style={{ flexGrow: grow, background: "var(--ybz-edge)" }}
    >
      <motion.span
        className="absolute inset-x-0 top-0 block"
        style={{ height, opacity, background: "var(--ybz-accent-rule)" }}
      />
    </span>
  );
};

ProgressSegment.propTypes = {
  progress: PropTypes.object.isRequired,
  grow: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};

const StackRail = ({
  side = "left",
  className = "",
  animate = true,
  progress = false,
  fixed = false,
}) => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const tracked = reduceMotion ? scrollYProgress : smoothed;

  const position = fixed ? "fixed" : "absolute";

  return (
    <div
      aria-hidden="true"
      className={[
        position,
        "pointer-events-none inset-y-0 flex w-[6px] flex-col gap-1.5 py-8",
        side === "left" ? "left-0" : "right-0",
        fixed ? "z-40" : "",
        className,
      ].join(" ")}
    >
      {SEGMENTS.map((segment, index) =>
        progress ? (
          <ProgressSegment
            key={segment.opacity}
            progress={tracked}
            grow={segment.grow}
            opacity={segment.opacity}
            start={RANGES[index].start}
            end={RANGES[index].end}
          />
        ) : (
          <span
            key={segment.opacity}
            className="w-full"
            style={{
              flexGrow: segment.grow,
              background: "var(--ybz-accent-rule)",
              opacity: segment.opacity,
              transformOrigin: "top",
              animation:
                animate && !reduceMotion
                  ? `ybz-rail-fill .6s cubic-bezier(0,0,.2,1) ${index * 0.12}s both`
                  : undefined,
            }}
          />
        )
      )}
    </div>
  );
};

StackRail.propTypes = {
  side: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  animate: PropTypes.bool,
  /** Fill segments with scroll depth — section 5's swipe-progress behaviour. */
  progress: PropTypes.bool,
  /** Pin to the viewport rather than the containing section. */
  fixed: PropTypes.bool,
};

export default StackRail;
