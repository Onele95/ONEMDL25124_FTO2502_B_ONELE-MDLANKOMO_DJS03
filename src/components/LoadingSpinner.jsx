import './LoadingSpinner.css';

/**
 * A reusable loading spinner component that displays a visual loading indicator
 * with optional text to indicate loading state to users.
 * 
 * @component
 * @example
 * // How to use the LoadingSpinner component
 * <LoadingSpinner />
 * 
 * @returns {JSX.Element} - Returns a loading spinner with accompanying text
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>Loading podcasts...</p>
    </div>
  );
};

export default LoadingSpinner;