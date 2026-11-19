import PropTypes from "prop-types";

/**
 * A page band. Owns the gutter, the vertical rhythm and the content width, so
 * no page sets its own. `tone="raised"` is the obsidian alternate band with a
 * hairline above it — use it to separate, never twice in a row.
 */
const Section = ({
  tone = "base",
  width = "page",
  className = "",
  innerClassName = "",
  children,
  ...rest
}) => (
  <section
    className={[
      "px-6 py-20 sm:px-10 lg:px-16",
      tone === "raised" ? "border-y border-edge bg-obsidian" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    <div
      className={[
        "mx-auto",
        width === "read" ? "max-w-3xl" : "max-w-6xl",
        innerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  </section>
);

Section.propTypes = {
  tone: PropTypes.oneOf(["base", "raised"]),
  width: PropTypes.oneOf(["page", "read"]),
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
