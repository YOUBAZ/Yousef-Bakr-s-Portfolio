import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { formatDate } from '../utils/blogUtils';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Blog card component for displaying blog posts in listing
 */
const BlogCard = ({ blog, index = 0 }) => {
    const defaultImage = '/images/blog/default-blog.jpg';

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
            {/* Featured Image */}
            <Link to={`/blog/${blog.id}`} className="block overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={blog.featuredImage || defaultImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = defaultImage;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
                </div>
            </Link>

            {/* Content */}
            <div className="p-6">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 3).map((tag, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                            >
                                <Tag size={12} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <Link to={`/blog/${blog.id}`}>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {blog.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-cyan-400" />
                            {formatDate(blog.publishDate)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} className="text-cyan-400" />
                            {blog.readTime} min read
                        </span>
                    </div>
                </div>

                {/* Read More Link */}
                <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                >
                    Read Article
                    <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>

            {/* Hover Effect Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
            </div>
        </motion.article>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        featuredImage: PropTypes.string,
        publishDate: PropTypes.string.isRequired,
        readTime: PropTypes.number.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    index: PropTypes.number
};

export default BlogCard;
