import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize heading styles
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-light text-[#1a1a1a] mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-light text-[#1a1a1a] mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-light text-[#1a1a1a] mt-4 mb-2">{children}</h3>
          ),
          // Customize paragraph styles
          p: ({ children }) => (
            <p className="text-[15px] text-[#3a3a3a] leading-relaxed mb-4">{children}</p>
          ),
          // Customize link styles
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#1a1a1a] underline hover:text-[#6b6b6b] transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          // Customize list styles
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1 text-[#3a3a3a]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1 text-[#3a3a3a]">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[15px] text-[#3a3a3a] leading-relaxed">{children}</li>
          ),
          // Customize blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#1a1a1a] pl-4 my-4 text-[#6b6b6b] italic">
              {children}
            </blockquote>
          ),
          // Customize image styles
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="w-full h-auto my-6 rounded"
            />
          ),
          // Customize code block styles
          code: ({ children }) => (
            <code className="bg-[#f5f5f5] px-1 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-[#f5f5f5] p-4 rounded my-4 overflow-x-auto">
              {children}
            </pre>
          ),
          // Customize strong and emphasis
          strong: ({ children }) => (
            <strong className="font-medium text-[#1a1a1a]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#4a4a4a]">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}