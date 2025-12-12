import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PropTypes from 'prop-types';

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
                        <h1 className="text-4xl font-bold text-white mb-6 mt-8 pb-3 border-b border-slate-700">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-bold text-white mb-4 mt-8">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-3 mt-6">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xl font-semibold text-slate-200 mb-3 mt-4">
                            {children}
                        </h4>
                    ),

                    // Custom paragraph
                    p: ({ children }) => (
                        <p className="text-slate-300 leading-relaxed mb-4">
                            {children}
                        </p>
                    ),

                    // Custom links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 hover:decoration-cyan-400 transition-colors"
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
                            <div className="my-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                                <div className="bg-slate-800 px-4 py-2 text-sm text-slate-400 font-mono border-b border-slate-700 flex items-center justify-between">
                                    <span>{language}</span>
                                </div>
                                <div className="overflow-x-auto bg-[#1e1e1e]">
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={language}
                                        PreTag="div"
                                        wrapperStyle={{
                                            border: 'none',
                                            outline: 'none'
                                        }}
                                        customStyle={{
                                            margin: 0,
                                            padding: '1.25rem',
                                            background: '#1e1e1e',
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
                                                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
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
                                className="px-1.5 py-0.5 text-sm font-mono text-cyan-400 bg-slate-800 rounded border border-slate-700"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },

                    // Custom lists
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300 ml-4">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-300 ml-4">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-slate-300 leading-relaxed">
                            {children}
                        </li>
                    ),

                    // Custom blockquote
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-cyan-500 bg-slate-800/50 pl-6 pr-4 py-3 my-6 rounded-r-lg">
                            <div className="text-slate-300 italic">{children}</div>
                        </blockquote>
                    ),

                    // Custom table
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                            <table className="min-w-full border border-slate-700 rounded-lg overflow-hidden">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-slate-800">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="divide-y divide-slate-700">
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => (
                        <tr className="hover:bg-slate-800/30 transition-colors">
                            {children}
                        </tr>
                    ),
                    th: ({ children }) => (
                        <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-400 border-b border-slate-700">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-3 text-sm text-slate-300">
                            {children}
                        </td>
                    ),

                    // Custom images
                    img: ({ src, alt }) => (
                        <figure className="my-8">
                            <img
                                src={src}
                                alt={alt}
                                className="rounded-xl w-full border border-slate-700 shadow-2xl"
                                loading="lazy"
                            />
                            {alt && (
                                <figcaption className="text-center text-sm text-slate-500 mt-3">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    ),

                    // Custom horizontal rule
                    hr: () => (
                        <hr className="my-8 border-slate-700" />
                    ),

                    // Custom strong/bold
                    strong: ({ children }) => (
                        <strong className="font-bold text-white">
                            {children}
                        </strong>
                    ),

                    // Custom emphasis/italic
                    em: ({ children }) => (
                        <em className="italic text-slate-200">
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
