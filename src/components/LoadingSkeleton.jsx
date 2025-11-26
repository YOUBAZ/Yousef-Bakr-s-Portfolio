import PropTypes from "prop-types";

/**
 * Reusable loading skeleton component
 * @param {Object} props - Component props
 * @param {string} props.variant - Skeleton variant: "card", "list", "text", "circle"
 * @param {number} props.count - Number of skeleton items to display
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSkeleton = ({ variant = "card", count = 1, className = "" }) => {
    const skeletons = Array.from({ length: count });

    const renderSkeleton = () => {
        switch (variant) {
            case "card":
                return (
                    <div
                        className={`bg-slate-800 rounded-xl overflow-hidden animate-pulse ${className}`}
                    >
                        <div className="h-48 bg-slate-700" />
                        <div className="p-6 space-y-3">
                            <div className="h-4 bg-slate-700 rounded w-3/4" />
                            <div className="h-3 bg-slate-700 rounded w-full" />
                            <div className="h-3 bg-slate-700 rounded w-5/6" />
                        </div>
                    </div>
                );

            case "list":
                return (
                    <div
                        className={`flex items-center gap-4 p-4 bg-slate-800 rounded-lg animate-pulse ${className}`}
                    >
                        <div className="w-12 h-12 bg-slate-700 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-700 rounded w-1/2" />
                            <div className="h-3 bg-slate-700 rounded w-3/4" />
                        </div>
                    </div>
                );

            case "text":
                return (
                    <div className={`space-y-2 animate-pulse ${className}`}>
                        <div className="h-4 bg-slate-700 rounded w-full" />
                        <div className="h-4 bg-slate-700 rounded w-5/6" />
                        <div className="h-4 bg-slate-700 rounded w-4/5" />
                    </div>
                );

            case "circle":
                return (
                    <div
                        className={`w-12 h-12 bg-slate-700 rounded-full animate-pulse ${className}`}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <>
            {skeletons.map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </>
    );
};

LoadingSkeleton.propTypes = {
    variant: PropTypes.oneOf(["card", "list", "text", "circle"]),
    count: PropTypes.number,
    className: PropTypes.string,
};

LoadingSkeleton.defaultProps = {
    variant: "card",
    count: 1,
    className: "",
};

export default LoadingSkeleton;
