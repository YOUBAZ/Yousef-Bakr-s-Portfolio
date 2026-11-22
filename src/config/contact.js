import { Github, Linkedin, Mail } from "lucide-react";
import { BRAND } from "./brand";

/**
 * Contact channels, call windows and the kind of work worth writing about.
 * The Contact page is the one way in; /lets-talk redirects to it.
 *
 * The phone number is deliberately absent: brand.json marks it "Business card
 * only". The location is absent too — section 1 keeps it to the structured
 * homeLocation field in seo.js.
 */
export const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: BRAND.linkedin,
    href: BRAND.linkedinUrl,
  },
  {
    icon: Github,
    label: "GitHub",
    value: BRAND.github.replace(/^https?:\/\//, ""),
    href: BRAND.github,
  },
];

// Section 8: name the shape of the work, not a list of technologies.
export const COLLABORATION_NOTES = [
  "A second opinion on an architecture call you are unsure about",
  "A boundary that is leaking — service seams, data ownership, or state that drifted to the client",
  "API design and migrations where the rollback plan matters more than the rewrite",
  "Production work on TypeScript, NestJS, Next.js and PostgreSQL systems",
];

/** Call windows, in GMT. Shown on the Contact page next to the form. */
export const AVAILABILITY = [
  { day: "Monday", slots: "09:00 – 13:00" },
  { day: "Tuesday", slots: "09:00 – 13:00" },
  { day: "Wednesday", slots: "09:00 – 13:00" },
  { day: "Thursday", slots: "09:00 – 13:00" },
  { day: "Friday", slots: "On request" },
];
