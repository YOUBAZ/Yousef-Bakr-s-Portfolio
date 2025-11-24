import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useInView } from "react-intersection-observer";
import {
  BadgeCheck,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";

const CertificateMedia = ({ certificate, onSelectImage }) => {
  const isImage = certificate.type === "image";
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });
  const [shouldRenderPdf, setShouldRenderPdf] = useState(isImage);

  useEffect(() => {
    if (inView && !isImage) {
      setShouldRenderPdf(true);
    }
  }, [inView, isImage]);

  const handleView = () => {
    if (isImage) {
      onSelectImage?.();
    } else if (certificate.pdf) {
      window.open(certificate.pdf, "_blank", "noopener");
    }
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
    >
      {isImage ? (
        <img
          src={certificate.image}
          alt={certificate.title}
          className="h-full w-full object-contain object-center transition group-hover:scale-105"
          loading="lazy"
        />
      ) : shouldRenderPdf && certificate.pdf ? (
        <iframe
          title={certificate.title}
          src={`${certificate.pdf}#toolbar=0&view=fitH`}
          className="h-full w-full scale-[1.02] object-contain"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-900">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-sky-400" />
          <p className="text-xs text-slate-400">Preparing preview...</p>
        </div>
      )}
      <button
        onClick={handleView}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-slate-900"
      >
        {isImage ? <ImageIcon size={14} /> : <FileText size={14} />}
        View
      </button>
    </div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gridRef] = useAutoAnimate({ duration: 220 });

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

  return (
    <div className="bg-slate-950 text-white">
      <section className="px-6 pt-24 pb-12 sm:px-10 lg:px-16">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-900/30 lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300">
              <BadgeCheck size={16} />
              Credentials
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Certified growth across AI, product, and creative technology.
            </h1>
            <p className="text-slate-300">
              A collection of verified badges, diplomas, and completion
              certificates from ALX, IBM, Coursera, and more—covering AI,
              entrepreneurship, business communications, and automation stacks.
            </p>
          </motion.div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Highlights
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                • Multi-disciplinary credentials spanning AI, product, and
                business.
              </li>
              <li>
                • Verified by leading platforms (ALX, IBM Skillbuild, Coursera,
                edX).
              </li>
              <li>
                • Constant upskilling in automation tools, design systems, and
                storytelling.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 sm:px-10 lg:px-16">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-sky-400 bg-sky-500/20 text-white"
                  : "border-white/15 text-slate-300 hover:border-sky-400/60 hover:text-white"
              }`}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        {error && (
          <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-6 text-center text-rose-200">
            {error}
          </div>
        )}
        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-72 rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="h-full w-full animate-pulse rounded-3xl bg-white/10" />
              </div>
            ))}

          {!isLoading &&
            visibleCertificates.map((certificate) => (
              <motion.article
                key={certificate.id}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <CertificateMedia
                  certificate={certificate}
                  onSelectImage={() => setSelectedCertificate(certificate)}
                />
                <div className="mt-4 space-y-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {certificate.category}
                  </p>
                  <h3 className="text-lg font-semibold">{certificate.title}</h3>
                  <p className="text-sm text-slate-400">
                    Issuer: {certificate.issuer}
                  </p>
                </div>
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white"
                  >
                    <ExternalLink size={16} />
                    Verify credential
                  </a>
                )}
              </motion.article>
            ))}

          {!isLoading && !error && visibleCertificates.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 p-8 text-center text-slate-400">
              No certificates in this category yet.
            </div>
          )}
        </div>
      </section>

      {selectedCertificate && selectedCertificate.type === "image" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 p-2 text-white"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="mx-auto max-h-[70vh] w-full object-contain"
            />
            <div className="mt-4 space-y-1 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {selectedCertificate.category}
              </p>
              <h3 className="text-lg font-semibold">
                {selectedCertificate.title}
              </h3>
              <p className="text-sm text-slate-400">
                {selectedCertificate.issuer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
