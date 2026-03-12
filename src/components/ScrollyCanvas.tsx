"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192; // ezgif-frame-001.png to ezgif-frame-192.png

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/ezgif-frame-${paddedIndex}.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setIsReady(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization for static backgrounds
    if (!ctx) return;

    const img = images[Math.max(0, Math.min(FRAME_COUNT - 1, index))];
    if (!img || !img.complete) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Dedicated Resize effect to avoid layout thrashing during scroll
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * (window.devicePixelRatio || 1);
        canvasRef.current.height = window.innerHeight * (window.devicePixelRatio || 1);
        // Important: Re-render the first frame or current frame after resize
        const currentIndex = Math.round(scrollYProgress.get() * (FRAME_COUNT - 1));
        renderFrame(currentIndex);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [images, isReady]);

  // Ensure first frame renders when images load
  useEffect(() => {
    if (isReady) {
      renderFrame(0);
    }
  }, [isReady]);

  // Scrub through animation - requestAnimationFrame used via Framer Motion automatically, 
  // but we ensure we only call our renderFrame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady) return;
    const currentFrame = Math.round(latest * (FRAME_COUNT - 1));
    renderFrame(currentFrame);
  });

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Loading Overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212]">
          <div className="text-4xl font-bold mb-4 tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent animate-pulse">
            LOADING EXPERIENCE
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-2 text-xs uppercase tracking-widest text-gray-500 font-mono">
            {loadingProgress}% Sequence Loaded
          </div>
        </div>
      )}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          style={{ width: '100vw', height: '100vh' }}
          className="absolute inset-0 block" 
        />
      </div>
    </div>
  );
}
