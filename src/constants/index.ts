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
  tailwind,
  nodejs,
  make,
  n8n,
  git,
  docker,
  caci,
  gdit,
  boozallen,
  xpectsolutions,
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
  { title: "Software Developer", icon: web },
  { title: "UI/UX Designer", icon: mobile },
  { title: "AI Architect", icon: backend },
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
  { name: "N8N", icon: n8n },
  { name: "Make", icon: make },
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
    title: "Senior Software Engineer",
    company_name: "Xpect Solutions",
    icon: xpectsolutions,
    iconBg: "#01193d",
    date: "Jan 2022 - Present",
    points: [
      "Developed cross-platform mobile applications using React Native and Swift for iOS/Android with responsive UI components and Redux state management.",
      "Engineered 200+ dynamic web forms using Plone and Zope with form validation, error handling, and WCAG 2.1 accessibility compliance.",
      "Led full SDLC activities from requirements through production deployment, implementing CI/CD pipelines and Docker containerization.",
      "Mentored junior developers through code reviews and guided programming sessions while establishing team coding standards and best practices.",
    ],
  },
  {
    title: "Staff Engineer",
    company_name: "Booz Allen Hamilton",
    icon: boozallen,
    iconBg: "#383E56",
    date: "Oct 2019 - Dec 2021",
    points: [
      "Developed enterprise-scale .NET applications for DoD clients, implementing RESTful APIs and microservices architecture for critical operations.",
      "Designed and maintained SQL Server databases, writing optimized queries, stored procedures, and indexing strategies for performance.",
      "Built automated data integration pipelines connecting multiple systems via APIs, reducing manual data entry and improving accuracy.",
      "Participated in Agile ceremonies using JIRA/Confluence and conducted technical analysis to provide architecture improvement recommendations.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "General Dynamics Information Technology",
    icon: gdit,
    iconBg: "#F5F5F5",
    date: "July 2017 - Oct 2019",
    points: [
      "Built custom SharePoint sites with JavaScript-based automation workflows and tailored UI designs to meet federal agency requirements.",
      "Developed server-side workflows using Nintex 2010 for document routing, approval processes, and automated notifications.",
      "Resolved SharePoint incident tickets agency-wide, troubleshooting issues, implementing fixes, and documenting solutions.",
      "Worked with cross-functional teams including QA testers and developers to deliver client projects through full testing cycles.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "CACI",
    icon: caci,
    iconBg: "#F5F5F5",
    date: "March 2016 - July 2017",
    points: [
      "Assisted in migrating SharePoint site collections from 2010 to 2013, performing testing and validation to ensure data integrity.",
      "Debugged and refined custom SharePoint master pages using SharePoint Designer, fixing CSS and layout issues for visual consistency.",
      "Utilized PowerShell scripts to transition sites between development and production environments following deployment procedures.",
      "Developed responsive web pages using HTML5, CSS3, JavaScript, and jQuery with AJAX and JSON for dynamic content loading.",
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

