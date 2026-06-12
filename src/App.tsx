/**
 * Main Application Component
 *
 * Orchestrates lazy-loaded sections for code-split, fast initial load.
 *
 * @component
 */

import { Suspense, lazy } from "react";

// Lazy load all major sections for code splitting
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Stats = lazy(() => import("./components/Stats"));
const Tech = lazy(() => import("./components/Tech"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <div className="relative z-0 bg-primary texture-dots">
      <Suspense fallback={<div className="text-white p-8">Loading…</div>}>
        <div className="relative bg-gradient-to-b from-[#050816] via-[#0a0a1e] to-[#050816]">
          <div className="relative z-10">
            <Navbar />
            <Hero />
          </div>
        </div>
        <Stats />
        <About />
        <Experience />
        <Tech />
        <Education />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
