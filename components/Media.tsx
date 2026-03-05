"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";

type MediaType = "Abstract" | "Poster" | "Slides" | "Presentation";

interface MediaItem {
  type: MediaType;
  title: string;
  venue: string;
  year: string;
  // Set href to the PDF path (e.g. "/mcvicker-poster.pdf") or an external URL.
  // Leave as "" to render as coming-soon (no link shown).
  href: string;
}

const items: MediaItem[] = [
  // McVicker Lab — Superb-seq
  {
    type: "Abstract",
    title: "Identifying Low-Frequency Off-Target Genome Edits from Superb-seq Data",
    venue: "McVicker Lab — Salk Institute",
    year: "2025",
    href: "/media/mcvicker_project_abstract.pdf",
  },
  {
    type: "Poster",
    title: "Identifying Low-Frequency Off-Target Genome Edits from Superb-seq Data",
    venue: "NCRC 2026 @ Harvard",
    year: "2026",
    href: "/media/ncrc_poster.pdf",
  },
  {
    type: "Poster",
    title: "Identifying Low-Frequency Off-Target Genome Edits from Superb-seq Data",
    venue: "UC LEADS Symposium 2026 @ UCSF",
    year: "2026",
    href: "/media/uc_leads_symposium_poster.pdf",
  },
  // Sanchez-Roige Lab — Wisdom GWAS
  {
    type: "Abstract",
    title: "Genetic Architecture of Wisdom: A Multi-Variate Genomic Analysis",
    venue: "Sanchez-Roige Lab — UC San Diego",
    year: "2026",
    href: "",
  },
  {
    type: "Poster",
    title: "Genetic Architecture of Wisdom: A Multi-Variate Genomic Analysis",
    venue: "Sanchez-Roige Lab — UC San Diego",
    year: "2026",
    href: "",
  },
];

const typeStyles: Record<MediaType, { color: string; bg: string; border: string }> = {
  Abstract:     { color: "#22d3ee", bg: "#22d3ee12", border: "#22d3ee30" },
  Poster:       { color: "#a855f7", bg: "#a855f712", border: "#a855f730" },
  Slides:       { color: "#10b981", bg: "#10b98112", border: "#10b98130" },
  Presentation: { color: "#f59e0b", bg: "#f59e0b12", border: "#f59e0b30" },
};

function MediaRow({ item, index }: { item: MediaItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const style = typeStyles[item.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-4 border-b border-slate-800/60 last:border-0 group"
    >
      {/* Type badge */}
      <span
        className="flex-shrink-0 self-start sm:self-auto text-xs font-medium px-2.5 py-1 rounded-full w-fit"
        style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
      >
        {item.type}
      </span>

      {/* Title + venue */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-200 font-medium leading-snug group-hover:text-white transition-colors">
          {item.title}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {item.venue} · {item.year}
        </p>
      </div>

      {/* Link */}
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95 w-fit"
        >
          <ExternalLink size={11} />
          View
        </a>
      ) : (
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-800 text-slate-600 w-fit cursor-default">
          <FileText size={11} />
          Coming soon
        </span>
      )}
    </motion.div>
  );
}

export default function Media() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="media" className="py-24 relative overflow-hidden">
      <div className="absolute -right-40 top-1/3 w-80 h-80 bg-cyan-400/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              06 / Academic Media
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
          >
            Posters &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Abstracts
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-2"
        >
          {items.map((item, i) => (
            <MediaRow key={`${item.type}-${i}`} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
