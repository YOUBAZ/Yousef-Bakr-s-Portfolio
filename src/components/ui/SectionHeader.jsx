import PropTypes from "prop-types";
import GoldRule from "../GoldRule";

/**
 * brand-kit/BRAND.md section 6's headline composition, written once.
 *
 * level 1 (page title): label, display heading, the signal headline marker.
 * level 2 (section): the section strip — a page-counted number, the label, a
 * hairline to the margin and an optional mono margin note — then the heading.
 * Sections carry no signal marker: one per page, under the page title, keeps
 * the signal meaning something.
 */
const SectionHeader = ({
  eyebrow,
  title,
  lede,
  note,
  level = 2,
  className = "",
  children,
}) => {
  if (level === 1) {
    return (
      <header className={`mb-10 space-y-4 ${className}`}>
        {eyebrow && <p className="ybz-eyebrow">{eyebrow}</p>}
        <h1 className="ybz-display-1 max-w-4xl">{title}</h1>
        <GoldRule />
        {lede && <p className="ybz-lede pt-2">{lede}</p>}
        {children}
      </header>
    );
  }

  return (
    <header className={`mb-10 space-y-5 ${className}`}>
      <p className="ybz-section-strip">
        <span className="ybz-section-strip__num" aria-hidden="true" />
        {eyebrow && <span>{eyebrow}</span>}
        <span className="ybz-section-strip__line" aria-hidden="true" />
        {note && <span className="ybz-section-strip__note">{note}</span>}
      </p>
      <h2 className="ybz-display-2 max-w-4xl">{title}</h2>
      {lede && <p className="ybz-lede">{lede}</p>}
      {children}
    </header>
  );
};

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  lede: PropTypes.node,
  /** A mono margin note at the right end of the section strip. */
  note: PropTypes.node,
  level: PropTypes.oneOf([1, 2]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeader;
