import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDate } from "../utils/blogUtils";
import { CoverImage } from "./ui";
import { Card, StackLine, TextLink } from "./ui";

const defaultImage = "/images/blog/default.png";

/**
 * A post in the writing index. The banner sits in a surface frame at its own
 * 1200 × 630 ratio; hover is the card's border step and nothing else.
 */
const BlogCard = ({ blog }) => {
  const href = `/blog/${blog.id}`;

  return (
    <Card
      as="article"
      interactive
      padded={false}
      className="flex h-full flex-col"
    >
      <Link to={href} tabIndex={-1} aria-hidden="true" className="block">
        <div className="ybz-frame ybz-frame--cover aspect-[40/21]">
          <CoverImage
            src={blog.featuredImage || defaultImage}
            alt=""
            fallback={defaultImage}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {blog.tags && blog.tags.length > 0 && (
          <StackLine items={blog.tags.slice(0, 3)} className="mb-3" />
        )}

        <h3 className="ybz-title line-clamp-2">
          <Link
            to={href}
            className="transition-colors duration-150 hover:text-accent"
          >
            {blog.title}
          </Link>
        </h3>

        <p className="ybz-body mt-3 line-clamp-3">{blog.description}</p>

        <div className="mt-auto pt-6">
          <p className="ybz-source border-t border-edge pt-4">
            <time dateTime={blog.publishDate}>
              {formatDate(blog.publishDate)}
            </time>
            {" · "}
            {blog.readTime} min read
          </p>
          <TextLink to={href} className="mt-4">
            Read article
          </TextLink>
        </div>
      </div>
    </Card>
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
