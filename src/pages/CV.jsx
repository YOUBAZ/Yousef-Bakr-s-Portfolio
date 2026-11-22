import { Download, ExternalLink } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
import {
  experienceTimeline,
  leadershipRoles,
  volunteering,
} from "../data/experience";
import RoleList from "../components/RoleList";
import CertificatesSection from "../components/CertificatesSection";
import {
  Button,
  PageHeader,
  Section,
  SectionHeader,
  TextLink,
} from "../components/ui";

const pdfSrc = "/images/CV/Yousef-Bakr-CV.pdf";
/* Page renders written by `npm run cv:build`. Update the count if the CV's
   length changes; the build prints it. */
const cvPages = ["/images/CV/page-1.png", "/images/CV/page-2.png"];
const pad = (n) => String(n).padStart(2, "0");

/**
 * This page used to assert "40+ product launches", a cloud-architect title,
 * team leadership, and an appendix of KPI snapshots and compliance workflows.
 * None of it had a source, and section 8 does not allow a claim the reader
 * cannot check. The PDF is the evidence; the page's job is to hand it over,
 * not to summarise it more generously than it reads.
 */
const inside = [
  "Experience, with the product and the scope of each role",
  "Projects, including SafeStay and EduShift AI",
  "The stack, named where it is a detail rather than a claim",
  "Certifications, each linked to its issuer",
];

const Cv = () => {
  const resumeSchema = [
    {
      "@type": "DigitalDocument",
      "@id": `${siteMeta.siteUrl}/cv`,
      url: `${siteMeta.siteUrl}/cv`,
      name: `CV — ${BRAND.name}`,
      description: `Curriculum vitae for ${BRAND.name}, ${BRAND.role}.`,
      potentialAction: [
        {
          "@type": "ViewAction",
          target: [`${siteMeta.siteUrl}${pdfSrc}`],
        },
        {
          "@type": "DownloadAction",
          target: [`${siteMeta.siteUrl}${pdfSrc}`],
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
          name: "CV",
          item: `${siteMeta.siteUrl}/cv`,
        },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="CV"
        description={`Curriculum vitae for ${BRAND.name}, ${BRAND.role}. View in the browser or download the PDF.`}
        keywords={["CV", "resume", "software engineer"]}
        url="/cv"
        schema={resumeSchema}
      />

      <PageHeader
        eyebrow="CV"
        title="The record, without the adjectives."
        lede="Two pages. Read it in the browser or take the PDF into a review. Anything in it that needs a source has one."
        actions={
          <>
            <Button href={pdfSrc} download icon={Download} iconPosition="start">
              Download PDF
            </Button>
            <Button
              href={pdfSrc}
              variant="secondary"
              icon={ExternalLink}
              iconPosition="start"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in a new tab
            </Button>
          </>
        }
      />

      {/* What the PDF holds, set as three ruled columns rather than cards. */}
      <Section tone="raised">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4 border-t border-edge pt-6">
            <p className="ybz-eyebrow">What&apos;s inside</p>
            <ul className="ybz-body space-y-3">
              {inside.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-3 h-px w-4 shrink-0"
                    style={{ background: "var(--ybz-muted)" }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-edge pt-6">
            <RoleList eyebrow="Experience" roles={experienceTimeline} compact />
          </div>

          <div className="space-y-8 border-t border-edge pt-6">
            <RoleList
              eyebrow="Leadership and community"
              roles={leadershipRoles}
              compact
            />
            <RoleList eyebrow="Volunteering" roles={volunteering} compact />
          </div>
        </div>
      </Section>

      {/* The CV's own pages, rendered by scripts/build-cv.mjs, side by side on
          the page grid. No browser PDF viewer: its toolbar is a block of
          someone else's chrome in the middle of the page. */}
      <Section>
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
          {cvPages.map((src, i) => (
            <figure key={src} className="md:col-span-6">
              <a
                href={pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-mid transition-colors duration-150 hover:border-bone"
              >
                <img
                  src={src}
                  alt={`${BRAND.name} CV, page ${i + 1} of ${cvPages.length}`}
                  width="992"
                  height="1404"
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </a>
              <figcaption className="ybz-meta mt-3">
                Page {pad(i + 1)} of {pad(cvPages.length)}
              </figcaption>
            </figure>
          ))}
        </div>
        <TextLink href={pdfSrc} className="mt-8">
          Open the PDF
        </TextLink>
      </Section>

      <CertificatesSection tone="raised" />

      <Section>
        <SectionHeader
          eyebrow="Next"
          title="If the CV raises a question, ask it directly."
          lede="The interesting part of a CV is usually the decision behind a line on it, and that does not fit in a bullet."
        />
        <Button to="/contact">Contact</Button>
      </Section>
    </>
  );
};

export default Cv;
