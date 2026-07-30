import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, ExternalLink } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { BRAND } from "../config/brand";
import { experienceTimeline } from "../data/experience";
import GoldRule from "../components/GoldRule";

const _motion = motion;

const pdfSrc = "/images/CV/Yousef-Bakr-CV.pdf";

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
      <div className="bg-ink text-slate-body">
        <section className="relative isolate overflow-hidden px-6 pb-12 pt-12 sm:px-10 lg:px-16">
          <div className="ybz-bloom pointer-events-none absolute inset-0 -z-10" />

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              <p className="ybz-eyebrow">CV</p>
              <h1 className="max-w-2xl font-display text-4xl leading-tight text-bone sm:text-5xl">
                The record, without the adjectives.
              </h1>
              <GoldRule />
              <p className="max-w-xl leading-8">
                Two pages. Read it in the browser or take the PDF into a review.
                Anything in it that needs a source has one.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href={pdfSrc} download className="ybz-btn-primary">
                  <Download size={18} />
                  Download PDF
                </a>
                <a
                  href={pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ybz-btn-ghost"
                >
                  <ExternalLink size={18} />
                  Open in a new tab
                </a>
              </div>
            </motion.div>

            <motion.div
              className="ybz-card space-y-5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            >
              <p className="ybz-eyebrow">What&apos;s inside</p>
              <ul className="space-y-3 text-sm leading-7">
                {inside.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2.5 h-px w-4 shrink-0"
                      style={{ background: "var(--ybz-accent-rule)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <GoldRule />

              <div className="space-y-4">
                <p className="ybz-eyebrow">Current</p>
                {experienceTimeline.map((entry) => (
                  <div key={entry.title}>
                    <p className="ybz-meta">{entry.period}</p>
                    <p className="mt-1 text-sm text-bone">{entry.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-10 lg:px-16">
          <motion.div
            className="ybz-card mx-auto max-w-6xl p-4 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            <object
              data={pdfSrc}
              type="application/pdf"
              className="h-[32rem] w-full"
              style={{ borderRadius: "var(--ybz-r-md)" }}
              aria-label={`${BRAND.name} CV preview`}
            >
              <div
                className="flex h-[32rem] w-full flex-col items-center justify-center gap-3 border border-dashed border-edge text-center text-sm"
                style={{ borderRadius: "var(--ybz-r-md)" }}
              >
                <p>This browser cannot preview PDFs inline.</p>
                <a
                  href={pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ybz-accent-type)] underline underline-offset-4"
                >
                  Open the CV in a new tab
                </a>
              </div>
            </object>
          </motion.div>
        </section>

        <section className="border-t border-edge bg-obsidian px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-5">
            <p className="ybz-eyebrow">Next</p>
            <h2 className="max-w-2xl font-display text-3xl text-bone">
              If the CV raises a question, ask it directly.
            </h2>
            <GoldRule />
            <p className="max-w-2xl leading-8">
              The interesting part of a CV is usually the decision behind a line
              on it, and that does not fit in a bullet.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="ybz-btn-primary">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cv;
