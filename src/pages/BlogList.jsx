import { useState, useEffect } from "react";
import { Loader2, Search, X } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Seo from "../components/Seo";
import {
  getBlogPosts,
  getAllTags,
  filterBlogsByTag,
  searchBlogs,
} from "../utils/blogUtils";
import { Button, PageHeader, Section } from "../components/ui";

/**
 * Blog listing page
 */
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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
    setSelectedTag("all");
    setSearchQuery("");
  };

  const hasFilters = selectedTag !== "all" || searchQuery;

  return (
    <>
      <Seo
        title="Writing"
        description="The decisions rather than the tools — why a boundary went where it went, what it cost when it went in the wrong place, and what the traces looked like afterwards."
        keywords={[
          "architecture decisions",
          "system design",
          "trade-offs",
          "NestJS",
          "Next.js",
        ]}
        url="/blog"
      />

      <PageHeader
        eyebrow="Writing"
        title="Blog & articles"
        lede="Insights on AI, DevOps, software architecture, and modern development practices"
      />

      <Section className="pt-0">
        {/* Filters */}
        <div className="space-y-5 border-b border-edge pb-8">
          <div className="relative max-w-xl">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <Search
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="blog-search"
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ybz-input pl-11"
            />
          </div>

          <div
            role="group"
            aria-label="Filter by tag"
            className="flex flex-wrap items-center gap-2"
          >
            <span className="ybz-meta mr-2">Filter by</span>
            <button
              type="button"
              aria-pressed={selectedTag === "all"}
              onClick={() => handleTagClick("all")}
              className="ybz-chip"
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={selectedTag === tag}
                onClick={() => handleTagClick(tag)}
                className="ybz-chip"
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ybz-chip gap-2"
              >
                <X size={16} strokeWidth={1.75} aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="pt-8">
          {isLoading ? (
            <div
              role="status"
              className="flex items-center justify-center py-20 text-muted"
            >
              <Loader2
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                className="animate-spin"
              />
              <span className="sr-only">Loading articles</span>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <>
              <p className="ybz-meta mb-6" aria-live="polite">
                Showing {filteredBlogs.length} article
                {filteredBlogs.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-16">
              <h2 className="ybz-title">No articles found</h2>
              <p className="ybz-body mt-2">
                Try adjusting your search or filters
              </p>
              <Button
                variant="secondary"
                icon={X}
                iconPosition="start"
                onClick={clearFilters}
                className="mt-6"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default BlogList;
