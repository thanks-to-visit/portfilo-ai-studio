import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { api } from '../services/api';
import { ProjectModal } from './ProjectModal';
import { Github, ExternalLink, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';

interface ProjectsProps {
  initialProjects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ initialProjects }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(!initialProjects);

  useEffect(() => {
    if (!initialProjects) {
      api.getProjects().then((data) => {
        setProjects(data);
        setLoading(false);
      });
    }
  }, [initialProjects]);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return p.featured;
    if (filter === 'opensource') return p.status === 'Open Source';
    if (filter === 'backend') return p.category === 'Backend & Systems';
    if (filter === 'devtools') return p.category === 'Developer Tools';
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-[#DCDCDC] bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
              03 &middot; Engineering Showcase
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
              Selected Systems & Projects
            </h2>
            <p className="text-sm text-[#666666] mt-2 max-w-xl">
              Production services, distributed systems prototypes, and developer tooling built with an emphasis on low overhead and reliability.
            </p>
          </div>

          {/* Interactive filter segmented control */}
          <div className="inline-flex items-center p-1 bg-white border border-[#DCDCDC] rounded-sm gap-1 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-[#171717] text-white' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
                filter === 'featured' ? 'bg-[#171717] text-white' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter('backend')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
                filter === 'backend' ? 'bg-[#171717] text-white' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Backend & Systems
            </button>
            <button
              onClick={() => setFilter('devtools')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
                filter === 'devtools' ? 'bg-[#171717] text-white' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Developer Tools
            </button>
            <button
              onClick={() => setFilter('opensource')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
                filter === 'opensource' ? 'bg-[#171717] text-white' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Open Source
            </button>
          </div>
        </div>

        {/* Project List */}
        {loading ? (
          <div className="py-16 text-center text-sm font-mono text-[#666666]">
            Loading engineering projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#666666] bg-white border border-[#DCDCDC] p-8">
            No projects found matching the current filter.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project, index) => {
              const isLead = index === 0;

              return (
                <article
                  key={project.id}
                  className={`bg-white border border-[#DCDCDC] transition-all hover:border-[#999999] rounded-sm p-6 sm:p-8 flex flex-col justify-between ${
                    isLead ? 'ring-1 ring-[#171717]/10' : ''
                  }`}
                >
                  <div>
                    {/* Top Meta Line: Zero-pill discipline */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#666666] mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#171717]">{project.year}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="text-[#1B4332] font-semibold">{project.status}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{project.category}</span>
                      </div>
                      {project.featured && (
                        <span className="text-[11px] font-mono text-[#1B4332] tracking-wider uppercase">
                          Featured Work
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#171717] tracking-tight mb-2.5">
                      {project.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-[#444444] leading-relaxed mb-4 max-w-3xl">
                      {project.description}
                    </p>

                    {/* Problem Solved summary */}
                    <div className="mb-6 text-xs text-[#555555] bg-[#F9F9F8] border-l-2 border-[#1B4332] p-3 max-w-3xl leading-relaxed">
                      <span className="font-semibold text-[#171717] mr-1.5 font-mono">
                        Challenge:
                      </span>
                      {project.problemSolved}
                    </div>

                    {/* Technology tags: unboxed clean font-mono */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6 text-xs font-mono text-[#444444]">
                      <span className="text-[#888888] text-[11px]">Stack:</span>
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-[#F4F4F2] px-2 py-0.5 border border-[#E5E5E0] text-[11px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F0F0EE]">
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#1B4332] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#1B4332] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live System</span>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4332] hover:underline underline-offset-4"
                    >
                      <span>Architecture Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
