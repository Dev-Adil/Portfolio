/**
 * Custom hook to detect when an element enters the viewport
 * Uses Intersection Observer API for efficient viewport detection
 *
 * @param options - IntersectionObserver options with optional `once` flag
 * @returns Object with `ref` to attach to element and `inView` boolean state
 *
 * @example
 * ```tsx
 * const { ref, inView } = useInView({ rootMargin: "100px" });
 * return <div ref={ref}>{inView && <ExpensiveComponent />}</div>;
 * ```
 */

import { useEffect, useRef, useState } from "react";

type InViewOptions = IntersectionObserverInit & { once?: boolean };

export const useInView = (options?: InViewOptions) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    let stopped = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (stopped) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once !== false) {
              observer.disconnect();
              stopped = true;
            }
          } else if (options?.once === false) {
            setInView(false);
          }
          break;
        }
      },
      {
        root: options?.root || null,
        rootMargin: options?.rootMargin ?? "200px",
        threshold: options?.threshold ?? 0.01,
      },
    );

    observer.observe(node);
    return () => {
      stopped = true;
      observer.disconnect();
    };
  }, [options?.root, options?.rootMargin, options?.threshold, options?.once]);

  return { ref: targetRef, inView } as const;
};
