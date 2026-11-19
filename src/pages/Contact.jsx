import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
import { CONTACT_CHANNELS, COLLABORATION_NOTES } from "../config/contact";
import { Card, PageHeader, Section } from "../components/ui";

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

      <PageHeader
        eyebrow="Contact"
        title="Which boundary in your system is leaking right now?"
        lede="Describe the decision rather than the ticket. I reply with a read on the trade-off, what it will cost either way, and whether I am the right person for it."
      />

      <Section className="pt-0">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* The form leads on small screens: it is the page's one action. */}
          <Card className="lg:order-2">
            <h2 className="ybz-title">Project details</h2>
            <p className="ybz-body mt-2">
              Timeline, the decision you are weighing, and what you have ruled
              out already.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>

          <div className="space-y-6 lg:order-1">
            <Card>
              <h2 className="ybz-title">Good fit</h2>
              <ul className="ybz-body mt-4 space-y-3">
                {COLLABORATION_NOTES.map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-4 shrink-0"
                      style={{ background: "var(--ybz-muted)" }}
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </Card>

            <ul className="grid gap-4">
              {CONTACT_CHANNELS.map((item) => {
                const Icon = item.icon;
                const external = item.href.startsWith("http");
                return (
                  <li key={item.label}>
                    <Card
                      as="a"
                      interactive
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4"
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="shrink-0 text-muted"
                      />
                      <div className="min-w-0">
                        <p className="ybz-meta">{item.label}</p>
                        <p className="mt-1 break-all font-mono text-sm text-bone">
                          {item.value}
                        </p>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;
