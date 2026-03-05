"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Star, DollarSign, Users, BookOpen, GraduationCap, Heart } from "lucide-react";

interface BentoItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  span?: "col" | "row" | "both";
  tag?: string;
}

const items: BentoItem[] = [
  {
    title: "UC LEADS Scholar",
    subtitle: "University of California",
    period: "2025 – 2027",
    description:
      "Selected as one of a limited number of scholars for this UC-wide research and leadership program. This fellowship supports my Ph.D. pursuits for a TBD number of years within the UC system.",
    icon: Star,
    accent: "#f59e0b",
    span: "col",
    tag: "Competitive Fellowship",
  },
  {
    title: "Finance Chair",
    subtitle: "Undergraduate Bioinformatics Club (UBIC)",
    period: "2025 – 2026",
    description:
      "Managed event finances and logistics, directly enabling bioinformatics student body engagement and activities across the department.",
    icon: DollarSign,
    accent: "#22d3ee",
    tag: "Executive Role",
  },
  {
    title: "Secretary",
    subtitle: "Tau Kappa Epsilon — UCSD Chapter",
    period: "2024 – 2025",
    description:
      "Coordinated meetings and events for an 80-member organization. Managed funding logistics and organized philanthropic events raising thousands of dollars for St. Jude Children's Research Hospital.",
    icon: Users,
    accent: "#a855f7",
    span: "col",
    tag: "Leadership",
  },
  {
    title: "Student Representative",
    subtitle: "BICD 100 (Genetics)",
    period: "Fall 2024",
    description:
      "Participated in weekly faculty meetings to represent student feedback and share class-wide updates, bridging communication between students and instructors.",
    icon: BookOpen,
    accent: "#10b981",
    tag: "Advocacy",
  },
  {
    title: "Mentor Collective Program",
    subtitle: "UC San Diego",
    period: "2025 – 2026",
    description:
      "Served as a mentor for an incoming freshman, providing guidance and support during their transition to university life.",
    icon: Heart,
    accent: "#22d3ee",
    tag: "Mentorship",
  },
  {
    title: "Triton Research & Experiential Learning Scholar",
    subtitle: "TRELS — UC San Diego",
    period: "Winter 2026",
    description:
      "A program empowering students to pursue intellectual opportunities beyond the classroom through funding and mentorship support.",
    icon: GraduationCap,
    accent: "#a855f7",
    tag: "Fellowship",
  },
];

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;

  const colSpan =
    item.span === "col" || item.span === "both" ? "md:col-span-2" : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className={`relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-opacity-50 transition-all duration-300 hover:bg-slate-900/90 group overflow-hidden ${colSpan}`}
    >
      {/* Gradient glow corner */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${item.accent}20` }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
        style={{ background: `linear-gradient(90deg, ${item.accent}, transparent 70%)` }}
      />

      {/* Tag */}
      {item.tag && (
        <span
          className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-4"
          style={{
            color: item.accent,
            background: `${item.accent}15`,
            border: `1px solid ${item.accent}30`,
          }}
        >
          {item.tag}
        </span>
      )}

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ background: `${item.accent}18` }}
      >
        <Icon size={18} style={{ color: item.accent }} />
      </div>

      {/* Text */}
      <div className="space-y-1 mb-3">
        <h3 className="font-semibold text-white text-base leading-snug">{item.title}</h3>
        <p className="text-xs text-slate-500">{item.subtitle}</p>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.description}</p>

      {/* Period chip */}
      <span className="text-xs font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
        {item.period}
      </span>
    </motion.div>
  );
}

export default function Leadership() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="leadership" className="py-24 relative overflow-hidden">
      <div className="absolute -left-40 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

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
              03 / Leadership & Activities
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
          >
            Beyond the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Lab Bench
            </span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <BentoCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
