"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Freelancer",
    company: "Work From Home",
    period: "Present",
    description: "Specializing in Unreal Engine visualizations, 3D character design, and high-impact video editing."
  },
  {
    role: "Editor",
    company: "Jaimin Films",
    period: "Past",
    description: "Crafting narratives and visual flow for cinematic film projects."
  },
  {
    role: "Illustrator",
    company: "Mind Brew Studio",
    period: "Freelance",
    description: "Visual storytelling through digital illustration and conceptual art."
  }
];

const education = [
  {
    degree: "B.Tech IT (Information Technology)",
    school: "Sankalchand Patel College of Engineering, Gujarat, India",
    period: "2022 - 2026"
  },
  {
    degree: "Higher Secondary School",
    school: "Modasa, Gujarat, India",
    period: "Graduated 2021"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#121212] py-20 px-6 md:px-20 lg:px-32 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-20 lg:gap-32">
        
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-tight">Experience</h2>
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-6 md:pl-8 border-l border-white/10"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20" />
                <h3 className="text-lg md:text-xl font-semibold text-white">{exp.role}</h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 mt-2 gap-1">
                  <span className="text-neutral-500 text-sm font-medium">{exp.company}</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{exp.period}</span>
                </div>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-md">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-tight">Education</h2>
          <div className="space-y-8 md:space-y-12">
            {education.map((edu, i) => (
              <div key={i} className="group">
                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors leading-tight">
                  {edu.degree}
                </h3>
                <p className="text-neutral-400 text-sm mt-2 mb-1">{edu.school}</p>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{edu.period}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-20 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#1a1a1a] border border-white/[0.05]">
            <h4 className="text-white text-base md:text-lg font-bold mb-4">Interests & Vibes</h4>
            <div className="flex flex-wrap gap-2">
              {["Gaming", "Sketching", "Comics/Manga", "Music", "Cinema"].map(interest => (
                <span key={interest} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/5 bg-white/5 text-neutral-300 text-[10px] md:text-xs">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
