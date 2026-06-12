import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the name, eligibility line, and primary CTAs", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Adil Ahmad");
    expect(screen.getByText(/U\.S\. Citizen/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /linkedin/i }).getAttribute("href")).toContain(
      "linkedin.com",
    );
    expect(screen.getByRole("link", { name: /github/i }).getAttribute("href")).toContain(
      "github.com",
    );
  });
});
