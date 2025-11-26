/**
 * Date formatting utilities
 */

/**
 * Formats a date string to a readable format
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "en-US") => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        return "";
    }

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj);
};

/**
 * Format as relative time (e.g., "2 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    const units = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
        const count = Math.floor(diffInSeconds / unit.seconds);
        if (count >= 1) {
            return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
};

/**
 * Number formatting utilities
 */

/**
 * Format a number with commas (1,000,000)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
    if (typeof num !== "number" || isNaN(num)) return "0";
    return new Intl.NumberFormat("en-US").format(num);
};

/**
 * Format a number to compact notation (1.2K, 1.5M)
 * @param {number} num - Number to format
 * @returns {string} Compact number string
 */
export const formatCompactNumber = (num) => {
    if (typeof num !== "number" || isNaN(num)) return "0";

    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    }).format(num);
};

/**
 * Format a number as percentage
 * @param {number} num - Number to format (0-1 range)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Percentage string
 */
export const formatPercentage = (num, decimals = 0) => {
    if (typeof num !== "number" || isNaN(num)) return "0%";

    return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(num);
};

/**
 * String utilities
 */

/**
 * Truncate text to a maximum length
  * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add when truncated
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = "...") => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + suffix;
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export const toTitleCase = (str) => {
    if (!str) return "";

    return str
        .toLowerCase()
        .split(" ")
        .map((word) => capitalize(word))
        .join(" ");
};

/**
 * Generate a slug from a string
 * @param {string} str - String to convert to slug
 * @returns {string} Slug string
 */
export const slugify = (str) => {
    if (!str) return "";

    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
