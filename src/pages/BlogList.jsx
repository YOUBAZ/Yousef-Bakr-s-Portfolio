import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SEOHead from '../components/SEOHead';
import { getBlogPosts, getAllTags, filterBlogsByTag, searchBlogs } from '../utils/blogUtils';
import { motion } from 'framer-motion';

/**
 * Blog listing page
 */
const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            setIsLoading(true);
            const blogData = await getBlogPosts();
            const tags = await getAllTags();
            setBlogs(blogData);
            setFilteredBlogs(blogData);
            setAllTags(tags);
            setIsLoading(false);
        };

        loadBlogs();
    }, []);

    useEffect(() => {
        let result = blogs;

        // Apply tag filter
        result = filterBlogsByTag(result, selectedTag);

        // Apply search
        result = searchBlogs(result, searchQuery);

        setFilteredBlogs(result);
    }, [selectedTag, searchQuery, blogs]);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const clearFilters = () => {
        setSelectedTag('all');
        setSearchQuery('');
    };

    return (
        <>
            <SEOHead
                title="Blog - Yousef Bakr | AI, DevOps & Software Engineering"
                description="Read articles about AI engineering, DevOps practices, microservices architecture, and modern software development by Yousef Bakr."
                keywords="blog, AI, DevOps, software engineering, microservices, Node.js, Python, tutorials"
                canonicalUrl="/blog"
                ogImage="/images/blog/blog-cover.jpg"
            />

            <div className="min-h-screen bg-slate-950 text-white">
                {/* Hero Section */}
                <section className="relative py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Blog & Articles
                            </h1>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                                Insights on AI, DevOps, software architecture, and modern development practices
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="px-4 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Tag Filters */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Filter size={18} />
                                    <span className="text-sm font-medium">Filter by:</span>
                                </div>

                                <button
                                    onClick={() => handleTagClick('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTag === 'all'
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                        }`}
                                >
                                    All
                                </button>

                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTag === tag
                                                ? 'bg-cyan-500 text-white'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}

                                {(selectedTag !== 'all' || searchQuery) && (
                                    <button
                                        onClick={clearFilters}
                                        className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all flex items-center gap-2"
                                    >
                                        <X size={16} />
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="px-4 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                            </div>
                        ) : filteredBlogs.length > 0 ? (
                            <>
                                <div className="mb-6 text-slate-400">
                                    Showing {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredBlogs.map((blog, index) => (
                                        <BlogCard key={blog.id} blog={blog} index={index} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                                <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default BlogList;
