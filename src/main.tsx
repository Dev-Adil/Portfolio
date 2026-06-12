/**
 * Application Entry Point
 *
 * Validates the root element and mounts the app inside an error boundary
 * and a Suspense fallback (sections are lazy-loaded in App).
 */

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="text-white p-8">Loading…</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
