import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useInView } from "./useInView";

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let lastCallback: IOCallback = () => {};

function Probe() {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} data-testid="box">
      {inView ? "in" : "out"}
    </div>
  );
}

describe("useInView", () => {
  beforeEach(() => {
    class IO {
      constructor(cb: IOCallback) {
        lastCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
    }
    vi.stubGlobal("IntersectionObserver", IO);
  });

  it("is out of view until the element intersects, then stays in view", () => {
    render(<Probe />);
    expect(screen.getByTestId("box")).toHaveTextContent("out");

    act(() => lastCallback([{ isIntersecting: true }]));
    expect(screen.getByTestId("box")).toHaveTextContent("in");
  });
});
