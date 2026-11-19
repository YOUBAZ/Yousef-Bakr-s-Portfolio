import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import PropTypes from "prop-types";

/**
 * The section 3.4 syntax ramp, built only from palette colours. This replaces
 * vscDarkPlus, whose green/violet/sky ramp was retired in v2.4 — six colours in
 * a code block is exactly the drift section 3.6 warns about.
 *
 *   comment  muted      #7C8698
 *   string   slate      #A8B0BE
 *   number   gold deep  #E0A906
 *   function bone       #F5F3EF
 *   keyword  gold light #F2CC5A
 *   punct    muted      #7C8698
 */
/* The ground lives in .ybz-code in index.css, not here: section 3.3 defines a
   different code ground for light pages, and only CSS can see the theme. */
const brandSyntaxTheme = {
  'code[class*="language-"]': {
    color: "#C9D1E1",
    background: "none",
    fontFamily: "var(--ybz-mono)",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    tabSize: 4,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#C9D1E1",
    // Transparent so .ybz-code's ground shows through — section 3.3 gives
    // light pages a different code ground, and only the wrapper knows the theme.
    background: "transparent",
    fontFamily: "var(--ybz-mono)",
    overflow: "auto",
  },
  comment: { color: "#7C8698" },
  prolog: { color: "#7C8698" },
  doctype: { color: "#7C8698" },
  cdata: { color: "#7C8698" },
  punctuation: { color: "#7C8698" },
  operator: { color: "#7C8698" },
  string: { color: "#A8B0BE" },
  char: { color: "#A8B0BE" },
  "attr-value": { color: "#A8B0BE" },
  regex: { color: "#A8B0BE" },
  number: { color: "#E0A906" },
  boolean: { color: "#E0A906" },
  constant: { color: "#E0A906" },
  symbol: { color: "#E0A906" },
  function: { color: "#F5F3EF" },
  "class-name": { color: "#F5F3EF" },
  "attr-name": { color: "#F5F3EF" },
  property: { color: "#F5F3EF" },
  variable: { color: "#F5F3EF" },
  keyword: { color: "#F2CC5A" },
  atrule: { color: "#F2CC5A" },
  selector: { color: "#F2CC5A" },
  tag: { color: "#F2CC5A" },
  important: { color: "#F2CC5A", fontWeight: "bold" },
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
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return !inline && match ? (
              // .ybz-code owns the ground so it can differ per theme
              // (section 3.3 gives light pages their own code ground).
              // Everything inside it stays midnight in both themes.
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
                className="border border-edge bg-card px-1.5 py-0.5 font-mono text-sm text-bone [pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-inherit"
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
