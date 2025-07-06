import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

/**
 * The entry point of the application that renders the root React component.
 * Wraps the main App component with ErrorBoundary for error handling and
 * React.StrictMode for highlighting potential problems during development.
 * 
 * @module index
 * @file This is the main entry file that gets executed when the application starts
 * 
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * StrictMode is a wrapper that helps catch potential problems during development.
   * It activates additional checks and warnings for its descendants.
   */
  <React.StrictMode>
    {/**
     * ErrorBoundary catches JavaScript errors anywhere in the child component tree
     * and displays a fallback UI instead of the component tree that crashed
     */}
    <ErrorBoundary>
      {/**
       * The main App component that serves as the root of the application component tree
       */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);