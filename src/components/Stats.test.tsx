import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Stats from "./Stats";

afterEach(() => vi.restoreAllMocks());

describe("Stats", () => {
  it("renders the impact metrics (reduced motion shows final values immediately)", () => {
    // Full MediaQueryList shape — Framer Motion calls addListener() on mount.
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    render(<Stats />);

    expect(screen.getByText("50K+")).toBeInTheDocument();
    expect(screen.getByText("3×")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByText(/users served/i)).toBeInTheDocument();
  });
});
