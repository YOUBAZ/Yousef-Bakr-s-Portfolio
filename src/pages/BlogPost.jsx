import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Twitter, Linkedin } from 'lucide-react';
import BlogContent from '../components/BlogContent';
import SEOHead from '../components/SEOHead';
import { getBlogById, formatDate, formatDateISO, getRelatedPosts, getBlogPosts } from '../utils/blogUtils';
import { motion } from 'framer-motion';

/**
 * Individual blog post page
 */
const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);
      const blogData = await getBlogById(id);
      
      if (!blogData) {
        navigate('/blog');
        return;
      }

      setBlog(blogData);

      // Load related posts
      const allBlogs = await getBlogPosts();
      const related = getRelatedPosts(blogData, allBlogs, 3);
      setRelatedPosts(related);

      setIsLoading(false);

      // Scroll to top
      window.scrollTo(0, 0);
    };

    loadBlog();
  }, [id, navigate]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = blog.title;

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Create structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    image: blog.featuredImage ? `https://yousef-bakr-s-portfolio.vercel.app${blog.featuredImage}` : undefined,
    datePublished: formatDateISO(blog.publishDate),
    dateModified: formatDateISO(blog.lastModified),
    author: {
      '@type': 'Person',
      name: blog.author
    },
    publisher: {
      '@type': 'Person',
      name: 'Yousef Bakr'
    },
    keywords: blog.tags?.join(', ')
  };

  return (
    <>
      <SEOHead
        title={blog.seo?.metaTitle || `${blog.title} - Yousef Bakr`}
        description={blog.seo?.metaDescription || blog.description}
        keywords={blog.seo?.keywords || blog.tags?.join(', ')}
        canonicalUrl={`/blog/${blog.id}`}
        ogImage={blog.seo?.ogImage || blog.featuredImage}
        ogType="article"
        publishDate={formatDateISO(blog.publishDate)}
        lastModified={formatDateISO(blog.lastModified)}
        author={blog.author}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 pb-20">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, idx) => (
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" />
                {formatDate(blog.publishDate)}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-cyan-400" />
                {blog.readTime} min read
              </div>
              <div className="flex items-center gap-2">
                By <span className="text-white font-medium">{blog.author}</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
              >
                <Share2 size={18} />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-10">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-700 transition-colors text-left"
                  >
                    <Twitter size={18} className="text-blue-400" />
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-700 transition-colors text-left"
                  >
                    <Linkedin size={18} className="text-blue-500" />
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-700 transition-colors text-left"
                  >
                    <Share2 size={18} className="text-cyan-400" />
                    Copy Link
                  </button>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-700">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </motion.header>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-12 pb-8 border-b border-slate-800"
          >
            {blog.description}
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BlogContent content={blog.content} />
          </motion.div>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-slate-800"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Written by {blog.author}</h3>
                  <p className="text-slate-400">
                    Full-Stack Software Engineer & Systems Analyst
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-slate-900/50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    to={`/blog/${relatedBlog.id}`}
                    className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    {relatedBlog.featuredImage && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={relatedBlog.featuredImage}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = '/images/blog/default-blog.jpg';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {relatedBlog.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;
