import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center">
            <img src="/cyrix-logo.png" alt="CYRIX" className="h-10 w-auto mx-auto mb-8" />
            <h1 className="text-2xl font-light mb-3">Something went wrong</h1>
            <p className="text-sm text-muted-foreground font-light mb-6 max-w-sm mx-auto">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <p className="text-xs text-muted-foreground/50 mt-6 font-mono">
                {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
