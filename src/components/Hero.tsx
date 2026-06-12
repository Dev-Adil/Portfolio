/**
 * Hero Section Component
 *
 * Landing view: who, what, seniority, location/eligibility, and clear CTAs.
 * Uses normal document flow (no absolute positioning) so content never
 * collides with the scroll cue at any viewport size. Respects reduced motion.
 *
 * @component
 */

import { motion } from "framer-motion";
import { useMemo } from "react";
import { prefersReducedMotion } from "../utils/performance";
import { styles } from "../style";
import { profile } from "../constants";
import HeroBackdrop from "./HeroBackdrop";

const Hero = () => {
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col overflow-hidden">
      <div className="hero-aurora" aria-hidden="true" />
      <HeroBackdrop />
      <div
        className={`${styles.paddingX} pt-[130px] sm:pt-[150px] max-w-7xl mx-auto w-full flex flex-row items-start gap-5 relative z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-2">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-72 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Adil <span className="text-[#915eff]">Ahmad</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-2xl`}>
            Senior Software Engineer building web &amp; mobile apps in{" "}
            <span className="text-[#dfd9ff] font-semibold">React</span> &amp;{" "}
            <span className="text-[#dfd9ff] font-semibold">React Native</span> — owned
            end-to-end for ~50,000 users.
          </p>

          <p className="mt-4 text-secondary text-[15px] sm:text-[17px]">
            10 years in production · {profile.location} · U.S. Citizen
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="bg-[#7c45f0] hover:bg-[#6d3bd4] text-white font-semibold py-3 px-7 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#915eff] focus:ring-offset-2 focus:ring-offset-primary"
            >
              Get in touch
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/50 text-white font-medium py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#915eff] focus:ring-offset-2 focus:ring-offset-primary"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/50 text-white font-medium py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#915eff] focus:ring-offset-2 focus:ring-offset-primary"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full flex justify-center items-center py-8 relative z-10">
        <a href="#about" aria-label="Scroll to About section">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={reduceMotion ? {} : { y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
