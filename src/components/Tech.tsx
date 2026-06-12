/**
 * Skills Section Component
 *
 * Categorized technical skills (text-based). Replaced the previous
 * 12 WebGL "tech ball" canvases for clarity and performance.
 *
 * @component
 */

import { motion } from "framer-motion";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { skillGroups } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Skills = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            variants={fadeIn("up", "spring", index * 0.1, 0.6)}
            className="bg-black-100 rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#915eff]/40 hover:shadow-[0_10px_30px_-10px_rgba(145,94,255,0.35)]"
          >
            <h3 className="text-white text-[18px] font-bold mb-4">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-secondary bg-tertiary rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-[#915eff]/20"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Skills, "skills");
