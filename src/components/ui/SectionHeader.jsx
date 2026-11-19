import PropTypes from "prop-types";
import GoldRule from "../GoldRule";

/**
 * Eyebrow, Playfair heading, gold rule, optional lede — BRAND.md section 5's
 * headline composition, written once. `level={1}` is the page title size.
 * Spacing: 16 between eyebrow, title and rule; 40 to the content below.
 */
const SectionHeader = ({
  eyebrow,
  title,
  lede,
  level = 2,
  className = "",
  children,
}) => {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <header className={`mb-10 space-y-4 ${className}`}>
      {eyebrow && <p className="ybz-eyebrow">{eyebrow}</p>}
      <Heading
        className={`max-w-4xl ${level === 1 ? "ybz-display-1" : "ybz-display-2"}`}
      >
        {title}
      </Heading>
      <GoldRule />
      {lede && <p className="ybz-lede pt-2">{lede}</p>}
      {children}
    </header>
  );
};

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  lede: PropTypes.node,
  level: PropTypes.oneOf([1, 2]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeader;
