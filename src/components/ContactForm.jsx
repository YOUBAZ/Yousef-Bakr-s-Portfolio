import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AlertCircle, Check } from "lucide-react";
import emailConfig from "../config/email";
import { BRAND } from "../config/brand";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        formData,
        emailConfig.publicKey
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "mt-2 block w-full border border-edge bg-ink p-3 text-bone placeholder:text-muted focus:border-hairline focus:outline-none";
  const fieldStyle = { borderRadius: "var(--ybz-r-sm)" };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="ybz-eyebrow">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={fieldClass}
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="email" className="ybz-eyebrow">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={fieldClass}
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="message" className="ybz-eyebrow">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className={fieldClass}
          style={fieldStyle}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="ybz-btn-primary w-full justify-center disabled:opacity-50"
      >
        {isSubmitting ? "Sending" : "Send"}
      </button>

      {/* Section 3.5 rule 1 has no red and no green. State is carried by an
          icon and the wording, not by a colour outside the palette. */}
      {submitStatus === "success" && (
        <div className="flex items-start gap-3 text-sm leading-7 text-bone">
          <Check
            size={18}
            className="mt-1 shrink-0"
            style={{ color: "var(--ybz-accent-type)" }}
          />
          Sent. I read every one of these and reply to the ones I can be useful
          on.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-start gap-3 text-sm leading-7 text-muted">
          <AlertCircle size={18} className="mt-1 shrink-0" />
          That did not send. Try again, or email me directly at{" "}
          <a
            href={`mailto:${BRAND.email}`}
            className="text-[var(--ybz-accent-type)] underline underline-offset-4"
          >
            {BRAND.email}
          </a>
          .
        </div>
      )}
    </form>
  );
};

export default ContactForm;
