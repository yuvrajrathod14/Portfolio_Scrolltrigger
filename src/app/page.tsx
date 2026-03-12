import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import SkillsGrid from "@/components/SkillsGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-white selection:text-black">
      <CustomCursor />
      <Navbar />
      
      <div id="home" className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <Projects />
      <SkillsGrid />
      <AboutSection />
      <ContactSection />
      
      <footer className="py-12 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 bg-[#0a0a0a] border-t border-white/[0.03]">
        © 2024 YUVRAJ RATHOD PORTFOLIO
      </footer>
    </main>
  );
}

