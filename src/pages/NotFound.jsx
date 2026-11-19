import { ArrowLeft, Home } from "lucide-react";
import Seo from "../components/Seo";
import { Button, PageHeader, TextLink } from "../components/ui";

const quickLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Writing", to: "/blog" },
  { label: "Certificates", to: "/certificates" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  return (
    <>
      <Seo
        title="404"
        description="That page does not exist."
        url="/404"
        noindex
      />

      <div className="flex min-h-[70vh] flex-col justify-center">
        <PageHeader
          eyebrow="404"
          title="That page does not exist."
          lede="Either the URL is mistyped or the route was removed. Both are recoverable."
          actions={
            <>
              <Button to="/" icon={Home} iconPosition="start">
                Home
              </Button>
              <Button
                variant="secondary"
                icon={ArrowLeft}
                iconPosition="start"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
            </>
          }
        >
          <nav
            aria-labelledby="not-found-elsewhere"
            className="mt-12 max-w-xl border-t border-edge pt-8"
          >
            <h2 id="not-found-elsewhere" className="ybz-meta font-normal">
              Elsewhere
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <TextLink to={link.to}>{link.label}</TextLink>
                </li>
              ))}
            </ul>
          </nav>
        </PageHeader>
      </div>
    </>
  );
};

export default NotFound;
