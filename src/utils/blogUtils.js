/**
 * Blog utility functions for managing blog posts
 */

/**
 * Fetch all blog posts from JSON file
 * @returns {Promise<Array>} Array of blog posts
 */
export const getBlogPosts = async () => {
    try {
        const response = await fetch('/data/blogs.json');
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        const blogs = await response.json();

        // Filter only published blogs and sort by date (newest first)
        return blogs
            .filter(blog => blog.status === 'published')
            .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

/**
 * Get a single blog post by ID
 * @param {string} id - Blog post ID (slug)
 * @returns {Promise<Object|null>} Blog post or null if not found
 */
export const getBlogById = async (id) => {
    try {
        const blogs = await getBlogPosts();
        return blogs.find(blog => blog.id === id) || null;
    } catch (error) {
        console.error(`Error fetching blog post ${id}:`, error);
        return null;
    }
};

/**
 * Get all unique tags from blog posts
 * @returns {Promise<Array>} Array of unique tags
 */
export const getAllTags = async () => {
    try {
        const blogs = await getBlogPosts();
        const tagsSet = new Set();
        blogs.forEach(blog => {
            blog.tags?.forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
};

/**
 * Filter blogs by tag
 * @param {Array} blogs - Array of blog posts
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered blog posts
 */
export const filterBlogsByTag = (blogs, tag) => {
    if (!tag || tag === 'all') return blogs;
    return blogs.filter(blog => blog.tags?.includes(tag));
};

/**
 * Search blogs by query (title, description, tags)
 * @param {Array} blogs - Array of blog posts
 * @param {string} query - Search query
 * @returns {Array} Filtered blog posts
 */
export const searchBlogs = (blogs, query) => {
    if (!query) return blogs;

    const lowerQuery = query.toLowerCase();
    return blogs.filter(blog => {
        const titleMatch = blog.title?.toLowerCase().includes(lowerQuery);
        const descMatch = blog.description?.toLowerCase().includes(lowerQuery);
        const tagsMatch = blog.tags?.some(tag =>
            tag.toLowerCase().includes(lowerQuery)
        );
        return titleMatch || descMatch || tagsMatch;
    });
};

/**
 * Generate URL-friendly slug from title
 * @param {string} title - Blog post title
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

/**
 * Estimate reading time based on content length
 * @param {string} content - Blog post content (markdown)
 * @returns {number} Estimated reading time in minutes
 */
export const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes);
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format date for SEO (ISO format)
 * @param {string} dateString - Date string
 * @returns {string} ISO formatted date
 */
export const formatDateISO = (dateString) => {
    return new Date(dateString).toISOString();
};

/**
 * Save blog data as JSON file (for admin panel)
 * @param {Array} blogs - Array of blog posts
 * @param {string} filename - File name
 */
export const downloadBlogData = (blogs, filename = 'blogs.json') => {
    const dataStr = JSON.stringify(blogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Get related posts based on tags
 * @param {Object} currentBlog - Current blog post
 * @param {Array} allBlogs - All blog posts
 * @param {number} limit - Maximum number of related posts
 * @returns {Array} Related blog posts
 */
export const getRelatedPosts = (currentBlog, allBlogs, limit = 3) => {
    if (!currentBlog || !allBlogs) return [];

    // Calculate relevance score based on matching tags
    const scoredBlogs = allBlogs
        .filter(blog => blog.id !== currentBlog.id)
        .map(blog => {
            const matchingTags = blog.tags?.filter(tag =>
                currentBlog.tags?.includes(tag)
            ).length || 0;
            return { blog, score: matchingTags };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.blog);

    return scoredBlogs;
};

/**
 * Extract table of contents from markdown content
 * @param {string} content - Markdown content
 * @returns {Array} Array of headings with id and text
 */
export const extractTableOfContents = (content) => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = generateSlug(text);

        headings.push({
            id,
            text,
            level
        });
    }

    return headings;
};

/**
 * Check if user is authenticated as admin
 * @returns {boolean} True if authenticated
 */
export const isAdminAuthenticated = () => {
    const session = localStorage.getItem('admin_session');
    if (!session) return false;

    try {
        const { expiry } = JSON.parse(session);
        return new Date(expiry) > new Date();
    } catch {
        return false;
    }
};

/**
 * Authenticate admin user
 * @param {string} password - Admin password
 * @returns {boolean} True if authentication successful
 */
export const authenticateAdmin = (password) => {
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (password === correctPassword) {
        // Create session valid for 24 hours
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 24);

        localStorage.setItem('admin_session', JSON.stringify({
            expiry: expiry.toISOString()
        }));

        return true;
    }

    return false;
};

/**
 * Logout admin user
 */
export const logoutAdmin = () => {
    localStorage.removeItem('admin_session');
};
