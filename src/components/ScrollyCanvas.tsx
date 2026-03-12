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
  const [isReady, setIsReady] = useState(false); // Controls when the site becomes interactive
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload Images progressively
  useEffect(() => {
    let loadedCount = 0;
    const PRIORITY_FRAMES = 20; // Load these first to allow interaction
    const loadedImages: HTMLImageElement[] = [];
    
    // Start loading all images, but track priority separately
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      
      img.onload = () => {
        loadedCount++;
        
        // Only update progress and "isReady" based on priority frames initially
        if (!isReady) {
          const progress = Math.min(100, Math.floor((loadedCount / PRIORITY_FRAMES) * 100));
          setLoadingProgress(progress);
          
          if (loadedCount >= PRIORITY_FRAMES) {
            setIsReady(true);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [isReady]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = images[Math.max(0, Math.min(FRAME_COUNT - 1, index))];
    // Fallback if background image isn't loaded yet - render closest available or just return
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

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * (window.devicePixelRatio || 1);
        canvasRef.current.height = window.innerHeight * (window.devicePixelRatio || 1);
        const currentIndex = Math.round(scrollYProgress.get() * (FRAME_COUNT - 1));
        renderFrame(currentIndex);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [images, isReady]);

  useEffect(() => {
    if (isReady) {
      renderFrame(0);
    }
  }, [isReady]);

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
          <div className="text-4xl font-bold mb-4 tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent animate-pulse uppercase">
            Preparing Experience
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
            Fast-tracking visual sequence... {loadingProgress}%
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
