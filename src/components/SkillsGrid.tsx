"use client";

import { motion } from "framer-motion";

const skills = ["VFX", "Game Dev", "Rendering", "Editing", "Viral Reel Edit", "Animation", "Environment Design", "Character Design"];
const tools = ["Unreal Engine", "Blender", "After Effects", "Premiere Pro", "Houdini", "Photoshop"];
const webTools = ["HTML", "CSS", "JavaScript", "Python", "Django", "C++"];

export default function SkillsGrid() {
  return (
    <section id="skills" className="bg-[#121212] py-20 px-6 md:px-20 lg:px-32 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-tight">Technical Mastery</h2>
          <div className="space-y-8 md:space-y-12">
            <div>
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">Software Stack</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 md:gap-4">
                {tools.map((tool) => (
                  <div key={tool} className="group p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all">
                    <span className="text-neutral-300 text-xs md:text-sm font-medium">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">Web & Programming</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {webTools.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs md:text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-tight">Creative Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {skills.map((skill) => (
              <div key={skill} className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] flex items-center gap-3 md:gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-neutral-200 text-sm md:text-base font-semibold">{skill}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white text-black" data-cursor>
            <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 italic">&quot;YUVI&quot;</h4>
            <p className="text-xs md:text-sm font-medium opacity-70 leading-relaxed">
              Fusing cutting-edge technology with high-impact storytelling to create memorable digital artifacts.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
