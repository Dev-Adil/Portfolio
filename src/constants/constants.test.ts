import { describe, it, expect } from "vitest";
import { profile, experiences, skillGroups, navLinks, certifications, education } from "./index";

describe("site content", () => {
  it("exposes valid, parseable profile links and a valid email", () => {
    expect(() => new URL(profile.linkedin)).not.toThrow();
    expect(() => new URL(profile.github)).not.toThrow();
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has experiences with the required fields populated", () => {
    expect(experiences.length).toBeGreaterThan(0);
    for (const exp of experiences) {
      expect(exp.title).toBeTruthy();
      expect(exp.company_name).toBeTruthy();
      expect(exp.date).toBeTruthy();
      expect(exp.points.length).toBeGreaterThan(0);
    }
  });

  it("has non-empty skill groups, nav links, education and certifications", () => {
    expect(navLinks.length).toBeGreaterThan(0);
    expect(education.length).toBeGreaterThan(0);
    expect(certifications.length).toBeGreaterThan(0);
    expect(skillGroups.length).toBeGreaterThan(0);
    expect(skillGroups.every((g) => g.items.length > 0)).toBe(true);
  });
});
