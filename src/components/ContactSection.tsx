"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "919727905010";
    const text = `Hi Yuvraj! %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#0a0a0a] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">
            Let&apos;s <br /> <span className="text-neutral-500">Create.</span>
          </h2>
          
          <div className="space-y-8 mt-12">
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Email</p>
              <a href="mailto:yuvraj141104@gmail.com" className="text-xl md:text-2xl text-white hover:text-neutral-400 transition-colors">
                yuvraj141104@gmail.com
              </a>
            </div>
            
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Phone</p>
              <p className="text-xl md:text-2xl text-white">+91 9727905010</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Instagram</p>
                <a href="https://instagram.com/yuvraj_141104" target="_blank" className="text-lg text-white hover:text-neutral-400 transition-colors">
                  @yuvraj_141104
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">LinkedIn</p>
                <a href="https://www.linkedin.com/in/yuvraj-rathod-b130b6376/" target="_blank" className="text-lg text-white hover:text-neutral-400 transition-colors">
                  Yuvraj Rathod
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">GitHub</p>
                <a href="https://github.com/yuvrajrathod14" target="_blank" className="text-lg text-white hover:text-neutral-400 transition-colors">
                  yuvrajrathod14
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] border border-white/[0.05] p-8 md:p-12 rounded-3xl backdrop-blur-sm"
        >
          <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Write your message here..."
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-5 rounded-xl hover:bg-neutral-200 transition-colors active:scale-[0.98]"
            >
              SEND DIRECT MESSAGE
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
