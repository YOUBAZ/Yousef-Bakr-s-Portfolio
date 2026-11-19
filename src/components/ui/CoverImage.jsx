import PropTypes from "prop-types";

/**
 * A generated cover (brand-kit/tools/build_covers.py) in the active theme.
 *
 * The generator writes `<name>.png` for light and `<name>-dark.png` for dark.
 * Both are rendered and CSS hides the one for the other theme (index.css,
 * .ybz-only-light / .ybz-only-dark). Both are lazy, and a hidden lazy image is
 * never fetched, so a visitor downloads one cover, not two.
 *
 * Any other image (a screenshot, a third-party logo) renders once, unchanged.
 */
const GENERATED = /^\/images\/(blog|projects)\/[^/]+(?<!-dark)\.png$/;

const CoverImage = ({ src, alt, className = "", fallback }) => {
  const onError = fallback
    ? (e) => {
        if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
      }
    : undefined;

  if (!GENERATED.test(src)) {
    return <img src={src} alt={alt} className={className} loading="lazy" onError={onError} />;
  }

  const dark = src.replace(/\.png$/, "-dark.png");
  const darkFallback = fallback?.replace(/\.png$/, "-dark.png");

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`ybz-only-light ${className}`}
        loading="lazy"
        onError={onError}
      />
      <img
        src={dark}
        alt={alt}
        className={`ybz-only-dark ${className}`}
        loading="lazy"
        onError={
          darkFallback
            ? (e) => {
                if (!e.currentTarget.src.endsWith(darkFallback))
                  e.currentTarget.src = darkFallback;
              }
            : undefined
        }
      />
    </>
  );
};

CoverImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  /** Light-theme fallback path; its -dark twin is used in dark mode. */
  fallback: PropTypes.string,
};

export default CoverImage;
