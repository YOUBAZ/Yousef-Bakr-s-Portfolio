import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Download } from 'lucide-react';
import BlogContent from './BlogContent';
import { generateSlug, estimateReadTime, downloadBlogData } from '../utils/blogUtils';
import PropTypes from 'prop-types';

/**
 * Blog editor component for creating and editing blog posts
 */
const BlogEditor = ({ mode = 'create' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        content: '',
        author: 'Yousef Bakr',
        publishDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        tags: [],
        featuredImage: '',
        readTime: 1,
        status: 'draft',
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: '',
            ogImage: '',
            ogType: 'article'
        }
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (mode === 'edit' && id) {
            loadBlog();
        }
    }, [mode, id]);

    const loadBlog = async () => {
        try {
            const response = await fetch('/data/blogs.json');
            const blogs = await response.json();
            const blog = blogs.find(b => b.id === id);
            if (blog) {
                setFormData(blog);
                setTagInput(blog.tags?.join(', ') || '');
            }
        } catch (error) {
            console.error('Error loading blog:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('seo.')) {
            const seoField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                seo: {
                    ...prev.seo,
                    [seoField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Auto-generate slug from title
        if (name === 'title' && mode === 'create') {
            const slug = generateSlug(value);
            setFormData(prev => ({ ...prev, id: slug }));
        }

        // Auto-calculate read time from content
        if (name === 'content') {
            const readTime = estimateReadTime(value);
            setFormData(prev => ({ ...prev, readTime }));
        }
    };

    const handleTagsChange = (e) => {
        const value = e.target.value;
        setTagInput(value);
        const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
        setFormData(prev => ({ ...prev, tags }));
    };

    const handleSave = async (status = 'draft') => {
        setIsSaving(true);

        // Update timestamps
        const updatedBlog = {
            ...formData,
            status,
            lastModified: new Date().toISOString(),
            publishDate: mode === 'create' ? new Date().toISOString() : formData.publishDate,
            readTime: estimateReadTime(formData.content)
        };

        try {
            // Fetch existing blogs
            const response = await fetch('/data/blogs.json');
            const existingBlogs = await response.json();

            let updatedBlogs;
            if (mode === 'edit') {
                // Update existing blog
                updatedBlogs = existingBlogs.map(blog =>
                    blog.id === id ? updatedBlog : blog
                );
            } else {
                // Add new blog
                updatedBlogs = [...existingBlogs, updatedBlog];
            }

            // Download the updated JSON file
            downloadBlogData(updatedBlogs);

            alert(`Blog ${status === 'published' ? 'published' : 'saved'}! Upload the downloaded blogs.json to public/data/ and redeploy.`);

            setIsSaving(false);

            // Navigate back to dashboard
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1000);
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Error saving blog. Please try again.');
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                            <h1 className="text-xl font-bold">
                                {mode === 'create' ? 'Create New Post' : 'Edit Post'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <Eye size={18} />
                                {showPreview ? 'Edit' : 'Preview'}
                            </button>
                            <button
                                onClick={() => handleSave('draft')}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Save size={18} />
                                Save Draft
                            </button>
                            <button
                                onClick={() => handleSave('published')}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Download size={18} />
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {showPreview ? (
                    /* Preview Mode */
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-white mb-4">{formData.title}</h1>
                            <p className="text-xl text-slate-300 mb-4">{formData.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {formData.tags?.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <BlogContent content={formData.content} />
                    </div>
                ) : (
                    /* Edit Mode */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="Enter post title"
                                    required
                                />
                            </div>

                            {/* Slug (ID) */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Slug (URL ID) *
                                </label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="post-url-slug"
                                    required
                                    disabled={mode === 'edit'}
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Auto-generated from title. This will be the URL: /blog/{formData.id}
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                    rows="3"
                                    placeholder="Short description for SEO and preview"
                                    required
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Content (Markdown) *
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm resize-none"
                                    rows="20"
                                    placeholder="Write your blog post in markdown..."
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Supports Markdown: # Headers, **bold**, *italic*, `code`, ```code blocks```, [links](url), ![images](url)
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Meta Info */}
                            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                                <h3 className="font-semibold text-white mb-4">Post Settings</h3>

                                {/* Tags */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={handleTagsChange}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="AI, DevOps, Node.js"
                                    />
                                </div>

                                {/* Featured Image */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Featured Image URL
                                    </label>
                                    <input
                                        type="text"
                                        name="featuredImage"
                                        value={formData.featuredImage}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="/images/blog/my-image.jpg"
                                    />
                                </div>

                                {/* Read Time */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Read Time (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="readTime"
                                        value={formData.readTime}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                        min="1"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Auto-calculated from content</p>
                                </div>
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                                <h3 className="font-semibold text-white mb-4">SEO Settings</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            name="seo.metaTitle"
                                            value={formData.seo.metaTitle}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                            placeholder="SEO optimized title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Meta Description
                                        </label>
                                        <textarea
                                            name="seo.metaDescription"
                                            value={formData.seo.metaDescription}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                            rows="3"
                                            placeholder="SEO description (155 chars)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Keywords
                                        </label>
                                        <input
                                            type="text"
                                            name="seo.keywords"
                                            value={formData.seo.keywords}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                            placeholder="keyword1, keyword2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BlogEditor.propTypes = {
    mode: PropTypes.oneOf(['create', 'edit'])
};

export default BlogEditor;
