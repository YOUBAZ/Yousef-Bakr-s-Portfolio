import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import schedulingConfig from "../config/scheduling";
import Seo from "../components/Seo";
import StackRail from "../components/StackRail";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";

const _motion = motion;

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

const collaborationNotes = [
  "A second opinion on an architecture call you are unsure about",
  "A boundary that is leaking — service seams, data ownership, or state that drifted to the client",
  "API design and migrations where the rollback plan matters more than the rewrite",
  "Production work on TypeScript, NestJS, Next.js and PostgreSQL systems",
];

const availability = [
  { day: "Monday", slots: "09:00 — 13:00 GMT" },
  { day: "Tuesday", slots: "09:00 — 13:00 GMT" },
  { day: "Wednesday", slots: "09:00 — 13:00 GMT" },
  { day: "Thursday", slots: "09:00 — 13:00 GMT" },
  { day: "Friday", slots: "On request" },
];

const LetsTalk = () => {
  const bookingUrl = schedulingConfig.bookingUrl;
  const bookingSchema = [
    {
      "@type": "WebPage",
      "@id": `${siteMeta.siteUrl}/lets-talk`,
      url: `${siteMeta.siteUrl}/lets-talk`,
      name: `Book a call with ${BRAND.name}`,
      description:
        "Schedule a call to discuss an architecture decision, a boundary that is leaking, or a migration you are weighing.",
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
        {
          "@type": "ListItem",
          position: 3,
          name: "Let's talk",
          item: `${siteMeta.siteUrl}/lets-talk`,
        },
      ],
    },
    {
      "@type": "Service",
      name: "Architecture review call",
      areaServed: "Worldwide",
      provider: {
        "@type": "Person",
        name: BRAND.name,
      },
      availableChannel: {
        "@type": "ServiceChannel",
        availableLanguage: ["English", "Arabic"],
        serviceUrl: `${siteMeta.siteUrl}/lets-talk`,
      },
    },
  ];

  return (
    <>
      <Seo
        title="Let's talk"
        description="Book a call to discuss an architecture decision, a boundary that is leaking, or a migration you are weighing."
        keywords={[
          "book a call",
          "architecture review",
          "system design consultation",
        ]}
        url="/lets-talk"
        schema={bookingSchema}
      />
      <div className="bg-ink text-slate-body">
        <section className="relative isolate overflow-hidden px-6 pb-12 pt-16 sm:px-10 lg:px-16">
          <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />
          <StackRail className="left-2 sm:left-4 lg:left-6" />

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              <p className="ybz-eyebrow">Let&apos;s talk</p>
              <h1 className="max-w-2xl font-display text-4xl leading-tight text-bone sm:text-5xl">
                Pick a slot. Bring the decision, not the ticket.
              </h1>
              <hr className="ybz-rule" />
              <p className="max-w-xl leading-8">
                The scheduler handles time zones and sends the invite once
                confirmed. Come with the constraint you are working against and
                what you have already ruled out — that is where the useful part
                of the conversation starts.
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
                Weekly availability
              </h2>
              <p className="ybz-meta mt-2 normal-case tracking-normal">
                All hours in GMT
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {availability.map((slot) => (
                  <div
                    key={slot.day}
                    className="border border-edge p-3"
                    style={{ borderRadius: "var(--ybz-r-sm)" }}
                  >
                    <p className="ybz-eyebrow">{slot.day}</p>
                    <p className="ybz-figure mt-2 text-sm">{slot.slots}</p>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 border border-edge p-2"
                style={{ borderRadius: "var(--ybz-r-md)" }}
              >
                {bookingUrl ? (
                  <iframe
                    title="Schedule a call"
                    src={bookingUrl}
                    className="h-[540px] w-full border-0"
                    style={{ borderRadius: "var(--ybz-r-sm)" }}
                    loading="lazy"
                  />
                ) : (
                  <div className="border border-dashed border-edge p-6 text-sm leading-7">
                    Set <code className="font-mono">VITE_SCHEDULER_URL</code> in
                    your .env to embed the booking widget. Until then, use the{" "}
                    <Link
                      to="/contact"
                      className="text-[var(--ybz-accent-type)] underline underline-offset-4"
                    >
                      contact form
                    </Link>{" "}
                    to request a time.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-10 lg:px-16">
          <div className="ybz-card mx-auto max-w-6xl p-6">
            <p className="ybz-eyebrow">Another time</p>
            <p className="mt-3 text-sm leading-7">
              If none of the windows work, or you need to coordinate under NDA,
              message me through the{" "}
              <Link
                to="/contact"
                className="text-[var(--ybz-accent-type)] underline underline-offset-4"
              >
                contact page
              </Link>{" "}
              and I will propose alternatives.
            </p>
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

export default LetsTalk;
