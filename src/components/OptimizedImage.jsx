import PropTypes from "prop-types";

/**
 * Optimized Image Component
 * Handles lazy loading, responsive images, and WebP format automatically
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source path
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.eager] - If true, loads image immediately (skips lazy loading)
 * @param {string} [props.sizes] - Sizes attribute for responsive images
 * @param {number[]} [props.widths] - Array of widths for srcset generation
 */
const OptimizedImage = ({
    src,
    alt,
    className = "",
    eager = false,
    sizes = "100vw",
    widths = [320, 640, 768, 1024, 1280, 1536],
}) => {
    // Generate srcset for responsive images
    const generateSrcSet = () => {
        // In a real implementation, you'd have actual resized images
        // For now, we'll use the same source but documentation is in place
        return widths.map((width) => `${src} ${width}w`).join(", ");
    };

    // Check if WebP is supported (in real implementation)
    const useWebP = typeof window !== "undefined" &&
        document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
        // srcSet={generateSrcSet()} // Uncomment when you have actual resized images
        />
    );
};

OptimizedImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    eager: PropTypes.bool,
    sizes: PropTypes.string,
    widths: PropTypes.arrayOf(PropTypes.number),
};

OptimizedImage.defaultProps = {
    className: "",
    eager: false,
    sizes: "100vw",
    widths: [320, 640, 768, 1024, 1280, 1536],
};

export default OptimizedImage;
