import Signet from "./Signet";
import StackRail from "./StackRail";
import { BRAND } from "../config/brand";
import GoldRule from "./GoldRule";

const Loading = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      <div className="ybz-bloom pointer-events-none absolute inset-0" />

      <div
        className="relative flex flex-col items-center gap-5 px-12 py-14 text-center"
        role="status"
        aria-live="polite"
      >
        <StackRail className="left-0" />
        <Signet size={64} />
        <div className="space-y-2">
          <p className="font-display text-2xl font-bold text-bone">
            {BRAND.name}
          </p>
          <p
            className="font-mono text-[0.7rem] uppercase text-muted"
            style={{ letterSpacing: "0.18em" }}
          >
            {BRAND.descriptorLockup}
          </p>
        </div>
        <GoldRule />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default Loading;
