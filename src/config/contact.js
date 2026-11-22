import { Github, Linkedin, Mail } from "lucide-react";
import { BRAND } from "./brand";

/**
 * Contact channels.
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
