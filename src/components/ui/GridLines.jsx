/**
 * The visible 12-column grid — brand-kit/BRAND.md section 6 — shown as a
 * ruler: a strip of column ticks hanging from the header strip's hairline, on
 * every page, aligned to the same max-w-6xl container and 24px gutters as the
 * content. It never runs into text, so nothing has to mask it, and it starts
 * exactly at the header's hairline. Hidden below md (index.css,
 * .ybz-gridlines), where twelve ticks in 390px would be noise.
 */
const GridLines = () => (
  <div aria-hidden="true" className="pointer-events-none px-6 sm:px-10 lg:px-16">
    <div className="ybz-gridlines mx-auto h-8 max-w-6xl">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  </div>
);

export default GridLines;
