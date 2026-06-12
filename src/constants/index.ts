import { web, mobile, backend, xpectsolutions, boozallen, gdit, caci } from "../assets";

export type NavLink = { id: string; title: string };
export const navLinks: ReadonlyArray<NavLink> = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

/** Public profile + contact links, reused across hero, footer, and contact. */
export const profile = {
  name: "Adil Ahmad",
  role: "Senior Software Engineer",
  location: "Lorton, VA",
  email: "adilahmad28@gmail.com",
  linkedin: "https://linkedin.com/in/adilahmadgmu",
  github: "https://github.com/dev-adil",
} as const;

export type Service = { title: string; icon: string };
export const services: ReadonlyArray<Service> = [
  { title: "Web & Mobile Apps", icon: web },
  { title: "Performance & UX", icon: mobile },
  { title: "Quality & Mentorship", icon: backend },
];

export type SkillGroup = { title: string; items: string[] };
export const skillGroups: ReadonlyArray<SkillGroup> = [
  {
    title: "Frontend & Mobile",
    items: [
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "HTML5 / CSS3",
      "Tailwind",
      "MUI",
      "Styled-Components",
      "Zustand",
      "React Hook Form",
      "iOS / Xcode",
      "Android SDK",
    ],
  },
  {
    title: "Backend & Data",
    items: [
      "Node.js",
      "Express",
      ".NET",
      "REST APIs",
      "PostgreSQL",
      "SQL Server",
      "Firebase (Auth, Firestore)",
    ],
  },
  {
    title: "Quality & Build",
    items: ["Jest", "React Testing Library", "Vite", "ESLint / Prettier", "Agile / Scrum"],
  },
  {
    title: "Cloud & Tooling",
    items: ["AWS", "PowerShell", "Crashlytics / Analytics", "GitHub / GitLab", "Jira", "Confluence"],
  },
];

export type Credential = { title: string; detail: string };
export const education: ReadonlyArray<Credential> = [
  { title: "M.S., Applied Information Technology", detail: "George Mason University · 2016–2019" },
  { title: "B.S., Applied Information Technology / Business", detail: "George Mason University · 2012–2015" },
];

export type Certification = {
  name: string;
  issuer: string;
  detail: string;
  icon: "security" | "agile";
};
export const certifications: ReadonlyArray<Certification> = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    detail: "Valid through 2029",
    icon: "security",
  },
  {
    name: "SAFe 4 Agile Scrum Master",
    issuer: "Scaled Agile",
    detail: "Valid through 2027",
    icon: "agile",
  },
];

export type Experience = {
  title: string;
  company_name: string;
  location?: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
};
export const experiences: ReadonlyArray<Experience> = [
  {
    title: "Senior Software Engineer",
    company_name: "Xpect Solutions",
    location: "Washington, D.C.",
    icon: xpectsolutions,
    iconBg: "#01193d",
    date: "Jan 2022 – Present",
    points: [
      "Shipped 5 production React / React Native (TypeScript) applications serving ~50,000 users — owning dashboard UIs, notification surfaces, and data-heavy list/detail experiences from design through App Store release.",
      "Led a Titanium → React Native migration that cut feature-delivery and bug-fix time an estimated 3x across 3 production mobile apps; authored the framework evaluation (React Native vs. Xamarin vs. Flutter) that won senior-leadership buy-in and reset the team's mobile strategy.",
      "Architected infinite scroll, lazy loading, and caching for image-heavy, high-volume content, cutting repeat-load times by 40%.",
      "Standardized the team on a unified React ecosystem (web + mobile), driving component reuse, simpler onboarding, and component-first practices adopted team-wide.",
      "Acted as code-review gatekeeper and mentored junior developers on implementation quality and client communication; built authenticated, API-driven experiences on Firebase (Auth, Firestore, Analytics, Crashlytics).",
    ],
  },
  {
    title: "Staff Engineer",
    company_name: "Booz Allen Hamilton",
    location: "Chantilly, VA",
    icon: boozallen,
    iconBg: "#383E56",
    date: "Oct 2019 – Dec 2021",
    points: [
      "Built enterprise .NET applications and SQL-integrated APIs that automated internal data workflows for ~10,000 users; advised clients on feasibility and performance tradeoffs across Agile delivery.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "General Dynamics",
    location: "Springfield, VA",
    icon: gdit,
    iconBg: "#F5F5F5",
    date: "Jul 2017 – Oct 2019",
    points: [
      "Built SharePoint sites with automated workflows and JavaScript-enhanced UI behavior; supported production stability through incident triage and resolution.",
      "Created server-side workflows with Nintex 2010 and collaborated with dev/test teams to deliver solutions aligned to requirements.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "CACI",
    location: "Chantilly, VA",
    icon: caci,
    iconBg: "#F5F5F5",
    date: "Mar 2016 – Jul 2017",
    points: [
      "Developed dynamic pages with HTML, CSS, JavaScript, and jQuery, including AJAX and JSON interactions.",
      "Migrated SharePoint site collections (2010 → 2013) and scripted dev↔prod transitions with PowerShell; authored SOPs to improve deployment repeatability.",
    ],
  },
];
