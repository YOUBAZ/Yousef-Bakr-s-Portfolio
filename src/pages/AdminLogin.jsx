import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { authenticateAdmin } from '../utils/blogUtils';
import { motion } from 'framer-motion';

const _motion = motion;

/**
 * Admin login page
 */
const AdminLogin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        const isAuthenticated = authenticateAdmin(password);

        if (isAuthenticated) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password. Please try again.');
            setPassword('');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-ink text-bone flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="rounded-2xl p-8 border border-edge shadow-2xl">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-card rounded-full border border-hairline">
                            <Lock size={32} className="text-accent" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
                    <p className="text-muted text-center mb-8">
                        Enter your password to access the admin panel
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-card border border-hairline rounded-lg">
                            <p className="text-muted text-sm">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-body mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-card border border-edge rounded-lg text-bone placeholder:text-muted focus:outline-none focus:border-hairline transition-colors pr-12"
                                    placeholder="Enter your password"
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-bone transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-card hover:border-hairline text-bone font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-hairline"></div>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* Help Text */}
                    <p className="text-xs text-muted text-center mt-6">
                        Password is set in your environment variables (VITE_ADMIN_PASSWORD)
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
