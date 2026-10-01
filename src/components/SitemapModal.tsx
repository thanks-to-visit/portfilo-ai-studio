import React, { useState } from 'react';
import { BlogPost, Project } from '../types';
import { X, Copy, Check, FileCode, Bot } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  projects: Project[];
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose, posts, projects }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>('sitemap');
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const origin = window.location.origin;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Routes -->
  <url>
    <loc>${origin}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Published Articles -->
${posts
  .filter((p) => p.status === 'published')
  .map(
    (p) => `  <url>
    <loc>${origin}/blog/${p.slug}</loc>
    <lastmod>${p.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxt = `# robots.txt for ${origin}
User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${origin}/sitemap.xml`;

  const currentContent = activeTab === 'sitemap' ? sitemapXml : robotsTxt;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    toast(`${activeTab === 'sitemap' ? 'sitemap.xml' : 'robots.txt'} copied to clipboard`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-[#DCDCDC] shadow-xl p-6 sm:p-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#666666] hover:text-[#171717] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-4 border-b border-[#DCDCDC] pb-3">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`flex items-center gap-1.5 text-xs font-mono font-medium pb-1.5 border-b-2 transition-colors ${
              activeTab === 'sitemap'
                ? 'border-[#171717] text-[#171717]'
                : 'border-transparent text-[#666666] hover:text-[#171717]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>sitemap.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('robots')}
            className={`flex items-center gap-1.5 text-xs font-mono font-medium pb-1.5 border-b-2 transition-colors ${
              activeTab === 'robots'
                ? 'border-[#171717] text-[#171717]'
                : 'border-transparent text-[#666666] hover:text-[#171717]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>robots.txt</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-[#666666] mb-2 font-mono">
          <span>Search Engine Meta File</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#F4F4F2] border border-[#DCDCDC] hover:text-[#171717] rounded text-[11px] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-[#1B4332]" /> : <Copy className="w-3 h-3" />}
            <span>Copy Content</span>
          </button>
        </div>

        <pre className="p-4 bg-[#171717] text-[#E0E0E0] text-xs font-mono rounded overflow-x-auto flex-1 max-h-[50vh] leading-relaxed">
          {currentContent}
        </pre>
      </div>
    </div>
  );
};
