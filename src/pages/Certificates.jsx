import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Maximize2, X } from "lucide-react";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { Button, Card, PageHeader, Section, TextLink } from "../components/ui";

/* The certificate image, on the surface mat. Issuer artwork arrives in every
   colour; the frame keeps it inside the page. */
const CertificateMedia = ({ certificate, onSelectImage }) => {
  if (certificate.type !== "image" || !certificate.image) {
    return null;
  }

  return (
    <div className="ybz-frame aspect-[4/3]">
      <img
        src={certificate.image}
        alt={certificate.title}
        className="p-4"
        loading="lazy"
      />
      <Button
        variant="secondary"
        size="sm"
        icon={Maximize2}
        iconPosition="start"
        onClick={() => onSelectImage?.()}
        className="absolute bottom-4 right-4 bg-ink"
        aria-label={`View ${certificate.title}`}
      >
        View
      </Button>
    </div>
  );
};

CertificateMedia.propTypes = {
  certificate: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func,
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCertificates = async () => {
      try {
        const res = await fetch("/data/certificates.json", {
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Unable to load certificates");
        const payload = await res.json();
        setCertificates(
          Array.isArray(payload.certificates) ? payload.certificates : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Unable to load certificates right now.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(certificates.map((cert) => cert.category));
    return ["all", ...unique];
  }, [certificates]);

  const visibleCertificates =
    selectedCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  const visibleImageCertificates = visibleCertificates.filter(
    (cert) => cert.type === "image" && cert.image
  );

  const certificateSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    const baseSchema = [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/certificates`,
        url: `${siteMeta.siteUrl}/certificates`,
        name: "Certificates & Credentials",
        description:
          "Certificates in AI, web development, Linux, automation and entrepreneurship from ALX, IBM SkillsBuild, Cisco, Coursera, edX and others.",
        inLanguage: locale,
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
            name: "Certificates",
            item: `${siteMeta.siteUrl}/certificates`,
          },
        ],
      },
    ];

    if (certificates.length) {
      baseSchema.push({
        "@type": "ItemList",
        name: "Professional Certificates",
        itemListElement: certificates
          .slice(0, 12)
          .map((certificate, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: certificate.title,
            description: `${certificate.issuer} · ${certificate.category}`,
            url:
              certificate.credentialUrl ||
              `${siteMeta.siteUrl}/certificates#${certificate.id}`,
          })),
      });
    }

    return baseSchema;
  }, [certificates]);

  return (
    <>
      <Seo
        title="Certificates & Credentials"
        description="Certificates in AI, web development, Linux, automation and entrepreneurship from ALX, IBM SkillsBuild, Cisco, Coursera, edX and others."
        keywords={[
          "ALX certificate",
          "IBM SkillsBuild badge",
          "Cisco Linux certificate",
          "edX entrepreneurship certificate",
        ]}
        url="/certificates"
        schema={certificateSchema}
      />
      <PageHeader
        eyebrow="Credentials"
        title="Certificates, filed by subject and issuer."
        lede="Badges, diplomas and completion certificates from ALX, IBM SkillsBuild, Cisco, Coursera, edX and others, covering AI, web development, Linux, automation, entrepreneurship and business communication."
      >
        <ul className="mt-8 max-w-3xl border-t border-edge">
          {[
            "Issued by ALX, IBM SkillsBuild, Cisco, Coursera and edX, among others. Open any certificate to see it full size.",
            "Best Team Award, DECI Bootcamp — IBM, 2023.",
            "Coverage spans AI, web development, Linux and entrepreneurship.",
          ].map((line) => (
            <li key={line} className="ybz-body border-b border-edge py-3">
              {line}
            </li>
          ))}
        </ul>
      </PageHeader>

      <Section className="pt-0">
        <div
          className="mb-8 flex flex-wrap gap-3"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className="ybz-chip"
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>

        {error && (
          <Card className="ybz-body mb-6 text-center text-muted">{error}</Card>
        )}

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          aria-busy={isLoading || undefined}
        >
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="ybz-card h-72 opacity-60"
                aria-hidden="true"
              />
            ))}

          {!isLoading &&
            visibleImageCertificates.map((certificate) => (
              <Card
                as="article"
                key={certificate.id}
                padded={false}
                className="flex h-full min-w-0 flex-col"
              >
                <CertificateMedia
                  certificate={certificate}
                  onSelectImage={() => setSelectedCertificate(certificate)}
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="ybz-meta">{certificate.category}</p>
                  <h3 className="ybz-title mt-2 break-words">
                    {certificate.title}
                  </h3>
                  <p className="ybz-source mt-2">
                    Issuer: {certificate.issuer}
                  </p>
                  {certificate.credentialUrl && (
                    <TextLink href={certificate.credentialUrl} className="mt-4">
                      Verify credential
                    </TextLink>
                  )}
                </div>
              </Card>
            ))}

          {!isLoading && !error && visibleImageCertificates.length === 0 && (
            <Card className="ybz-body border-dashed text-center text-muted md:col-span-2 xl:col-span-3">
              No certificates in this category yet.
            </Card>
          )}
        </div>
      </Section>

      {selectedCertificate && selectedCertificate.type === "image" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink px-4 py-10"
          onClick={() => setSelectedCertificate(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCertificate.title}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg border border-edge bg-ink p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 z-10 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-edge bg-card text-bone transition-colors hover:border-hairline"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="ybz-frame rounded-sm border-b-0">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="mx-auto max-h-[70vh]"
              />
            </div>
            <div className="mt-4 space-y-1">
              <p className="ybz-meta">{selectedCertificate.category}</p>
              <h3 className="ybz-title">{selectedCertificate.title}</h3>
              <p className="ybz-source">{selectedCertificate.issuer}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;
