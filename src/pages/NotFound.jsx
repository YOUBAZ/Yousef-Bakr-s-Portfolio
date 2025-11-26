import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";
import Seo from "../components/Seo";

const NotFound = () => {
    return (
        <>
            <Seo
                title="404 - Page Not Found"
                description="The page you're looking for doesn't exist."
                noindex={true}
            />

            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full text-center"
                >
                    {/* 404 Illustration */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="inline-flex items-center justify-center w-32 h-32 bg-slate-900 border border-white/10 rounded-full mb-8"
                    >
                        <FileQuestion className="text-sky-400" size={64} />
                    </motion.div>

                    {/* 404 Text */}
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        Page Not Found
                    </h2>

                    <p className="text-slate-400 mb-8">
                        Oops! The page you're looking for doesn't exist. It might have been
                        moved or deleted, or you may have mistyped the URL.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]"
                        >
                            <Home size={20} />
                            Go Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg border border-white/10 transition"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-sm text-slate-500 mb-4">Explore other pages:</p>
                        <div className="flex flex-wrap gap-3 justify-center text-sm">
                            <Link
                                to="/projects"
                                className="text-slate-400 hover:text-white transition"
                            >
                                Projects
                            </Link>
                            <span className="text-slate-700">•</span>
                            <Link
                                to="/certificates"
                                className="text-slate-400 hover:text-white transition"
                            >
                                Certificates
                            </Link>
                            <span className="text-slate-700">•</span>
                            <Link
                                to="/about"
                                className="text-slate-400 hover:text-white transition"
                            >
                                About
                            </Link>
                            <span className="text-slate-700">•</span>
                            <Link
                                to="/contact"
                                className="text-slate-400 hover:text-white transition"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
