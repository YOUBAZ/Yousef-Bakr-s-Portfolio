import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";

/**
 * The top of every interior page. Same position, same size, same entrance on
 * every route, so moving between pages reads as one document. The page's one
 * load animation lives here. `actions` sit 32px under the lede. The grid ruler
 * (GridLines, rendered once in App) hangs above it from the header strip.
 */
const PageHeader = ({ eyebrow, title, lede, actions, children }) => (
  <section className="relative px-6 pb-12 pt-10 sm:px-10 lg:px-16">
    <div className="ybz-enter mx-auto max-w-6xl">
      <SectionHeader
        level={1}
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        className="mb-0"
      />
      {actions && (
        <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
      )}
      {children}
    </div>
  </section>
);

PageHeader.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  lede: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node,
};

export default PageHeader;
