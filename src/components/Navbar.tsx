import React, { useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { SiteSettings } from '../types';
import { Menu, X, ArrowUpRight, Github, Linkedin, FileText } from 'lucide-react';

interface NavbarProps {
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const { path, navigate, scrollToSection } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string, isHash: boolean) => {
    e.preventDefault();
    if (isHash) {
      scrollToSection(target);
    } else {
      navigate(target);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F4F4F2]/95 backdrop-blur-sm border-b border-[#DCDCDC] transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single Wordmark */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/', false)}
            className="text-base font-semibold tracking-tight text-[#171717] hover:text-[#1B4332] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B4332]"
          >
            {settings.name}
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#666666]">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/', false)}
              className={`hover:text-[#171717] transition-colors ${path === '/' ? 'text-[#171717]' : ''}`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about', true)}
              className="hover:text-[#171717] transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects', true)}
              className="hover:text-[#171717] transition-colors"
            >
              Projects
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, 'experience', true)}
              className="hover:text-[#171717] transition-colors"
            >
              Experience
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills', true)}
              className="hover:text-[#171717] transition-colors"
            >
              Skills
            </a>
            <a
              href="/blog"
              onClick={(e) => handleNavClick(e, '/blog', false)}
              className={`hover:text-[#171717] transition-colors ${path.startsWith('/blog') ? 'text-[#171717] font-semibold' : ''}`}
            >
              Blog
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact', true)}
              className="hover:text-[#171717] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Actions & Links */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[13px] font-medium text-[#666666] hover:text-[#171717] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#666666] hover:text-[#171717] transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#666666] hover:text-[#171717] transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <div className="h-4 w-[1px] bg-[#DCDCDC] mx-1" aria-hidden="true" />

            <button
              onClick={() => {
                if (path !== '/') {
                  navigate('/#contact');
                } else {
                  scrollToSection('contact');
                }
              }}
              className="px-3.5 py-1.5 text-[13px] font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors whitespace-nowrap"
            >
              Let&apos;s Connect
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] hover:text-[#1B4332] transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-[#F4F4F2] md:hidden border-b border-[#DCDCDC] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-md mx-auto px-6 py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4 text-base font-medium text-[#171717]">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/', false)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about', true)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects', true)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                Projects
              </a>
              <a
                href="#experience"
                onClick={(e) => handleNavClick(e, 'experience', true)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                Experience & Journey
              </a>
              <a
                href="#skills"
                onClick={(e) => handleNavClick(e, 'skills', true)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                Technical Skills
              </a>
              <a
                href="/blog"
                onClick={(e) => handleNavClick(e, '/blog', false)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                Engineering Blog
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact', true)}
                className="py-1 border-b border-[#E5E5E0] hover:text-[#1B4332]"
              >
                Contact
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (path !== '/') {
                    navigate('/#contact');
                  } else {
                    scrollToSection('contact');
                  }
                }}
                className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors text-center"
              >
                Let&apos;s Connect
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs text-[#666666]">
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#DCDCDC] bg-white rounded hover:text-[#171717]"
                >
                  Resume
                </a>
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#DCDCDC] bg-white rounded hover:text-[#171717]"
                >
                  GitHub
                </a>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#DCDCDC] bg-white rounded hover:text-[#171717]"
                >
                  LinkedIn
                </a>
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/admin');
                  }}
                  className="text-xs text-[#888888] hover:text-[#171717] underline underline-offset-4"
                >
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
