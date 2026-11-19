import PropTypes from "prop-types";

/**
 * The raised panel. 4px radius, hairline edge, flat surface. `interactive`
 * steps the border to ink on hover — no lift.
 * `padded={false}` for cards that open with a full-bleed frame.
 */
const Card = ({
  as = "div",
  interactive = false,
  padded = true,
  className = "",
  children,
  ...rest
}) => {
  const Tag = as;
  return (
    <Tag
      className={[
        "ybz-card",
        interactive ? "ybz-card-interactive" : "",
        padded ? "p-6" : "overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Card.propTypes = {
  as: PropTypes.elementType,
  interactive: PropTypes.bool,
  padded: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
