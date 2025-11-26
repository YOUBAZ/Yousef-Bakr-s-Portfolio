import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { validateEnvVars } from "./utils/validateEnv";

// Lazy load all page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificates"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const LetsTalk = lazy(() => import("./pages/LetsTalk"));
const Cv = lazy(() => import("./pages/CV"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Validate environment variables on mount
  useEffect(() => {
    validateEnvVars([
      "VITE_EMAILJS_SERVICE_ID",
      "VITE_EMAILJS_TEMPLATE_ID",
      "VITE_EMAILJS_PUBLIC_KEY",
    ]);
  }, []);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white">
          <Navbar toggleMobileMenu={toggleMobileMenu} />

          <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />

          <main className="pt-20">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/lets-talk" element={<LetsTalk />} />
                <Route path="/cv" element={<Cv />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <ScrollToTop />
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
