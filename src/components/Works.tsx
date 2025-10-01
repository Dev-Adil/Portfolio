import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../style";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { useEffect, useState } from "react";
import type { Project } from "../constants/projects";
import { fadeIn, textVariant } from "../utils/motion";

type ProjectCardProps = import("../constants").Project & { index: number };
const ProjectCard = ({ index, name, description, tags, image, source_code_link }: ProjectCardProps) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-7/6"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            width="720"
            height="460"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                loading="lazy"
                decoding="async"
                width="20"
                height="20"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white text-[24px] font-bold">{name}</h3>
          <p className="text-secondary text-[14px]mt-2">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    let isMounted = true;
    import("../constants/projects").then((m) => {
      if (isMounted) setProjects(m.projects);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Here are some of the projects I've worked on. You can find more of my
          work on my GitHub profile.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects?.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
