import { ArrowRight } from "lucide-react";
import Button from "./Button";
import Card from "./Card";
import SectionHeader from "./SectionHeader";

/**
 * The one closing call to action, shared by the home page and every case
 * study so the two cannot drift apart. Hiring first, then a project.
 */
const ClosingCta = () => (
  <Card className="p-8 sm:p-10">
    <SectionHeader
      eyebrow="Working together"
      title="Hiring, or have a project?"
      className="mb-6"
    />
    <p className="ybz-body max-w-2xl">
      The CV has the dates and the details. For anything else, the contact form
      reaches me directly.
    </p>
    <div className="mt-8 flex flex-wrap gap-3">
      <Button to="/contact" icon={ArrowRight}>
        Contact
      </Button>
      <Button to="/cv" variant="secondary">
        CV
      </Button>
    </div>
  </Card>
);

export default ClosingCta;
