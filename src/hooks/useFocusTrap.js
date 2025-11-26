import { useEffect, useRef } from "react";

/**
 * Custom hook to trap focus within a container
 * Used for modals, mobile menus, and other overlay components
 * @param {boolean} isActive - Whether the focus trap is active
 * @returns {React.RefObject} Ref to attach to the container element
 */
const useFocusTrap = (isActive) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const container = containerRef.current;
        if (!container) return;

        // Get all focusable elements
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element when trap activates
        firstElement?.focus();

        const handleTabKey = (e) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                // The parent component should handle closing logic
                // We dispatch a custom event that parent can listen to
                container.dispatchEvent(new CustomEvent("escape-trap"));
            }
        };

        container.addEventListener("keydown", handleTabKey);
        container.addEventListener("keydown", handleEscapeKey);

        return () => {
            container.removeEventListener("keydown", handleTabKey);
            container.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isActive]);

    return containerRef;
};

export default useFocusTrap;
