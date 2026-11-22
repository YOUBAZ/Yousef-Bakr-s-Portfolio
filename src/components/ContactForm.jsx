import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import emailConfig from "../config/email";
import { BRAND } from "../config/brand";
import { Button } from "./ui";

/* Who is writing, so a recruiter has a path as clear as a client's. The choice
   is prefixed onto the message, so the email template needs no new field. */
const TOPICS = ["Hiring", "A project", "Something else"];

const ContactForm = () => {
  const [topic, setTopic] = useState(TOPICS[0]);
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
        { ...formData, message: `[${topic}] ${formData.message}` },
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

  const labelClass = "block text-sm font-medium text-bone";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset className="space-y-2">
        <legend className={labelClass}>What is this about?</legend>
        <div className="flex flex-wrap gap-2 pt-1">
          {TOPICS.map((t) => (
            <label
              key={t}
              className="ybz-chip cursor-pointer has-[:checked]:border-[var(--ybz-bone)] has-[:checked]:bg-card has-[:checked]:text-bone has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--ybz-accent-rule)]"
            >
              <input
                type="radio"
                name="topic"
                value={t}
                checked={topic === t}
                onChange={() => setTopic(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="ybz-input"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="ybz-input"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="ybz-input resize-y"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        icon={isSubmitting ? Loader2 : Send}
        className={`w-full ${isSubmitting ? "[&>svg]:animate-spin" : ""}`}
      >
        {isSubmitting ? "Sending" : "Send"}
      </Button>

      {/* Section 3.5 rule 1 has no red and no green. State is carried by an
          icon and the wording, not by a colour outside the palette. */}
      <div aria-live="polite">
        {submitStatus === "success" && (
          <p className="flex items-start gap-3 text-sm leading-6 text-bone">
            <Check
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-1 shrink-0 text-accent"
            />
            <span>
              Sent. I read every one of these and reply to the ones I can be
              useful on.
            </span>
          </p>
        )}

        {submitStatus === "error" && (
          <p
            role="alert"
            className="flex items-start gap-3 text-sm leading-6 text-accent"
          >
            <AlertCircle
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-1 shrink-0"
            />
            <span>
              That did not send. Try again, or email me directly at{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="underline underline-offset-4"
              >
                {BRAND.email}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
