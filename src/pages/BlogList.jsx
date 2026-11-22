import { useState, useEffect, useMemo } from "react";
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

/** How many topics show before the rest fold behind "More topics". */
const TOP_TAGS = 6;

/** Below this many posts, search and topic filters cost more than they help. */
const FILTER_THRESHOLD = 15;

/**
 * The writing index. Search first, then the most-used topics; the long tail of
 * tags is one click away, so the articles stay near the top of the page.
 */
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAllTags, setShowAllTags] = useState(false);

  // Topics ordered by how many articles use them, then alphabetically.
  const rankedTags = useMemo(() => {
    const count = (tag) => blogs.filter((b) => b.tags?.includes(tag)).length;
    return [...allTags].sort((a, b) => count(b) - count(a) || a.localeCompare(b));
  }, [allTags, blogs]);

  const visibleTags = useMemo(() => {
    if (showAllTags) return rankedTags;
    const top = rankedTags.slice(0, TOP_TAGS);
    // A selected topic from the long tail stays visible so its state is seen.
    return selectedTag !== "all" && !top.includes(selectedTag)
      ? [...top, selectedTag]
      : top;
  }, [rankedTags, showAllTags, selectedTag]);

  const hiddenCount = rankedTags.length - visibleTags.length;

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
        title="Notes on AI systems, DevOps and architecture."
        lede="Longer pieces on the tools and patterns I work with. The architecture decisions themselves are written up in each case study."
      />

      <Section className="pt-0">
        {/* Filters: only once there is enough writing to need them. */}
        {blogs.length >= FILTER_THRESHOLD && (
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
            {visibleTags.map((tag) => (
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
            {(hiddenCount > 0 || showAllTags) && (
              <button
                type="button"
                aria-expanded={showAllTags}
                onClick={() => setShowAllTags((v) => !v)}
                className="ybz-link min-h-9 px-2"
              >
                {showAllTags ? "Fewer topics" : `More topics (${hiddenCount})`}
              </button>
            )}
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

        )}

        {/* Posts */}
        <div className={blogs.length >= FILTER_THRESHOLD ? "pt-8" : ""}>
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
              <ol className="border-t border-edge">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </ol>
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
