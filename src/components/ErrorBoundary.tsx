/**
 * Error Boundary Component
 *
 * Catches React component errors and displays a fallback UI.
 * Prevents entire app from crashing due to component errors.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */

import { Component, ErrorInfo, ReactNode } from "react";
import { error as logError } from "../utils/logger";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Logs in development. In production this is an intentional no-op placeholder —
    // wire a real error reporter (e.g. Sentry) here if/when one is added.
    logError("Uncaught render error", error, {
      context: "ErrorBoundary",
      componentStack: errorInfo.componentStack,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
          <div className="max-w-md w-full bg-tertiary rounded-2xl p-8 text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-secondary mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7c3aed] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="ml-4 bg-tertiary text-white px-6 py-3 rounded-lg font-medium border border-white/20 hover:bg-white/10 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
