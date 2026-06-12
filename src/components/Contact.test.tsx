import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import Contact from "./Contact";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn().mockResolvedValue({ status: 200, text: "OK" }) },
}));

const send = vi.mocked(emailjs.send);

function getForm(container: HTMLElement): HTMLFormElement {
  const form = container.querySelector("form");
  if (!form) throw new Error("form not found");
  return form;
}

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllEnvs());

describe("Contact form", () => {
  it("shows validation errors and does not send when submitted empty", () => {
    const { container } = render(<Contact />);
    fireEvent.submit(getForm(container));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });

  it("silently drops bot submissions that fill the honeypot", () => {
    const { container } = render(<Contact />);
    const honeypot = container.querySelector('input[name="company"]') as HTMLInputElement;
    expect(honeypot).toBeTruthy();

    fireEvent.change(honeypot, { target: { value: "spam-bot" } });
    fireEvent.submit(getForm(container));

    expect(send).not.toHaveBeenCalled();
    expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
  });

  it("sends trimmed values via EmailJS for a valid submission", async () => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "svc");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "tmpl");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "key");

    const { container } = render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: "  Recruiter  " },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "jane@acme.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/talk about/i), {
      target: { value: "We have a senior role that fits your background." },
    });

    fireEvent.submit(getForm(container));

    await waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    const params = send.mock.calls[0][2];
    expect(params).toMatchObject({
      from_name: "Recruiter",
      from_email: "jane@acme.com",
      to_email: "adilahmad28@gmail.com",
    });
    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
  });
});
