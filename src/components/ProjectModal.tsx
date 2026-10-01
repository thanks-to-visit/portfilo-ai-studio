import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink, Calendar, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-[#DCDCDC] shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#666666] hover:text-[#171717] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B4332]"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#666666] mb-2">
          <span>{project.year}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="text-[#1B4332] font-semibold">{project.status}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{project.category}</span>
        </div>

        {/* Title */}
        <h2 id="project-modal-title" className="text-2xl font-semibold text-[#171717] mb-3">
          {project.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-[#444444] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Problem Solved */}
        <div className="mb-6 p-4 bg-[#F8F8F7] border-l-2 border-[#1B4332]">
          <h3 className="text-xs uppercase tracking-wider font-mono text-[#171717] mb-1.5 flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
            Problem Solved
          </h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            {project.problemSolved}
          </p>
        </div>

        {/* Architectural Highlights */}
        {project.architectureHighlights && project.architectureHighlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider font-mono text-[#666666] mb-3 font-semibold">
              Technical & Architectural Highlights
            </h3>
            <ul className="space-y-2">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#444444]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Stack */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider font-mono text-[#666666] mb-2.5 font-semibold">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="font-mono text-[11px] px-2.5 py-1 bg-[#F4F4F2] border border-[#E5E5E0] text-[#333333]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-[#E5E5E0]">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] transition-colors rounded flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-medium text-[#171717] bg-white border border-[#DCDCDC] hover:border-[#171717] transition-colors rounded flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-medium text-[#666666] hover:text-[#171717] transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
