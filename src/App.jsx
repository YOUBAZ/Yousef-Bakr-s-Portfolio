import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogEditor from "./components/BlogEditor";
import { validateEnvVars } from "./utils/validateEnv";

// Lazy load all page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificates"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const LetsTalk = lazy(() => import("./pages/LetsTalk"));
const Cv = lazy(() => import("./pages/CV"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
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
      <HelmetProvider>
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
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
