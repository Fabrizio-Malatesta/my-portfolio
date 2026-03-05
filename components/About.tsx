"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Award, Calendar, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  sublabel?: string;
}

const stats: Stat[] = [
  { icon: Award, value: "3.8", label: "GPA", sublabel: "Provost Honors" },
  { icon: Calendar, value: "2027", label: "Expected Grad." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

// Counts up to a numeric value when it enters the viewport
function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState(value);

  const isFloat = /^\d+\.\d+$/.test(value);
  const isYear = /^20\d{2}$/.test(value);

  useEffect(() => {
    if (!inView) return;

    if (isFloat) {
      const target = parseFloat(value);
      const controls = animate(0, target, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(v.toFixed(1)),
      });
      return controls.stop;
    }

    if (isYear) {
      const target = parseInt(value, 10);
      const controls = animate(target - 5, target, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v).toString()),
      });
      return controls.stop;
    }
  }, [inView, value, isFloat, isYear]);

  return <>{display}</>;
}

function StatCard({
  stat,
  index,
  sectionInView,
}: {
  stat: Stat;
  index: number;
  sectionInView: boolean;
}) {
  const Icon = stat.icon;

  // Mouse-following spotlight effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%", opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      key={stat.label}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      custom={index + 4}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 sm:p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/40 hover:bg-slate-900/80 transition-all duration-300 group overflow-hidden cursor-default"
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(120px circle at ${spotlight.x} ${spotlight.y}, rgba(34,211,238,0.08), transparent 70%)`,
          opacity: spotlight.opacity,
        }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-bl-full" />

      <Icon
        size={18}
        className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform will-change-transform"
      />
      <p className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
        <AnimatedValue value={stat.value} inView={sectionInView} />
      </p>
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
        {stat.label}
      </p>
      {stat.sublabel && (
        <p className="text-xs text-cyan-400/70 mt-0.5">{stat.sublabel}</p>
      )}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            01 / About
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              variants={fadeUp}
              className="mb-2"
            >
              <span className="inline-flex items-center gap-2 text-xs text-cyan-400 font-medium px-2.5 py-1 rounded border border-cyan-400/20 bg-cyan-400/5 mb-4">
                <GraduationCap size={12} />
                B.S. Biology · Bioinformatics Specialization · CS Minor
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug"
            >
              University of California,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                San Diego
              </span>
            </motion.h2>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
              variants={fadeUp}
              className="text-slate-400 leading-relaxed text-base space-y-3"
            >
              <p>
                I am a Bioinformatics student at UC San Diego with a deep
                interest in the intersection of biological data and computational
                modeling. My academic foundation combines a major in Biology
                (Specialization in Bioinformatics) with a minor in Computer
                Science, providing me with the interdisciplinary toolkit
                necessary to tackle complex genomic questions. I am particularly
                passionate about:
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex gap-2.5">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                  <span>
                    <span className="text-slate-300 font-medium">
                      Computational Genomics &amp; Statistical Genetics:
                    </span>{" "}
                    Leveraging large-scale data to understand disease mechanisms.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                  <span>
                    <span className="text-slate-300 font-medium">
                      Algorithmic Development:
                    </span>{" "}
                    Applying data structures and runtime analysis to biological
                    pipelines.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                  <span>
                    <span className="text-slate-300 font-medium">
                      Interdisciplinary Research:
                    </span>{" "}
                    Bridging the gap between &ldquo;wet lab&rdquo; biological
                    questions and &ldquo;dry lab&rdquo; computational solutions.
                  </span>
                </li>
              </ul>
              <p>
                I am also a UC LEADS Scholar, actively preparing to pursue a
                Ph.D. to further explore the potential of Bioinformatics in
                improving human health. When I&apos;m not in the lab or at the
                computer, you can usually find me rock climbing, training Muay
                Thai, or following the latest in soccer.
              </p>
            </motion.div>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={i}
                sectionInView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
