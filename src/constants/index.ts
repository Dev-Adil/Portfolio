import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript as typescriptImg,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  caci,
  gdit,
  boozallen,
  ecs,
  meta,
  starbucks,
  tesla,
  shopify,
  threejs,
  swift,
} from "../assets";

export type NavLink = { id: string; title: string };
export const navLinks: ReadonlyArray<NavLink> = [
  { id: "about", title: "About" },
  { id: "experience", title: "Work" },
  { id: "contact", title: "Contact" },
];

export type Service = { title: string; icon: string };
export const services: ReadonlyArray<Service> = [
  { title: "Web Developer", icon: web },
  { title: "Mobile Developer", icon: mobile },
  { title: "AI Consultant", icon: backend },
];

export type Technology = { name: string; icon: string };
export const technologies: ReadonlyArray<Technology> = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescriptImg },
  { name: "React JS", icon: reactjs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "Swift", icon: swift },
  { name: "Git", icon: git },
  { name: "Docker", icon: docker },
];

export type Experience = {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
};
export const experiences: ReadonlyArray<Experience> = [
  {
    title: "Web Developer",
    company_name: "CACI",
    icon: caci,
    iconBg: "#F5F5F5",
    date: "March 2016 - July 2017",
    points: [
      "Developed SharePoint sites using HTML, CSS, and JavaScript.",
      "Migrated SharePoint site collections from 2010 to 2013.",
      "Established SOPs to streamline post-migration maintenance.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "General Dynamics Information Technology",
    icon: gdit,
    iconBg: "#F5F5F5",
    date: "July 2017 - Oct 2019",
    points: [
      "Built websites featuring automated workflows and custom designs.",
      "Managed SharePoint server farms and backend services.",
      "Collaborated with clients to deliver tailored solutions.",
    ],
  },
  {
    title: "Staff Engineer",
    company_name: "Booz Allen Hamilton",
    icon: boozallen,
    iconBg: "#383E56",
    date: "Oct 2019 - Dec 2021",
    points: [
      ".NET applications integrated with SQL databases for DoD contracts.",
      "Administered SQL databases using SQL Server Management Studio.",
      "Adopted Agile methodologies to improve team efficiency.",
      "Conducted feasibility analyses and assessed application performance.",
    ],
  },
  {
    title: "Application Solutions Developer",
    company_name: "ECS Federal",
    icon: ecs,
    iconBg: "#F5F5F5",
    date: "Jan 2022 - Present",
    points: [
      "Built cross-platform mobile applications for DOJ contracts.",
      "Created responsive websites and dynamic web forms.",
      "Advised clients on optimal technology solutions.",
      "Engaged in all SDLC phases, from requirements to deployment.",
    ],
  },
];

export type Testimonial = {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
};
export const testimonials: ReadonlyArray<Testimonial> = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

