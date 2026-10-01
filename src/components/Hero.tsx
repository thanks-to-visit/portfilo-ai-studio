import React from 'react';
import { SiteSettings } from '../types';
import { useRouter } from '../hooks/useRouter';
import { ArrowDown, ArrowUpRight, Github, Linkedin, FileText, BookOpen } from 'lucide-react';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const { navigate, scrollToSection } = useRouter();

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#DCDCDC] bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Restrained technical status indicator */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-[#555555]">
          <span className="w-2 h-2 rounded-full bg-[#1B4332] animate-pulse" aria-hidden="true" />
          <span>{settings.statusTicker || 'Currently building · Learning · Experimenting'}</span>
        </div>

        {/* Primary Role & Headline */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-3">
            {settings.role} &middot; Systems & Backend
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#171717] leading-[1.15] mb-6 text-balance">
            {settings.headline}
          </h1>

          {/* Short introduction */}
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8 max-w-2xl">
            {settings.bioShort}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigate('/blog')}
              className="px-4 py-2.5 text-sm font-medium text-[#171717] bg-white border border-[#DCDCDC] hover:border-[#171717] rounded transition-colors flex items-center gap-2 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#666666]" />
              <span>Read My Blog</span>
            </button>

            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 text-sm font-medium text-[#555555] hover:text-[#171717] border border-transparent hover:border-[#DCDCDC] rounded transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#888888]" />
            </a>
          </div>

          {/* Social and quick metadata link bar */}
          <div className="pt-6 border-t border-[#E5E5E0] flex flex-wrap items-center gap-6 text-xs text-[#666666]">
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#171717] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#171717] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-[#A0A09C]" aria-hidden="true">&bull;</span>
            <span className="font-mono text-[11px] text-[#666666]">{settings.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
