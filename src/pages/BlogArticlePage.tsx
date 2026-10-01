import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { useRouter } from '../hooks/useRouter';
import { useToast } from '../hooks/useToast';
import { 
  ArrowLeft, ArrowRight, Clock, Calendar, Share2, Copy, Check, 
  Bookmark, Hash, ListFilter, CornerDownRight 
} from 'lucide-react';

interface BlogArticlePageProps {
  slug: string;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoading(true);

    Promise.all([api.getPostBySlug(slug), api.getPosts()]).then(([foundPost, posts]) => {
      setPost(foundPost);
      setAllPosts(posts);
      setLoading(false);
      if (foundPost) {
        api.incrementPostViews(slug);
        document.title = `${foundPost.title} — Julian Thorne`;
      }
    });

    return () => {
      document.title = 'Julian Thorne — Software Engineer & Systems Builder';
    };
  }, [slug]);

  // Track scroll position for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Article URL copied to clipboard', 'success');
  };

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    toast('Code snippet copied to clipboard', 'success');
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center font-mono text-xs text-[#666666]">
        Loading article publication...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] py-24 px-6 text-center max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold text-[#171717] mb-3">Article Not Found</h1>
        <p className="text-xs text-[#666666] mb-6">
          The requested essay or note slug does not exist in the publication index.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="px-4 py-2 text-xs font-medium text-white bg-[#171717] rounded"
        >
          Back to Blog Index
        </button>
      </div>
    );
  }

  // Prev & Next articles
  const published = allPosts.filter((p) => p.status === 'published');
  const currentIndex = published.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? published[currentIndex - 1] : null;
  const prevPost = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;

  // Related posts (by matching category or tags)
  const relatedPosts = published
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2);

  // Extract headings for Table of Contents
  const headings: { id: string; title: string; level: number }[] = [];
  const lines = post.content.split('\n');
  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ id, title, level });
    }
  });

  // Simple clean markdown parser for rendering
  const renderMarkdown = (content: string) => {
    const blocks: React.ReactNode[] = [];
    const rawBlocks = content.split('\n\n');
    let codeIndex = 0;

    rawBlocks.forEach((block, bIdx) => {
      const trimmed = block.trim();

      // Code Block: ```lang ... ```
      if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
        const firstLineEnd = trimmed.indexOf('\n');
        const lang = trimmed.substring(3, firstLineEnd).trim();
        const codeContent = trimmed.substring(firstLineEnd + 1, trimmed.length - 3);
        const thisCodeIdx = codeIndex++;

        blocks.push(
          <div key={`code-${bIdx}`} className="my-6 rounded-xs overflow-hidden border border-[#2A2A2A]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1F1F1F] text-[#999999] text-[11px] font-mono border-b border-[#2A2A2A]">
              <span>{lang || 'code'}</span>
              <button
                onClick={() => copyCode(codeContent, thisCodeIdx)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Copy code"
              >
                {copiedCodeIdx === thisCodeIdx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCodeIdx === thisCodeIdx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#141414] text-[#E0E0E0] text-xs font-mono overflow-x-auto leading-relaxed">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
        return;
      }

      // H2 Heading: ## Title
      if (trimmed.startsWith('## ')) {
        const title = trimmed.substring(3);
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        blocks.push(
          <h2 key={`h2-${bIdx}`} id={id} className="text-xl sm:text-2xl font-semibold text-[#171717] mt-10 mb-4 pt-4 border-t border-[#E5E5E0] scroll-mt-20">
            {title}
          </h2>
        );
        return;
      }

      // H3 Heading: ### Title
      if (trimmed.startsWith('### ')) {
        const title = trimmed.substring(4);
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        blocks.push(
          <h3 key={`h3-${bIdx}`} id={id} className="text-base sm:text-lg font-semibold text-[#171717] mt-8 mb-3 scroll-mt-20">
            {title}
          </h3>
        );
        return;
      }

      // Blockquote: > ...
      if (trimmed.startsWith('> ')) {
        const quote = trimmed.substring(2);
        blocks.push(
          <blockquote key={`quote-${bIdx}`} className="my-6 pl-4 border-l-2 border-[#1B4332] italic text-[#444444] text-sm leading-relaxed">
            {quote}
          </blockquote>
        );
        return;
      }

      // Horizontal Rule: ---
      if (trimmed === '---') {
        blocks.push(<hr key={`hr-${bIdx}`} className="my-8 border-t border-[#DCDCDC]" />);
        return;
      }

      // Unordered list: - item
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- '));
        blocks.push(
          <ul key={`ul-${bIdx}`} className="my-4 space-y-2 text-sm text-[#333333]">
            {items.map((it, iIdx) => (
              <li key={iIdx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-[#1B4332] font-mono mt-0.5">&bull;</span>
                <span>{it.replace(/^- /, '')}</span>
              </li>
            ))}
          </ul>
        );
        return;
      }

      // Ordered list: 1. item
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()));
        blocks.push(
          <ol key={`ol-${bIdx}`} className="my-4 space-y-2 text-sm text-[#333333]">
            {items.map((it, iIdx) => (
              <li key={iIdx} className="flex items-start gap-2 leading-relaxed">
                <span className="font-mono text-xs text-[#1B4332] mt-0.5">{iIdx + 1}.</span>
                <span>{it.replace(/^\d+\.\s/, '')}</span>
              </li>
            ))}
          </ol>
        );
        return;
      }

      // Standard Paragraph with inline backtick code parsing
      const renderedParagraph = trimmed.split(/(`[^`]+`)/g).map((chunk, cIdx) => {
        if (chunk.startsWith('`') && chunk.endsWith('`')) {
          return (
            <code key={cIdx} className="bg-[#EAEAEA] text-[#171717] px-1.5 py-0.5 text-xs font-mono rounded-xs border border-[#D5D5D0]">
              {chunk.slice(1, -1)}
            </code>
          );
        }
        return chunk;
      });

      blocks.push(
        <p key={`p-${bIdx}`} className="text-sm sm:text-base text-[#333333] leading-relaxed my-4">
          {renderedParagraph}
        </p>
      );
    });

    return blocks;
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-[#1B4332] transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-[#F4F4F2] pt-8 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb Back Link */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all articles</span>
            </button>

            <button
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#171717] transition-colors px-2 py-1 bg-white border border-[#DCDCDC] rounded-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-[#DCDCDC]">
            {/* Zero-pill metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#666666] mb-3">
              <span className="text-[#1B4332] font-semibold">{post.category}</span>
              <span aria-hidden="true">&middot;</span>
              <span>Published {post.publishedAt}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
              {post.views && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span className="tabular-nums">{post.views} views</span>
                </>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#171717] leading-[1.18] mb-4 text-balance">
              {post.title}
            </h1>

            {/* Excerpt / Subtitle */}
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-6 font-normal">
              {post.excerpt}
            </p>

            {/* Author info */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E0] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-semibold text-[11px]">
                  JT
                </span>
                <div>
                  <div className="font-semibold text-[#171717]">{post.author.name}</div>
                  <div className="text-[11px] text-[#666666]">{post.author.role}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] text-[#666666] bg-white px-2 py-0.5 border border-[#E5E5E0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Content Layout with Table of Contents */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article Body */}
            <div className="lg:col-span-8">
              <article className="prose prose-neutral max-w-none">
                {renderMarkdown(post.content)}
              </article>

              {/* Article Footer Tags on mobile */}
              <div className="sm:hidden pt-8 mt-8 border-t border-[#DCDCDC] flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] text-[#666666] bg-white px-2 py-0.5 border border-[#E5E5E0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Previous / Next Article Navigation */}
              <div className="mt-12 pt-8 border-t border-[#DCDCDC] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <button
                    onClick={() => navigate(`/blog/${prevPost.slug}`)}
                    className="p-4 bg-white border border-[#DCDCDC] hover:border-[#171717] rounded-sm text-left transition-colors flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-mono text-[#666666] mb-1 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Previous Article
                    </span>
                    <span className="text-xs font-semibold text-[#171717] line-clamp-1">
                      {prevPost.title}
                    </span>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button
                    onClick={() => navigate(`/blog/${nextPost.slug}`)}
                    className="p-4 bg-white border border-[#DCDCDC] hover:border-[#171717] rounded-sm text-right transition-colors flex flex-col justify-between sm:items-end"
                  >
                    <span className="text-[11px] font-mono text-[#666666] mb-1 flex items-center gap-1">
                      Next Article <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-xs font-semibold text-[#171717] line-clamp-1">
                      {nextPost.title}
                    </span>
                  </button>
                ) : <div />}
              </div>
            </div>

            {/* Sticky Sidebar: Table of Contents & Related */}
            <aside className="lg:col-span-4 space-y-6">
              {headings.length > 0 && (
                <div className="sticky top-24 bg-white border border-[#DCDCDC] p-5 rounded-sm shadow-2xs space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#171717] font-semibold flex items-center gap-2">
                    <ListFilter className="w-3.5 h-3.5 text-[#1B4332]" />
                    Table of Contents
                  </h3>

                  <nav className="space-y-1.5 text-xs">
                    {headings.map((h, idx) => (
                      <a
                        key={idx}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block text-[#555555] hover:text-[#1B4332] transition-colors leading-snug ${
                          h.level === 3 ? 'pl-3 text-[11px]' : 'font-medium'
                        }`}
                      >
                        {h.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="bg-white border border-[#DCDCDC] p-5 rounded-sm shadow-2xs space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#171717] font-semibold">
                    Related Publications
                  </h3>

                  <div className="divide-y divide-[#F0F0EE]">
                    {relatedPosts.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => navigate(`/blog/${rel.slug}`)}
                        className="py-3 first:pt-1 last:pb-0 cursor-pointer group"
                      >
                        <span className="text-[10px] font-mono text-[#1B4332] block mb-1">
                          {rel.category} &middot; {rel.readingTime}
                        </span>
                        <h4 className="text-xs font-medium text-[#171717] group-hover:text-[#1B4332] transition-colors leading-snug">
                          {rel.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
