"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Dna, Linkedin, Download } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "famalatesta@ucsd.edu",
    href: "mailto:famalatesta@ucsd.edu",
  },
  { icon: MapPin, label: "La Jolla, CA", href: undefined },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    // Update to your actual LinkedIn profile URL
    href: "https://www.linkedin.com/in/fabrizio-malatesta-10a1b4341",
  },
  {
    icon: Download,
    label: "Resume (PDF)",
    // Place your PDF at public/resume.pdf
    href: "/resume.pdf",
    download: true,
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer id="contact" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-cyan-400/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            08 / Contact
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
        </motion.div>

        <div className="text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Dna size={36} className="text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-slate-400 text-base max-w-md mx-auto mb-10 leading-relaxed">
              Interested in collaboration, research opportunities, or just want
              to talk genomics? I&apos;d love to hear from you.
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 flex-wrap"
          >
            {contactItems.map(({ icon: Icon, label, href }, i) => {
              const inner = (
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/40 hover:bg-slate-900/80 transition-all duration-300 group">
                  <Icon
                    size={16}
                    className="text-cyan-400 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {label}
                  </span>
                </div>
              );

              return href ? (
                <a key={label} href={href}>
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </motion.div>

          {/* Social / resource links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex items-center justify-center gap-3 mb-10 flex-wrap"
          >
            {socialLinks.map(({ icon: Icon, label, href, download }) => (
              <a
                key={label}
                href={href}
                {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-medium hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="mailto:famalatesta@ucsd.edu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-all duration-200 glow-cyan hover:scale-105 active:scale-95"
            >
              <Mail size={15} />
              Send a Message
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Fabrizio Malatesta</span>
          <span className="flex items-center gap-1.5">
            Built with Next.js · Three.js · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
