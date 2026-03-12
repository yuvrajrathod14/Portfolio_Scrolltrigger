"use client";

import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Unreal Visualizations",
      description: "Bringing impossible architectural and cinematic concepts to life using Unreal Engine 5.",
      tags: ["Unreal Engine", "VFX", "Environment"],
    },
    {
      id: 2,
      title: "Cinematic Film Editing",
      description: "Editorial work for Jaimin Films, focusing on pacing, narrative flow, and visual impact.",
      tags: ["Premiere Pro", "After Effects", "Storytelling"],
    },
    {
      id: 3,
      title: "Digital Illustration",
      description: "Character design and background illustrations for Mind Brew Studio.",
      tags: ["Photoshop", "Character Design", "Ilustrator"],
    },
    {
      id: 4,
      title: "Full-Stack Web Dev",
      description: "Modern web applications built with Next.js, Django, and high-performance animations.",
      tags: ["Next.js", "Python", "Interactive"],
    }
  ];

  return (
    <section id="projects" className="min-h-screen bg-[#121212] py-20 px-6 md:px-20 lg:px-32 relative z-20 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 md:mb-16 tracking-tight">
          Selected Artifacts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer
                         bg-white/[0.02] border border-white/[0.05]
                         backdrop-blur-sm transition-all duration-700
                         hover:bg-white/[0.04] hover:border-white/[0.1]
                         hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <span className="text-white/20 text-[10px] font-bold tracking-widest mb-2 md:mb-4 block">0{project.id}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
                  {project.title}
                </h3>
                <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-xs md:text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider
                                 border border-white/5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
