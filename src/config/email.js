const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
};

// Validate configuration in development
if (process.env.NODE_ENV === "development") {
  const missing = [];
  if (!emailConfig.serviceId) missing.push("VITE_EMAILJS_SERVICE_ID");
  if (!emailConfig.templateId) missing.push("VITE_EMAILJS_TEMPLATE_ID");
  if (!emailConfig.publicKey) missing.push("VITE_EMAILJS_PUBLIC_KEY");

  if (missing.length > 0) {
    console.warn(
      `⚠️  EmailJS Configuration Warning:\n` +
      `Missing environment variables: ${missing.join(", ")}\n` +
      `Contact form will not work until these are configured.\n` +
      `Please copy .env.example to .env and add your EmailJS credentials.`
    );
  }
}

export default emailConfig;
