/**
 * Vitest global setup: jest-dom matchers, RTL cleanup, and jsdom polyfills for
 * the browser APIs the app relies on (matchMedia, IntersectionObserver) that jsdom
 * does not implement.
 */

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// matchMedia — used by prefersReducedMotion(). Default: no reduced motion.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// jsdom has no canvas backend; return null so the constellation backdrop no-ops
// cleanly (it guards on a missing 2d context) instead of throwing "Not implemented".
HTMLCanvasElement.prototype.getContext = vi.fn(
  () => null,
) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// IntersectionObserver — used by useInView and several sections. No-op stub.
if (!("IntersectionObserver" in window)) {
  class IntersectionObserverStub implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }
  // @ts-expect-error assigning stub to the global
  window.IntersectionObserver = IntersectionObserverStub;
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}
