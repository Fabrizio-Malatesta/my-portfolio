"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Mail, ChevronDown, Download, Linkedin } from "lucide-react";

// Dynamically import the canvas (client-only, no SSR)
const DnaCanvas = dynamic(() => import("./DnaCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
    </div>
  ),
});

const contact = [
  { icon: MapPin, label: "La Jolla, CA" },
  { icon: Mail, label: "famalatesta@ucsd.edu", href: "mailto:famalatesta@ucsd.edu" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Radial glow behind helix (visible on all screens) */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-3xl translate-x-1/4" />
        <div className="absolute right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/8 blur-2xl" />
      </div>

      {/* Mobile-only gradient orb (replaces 3D canvas) */}
      <div className="absolute inset-0 md:hidden pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-400/15 via-purple-500/10 to-teal-400/10 blur-3xl" />
        <div className="absolute right-8 top-1/3 w-40 h-40 rounded-full border border-cyan-400/10 animate-spin-slow" />
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-purple-500/15" />
      </div>

      {/* 3D Canvas — hidden on mobile for performance */}
      <div className="absolute inset-0 hidden md:block md:left-1/2 pointer-events-auto z-0">
        <DnaCanvas />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            UC LEADS Scholar · UCSD Researcher
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4"
          >
            Fabrizio{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">
              Malatesta
            </span>
          </motion.h1>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg sm:text-xl text-slate-300 font-medium mb-8 leading-relaxed"
          >
            Undergraduate Researcher{" "}
            <span className="text-cyan-400/80">·</span> Bioinformatics &amp;
            Computational Genomics
          </motion.p>

          {/* Contact chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {contact.map(({ icon: Icon, label, href }) => {
              const inner = (
                <span className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  <Icon size={13} className="text-cyan-400/70" />
                  {label}
                </span>
              );
              return href ? (
                <a key={label} href={href} className="group">
                  {inner}
                </a>
              ) : (
                <span key={label}>{inner}</span>
              );
            })}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#research"
              className="px-5 py-2.5 rounded-lg bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300 transition-all duration-200 glow-cyan hover:scale-105 active:scale-95"
            >
              View Research
            </a>
            {/* Resume download — place your PDF at public/resume.pdf */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-400/40 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Download size={14} />
              Resume
            </a>
            {/* LinkedIn — update href to your profile URL */}
            <a
              href="https://www.linkedin.com/in/fabrizio-malatesta-10a1b4341"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-400 text-sm font-medium hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg border border-slate-700/50 text-slate-400 text-sm font-medium hover:border-slate-600 hover:text-slate-300 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
