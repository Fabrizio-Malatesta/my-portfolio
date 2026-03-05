"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, ExternalLink, AlertCircle } from "lucide-react";

const RESUME_PATH = "/resume.pdf";

export default function ResumeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [iframeError, setIframeError] = useState(false);

  return (
    <section id="resume" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -right-40 top-1/4 w-96 h-96 bg-cyan-400/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-40 bottom-1/4 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            07 / Résumé
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
        </motion.div>

        {/* Heading + download button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Curriculum{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Vitae
            </span>
          </h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-medium hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ExternalLink size={14} />
              Open in Tab
            </a>
            <a
              href={RESUME_PATH}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300 transition-all duration-200 glow-cyan hover:scale-105 active:scale-95"
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* PDF viewer container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(34, 211, 238, 0.04)" }}
        >
          {/* Top bar mimicking a browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 border border-slate-700/50">
              <FileText size={12} className="text-slate-500 flex-shrink-0" />
              <span className="text-xs text-slate-500 font-mono truncate">
                fabrizio-malatesta-resume.pdf
              </span>
            </div>
          </div>

          {/* Embedded PDF — desktop */}
          <div className="hidden md:block">
            {iframeError ? (
              <FallbackCard />
            ) : (
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full"
                style={{ height: "860px", border: "none", background: "#020817" }}
                title="Fabrizio Malatesta — Résumé"
                onError={() => setIframeError(true)}
              />
            )}
          </div>

          {/* Mobile fallback — iOS Safari can't embed PDFs in iframes */}
          <div className="md:hidden">
            <MobileFallback />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
        <FileText size={28} className="text-cyan-400" />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-2">View My Résumé</h3>
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          Tap below to open the PDF in your browser or download it directly to
          your device.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200"
        >
          <ExternalLink size={15} />
          Open PDF
        </a>
        <a
          href={RESUME_PATH}
          download
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300 transition-all duration-200"
        >
          <Download size={15} />
          Download
        </a>
      </div>
    </div>
  );
}

function FallbackCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <AlertCircle size={32} className="text-amber-400" />
      <div>
        <h3 className="text-white font-semibold mb-1">Preview unavailable</h3>
        <p className="text-sm text-slate-400 max-w-xs">
          Your browser blocked the inline preview. Use the buttons above to open
          or download the PDF.
        </p>
      </div>
    </div>
  );
}
