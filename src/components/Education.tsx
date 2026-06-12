/**
 * Education & Certifications Section
 *
 * Distinct visual treatment from the other sections: a glowing-node
 * education rail beside credential "badge" cards with per-cert icons.
 *
 * @component
 */

import { motion } from "framer-motion";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { education, certifications } from "../constants";
import type { Certification } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { ShieldCheckIcon, AgileIcon } from "./icons";

const CertIcon = ({ icon }: { icon: Certification["icon"] }) =>
  icon === "security" ? (
    <ShieldCheckIcon className="w-6 h-6" />
  ) : (
    <AgileIcon className="w-6 h-6" />
  );

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Credentials</p>
        <h2 className={styles.sectionHeadText}>
          Education &amp; <span className="gradient-text">Certs.</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid lg:grid-cols-5 gap-8 lg:gap-10">
        {/* Education — glowing-node rail */}
        <motion.div
          variants={fadeIn("right", "spring", 0.1, 0.6)}
          className="lg:col-span-3"
        >
          <h3 className="text-secondary text-[13px] uppercase tracking-[0.2em] mb-6">
            Education
          </h3>
          <div className="flex flex-col gap-6 border-l border-white/10 pl-7">
            {education.map((ed) => (
              <div key={ed.title} className="relative">
                <span className="absolute -left-[33px] top-1.5 grid place-items-center">
                  <span className="w-3 h-3 rounded-full bg-[#915eff] shadow-[0_0_14px_rgba(145,94,255,0.9)]" />
                </span>
                <p className="text-white text-[17px] font-semibold leading-snug">
                  {ed.title}
                </p>
                <p className="text-secondary text-[14px] mt-1">{ed.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications — badge cards with icons */}
        <motion.div
          variants={fadeIn("left", "spring", 0.2, 0.6)}
          className="lg:col-span-2"
        >
          <h3 className="text-secondary text-[13px] uppercase tracking-[0.2em] mb-6">
            Certifications
          </h3>
          <div className="flex flex-col gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-4 rounded-xl bg-black-100 border border-white/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#915eff]/40 hover:shadow-[0_10px_30px_-12px_rgba(145,94,255,0.5)]"
              >
                <span className="shrink-0 grid place-items-center w-12 h-12 rounded-full text-[#b79bff] bg-[#915eff]/10 ring-1 ring-[#915eff]/30">
                  <CertIcon icon={cert.icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-white text-[15px] font-semibold leading-tight">
                    {cert.name}
                  </p>
                  <p className="text-secondary text-[12px] mt-0.5">
                    {cert.issuer} · {cert.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
