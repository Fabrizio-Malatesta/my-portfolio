"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Terminal, Microscope, Megaphone, Globe } from "lucide-react";

interface SkillGroup {
  category: string;
  icon: LucideIcon;
  accent: string;
  skills: string[];
}

const groups: SkillGroup[] = [
  {
    category: "Technical",
    icon: Terminal,
    accent: "#22d3ee",
    skills: [
      "Python",
      "Java",
      "Bash",
      "C++",
      "LaTeX",
      "FIJI / ImageJ",
      "Microsoft Office",
      "PADI Advanced Open Water",
    ],
  },
  {
    category: "Research",
    icon: Microscope,
    accent: "#a855f7",
    skills: [
      "Genomic data analysis",
      "Statistical Genetics",
      "Genomic Data Visualization",
      "Molecular techniques",
      "Experimental design",
      "Data interpretation",
      "GWAS",
      "LDSC",

      "GenomicSEM",
    ],
  },
  {
    category: "Communication",
    icon: Megaphone,
    accent: "#10b981",
    skills: [
      "Scientific presentations",
      "Public speaking",
      "Mentoring",
      "Collaborative teamwork",
    ],
  },
  {
    category: "Languages",
    icon: Globe,
    accent: "#f59e0b",
    skills: ["English (Fluent)", "Italian (Fluent)", "Spanish (Proficient)"],
  },
];

function Chip({
  label,
  accent,
  delay,
  inView,
}: {
  label: string;
  accent: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium cursor-default transition-shadow duration-200"
      style={{
        color: accent,
        background: `${accent}12`,
        border: `1px solid ${accent}30`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${accent}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {label}
    </motion.span>
  );
}

function SkillCard({ group, groupIndex }: { group: SkillGroup; groupIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = group.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors duration-300"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${group.accent}18` }}
        >
          <Icon size={16} style={{ color: group.accent }} />
        </div>
        <h3 className="font-semibold text-white text-sm">{group.category}</h3>
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(90deg, ${group.accent}40, transparent)` }}
        />
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <Chip
            key={skill}
            label={skill}
            accent={group.accent}
            delay={groupIndex * 0.1 + i * 0.05}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              04 / Skills
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
          >
            Toolkit &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Expertise
            </span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {groups.map((group, i) => (
            <SkillCard key={group.category} group={group} groupIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
