import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDate } from "../utils/blogUtils";
import { StackLine, TextLink } from "./ui";

/**
 * A post in the writing index: one row on the page grid (3 / 7 / 2), like the
 * project index. Date and topics in columns 1–3, title and summary in 4–10,
 * the link in 11–12. No cover here: the generated cover repeats the title at a
 * size no one can read. It stays the article's banner and social image.
 */
const BlogCard = ({ blog }) => {
  const href = `/blog/${blog.id}`;

  return (
    <li className="group relative grid gap-3 border-b border-edge py-8 md:grid-cols-12 md:gap-x-6">
      <div className="space-y-2 md:col-span-3">
        <p className="ybz-meta">
          <time dateTime={blog.publishDate}>{formatDate(blog.publishDate)}</time>
          {" · "}
          {blog.readTime} min read
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <StackLine items={blog.tags.slice(0, 3)} />
        )}
      </div>

      <div className="space-y-2 md:col-span-7">
        <h3 className="ybz-title">
          {/* The link covers the whole row; the title is its name. */}
          <Link
            to={href}
            className="underline decoration-transparent underline-offset-4 transition-colors duration-150 after:absolute after:inset-0 after:content-[''] group-hover:decoration-[var(--ybz-signal)]"
          >
            {blog.title}
          </Link>
        </h3>
        <p className="ybz-body line-clamp-3">{blog.description}</p>
      </div>

      <div className="md:col-span-2 md:justify-self-end">
        <TextLink to={href} tabIndex={-1} aria-hidden="true">
          Read
        </TextLink>
      </div>
    </li>
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
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BlogCard;
