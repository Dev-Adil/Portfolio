/**
 * Application Entry Point
 * 
 * Initializes React application with error boundary and suspense handling.
 * Includes font loading monitoring and root element validation.
 */

import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'

// Load fonts asynchronously after initial render (CSP-compliant)
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    // Fonts loaded, no action needed
  }).catch(() => {
    // Font loading failed, fallback handled by CSS
  });
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="text-white p-8">Loading…</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)

