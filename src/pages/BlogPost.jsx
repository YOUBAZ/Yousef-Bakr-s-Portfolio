import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Loader2, Share2, Twitter } from "lucide-react";
import BlogContent from "../components/BlogContent";
import Seo from "../components/Seo";
import { BRAND } from "../config/brand";
import {
  getBlogById,
  formatDate,
  formatDateISO,
  getRelatedPosts,
  getBlogPosts,
} from "../utils/blogUtils";
import {
  Button,
  Card,
  PageHeader,
  Section,
  SectionHeader,
  StackLine,
} from "../components/ui";

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
        navigate("/blog");
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

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard");
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div
        role="status"
        className="flex min-h-screen items-center justify-center text-muted"
      >
        <Loader2
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="animate-spin"
        />
        <span className="sr-only">Loading article</span>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Create structured data for SEO. Seo.jsx wraps this in the @graph, so the
  // @context belongs there rather than here.
  const structuredData = {
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.featuredImage
      ? `https://yousef-bakr-s-portfolio.vercel.app${blog.featuredImage}`
      : undefined,
    datePublished: formatDateISO(blog.publishDate),
    dateModified: formatDateISO(blog.lastModified),
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Person",
      name: "Yousef Bakr",
    },
    keywords: blog.tags?.join(", "),
  };

  return (
    <>
      <Seo
        title={blog.seo?.metaTitle || blog.title}
        description={blog.seo?.metaDescription || blog.description}
        keywords={blog.seo?.keywords || blog.tags}
        url={`/blog/${blog.id}`}
        image={blog.seo?.ogImage || blog.featuredImage}
        type="article"
        publishDate={formatDateISO(blog.publishDate)}
        lastModified={formatDateISO(blog.lastModified)}
        author={blog.author}
        schema={structuredData}
      />

      <PageHeader eyebrow="Writing" title={blog.title} lede={blog.description}>
        <p className="ybz-source mt-6">
          <time dateTime={formatDateISO(blog.publishDate)}>
            {formatDate(blog.publishDate)}
          </time>
          {" · "}
          {blog.readTime} min read
          {" · "}
          By <span className="text-bone">{blog.author}</span>
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <StackLine items={blog.tags} className="mt-2" />
        )}
      </PageHeader>

      <Section className="pt-0">
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              to="/blog"
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              iconPosition="start"
            >
              Back to blog
            </Button>

            <div className="relative">
              <Button
                variant="secondary"
                size="sm"
                icon={Share2}
                iconPosition="start"
                aria-expanded={showShareMenu}
                aria-haspopup="true"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                Share
              </Button>

              {showShareMenu && (
                <div className="ybz-card absolute left-0 top-full z-10 mt-2 min-w-56 overflow-hidden py-1">
                  {[
                    {
                      label: "Share on Twitter",
                      icon: Twitter,
                      onClick: () => handleShare("twitter"),
                    },
                    {
                      label: "Share on LinkedIn",
                      icon: Linkedin,
                      onClick: () => handleShare("linkedin"),
                    },
                    { label: "Copy link", icon: Share2, onClick: copyLink },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={item.onClick}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-bone transition-colors duration-150 hover:bg-obsidian"
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="text-accent"
                        />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {blog.featuredImage && (
            <Card padded={false} className="mt-8">
              <div className="ybz-frame aspect-[40/21] border-b-0">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </Card>
          )}

          <div className="mt-12">
            <BlogContent content={blog.content} />
          </div>

          <Card className="mt-12">
            <h2 className="ybz-title">Written by {blog.author}</h2>
            <p className="ybz-meta mt-1">{BRAND.role}</p>
          </Card>
        </article>
      </Section>

      {relatedPosts.length > 0 && (
        <Section tone="raised" className="border-b-0">
          <SectionHeader title="Related articles" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedBlog) => (
              <Card
                key={relatedBlog.id}
                as={Link}
                to={`/blog/${relatedBlog.id}`}
                interactive
                padded={false}
                className="group block"
              >
                {relatedBlog.featuredImage && (
                  <div className="ybz-frame aspect-[40/21]">
                    <img
                      src={relatedBlog.featuredImage}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/blog/default-blog.jpg";
                      }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="ybz-title line-clamp-2 transition-colors duration-150 group-hover:text-accent">
                    {relatedBlog.title}
                  </h3>
                  <p className="ybz-body mt-2 line-clamp-2">
                    {relatedBlog.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default BlogPost;
