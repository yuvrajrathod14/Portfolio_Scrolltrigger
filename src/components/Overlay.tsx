"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: (0% scroll) fades out quickly as user scrolls down
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Section 2: (30% scroll) fades in and out
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: (60% scroll) fades in and out
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [100, -100]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 uppercase leading-none">
            Yuvraj <br /> <span className="text-neutral-500">Rathod</span>
          </h1>
          <p className="text-sm md:text-xl text-neutral-400 font-medium uppercase tracking-widest max-w-2xl leading-relaxed">
            I turn visualizations into reality.
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Scroll to explore</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-center md:text-left max-w-7xl mx-auto w-full px-6 md:px-20"
        >
          <span className="text-white/40 text-xs md:text-sm font-bold tracking-widest uppercase mb-4">The Journey</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
            From childhood dreams to defining the future of animation.
          </h2>
          <p className="mt-8 text-neutral-400 text-base md:text-xl max-w-2xl leading-relaxed" data-cursor>
            Creating narratives that resonate deeply with every viewer.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center md:items-end justify-center text-center md:text-right max-w-7xl mx-auto w-full px-6 md:px-20"
        >
          <span className="text-white/40 text-xs md:text-sm font-bold tracking-widest uppercase mb-4 opacity-70">Collaboration</span>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            Creative exchange and collaborative growth.
          </h2>
          <p className="mt-8 text-neutral-400 text-base md:text-xl max-w-xl leading-relaxed">
            Crafting memorable stories for global audiences.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
