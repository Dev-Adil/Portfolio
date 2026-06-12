import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion } from "./performance";

afterEach(() => vi.restoreAllMocks());

describe("prefersReducedMotion", () => {
  it("returns true when the user prefers reduced motion", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as unknown as MediaQueryList);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns false when the user does not", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
    } as unknown as MediaQueryList);
    expect(prefersReducedMotion()).toBe(false);
  });
});
