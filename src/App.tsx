/**
 * Main Application Component
 * 
 * Orchestrates lazy-loaded components and manages 3D asset preloading.
 * All major components are code-split for optimal initial load performance.
 * 
 * @component
 */

import { Suspense, lazy, useEffect } from "react";
import { preloadEarth, preloadBallTextures } from "./three-preload";

// Lazy load all major components for code splitting
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
// const Works = lazy(() => import("./components/Works"));
// const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
const WaveBackground = lazy(() => import("./components/canvas/WaveBackground"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  // Preload 3D models and textures asynchronously on app start
  // Deferred to avoid blocking initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      preloadEarth();
      preloadBallTextures();
    }, 1000); // Start preloading after 1 second to not interfere with initial page load
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative z-0 bg-primary">
      <Suspense fallback={<div className="text-white p-8">Loading…</div>}>
        <div className="relative bg-gradient-to-b from-[#050816] via-[#0a0a1e] to-[#050816]">
          <WaveBackground />
          <div className="relative z-10">
            <Navbar />
            <Hero />
          </div>
        </div>
        <About />
        <Experience />
        <Tech />
        {/* <Works /> */}
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;

