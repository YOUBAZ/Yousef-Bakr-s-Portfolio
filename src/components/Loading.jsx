import Wordmark from "./Wordmark";
import GoldRule from "./GoldRule";

/** Route-level fallback. Static: the wordmark and the rule, nothing looping. */
const Loading = () => (
  <div
    className="flex min-h-[60vh] items-center justify-center bg-ink"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-start gap-4">
      <Wordmark size="lg" />
      <GoldRule />
      <span className="sr-only">Loading</span>
    </div>
  </div>
);

export default Loading;
