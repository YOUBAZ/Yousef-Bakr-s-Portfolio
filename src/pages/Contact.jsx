import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
import { CONTACT_CHANNELS } from "../config/contact";
import { Card, PageHeader, Section, TextLink } from "../components/ui";

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
        title="Hiring, or have a project?"
        lede="Tell me about the role or the system. I read every message."
      />

      <Section className="pt-0">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* The form leads on small screens: it is the page's one action. */}
          <Card className="lg:order-2">
            <h2 className="ybz-title">Write to me</h2>
            <p className="ybz-body mt-2">
              For a role: the team, the stack and where it is based. For a
              project: what it does and where it is stuck.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>

          <div className="space-y-6 lg:order-1">
            <Card>
              <h2 className="ybz-title">If you are hiring</h2>
              <p className="ybz-body mt-3">
                The CV has the dates, the stack and the links. The case studies
                show how I work on a real system.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6">
                <TextLink to="/cv">CV</TextLink>
                <TextLink to="/projects">Case studies</TextLink>
              </div>
            </Card>

            <Card>
              <h2 className="ybz-title">If you have a project</h2>
              <p className="ybz-body mt-3">
                Production work in TypeScript, NestJS, Next.js and PostgreSQL:
                the API, the data model and the front end on top of it.
              </p>
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
