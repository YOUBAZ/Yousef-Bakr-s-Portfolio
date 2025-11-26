/**
 * Validates required environment variables
 * @param {string[]} requiredVars - Array of required environment variable names
 * @throws {Error} If any required variable is missing
 */
export const validateEnvVars = (requiredVars) => {
    const missing = requiredVars.filter(
        (varName) => !import.meta.env[varName]
    );

    if (missing.length > 0) {
        console.warn(
            `⚠️  Missing environment variables: ${missing.join(", ")}\n` +
            `Please check your .env file and ensure all required variables are set.\n` +
            `See .env.example for reference.`
        );
    }
};

/**
 * Checks if EmailJS is properly configured
 * @returns {boolean} True if all EmailJS variables are present
 */
export const isEmailJSConfigured = () => {
    return !!(
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
};
