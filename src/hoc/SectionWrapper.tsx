/**
 * Higher-Order Component that wraps sections with:
 * - Framer Motion animations
 * - Section ID for navigation
 * - Consistent styling and spacing
 * - Performance optimizations (content-visibility)
 * 
 * @param Component - React component to wrap
 * @param idName - ID for hash navigation (e.g., "about", "contact")
 * @returns Memoized wrapped component with animations and section structure
 * 
 * @example
 * ```tsx
 * export default SectionWrapper(About, "about");
 * ```
 */

import { ComponentType } from "react";
import { motion } from "framer-motion";

import { styles } from "../style";
import { staggerContainer } from "../utils/motion";

import { memo } from "react";

const SectionWrapper = <P extends object>(Component: ComponentType<P>, idName: string) =>
  memo(function HOC(props: P) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        style={{ contentVisibility: "auto", containIntrinsicSize: "700px" as any }}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    );
  });

export default SectionWrapper;
