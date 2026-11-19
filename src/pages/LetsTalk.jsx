import schedulingConfig from "../config/scheduling";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
import { CONTACT_CHANNELS, COLLABORATION_NOTES } from "../config/contact";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button, Card, PageHeader, Section, TextLink } from "../components/ui";

const availability = [
  { day: "Monday", slots: "09:00 — 13:00 GMT" },
  { day: "Tuesday", slots: "09:00 — 13:00 GMT" },
  { day: "Wednesday", slots: "09:00 — 13:00 GMT" },
  { day: "Thursday", slots: "09:00 — 13:00 GMT" },
  { day: "Friday", slots: "On request" },
];

const LetsTalk = () => {
  const bookingUrl = schedulingConfig.bookingUrl;

  // Setup hint for the developer only. Visitors never see configuration text.
  if (!bookingUrl && import.meta.env.DEV) {
    console.warn("LetsTalk: set VITE_SCHEDULER_URL to embed the booking widget.");
  }
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

      <PageHeader
        eyebrow="Let's talk"
        title="Pick a slot. Bring the decision, not the ticket."
        lede={
          bookingUrl
            ? "The scheduler handles time zones and sends the invite once confirmed. Come with the constraint you are working against and what you have already ruled out — that is where the useful part of the conversation starts."
            : "Pick a window below and request it. I confirm by email with an invite. Come with the constraint you are working against and what you have already ruled out — that is where the useful part of the conversation starts."
        }
      />

      <Section className="pt-0" innerClassName="space-y-6">
        <div className="grid items-start gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-6">
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

            <Card>
              <h2 className="ybz-title">Another time</h2>
              <p className="ybz-body mt-3">
                If none of the windows work, or you need to coordinate under
                NDA, message me through the{" "}
                <TextLink to="/contact" arrow={false}>
                  contact page
                </TextLink>{" "}
                and I will propose alternatives.
              </p>
            </Card>
          </div>

          <Card>
            <h2 className="ybz-title">Weekly availability</h2>
            <p className="ybz-source mt-1">All hours in GMT</p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {availability.map((slot) => (
                <div
                  key={slot.day}
                  className="ybz-inset p-3"
                  style={{ borderRadius: "var(--ybz-r-sm)" }}
                >
                  <dt className="ybz-meta">{slot.day}</dt>
                  <dd className="mt-1 font-mono text-sm text-bone tabular-nums">
                    {slot.slots}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="ybz-inset mt-6 p-2"
              style={{ borderRadius: "var(--ybz-r-md)" }}
            >
              {bookingUrl ? (
                <iframe
                  title="Schedule a call"
                  src={bookingUrl}
                  className="h-136 w-full border-0"
                  style={{ borderRadius: "var(--ybz-r-sm)" }}
                  loading="lazy"
                />
              ) : (
                <div className="space-y-4 p-4">
                  <p className="ybz-body">
                    Send the window that suits you and one line on the decision.
                    I confirm by email with a calendar invite.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button to="/contact" icon={ArrowUpRight}>
                      Request a time
                    </Button>
                    <Button
                      href={`mailto:${BRAND.email}?subject=Call%20request`}
                      variant="secondary"
                      icon={Mail}
                      iconPosition="start"
                    >
                      Email instead
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <ul className="grid gap-6 lg:grid-cols-3">
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
                  className="flex h-full items-center gap-4"
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
      </Section>
    </>
  );
};

export default LetsTalk;
