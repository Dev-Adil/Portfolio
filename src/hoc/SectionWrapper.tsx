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
        viewport={{ once: true, amount: 0.25 }}
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
