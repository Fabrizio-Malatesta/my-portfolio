"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { FlaskConical, Microscope, Code2, Film, Briefcase, ExternalLink, LinkIcon } from "lucide-react";

interface RoleLink {
  label: string;
  href: string;
}

interface Role {
  org: string;
  location: string;
  period: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  highlights: string[];
  presentations?: string[];
  links?: RoleLink[];
}

const roles: Role[] = [
  {
    org: "Sanchez-Roige Lab — UCSD",
    location: "La Jolla, CA",
    period: "Fall 2025 – Present",
    title: "Research Intern",
    icon: Code2,
    accent: "#22d3ee",
    highlights: [
      "Leading a project analyzing the genetic architecture of wisdom using GWAS and population-level genomic analyses.",
      "Implementing various tools across different platforms for multi-variate genetic analysis.",
    ],
    presentations: ["URC 2026 @ UCSD", "MURALS 2026 @ UCSD"],
    links: [
      { label: "Abstract", href: "" },
      { label: "Poster", href: "" },
    ],
  },
  {
    org: "McVicker Lab — Salk Institute",
    location: "La Jolla, CA",
    period: "Summer 2025",
    title: "Research Intern",
    icon: Code2,
    accent: "#a855f7",
    highlights: [
      "Designed and implemented a computational framework in Bash and Python to identify low-frequency off-target genome edits from Superb-seq single-cell sequencing data.",
      "Aimed to distinguish off-target Cas9-mediated events from spontaneous breaks or technical artifacts.",
    ],
    presentations: [
      "NCRC 2026 @ Harvard",
      "NCUR 2026 @ Richmond",
      "SRC 2025 @ UCSD",
      "UC LEADS Symposium 2026 @ UCSF",
    ],
    links: [
      { label: "Abstract", href: "/media/mcvicker_project_abstract.pdf" },
      { label: "NCRC Poster", href: "/media/ncrc_poster.pdf" },
      { label: "UC LEADS Poster", href: "/media/uc_leads_symposium_poster.pdf" },
    ],
  },
  {
    org: "Mueller Lab — Salk Institute",
    location: "La Jolla, CA",
    period: "Fall 2024 – Summer 2025",
    title: "Lab Tech I",
    icon: Microscope,
    accent: "#10b981",
    highlights: [
      "Conducted experiments on arbuscular mycorrhiza symbiosis using PCR, gel electrophoresis, spore inoculation, microscopy analysis, and gene extraction.",
      "Designed an independent peptide treatment study across multiple plant species and presented findings to the lab.",
    ],
  },
  {
    org: "Weill Cornell Medicine",
    location: "New York, NY",
    period: "Summer 2022",
    title: "Research Assistant",
    icon: FlaskConical,
    accent: "#f59e0b",
    highlights: [
      "Conducted experiments on mitochondrial myopathies in mice to test potential therapeutic approaches.",
    ],
  },
  {
    org: "Mediakite",
    location: "New York, NY",
    period: "2019 – 2023",
    title: "Production Crew Member",
    icon: Film,
    accent: "#64748b",
    highlights: [
      "Managed tasks at on-location shoots including set construction, camera work, and facilitating clear communication between staff and clients.",
    ],
  },
  {
    org: "Alliance NY Team — Compass Real Estate",
    location: "New York, NY",
    period: "2023",
    title: "Assistant",
    icon: Briefcase,
    accent: "#64748b",
    highlights: [
      "Assisted with creating and updating property listings, showings, and effective client communications.",
    ],
  },
];

function TimelineItem({ role, index }: { role: Role; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const RoleIcon = role.icon;

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-4 md:gap-0 ${
        isLeft ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-[calc(50%-2rem)] flex-shrink-0"
      >
        <div
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-opacity-60 transition-all duration-300 hover:bg-slate-900/80 group relative overflow-hidden"
          style={
            {
              "--accent": role.accent,
              borderColor: undefined,
            } as React.CSSProperties
          }
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${role.accent}, transparent)` }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-3 gap-4">
            <div>
              <h3 className="font-semibold text-white text-base leading-snug">
                {role.org}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{role.location}</p>
            </div>
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${role.accent}18` }}
            >
              <RoleIcon size={15} style={{ color: role.accent }} />
            </div>
          </div>

          {/* Role badge + period */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                color: role.accent,
                background: `${role.accent}18`,
                border: `1px solid ${role.accent}30`,
              }}
            >
              {role.title}
            </span>
            <span className="text-xs text-slate-500 font-mono">{role.period}</span>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-4">
            {role.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: role.accent }} />
                {h}
              </li>
            ))}
          </ul>

          {/* Presentations */}
          {role.presentations && (
            <div className="pt-3 border-t border-slate-800">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <ExternalLink size={10} />
                Presentations
              </p>
              <div className="flex flex-wrap gap-1.5">
                {role.presentations.map((p) => (
                  <span
                    key={p}
                    className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {role.links && role.links.filter((l) => l.href).length > 0 && (
            <div className="pt-3 border-t border-slate-800">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <LinkIcon size={10} />
                Links
              </p>
              <div className="flex flex-wrap gap-2">
                {role.links.filter((l) => l.href).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all duration-200 hover:scale-105"
                    style={{
                      color: role.accent,
                      borderColor: `${role.accent}40`,
                      background: `${role.accent}10`,
                    }}
                  >
                    <ExternalLink size={10} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Center dot + line (desktop) */}
      <div className="hidden md:flex flex-col items-center w-16 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-6 z-10"
          style={{
            borderColor: role.accent,
            background: `${role.accent}33`,
            boxShadow: `0 0 12px ${role.accent}55`,
          }}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)] flex-shrink-0" />
    </div>
  );
}

export default function Research() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="research" className="py-24 relative overflow-hidden">
      <div className="absolute -right-40 top-1/3 w-96 h-96 bg-cyan-400/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              02 / Research & Experience
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
          >
            Research{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Timeline
            </span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-purple-500/20 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-10">
            {roles.map((role, i) => (
              <TimelineItem key={role.org} role={role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
