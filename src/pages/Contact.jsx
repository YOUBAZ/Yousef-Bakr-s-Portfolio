import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import StackRail from "../components/StackRail";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";

const _motion = motion;

/**
 * The phone number is deliberately absent. brand.json marks it
 * "Business card only. Never on a banner, OG card or signature." The location
 * line is gone for the same class of reason — section 1 keeps it private and
 * lets the structured homeLocation field in seo.js carry it instead.
 */
const contactInfo = [
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
    value: "github.com/YOUBAZ",
    href: BRAND.github,
  },
];

// Section 8: name the shape of the work, not a list of technologies.
const collaborationNotes = [
  "A second opinion on an architecture call you are unsure about",
  "A boundary that is leaking — service seams, data ownership, or state that drifted to the client",
  "API design and migrations where the rollback plan matters more than the rewrite",
  "Production work on TypeScript, NestJS, Next.js and PostgreSQL systems",
];

const Contact = () => {
  const contactSchema = [
    {
      "@type": "ContactPage",
      "@id": `${siteMeta.siteUrl}/contact`,
      url: `${siteMeta.siteUrl}/contact`,
      name: `Contact ${BRAND.name}`,
      description: `Direct line to ${BRAND.name}, ${BRAND.role}.`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "business",
          email: BRAND.email,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Arabic"],
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteMeta.siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: `${siteMeta.siteUrl}/contact`,
        },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="Contact"
        description="If you lead a team and want a second opinion on an architecture call, my inbox is open."
        keywords={["contact", "software engineer", "architecture review"]}
        url="/contact"
        schema={contactSchema}
      />
      <div className="bg-ink text-slate-body">
        <section className="relative isolate overflow-hidden px-6 pb-12 pt-12 sm:px-10 lg:px-16">
          <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />
          <StackRail className="left-2 sm:left-4 lg:left-6" />

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              <p className="ybz-eyebrow">Contact</p>
              <h1 className="max-w-2xl font-display text-4xl leading-tight text-bone sm:text-5xl">
                Which boundary in your system is leaking right now?
              </h1>
              <hr className="ybz-rule" />
              <p className="max-w-xl leading-8">
                Describe the decision rather than the ticket. I reply with a
                read on the trade-off, what it will cost either way, and whether
                I am the right person for it.
              </p>

              <div className="ybz-card p-6">
                <p className="ybz-eyebrow">Good fit</p>
                <ul className="mt-4 space-y-3 text-sm leading-7">
                  {collaborationNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span
                        className="mt-2.5 h-px w-4 shrink-0"
                        style={{ background: "var(--ybz-accent-rule)" }}
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="ybz-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            >
              <h2 className="font-display text-xl text-bone">
                Project details
              </h2>
              <p className="mt-2 text-sm leading-7">
                Timeline, the decision you are weighing, and what you have ruled
                out already.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="ybz-card ybz-card-interactive block p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      style={{ color: "var(--ybz-accent-type)" }}
                    />
                    <p className="ybz-eyebrow">{item.label}</p>
                  </div>
                  <p className="mt-4 break-all font-mono text-sm text-bone">
                    {item.value}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
