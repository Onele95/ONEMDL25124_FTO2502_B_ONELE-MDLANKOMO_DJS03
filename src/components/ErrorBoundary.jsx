import { Component } from 'react';

/**
 * A reusable error boundary component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole application.
 * 
 * @class ErrorBoundary
 * @extends {Component}
 */
class ErrorBoundary extends Component {
  /**
   * Creates an instance of ErrorBoundary.
   * @param {Object} props - The props passed to the component
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Static lifecycle method that updates state when an error is caught.
   * 
   * @static
   * @param {Error} error - The error that was thrown
   * @returns {Object} - Returns an object to update the component state
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error has been caught by the error boundary.
   * Used for side effects like error logging.
   * 
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - An object with component stack information
   */
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  /**
   * Resets the error state when the user clicks the "Try Again" button
   */
  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Renders the component's UI. If an error has been caught, it renders a fallback UI.
   * Otherwise, it renders the child components.
   * 
   * @returns {React.ReactNode} - The rendered UI
   */
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <button onClick={this.handleRetry}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;