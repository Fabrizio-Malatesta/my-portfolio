"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Menu, X, Download, Linkedin, Mail } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Leadership", href: "#leadership" },
  { label: "Skills", href: "#skills" },
  { label: "Gallery", href: "#gallery" },
  { label: "Media", href: "#media" },
  { label: "Résumé", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-cyan-400/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group flex-shrink-0">
          <Dna
            size={22}
            className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-semibold text-slate-100 tracking-tight text-sm">
            FM
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <a
            href="https://www.linkedin.com/in/fabrizio-malatesta-10a1b4341"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs font-medium hover:bg-slate-800 transition-all duration-200"
          >
            <Download size={13} />
            Resume
          </a>
          <a
            href="mailto:famalatesta@ucsd.edu"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Mail size={13} />
            Email Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-slate-400 hover:text-cyan-400 transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-md border-b border-cyan-400/10 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              {/* Mobile actions */}
              <li className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <a
                  href="mailto:famalatesta@ucsd.edu"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300 transition-colors"
                >
                  <Mail size={12} />
                  Email Me
                </a>
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs font-medium hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                >
                  <Download size={12} />
                  Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/fabrizio-malatesta-10a1b4341"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs font-medium hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                >
                  <Linkedin size={12} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
