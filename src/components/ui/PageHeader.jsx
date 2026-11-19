import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";

/**
 * The top of every interior page. Same position, same size, same entrance on
 * every route, so moving between pages reads as one document. The page's one
 * load animation lives here. `actions` sit 32px under the lede.
 */
const PageHeader = ({ eyebrow, title, lede, actions, children }) => (
  <section className="relative isolate overflow-hidden px-6 pb-12 pt-16 sm:px-10 lg:px-16">
    <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />
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
