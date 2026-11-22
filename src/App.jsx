import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import { validateEnvVars } from "./utils/validateEnv";
import useTheme from "./hooks/useTheme";

// Lazy load all page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Certificates = lazy(() => import("./pages/Certificates"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cv = lazy(() => import("./pages/CV"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogEditor = lazy(() => import("./components/BlogEditor"));

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Validate environment variables on mount
  useEffect(() => {
    validateEnvVars([
      "VITE_EMAILJS_SERVICE_ID",
      "VITE_EMAILJS_TEMPLATE_ID",
      "VITE_EMAILJS_PUBLIC_KEY",
    ]);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-ink text-slate-body">
          {/* Seven nav items sit before the content on every page. Without this a
              keyboard or screen-reader user tabs through all of them each time. */}
          <a href="#main" className="ybz-skip-link">
            Skip to content
          </a>

          <Navbar
            toggleMobileMenu={toggleMobileMenu}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />

          <main id="main" className="pt-20">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/lets-talk" element={<Navigate to="/contact" replace />} />
                <Route path="/cv" element={<Cv />} />

                {/* Blog Routes */}
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/blog/new"
                  element={
                    <ProtectedRoute>
                      <BlogEditor mode="create" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/blog/edit/:id"
                  element={
                    <ProtectedRoute>
                      <BlogEditor mode="edit" />
                    </ProtectedRoute>
                  }
                />

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
