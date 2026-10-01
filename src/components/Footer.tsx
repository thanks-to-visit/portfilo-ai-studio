import React, { useState } from 'react';
import { SiteSettings, BlogPost, Project } from '../types';
import { useRouter } from '../hooks/useRouter';
import { SitemapModal } from './SitemapModal';
import { ArrowUp, Github, Linkedin, Mail, ShieldAlert, FileCode } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  posts: BlogPost[];
  projects: Project[];
}

export const Footer: React.FC<FooterProps> = ({ settings, posts, projects }) => {
  const { navigate, scrollToSection } = useRouter();
  const [sitemapOpen, setSitemapOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-[#DCDCDC] bg-[#ECECE9] text-[#171717] pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D8D8D3]">
            {/* Identity & Mission */}
            <div className="md:col-span-5 space-y-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="text-base font-semibold tracking-tight text-[#171717] hover:text-[#1B4332] transition-colors"
              >
                {settings.name}
              </a>
              <p className="text-xs text-[#555555] max-w-sm leading-relaxed">
                Building reliable distributed software, exploring low-level systems, and documenting the journey.
              </p>
              <div className="flex items-center gap-4 pt-2 text-[#666666]">
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#171717] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#171717] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-[#171717] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-[#444444]">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Projects & Systems
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Experience
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/blog')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Technical Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources, Meta & Admin */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                Site & Engineering
              </h4>
              <ul className="space-y-2 text-xs text-[#444444]">
                <li>
                  <a
                    href={settings.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#171717] transition-colors"
                  >
                    Curriculum Vitae / Resume
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setSitemapOpen(true)}
                    className="hover:text-[#171717] transition-colors inline-flex items-center gap-1.5"
                  >
                    <FileCode className="w-3 h-3 text-[#666666]" />
                    <span>View sitemap.xml & robots.txt</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/admin')}
                    className="hover:text-[#171717] transition-colors inline-flex items-center gap-1.5 font-mono text-[11px] text-[#666666]"
                  >
                    <ShieldAlert className="w-3 h-3 text-[#1B4332]" />
                    <span>Admin Management Portal</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
            <p className="font-mono text-[11px]">
              &copy; {new Date().getFullYear()} {settings.name}. Built with curiosity, rigor, and mechanical sympathy.
            </p>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#171717] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      <SitemapModal
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        posts={posts}
        projects={projects}
      />
    </>
  );
};
