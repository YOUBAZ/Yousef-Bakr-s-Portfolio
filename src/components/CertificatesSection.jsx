import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Maximize2, X } from "lucide-react";
import { Button, Card, Section, SectionHeader, TextLink } from "./ui";

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
        // Greyscale in the grid, so six issuers' brand colours do not set the
        // page's palette; the enlarged view shows the certificate as issued.
        className="ybz-photo p-4"
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

/**
 * Certificates, as a section of the CV page (the old /certificates route
 * redirects to /cv#certificates). A selection, not a count: certificates.json
 * marks the credentials that bear on engineering work with "featured" (their
 * order). Everything else stays one click away under "All certificates".
 */
const CertificatesSection = ({ tone = "base" }) => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);

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

  // Arriving from the old /certificates URL: land on this section once the
  // grid has its height, not before.
  useEffect(() => {
    if (!isLoading && window.location.hash === "#certificates") {
      ref.current?.scrollIntoView();
    }
  }, [isLoading]);

  const featured = certificates
    .filter((cert) => cert.featured && cert.type === "image" && cert.image)
    .sort((a, b) => a.featured - b.featured);

  const others = certificates
    .filter((cert) => !cert.featured)
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
    );

  return (
    <Section tone={tone} id="certificates">
      <div ref={ref} className="scroll-mt-28">
        <SectionHeader
          eyebrow="Certificates"
          title="Selected credentials."
          lede="Linux, web development and AI, from the Linux Professional Institute, IBM, Cisco, ALX and the DECI bootcamp, where my team won Best Team."
        />
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
          featured.map((certificate) => (
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
                <p className="ybz-source mt-2">Issuer: {certificate.issuer}</p>
                {certificate.credentialUrl && (
                  <TextLink href={certificate.credentialUrl} className="mt-4">
                    Verify credential
                  </TextLink>
                )}
              </div>
            </Card>
          ))}
      </div>

      {/* The rest: a compact list, folded. Each opens the same viewer. */}
      {!isLoading && others.length > 0 && (
        <details className="group mt-12 border-t border-edge pt-6">
          <summary className="ybz-link min-h-11 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              All certificates ({certificates.length})
            </span>
            <span className="hidden group-open:inline">Hide the full list</span>
          </summary>
          <ul className="mt-6 border-t border-edge">
            {others.map((cert) => (
              <li
                key={cert.id}
                className="grid gap-1 border-b border-edge py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="text-bone">{cert.title}</p>
                  <p className="ybz-source">
                    {cert.issuer} · {cert.category}
                  </p>
                </div>
                {cert.type === "image" && cert.image && (
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(cert)}
                    className="ybz-link justify-self-start"
                  >
                    View
                  </button>
                )}
              </li>
            ))}
          </ul>
        </details>
      )}

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
    </Section>
  );
};

CertificatesSection.propTypes = {
  tone: PropTypes.oneOf(["base", "raised"]),
};

export default CertificatesSection;
