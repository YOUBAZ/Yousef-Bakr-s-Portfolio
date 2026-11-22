import { ArrowRight } from "lucide-react";
import Button from "./Button";
import SectionHeader from "./SectionHeader";

/**
 * The one closing call to action, shared by the home page and every case
 * study so the two cannot drift apart. Hiring first, then a project.
 *
 * It sits straight on its raised band. A box here would be the largest and
 * lightest object on the page in dark mode, and would outweigh the hero.
 */
const ClosingCta = () => (
  <div>
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
  </div>
);

export default ClosingCta;
