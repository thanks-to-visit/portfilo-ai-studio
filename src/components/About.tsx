import React from 'react';
import { SiteSettings } from '../types';
import { Compass, Cpu, Layers, BookCheck, Terminal } from 'lucide-react';

interface AboutProps {
  settings: SiteSettings;
}

export const About: React.FC<AboutProps> = ({ settings }) => {
  const interestedAreas = [
    { name: 'Distributed Systems', desc: 'Consensus protocols, Raft, fault tolerance, replication' },
    { name: 'Backend Engineering', desc: 'Predictable latency, connection pooling, high-load async I/O' },
    { name: 'Developer Tools', desc: 'AST compilers, execution profilers, reproducible CI pipelines' },
    { name: 'Data & Vector Retrieval', desc: 'SIMD kernels, columnar storage, embedding indexing' },
    { name: 'Software Architecture', desc: 'Clean boundaries, idempotency, failure mode analysis' }
  ];

  const philosophies = [
    {
      title: 'Simplicity over cleverness',
      body: 'Clever code is difficult to reason about under pressure at 2:00 AM. Clear, straightforward code with clean boundaries will always outperform esoteric tricks in production.'
    },
    {
      title: 'Mechanical sympathy',
      body: 'Understanding hardware hierarchies, CPU caches, and OS kernel schedulers yields orders of magnitude higher performance gains than micro-optimizing high-level syntax.'
    },
    {
      title: 'Explicit failure boundaries',
      body: 'Every network call will eventually fail; every disk write will eventually stall. Robust systems anticipate partitioning and fail gracefully with bounded backpressure.'
    },
    {
      title: 'Measure before tuning',
      body: 'Never optimize based on intuition. Measure P99 distributions, profile allocators with flame graphs, and verify that empirical results match mental models.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#DCDCDC] bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
            01 &middot; Background & Ethos
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
            About & Engineering Focus
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Biography & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4 text-base text-[#444444] leading-relaxed">
              {settings.bioFull.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Education Highlight */}
            <div className="pt-6 border-t border-[#E5E5E0]">
              <h3 className="text-xs uppercase tracking-wider text-[#666666] font-mono mb-3">
                Academic Background
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h4 className="text-base font-semibold text-[#171717]">
                    B.S. in Computer Science
                  </h4>
                  <p className="text-sm text-[#555555]">
                    Focus in Distributed Systems & Computer Architecture
                  </p>
                </div>
                <span className="text-xs font-mono text-[#666666] shrink-0">
                  Graduated with Honors &middot; 2025
                </span>
              </div>
            </div>

            {/* Engineering Philosophy */}
            <div className="pt-6 border-t border-[#E5E5E0]">
              <h3 className="text-xs uppercase tracking-wider text-[#666666] font-mono mb-4">
                Core Engineering Tenets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {philosophies.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-[#171717] flex items-center gap-1.5">
                      <span className="text-xs font-mono text-[#1B4332]">0{idx + 1}.</span>
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Currently & Focus Areas */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Currently Block */}
            <div className="bg-white border border-[#DCDCDC] p-6 rounded-sm shadow-2xs space-y-5">
              <h3 className="text-xs uppercase tracking-wider text-[#171717] font-semibold flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#1B4332]" />
                Current Trajectory
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[#666666] block mb-1">Building</span>
                  <p className="text-[#171717] font-medium leading-snug">
                    {settings.currentlyBuilding}
                  </p>
                </div>

                <div className="border-t border-[#F0F0EE] pt-3">
                  <span className="font-mono text-[#666666] block mb-1">Learning</span>
                  <p className="text-[#171717] font-medium leading-snug">
                    {settings.currentlyLearning}
                  </p>
                </div>

                <div className="border-t border-[#F0F0EE] pt-3">
                  <span className="font-mono text-[#666666] block mb-1">Exploring</span>
                  <p className="text-[#171717] font-medium leading-snug">
                    {settings.currentlyExploring}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Interests */}
            <div className="bg-white border border-[#DCDCDC] p-6 rounded-sm shadow-2xs space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-[#171717] font-semibold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#1B4332]" />
                Primary Technical Interests
              </h3>

              <ul className="space-y-3">
                {interestedAreas.map((area, idx) => (
                  <li key={idx} className="text-xs">
                    <div className="font-semibold text-[#171717]">{area.name}</div>
                    <div className="text-[#666666] mt-0.5 leading-relaxed">{area.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
