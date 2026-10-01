import React from 'react';
import { INITIAL_SKILLS } from '../data/seedData';
import { Code2, Server, Layout, Database, Wrench } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4 text-[#1B4332]" />,
  'Backend & Systems': <Server className="w-4 h-4 text-[#1B4332]" />,
  'Frontend & UI': <Layout className="w-4 h-4 text-[#1B4332]" />,
  'Data & Machine Learning': <Database className="w-4 h-4 text-[#1B4332]" />,
  'DevOps & Tooling': <Wrench className="w-4 h-4 text-[#1B4332]" />
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-[#DCDCDC] bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
            02 &middot; Technical Competencies
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
            Core Skills & Tooling
          </h2>
          <p className="text-sm text-[#666666] mt-2 max-w-xl">
            A breakdown of technologies and frameworks used for production systems, data pipelines, and research implementations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SKILLS.map((skillGroup, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#DCDCDC] p-6 rounded-sm shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {categoryIcons[skillGroup.category] || <Code2 className="w-4 h-4 text-[#1B4332]" />}
                  <h3 className="text-sm font-semibold text-[#171717]">
                    {skillGroup.category}
                  </h3>
                </div>
                <p className="text-xs text-[#666666] mb-5 leading-relaxed">
                  {skillGroup.description}
                </p>
              </div>

              {/* Skill items as clean technical entries with contextual notes */}
              <div className="divide-y divide-[#F0F0EE] border-t border-[#F0F0EE]">
                {skillGroup.items.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-baseline justify-between text-xs">
                    <span className="font-medium text-[#171717]">{item.name}</span>
                    {item.note && (
                      <span className="font-mono text-[11px] text-[#777777] text-right truncate ml-2">
                        {item.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
