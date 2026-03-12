"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || "home");
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const sectionIds = ["projects", "skills", "about", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleHome = () => {
      if (window.scrollY < 300) setActiveSection("home");
    };
    window.addEventListener("scroll", handleHome);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleHome);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-20 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-full px-6 md:px-8 py-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-bold text-xl tracking-tighter"
          >
            YUVI.
          </motion.div>
          
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "") || 
                               (link.href === "#" && (activeSection === "home" || activeSection === ""));
              
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1",
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:block bg-white text-black text-xs font-bold px-5 py-2 rounded-full hover:bg-neutral-200 transition-colors"
            >
              LET&apos;S TALK
            </motion.button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            >
              <motion.span 
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                className="w-6 h-0.5 bg-white rounded-full transition-transform"
              />
              <motion.span 
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-white rounded-full"
              />
              <motion.span 
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                className="w-6 h-0.5 bg-white rounded-full transition-transform"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-bold text-white tracking-tighter hover:text-neutral-500 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 bg-white text-black font-bold px-10 py-4 rounded-full"
            >
              LET&apos;S TALK
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


