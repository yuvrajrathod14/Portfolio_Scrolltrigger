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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current || images.length === 0) return;

    const img = images[Math.max(0, Math.min(FRAME_COUNT - 1, index))];
    if (!img) return;

    const canvas = canvasRef.current;
    
    // Set internal canvas resolution
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      // Re-render current frame on resize
      // We can use a ref for latest index or just rely on state if we had it
      // For now, first frame is safe
      renderFrame(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // Ensure first frame renders when images load
  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      renderFrame(0);
    }
  }, [images]);

  // Scrub through animation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const currentFrame = Math.round(latest * (FRAME_COUNT - 1));
    requestAnimationFrame(() => renderFrame(currentFrame));
  });

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
}
