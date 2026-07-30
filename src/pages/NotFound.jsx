import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Seo from "../components/Seo";
import Signet from "../components/Signet";

const _motion = motion;

const quickLinks = [
    { label: "Projects", to: "/projects" },
    { label: "Writing", to: "/blog" },
    { label: "Certificates", to: "/certificates" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

const NotFound = () => {
    return (
        <>
            <Seo
                title="404"
                description="That page does not exist."
                url="/404"
                noindex
            />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 py-20">
                <div className="ybz-bloom pointer-events-none absolute inset-0" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                    className="relative w-full max-w-lg text-center"
                >
                    <div className="mb-8 flex justify-center">
                        <Signet size={56} />
                    </div>

                    <p className="ybz-figure text-6xl text-bone md:text-7xl">404</p>

                    <h1 className="mt-4 font-display text-3xl text-bone">
                        That page does not exist.
                    </h1>

                    <hr className="ybz-rule mx-auto mt-6" />

                    <p className="mt-6 leading-8 text-slate-body">
                        Either the URL is mistyped or the route was removed. Both are
                        recoverable.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link to="/" className="ybz-btn-primary justify-center">
                            <Home size={18} />
                            Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="ybz-btn-ghost justify-center"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                    </div>

                    <div className="mt-12 border-t border-edge pt-8">
                        <p className="ybz-eyebrow">Elsewhere</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-muted transition-colors hover:text-bone"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
