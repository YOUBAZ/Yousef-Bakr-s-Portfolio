import { Component } from "react";
import { RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // In production, you could send errors to an error tracking service
    // Example: sendToErrorTracking(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center bg-ink px-6 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-2xl space-y-4">
            <p className="ybz-eyebrow">Error</p>
            <h1 className="ybz-display-2">This page failed to render.</h1>
            <hr className="ybz-rule" />
            <p className="ybz-body pt-2">
              The error is logged in the console. Retrying usually clears it; if
              it does not, reloading the page will.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={this.handleReset}
                className="ybz-btn ybz-btn-ghost"
              >
                <RefreshCw size={16} strokeWidth={1.75} aria-hidden="true" />
                Try again
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="pt-6">
                <summary className="ybz-meta cursor-pointer">
                  Error details
                </summary>
                <pre
                  className="ybz-source mt-2 max-h-48 overflow-auto border border-edge bg-card p-4"
                  style={{ borderRadius: "var(--ybz-r-sm)" }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
