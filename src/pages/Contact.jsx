import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import ContactForm from "../components/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "youbakrzaki@gmail.com",
    href: "mailto:youbakrzaki@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+20 (111) 284 9384",
    href: "tel:+201112849384",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Based in Egypt · Remote worldwide",
  },
];

const collaborationNotes = [
  "Motion-first marketing site collaborations",
  "Product teams shipping dashboards or platforms",
  "Design system audits and component libraries",
  "Consulting on performance, DX, and WebGL storytelling",
];

const Contact = () => {
  return (
    <div className="bg-slate-950 text-white">
      <section className="px-6 pt-12 pb-12 sm:px-10 lg:px-16">
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-900/40 lg:grid-cols-[1fr,1fr] lg:p-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300">
              <Sparkles size={16} />
              Contact
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Have a question or need a fast reply?
            </h1>
            <p className="text-slate-300">
              This inbox is for general inquiries, quick collaboration checks,
              press, or speaker requests. For detailed project kickoffs or
              availability, head to the Let&apos;s Talk page to book a slot.
            </p>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Collaboration fit
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {collaborationNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-white">Project details</h2>
            <p className="mt-2 text-sm text-slate-300">
              Share your timeline, goals, and preferred stack. I&apos;ll reply with
              availability and a plan.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-white/10 p-2 text-sky-300">
                    <Icon size={18} />
                  </span>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {item.label}
                  </p>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-4 block text-lg font-semibold text-white hover:text-sky-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-4 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;
