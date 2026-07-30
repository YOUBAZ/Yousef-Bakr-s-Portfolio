import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PropTypes from 'prop-types';

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
        color: '#C9D1E1',
        background: 'none',
        fontFamily: 'var(--ybz-mono)',
        textAlign: 'left',
        whiteSpace: 'pre',
        wordSpacing: 'normal',
        tabSize: 4,
        hyphens: 'none',
    },
    'pre[class*="language-"]': {
        color: '#C9D1E1',
        // Transparent so .ybz-code's ground shows through — section 3.3 gives
        // light pages a different code ground, and only the wrapper knows the theme.
        background: 'transparent',
        fontFamily: 'var(--ybz-mono)',
        overflow: 'auto',
    },
    comment: { color: '#7C8698', fontStyle: 'italic' },
    prolog: { color: '#7C8698' },
    doctype: { color: '#7C8698' },
    cdata: { color: '#7C8698' },
    punctuation: { color: '#7C8698' },
    operator: { color: '#7C8698' },
    string: { color: '#A8B0BE' },
    char: { color: '#A8B0BE' },
    'attr-value': { color: '#A8B0BE' },
    regex: { color: '#A8B0BE' },
    number: { color: '#E0A906' },
    boolean: { color: '#E0A906' },
    constant: { color: '#E0A906' },
    symbol: { color: '#E0A906' },
    function: { color: '#F5F3EF' },
    'class-name': { color: '#F5F3EF' },
    'attr-name': { color: '#F5F3EF' },
    property: { color: '#F5F3EF' },
    variable: { color: '#F5F3EF' },
    keyword: { color: '#F2CC5A' },
    atrule: { color: '#F2CC5A' },
    selector: { color: '#F2CC5A' },
    tag: { color: '#F2CC5A' },
    important: { color: '#F2CC5A', fontWeight: 'bold' },
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
};

/**
 * Blog content component for rendering markdown with custom styling
 */
const BlogContent = ({ content }) => {
    return (
        <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Custom heading styles
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-bold text-bone mb-6 mt-8 pb-3 border-b border-edge">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-bold text-bone mb-4 mt-8">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold text-accent mb-3 mt-6">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xl font-semibold text-bone mb-3 mt-4">
                            {children}
                        </h4>
                    ),

                    // Custom paragraph
                    p: ({ children }) => (
                        <p className="text-slate-body leading-relaxed mb-4">
                            {children}
                        </p>
                    ),

                    // Custom links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className="text-accent hover:opacity-80 underline decoration-[var(--ybz-hairline)] transition-colors"
                            target={href?.startsWith('http') ? '_blank' : undefined}
                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            {children}
                        </a>
                    ),

                    // Custom code blocks
                    code: ({ inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

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
                                            border: 'none',
                                            outline: 'none'
                                        }}
                                        customStyle={{
                                            margin: 0,
                                            padding: '1.25rem',
                                            background: 'transparent',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.7',
                                            border: 'none',
                                            outline: 'none'
                                        }}
                                        codeTagProps={{
                                            style: {
                                                background: 'transparent',
                                                border: 'none',
                                                outline: 'none',
                                                boxShadow: 'none',
                                                fontFamily: 'var(--ybz-mono)'
                                            }
                                        }}
                                        lineProps={{
                                            style: {
                                                border: 'none',
                                                outline: 'none',
                                                boxShadow: 'none'
                                            }
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        ) : (
                            <code
                                className="px-1.5 py-0.5 text-sm font-mono text-accent bg-card rounded border border-edge"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },

                    // Custom lists
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-body ml-4">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-body ml-4">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-slate-body leading-relaxed">
                            {children}
                        </li>
                    ),

                    // Custom blockquote
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-hairline bg-card/50 pl-6 pr-4 py-3 my-6 rounded-r-lg">
                            <div className="text-slate-body italic">{children}</div>
                        </blockquote>
                    ),

                    // Custom table
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                            <table className="min-w-full border border-edge rounded-lg overflow-hidden">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-card">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="divide-y divide-[var(--ybz-edge)]">
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => (
                        <tr className="hover:bg-obsidian transition-colors">
                            {children}
                        </tr>
                    ),
                    th: ({ children }) => (
                        <th className="px-4 py-3 text-left text-sm font-semibold text-accent border-b border-edge">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-3 text-sm text-slate-body">
                            {children}
                        </td>
                    ),

                    // Custom images
                    img: ({ src, alt }) => (
                        <figure className="my-8">
                            <img
                                src={src}
                                alt={alt}
                                className="rounded-xl w-full border border-edge shadow-2xl"
                                loading="lazy"
                            />
                            {alt && (
                                <figcaption className="text-center text-sm text-muted mt-3">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    ),

                    // Custom horizontal rule
                    hr: () => (
                        <hr className="my-8 border-edge" />
                    ),

                    // Custom strong/bold
                    strong: ({ children }) => (
                        <strong className="font-bold text-bone">
                            {children}
                        </strong>
                    ),

                    // Custom emphasis/italic
                    em: ({ children }) => (
                        <em className="italic text-bone">
                            {children}
                        </em>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

BlogContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default BlogContent;
