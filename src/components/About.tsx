import { memo } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../style";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

type ServiceCardProps = { index: number; title: string; icon: string };
const ServiceCard = memo(({ index, title, icon }: ServiceCardProps) => {
  return (
    <Tilt className="sm:w-[250px] w-5/6" options={{ max: 45, scale: 1, speed: 450 }}>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} loading="lazy" decoding="async" width="64" height="64" className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
});

ServiceCard.displayName = 'ServiceCard';

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Senior Software Engineer with 9 years of proven expertise leading high-impact web and 
        mobile application development at enterprise scale. Specialist in modern front-end 
        frameworks, cloud infrastructure, and cross-platform technologies. Adept at integrating 
        AI-driven solutions to streamline development workflows, accelerate product delivery, 
        and unlock data-driven insights. Successfully delivered 20+ complex applications, 
        optimized Agile workflows, and architected solutions that significantly boosted user 
        satisfaction and business performance. Ready to drive technical innovation and AI-powered 
        engineering excellence at a top-tier technology leader.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} title={service.title} icon={service.icon} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
