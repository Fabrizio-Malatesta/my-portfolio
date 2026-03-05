"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  caption: string;
  location: string;
  span?: "wide";
}

const photos: Photo[] = [
  {
    src: "/gallery/NCRC_1.jpg",
    caption: "NCRC 2026 @ Harvard",
    location: "Cambridge, MA",
    span: "wide",
  },
  {
    src: "/gallery/NCRC_2.jpg",
    caption: "NCRC 2026 @ Harvard",
    location: "Cambridge, MA",
  },
  {
    src: "/gallery/mueller_lab_1.jpg",
    caption: "Mueller Lab — Salk Institute",
    location: "La Jolla, CA",
  },
  {
    src: "/gallery/mueller_lab_2.jpg",
    caption: "Mueller Lab — Salk Institute",
    location: "La Jolla, CA",
  },
  {
    src: "/gallery/mueller_lab_3.jpg",
    caption: "Mueller Lab — Salk Institute",
    location: "La Jolla, CA",
  },
  {
    src: "/gallery/uc_leads_symposium_1.JPG",
    caption: "UC LEADS Symposium 2026 @ UCSF",
    location: "San Francisco, CA",
    span: "wide",
  },
  {
    src: "/gallery/uc_leads_symposium_2.JPG",
    caption: "UC LEADS Symposium 2026 @ UCSF",
    location: "San Francisco, CA",
  },
  {
    src: "/gallery/uc_leads_symposium_3.JPG",
    caption: "UC LEADS Symposium 2026 @ UCSF",
    location: "San Francisco, CA",
    span: "wide",
  },
  {
    src: "/gallery/uc_leads_symposium_4.jpg",
    caption: "UC LEADS Symposium 2026 @ UCSF",
    location: "San Francisco, CA",
  },
];

function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const photo = photos[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-600 transition-colors z-10"
        onClick={onClose}
      >
        <X size={16} />
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-600 transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Next */}
      {photos.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-600 transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.caption}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
        />
        <div className="text-center">
          <p className="text-sm font-medium text-white">{photo.caption}</p>
          <p className="text-xs text-slate-400 mt-0.5">{photo.location}</p>
        </div>
        {photos.length > 1 && (
          <p className="text-xs text-slate-600 font-mono">
            {current + 1} / {photos.length}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-slate-600 transition-all duration-300 cursor-zoom-in ${
        photo.span === "wide" ? "md:col-span-2" : ""
      }`}
      style={{ aspectRatio: photo.span === "wide" ? "16/7" : "4/3" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.caption}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

      {/* Hover zoom indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-sm border border-slate-600/60 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-sm font-semibold text-white leading-snug drop-shadow-md">
          {photo.caption}
        </p>
        <p className="text-xs text-slate-300/80 mt-0.5 drop-shadow-md">{photo.location}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              05 / Gallery
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Journey
            </span>
          </motion.h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
          {photos.map((photo, i) => (
            <PhotoCard
              key={`${photo.src}-${i}`}
              photo={photo}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
