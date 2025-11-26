/**
 * Animation constants and configuration
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
};

// Easing functions
export const EASING = {
    EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
    EASE_OUT: "cubic-bezier(0.0, 0, 0.2, 1)",
    EASE_IN: "cubic-bezier(0.4, 0, 1, 1)",
    SPRING: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// Framer Motion variants
export const FADE_IN_VARIANT = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

export const SCALE_IN_VARIANT = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    },
};

export const SLIDE_IN_LEFT_VARIANT = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export const SLIDE_IN_RIGHT_VARIANT = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export const STAGGER_CONTAINER_VARIANT = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const STAGGER_ITEM_VARIANT = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

/**
 * Application constants
 */

// Social media links
export const SOCIAL_LINKS = {
    GITHUB: "https://github.com/YOUBAZ",
    LINKEDIN: "https://www.linkedin.com/in/yousef-bakr/",
    FACEBOOK: "https://www.facebook.com/yousefbakrzaki/",
    EMAIL: "mailto:youbakrzaki@gmail.com",
};

// Contact information
export const CONTACT_INFO = {
    EMAIL: "youbakrzaki@gmail.com",
    LOCATION: "Cairo, Egypt",
    TIMEZONE: "Africa/Cairo",
};

// Navigation routes
export const ROUTES = {
    HOME: "/",
    PROJECTS: "/projects",
    CERTIFICATES: "/certificates",
    CV: "/cv",
    ABOUT: "/about",
    CONTACT: "/contact",
    LETS_TALK: "/lets-talk",
};

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
};

// Z-index layers
export const Z_INDEX = {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
};

/**
 * Validation constants
 */

// Email regex pattern
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number regex pattern (international)
export const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

// URL regex pattern
export const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
