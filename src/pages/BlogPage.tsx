import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { useRouter } from '../hooks/useRouter';
import { Search, ArrowLeft, ArrowRight, Tag, BookOpen, Filter } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    api.getPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Backend', 'Computer Science', 'Engineering', 'Architecture'];

  // All unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F2] pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to portfolio</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-[#DCDCDC]">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
            Technical Publication
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171717] mb-3">
            Engineering Notes & Systems Writing
          </h1>
          <p className="text-sm text-[#555555] leading-relaxed max-w-2xl">
            Essays, benchmarking studies, and retrospective explorations into distributed architectures, concurrency models, and low-level software engineering.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, keywords, or tags..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none transition-colors"
              />
            </div>

            {/* Category Segmented Control */}
            <div className="inline-flex items-center p-1 bg-white border border-[#DCDCDC] rounded-sm gap-1 overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTag(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#171717] text-white'
                      : 'text-[#666666] hover:text-[#171717]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-mono text-[11px] text-[#888888] mr-1">Topics:</span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-2 py-0.5 font-mono text-[11px] rounded-xs border transition-colors ${
                    isSelected
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-white border-[#E0E0DC] text-[#666666] hover:border-[#999999]'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[11px] font-mono text-red-700 underline ml-2"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-[#666666]">
            Loading articles archive...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#DCDCDC] p-8 text-xs text-[#666666]">
            No articles found matching &quot;{searchQuery || selectedCategory || selectedTag}&quot;.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group cursor-pointer bg-white border border-[#DCDCDC] hover:border-[#888888] rounded-sm p-6 sm:p-8 transition-all shadow-2xs"
              >
                {/* Unboxed Metadata (Zero-pill discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#666666] mb-3">
                  <span className="text-[#1B4332] font-semibold">{post.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-[#171717] group-hover:text-[#1B4332] transition-colors leading-snug mb-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Tags and read action */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F0F0EE]">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[11px] text-[#666666] bg-[#F4F4F2] px-2 py-0.5 border border-[#E5E5E0]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] group-hover:text-[#1B4332] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
