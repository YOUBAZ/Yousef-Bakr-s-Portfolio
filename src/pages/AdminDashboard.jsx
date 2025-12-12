import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Download, LogOut, AlertCircle } from 'lucide-react';
import { getBlogPosts, logoutAdmin, downloadBlogData, formatDate } from '../utils/blogUtils';
import { motion } from 'framer-motion';

/**
 * Admin dashboard for managing blog posts
 */
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setIsLoading(true);
        // Get all blogs including drafts
        const response = await fetch('/data/blogs.json');
        const allBlogs = await response.json();
        setBlogs(allBlogs.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)));
        setIsLoading(false);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            logoutAdmin();
            navigate('/admin/login');
        }
    };

    const handleDelete = (blogId) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
            setBlogs(updatedBlogs);

            // Download the updated JSON
            downloadBlogData(updatedBlogs);

            alert('Blog deleted! Please upload the downloaded blogs.json file to your public/data/ folder and redeploy.');
        }
    };

    const handleExport = () => {
        downloadBlogData(blogs);
        alert('blogs.json downloaded! Upload this file to your public/data/ folder and redeploy to save changes.');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-slate-400 mt-1">Manage your blog posts</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-500/10 border-b border-blue-500/20">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                        <div className="text-sm text-blue-300">
                            <p className="font-medium mb-1">Important: How to Save Changes</p>
                            <p className="text-blue-400">
                                After creating, editing, or deleting posts, click "Export All Blogs" to download the JSON file.
                                Then manually upload it to <code className="px-1 py-0.5 bg-blue-500/20 rounded">public/data/blogs.json</code> and redeploy your site.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Actions */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-slate-400">Total Posts: {blogs.length}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                        >
                            <Download size={18} />
                            Export All Blogs
                        </button>
                        <Link
                            to="/admin/blog/new"
                            className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                        >
                            <PlusCircle size={18} />
                            Create New Post
                        </Link>
                    </div>
                </div>

                {/* Blog List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="space-y-4">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white">{blog.title}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${blog.status === 'published'
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                }`}>
                                                {blog.status || 'draft'}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 mb-3">{blog.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span>Published: {formatDate(blog.publishDate)}</span>
                                            <span>•</span>
                                            <span>{blog.readTime} min read</span>
                                            <span>•</span>
                                            <span>{blog.tags?.length || 0} tags</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/admin/blog/edit/${blog.id}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No blog posts yet</h3>
                        <p className="text-slate-400 mb-6">Create your first blog post to get started</p>
                        <Link
                            to="/admin/blog/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                        >
                            <PlusCircle size={18} />
                            Create New Post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
