import React, { useState, useEffect } from 'react';
import { Experience as ExperienceType } from '../types';
import { api } from '../services/api';
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

interface ExperienceProps {
  initialExperiences?: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ initialExperiences }) => {
  const [experiences, setExperiences] = useState<ExperienceType[]>(initialExperiences || []);
  const [loading, setLoading] = useState(!initialExperiences);

  useEffect(() => {
    if (!initialExperiences) {
      api.getExperiences().then((data) => {
        setExperiences(data);
        setLoading(false);
      });
    }
  }, [initialExperiences]);

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-[#DCDCDC] bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
            04 &middot; Career & Research Journey
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
            Work Experience & Research
          </h2>
          <p className="text-sm text-[#666666] mt-2 max-w-xl">
            A chronological timeline of production engineering roles, distributed systems research, and open-source contributions.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-[#666666]">
            Loading career experience...
          </div>
        ) : (
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="bg-white border border-[#DCDCDC] p-6 sm:p-8 rounded-sm shadow-2xs relative"
              >
                {/* Header row: Organization, Role, and Duration */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-4 border-b border-[#F0F0EE]">
                  <div>
                    <h3 className="text-lg font-semibold text-[#171717]">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#555555] mt-0.5">
                      <span className="font-semibold text-[#1B4332]">{exp.organization}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-[#666666]">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-[#666666] shrink-0">
                    {exp.duration}
                  </div>
                </div>

                {/* Role Overview */}
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed my-4">
                  {exp.description}
                </p>

                {/* Responsibilities list */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-5 space-y-2">
                    <h4 className="text-[11px] uppercase tracking-wider font-mono text-[#666666] font-semibold">
                      Key Technical Responsibilities
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#444444] leading-relaxed">
                          <span className="text-[#1B4332] font-mono select-none mt-0.5">&rsaquo;</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements highlight if present */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-5 p-3 bg-[#F9F9F8] border-l-2 border-[#1B4332] space-y-1">
                    <h4 className="text-[11px] uppercase tracking-wider font-mono text-[#171717] font-semibold flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-[#1B4332]" />
                      Measurable Impact & Milestones
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="text-xs text-[#555555]">
                          &bull; {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="pt-3 border-t border-[#F0F0EE] flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#888888] mr-1">Technologies:</span>
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-2 py-0.5 bg-[#F4F4F2] border border-[#E5E5E0] text-[#333333]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
