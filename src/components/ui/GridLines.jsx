/**
 * The visible 12-column grid — brand-kit/BRAND.md section 6. Hairlines behind a
 * hero, aligned to the same max-w-6xl container and gutters as the content, so
 * every column of text visibly starts on a line. The parent must be
 * `relative isolate`. Hidden below md (index.css, .ybz-gridlines).
 */
const GridLines = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 px-6 sm:px-10 lg:px-16"
  >
    <div className="ybz-gridlines mx-auto max-w-6xl">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  </div>
);

export default GridLines;
