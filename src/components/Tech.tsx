/**
 * Tech Section Component
 * 
 * Displays technology stack with 3D ball visualizations.
 * Uses lazy loading and viewport detection for performance optimization.
 * 
 * @component
 */

import { Suspense } from "react";
import { BallCanvas } from "./canvas";
import { useInView } from "../utils/useInView";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const { ref, inView } = useInView({ rootMargin: "300px" });
  return (
    <div ref={ref} className="flex flex-row flex-wrap justify-center gap-16">
      {technologies.map((technology, index) => (
        <div className="w-28 h-28 group" key={technology.name}>
          <img src={technology.icon} alt={technology.name} loading="lazy" decoding="async" width="112" height="112" className="hidden" />
          <Suspense fallback={<div className="w-full h-full bg-tertiary rounded-full animate-pulse" />}>
            {inView ? (
              <div style={{ width: '112px', height: '112px' }}>
                <BallCanvas icon={technology.icon} />
              </div>
            ) : (
              <div className="w-full h-full bg-tertiary rounded-full animate-pulse" />
            )}
          </Suspense>
          <p className="text-indigo-300 text-[14px] mt-2 text-center group-hover:text-sky-200 group-hover:font-semibold group-hover:text-[15px]">
            {technology.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
