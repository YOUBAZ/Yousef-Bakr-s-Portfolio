import { Component } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
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
                <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                    <div className="max-w-md w-full">
                        <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
                                <AlertTriangle className="text-red-500" size={32} />
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-2">
                                Oops! Something went wrong
                            </h1>

                            <p className="text-slate-400 mb-6">
                                We encountered an unexpected error. Please try refreshing the page.
                            </p>

                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                <RefreshCw size={18} />
                                Try Again
                            </button>

                            {process.env.NODE_ENV === "development" && this.state.error && (
                                <details className="mt-6 text-left">
                                    <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-400">
                                        Error Details (Development Only)
                                    </summary>
                                    <pre className="mt-2 text-xs text-red-400 bg-slate-950 p-4 rounded overflow-auto max-h-48">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
