import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import PropTypes from "prop-types";

/**
 * The syntax ramp, brand-kit/BRAND.md section 3: palette colours only, read
 * from CSS variables so a code block follows the theme.
 *
 *   comment, punctuation  muted
 *   string, function      ink
 *   number, keyword       signal as text
 */
const SYN = {
  plain: "var(--ybz-syn-plain)",
  comment: "var(--ybz-syn-comment)",
  string: "var(--ybz-syn-string)",
  number: "var(--ybz-syn-number)",
  fn: "var(--ybz-syn-function)",
  keyword: "var(--ybz-syn-keyword)",
};

/* The ground lives in .ybz-code in index.css; the highlighter stays transparent. */
const brandSyntaxTheme = {
  'code[class*="language-"]': {
    color: SYN.plain,
    background: "none",
    fontFamily: "var(--ybz-mono)",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    tabSize: 4,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: SYN.plain,
    background: "transparent",
    fontFamily: "var(--ybz-mono)",
    overflow: "auto",
  },
  comment: { color: SYN.comment },
  prolog: { color: SYN.comment },
  doctype: { color: SYN.comment },
  cdata: { color: SYN.comment },
  punctuation: { color: SYN.comment },
  operator: { color: SYN.comment },
  string: { color: SYN.string },
  char: { color: SYN.string },
  "attr-value": { color: SYN.string },
  regex: { color: SYN.string },
  number: { color: SYN.number },
  boolean: { color: SYN.number },
  constant: { color: SYN.number },
  symbol: { color: SYN.number },
  function: { color: SYN.fn },
  "class-name": { color: SYN.fn },
  "attr-name": { color: SYN.fn },
  property: { color: SYN.fn },
  variable: { color: SYN.fn },
  keyword: { color: SYN.keyword },
  atrule: { color: SYN.keyword },
  selector: { color: SYN.keyword },
  tag: { color: SYN.keyword },
  important: { color: SYN.keyword, fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

/**
 * Blog content component for rendering markdown with custom styling
 */
const BlogContent = ({ content }) => {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom heading styles
          h1: ({ children }) => (
            <h1 className="ybz-display-2 mb-6 mt-12 border-b border-edge pb-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="ybz-display-2 mb-4 mt-12 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-8 text-xl font-semibold leading-snug text-bone">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="ybz-title mb-3 mt-6">{children}</h4>
          ),

          // Custom paragraph
          p: ({ children }) => (
            <p className="ybz-body mb-4 sm:text-base sm:leading-8">
              {children}
            </p>
          ),

          // Custom links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent underline decoration-hairline underline-offset-4 transition-colors duration-150 hover:decoration-current"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),

          // Custom code blocks
          // react-markdown 10 dropped the `inline` prop. A fenced block is
          // rendered as <pre><code>; `pre` unwraps so the frame below is the
          // only block wrapper, and a block is recognised by its language
          // class or a newline in its text.
          pre: ({ children }) => <>{children}</>,

          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const text = String(children);
            const isBlock = Boolean(match) || text.includes("\n");

            if (isBlock && !match) {
              // Plain fenced block: diagrams, shell output. Same frame, no
              // highlighting, scrolls sideways instead of overflowing.
              return (
                <div className="ybz-code">
                  <div className="ybz-code__bar">
                    <span>text</span>
                  </div>
                  <div className="ybz-code__body">
                    <pre className="m-0 p-4 font-mono text-sm leading-6 text-bone">
                      {text.replace(/\n$/, "")}
                    </pre>
                  </div>
                </div>
              );
            }

            return isBlock ? (
              // .ybz-code owns the ground, a surface that follows the theme.
              <div className="ybz-code">
                <div className="ybz-code__bar">
                  <span>{language}</span>
                </div>
                <div className="ybz-code__body">
                  <SyntaxHighlighter
                    style={brandSyntaxTheme}
                    language={language}
                    PreTag="div"
                    wrapperStyle={{
                      border: "none",
                      outline: "none",
                    }}
                    customStyle={{
                      margin: 0,
                      padding: "1.25rem",
                      background: "transparent",
                      fontSize: "0.875rem",
                      lineHeight: "1.7",
                      border: "none",
                      outline: "none",
                    }}
                    codeTagProps={{
                      style: {
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        fontFamily: "var(--ybz-mono)",
                      },
                    }}
                    lineProps={{
                      style: {
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code
                className="border border-edge bg-card px-1.5 py-0.5 font-mono text-sm text-bone"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Custom lists
          ul: ({ children }) => (
            <ul className="ybz-body mb-4 ml-4 list-inside list-disc space-y-2 sm:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="ybz-body mb-4 ml-4 list-inside list-decimal space-y-2 sm:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,

          // Custom blockquote
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-hairline py-1 pl-6 text-bone">
              <div>{children}</div>
            </blockquote>
          ),

          // Custom table
          table: ({ children }) => (
            <div className="ybz-card my-6 overflow-x-auto">
              <table className="min-w-full">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-card">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-edge">{children}</tbody>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className="border-b border-edge px-4 py-3 text-left text-sm font-semibold text-bone">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-body">{children}</td>
          ),

          // Custom images
          img: ({ src, alt }) => (
            <figure className="my-8">
              <img
                src={src}
                alt={alt}
                className="w-full border border-edge"
                style={{ borderRadius: "var(--ybz-r-md)" }}
                loading="lazy"
              />
              {alt && (
                <figcaption className="ybz-source mt-3">{alt}</figcaption>
              )}
            </figure>
          ),

          // Custom horizontal rule
          hr: () => <hr className="my-8 border-edge" />,

          // Custom strong/bold
          strong: ({ children }) => (
            <strong className="font-semibold text-bone">{children}</strong>
          ),

          // Custom emphasis/italic
          em: ({ children }) => (
            <em className="italic text-bone">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

BlogContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default BlogContent;
