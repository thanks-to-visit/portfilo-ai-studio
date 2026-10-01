import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { useRouter } from '../hooks/useRouter';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

interface FeaturedBlogProps {
  initialPosts?: BlogPost[];
}

export const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!initialPosts) {
      api.getPosts().then((data) => {
        // take top 3 published posts
        setPosts(data.slice(0, 3));
        setLoading(false);
      });
    }
  }, [initialPosts]);

  return (
    <section id="blog" className="py-20 md:py-28 border-b border-[#DCDCDC] bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
              05 &middot; Writing & Publications
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
              Technical Notes & Essays
            </h2>
            <p className="text-sm text-[#666666] mt-2 max-w-xl">
              Deep dives into distributed consensus, backend latency anomalies, Linux systems programming, and performance engineering.
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#1B4332] transition-colors pb-1 border-b border-[#171717] hover:border-[#1B4332]"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-[#666666]">
            Loading publications...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group cursor-pointer bg-white border border-[#DCDCDC] hover:border-[#888888] rounded-sm p-6 flex flex-col justify-between transition-all shadow-2xs"
              >
                <div>
                  {/* Unboxed Metadata (Zero-pill discipline) */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#666666] mb-3">
                    <span className="text-[#1B4332] font-semibold">{post.category}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.publishedAt}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#1B4332] transition-colors line-clamp-2 leading-snug mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#555555] line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#F0F0EE] mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] text-[#666666] bg-[#F4F4F2] px-1.5 py-0.5 border border-[#E5E5E0]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#171717] group-hover:text-[#1B4332] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
