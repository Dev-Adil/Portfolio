import { Suspense, lazy } from "react";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
// const Works = lazy(() => import("./components/Works"));
// const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  const patterns = [
    "bg-hero-pattern-1",
    "bg-hero-pattern-2",
    "bg-hero-pattern-3",
    "bg-hero-pattern-4",
  ];
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return (
    <div className="relative z-0 bg-primary">
      <Suspense fallback={<div className="text-white p-8">Loading…</div>}>
        <div className={`${randomPattern} bg-cover bg-no-repeat bg-center`}>
          <Navbar />
          <Hero />
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
      </Suspense>
    </div>
  );
};

export default App;

