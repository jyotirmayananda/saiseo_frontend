"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Images,
  Newspaper,
  Calendar,
  Sparkles,
  Video,
  ZoomIn,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  allGalleryItems,
  galleryVideos,
  latestIndependenceDayImages,
  mediaUrl,
  GalleryItem,
} from "@/lib/gallery";

type FilterTab = "all" | "independence" | "news" | "campus" | "videos";

const filterTabs: { id: FilterTab; label: string; count?: number }[] = [
  { id: "all", label: "🌟 All Photos" },
  { id: "independence", label: "🇮🇳 Independence Day" },
  { id: "news", label: "📰 In The News" },
  { id: "campus", label: "🏫 Campus & Labs" },
  { id: "videos", label: "🎬 Videos" },
];

export default function GalleryPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as FilterTab) || "all";

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [videoLightbox, setVideoLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab && ["all", "independence", "news", "campus", "videos"].includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Filter items based on activeTab
  const filteredPhotos: GalleryItem[] = allGalleryItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "independence") return item.category === "events";
    if (activeTab === "news") return item.category === "news";
    if (activeTab === "campus") return item.category === "campus";
    return true;
  });

  const currentItem =
    selectedItemIndex !== null && filteredPhotos[selectedItemIndex]
      ? filteredPhotos[selectedItemIndex]
      : null;

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : 0
    );
  }, [selectedItemIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
    );
  }, [selectedItemIndex, filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex !== null) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setSelectedItemIndex(null);
      } else if (videoLightbox !== null) {
        if (e.key === "Escape") setVideoLightbox(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, videoLightbox, handleNext, handlePrev]);

  return (
    <section className="min-h-screen bg-surface pb-20 pt-20 sm:pt-28 sm:pb-16">
      <div className="container-main">
        <SectionHeader
          label="Gallery & Media"
          title="Life & Events at Sai SEO Solution"
          description="Explore our latest Independence Day celebrations, newspaper coverage, classroom sessions, and campus activities in Berhampur."
        />

        {/* Featured Newspaper Coverage Banner when viewing all or news */}
        {(activeTab === "all" || activeTab === "news") && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 overflow-hidden rounded-3xl border border-teal/30 bg-gradient-to-r from-brand to-brand-light text-white p-5 sm:p-7 shadow-card"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-light border border-teal/30">
                  <Newspaper size={13} />
                  <span>Press Recognition</span>
                </div>
                <h2 className="font-heading text-xl font-bold sm:text-2xl text-white">
                  Featured in Odia Daily Newspaper — Independence Day Celebration
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                  Sai SEO Solution / Sai Skill Development Institute was highlighted in print media for patriotic flag hoisting and student career empowerment at our Hatibandha Street campus in Brahmapur.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newsIdx = filteredPhotos.findIndex(
                    (p) => p.category === "news"
                  );
                  if (newsIdx !== -1) setSelectedItemIndex(newsIdx);
                  else setSelectedItemIndex(0);
                }}
                className="btn-teal shrink-0 !py-2.5 !px-5 inline-flex items-center gap-2"
              >
                <ZoomIn size={16} />
                <span>Read Newspaper Clipping</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filterTabs.map((t) => {
            const isTabActive = activeTab === t.id;
            let count = 0;
            if (t.id === "all") count = allGalleryItems.length;
            else if (t.id === "independence")
              count = allGalleryItems.filter((i) => i.category === "events").length;
            else if (t.id === "news")
              count = allGalleryItems.filter((i) => i.category === "news").length;
            else if (t.id === "campus")
              count = allGalleryItems.filter((i) => i.category === "campus").length;
            else if (t.id === "videos") count = galleryVideos.length;

            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setSelectedItemIndex(null);
                }}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  isTabActive
                    ? "bg-brand text-white shadow-md scale-105"
                    : "bg-white text-brand border border-slate-200 hover:bg-surface-2 hover:border-slate-300"
                }`}
              >
                {t.label} <span className="opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        {activeTab !== "videos" ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotos.map((item, i) => {
              const isNews = item.category === "news";
              const isEvent = item.category === "events";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.04 }}
                  onClick={() => setSelectedItemIndex(i)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-teal/40 ${
                    isNews
                      ? "border-teal/50 ring-2 ring-teal/20"
                      : isEvent
                      ? "border-slate-200/90"
                      : "border-slate-200/80"
                  }`}
                >
                  {/* Badge */}
                  <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-brand/85 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                    {isNews ? (
                      <Newspaper size={11} className="text-teal-light" />
                    ) : isEvent ? (
                      <Sparkles size={11} className="text-gold" />
                    ) : null}
                    <span>{item.tag}</span>
                  </div>

                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={mediaUrl(item.filename)}
                      alt={item.title}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        isNews ? "object-contain bg-slate-50 p-1" : "object-cover"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                      <p className="text-xs font-semibold text-white flex items-center gap-1">
                        <ZoomIn size={14} /> Click to view in detail
                      </p>
                    </div>
                  </div>

                  {/* Card Info Footer */}
                  <div className="p-3.5 border-t border-slate-100 bg-white">
                    <p className="font-heading text-sm font-semibold text-brand line-clamp-1 group-hover:text-teal-dark transition-colors">
                      {item.title}
                    </p>
                    {item.date && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                        <Calendar size={11} className="text-teal" />
                        {item.date}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryVideos.map((file, idx) => (
              <motion.div
                key={file}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <div className="relative aspect-video w-full bg-black">
                  <video
                    src={mediaUrl(file)}
                    controls
                    className="h-full w-full object-contain"
                    preload="metadata"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-brand">
                    <Video size={14} className="text-teal" />
                    Institute Video #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setVideoLightbox(mediaUrl(file))}
                    className="text-xs font-semibold text-teal-dark hover:underline"
                  >
                    Fullscreen
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rich Image Lightbox Modal with Meta & Navigation */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-3 sm:p-6"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Top Close Button */}
            <button
              type="button"
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 focus:outline-none transition-colors"
              onClick={() => setSelectedItemIndex(null)}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Left Nav Button */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 focus:outline-none transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Right Nav Button */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 focus:outline-none transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[68vh] sm:max-h-[72vh] w-[min(92vw,980px)] bg-slate-950 flex items-center justify-center">
                <Image
                  src={mediaUrl(currentItem.filename)}
                  alt={currentItem.title}
                  width={1400}
                  height={1000}
                  className="max-h-[68vh] sm:max-h-[72vh] w-auto object-contain"
                  unoptimized
                />
              </div>

              {/* Metadata Panel */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">
                      {currentItem.tag}
                    </span>
                    {currentItem.date && (
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Calendar size={12} className="text-teal" />
                        {currentItem.date}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {selectedItemIndex !== null ? selectedItemIndex + 1 : 1} of{" "}
                    {filteredPhotos.length}
                  </span>
                </div>

                <h3 className="mt-2 font-heading text-base sm:text-lg font-bold text-brand">
                  {currentItem.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Fullscreen Lightbox */}
      <AnimatePresence>
        {videoLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
            onClick={() => setVideoLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              onClick={() => setVideoLightbox(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div
              className="relative max-h-[85vh] max-w-[92vw] overflow-hidden rounded-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoLightbox}
                controls
                autoPlay
                className="max-h-[85vh] max-w-[90vw] rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function GalleryPreview() {
  // Show newspaper + Independence Day photos first in the preview!
  const previewItems = [
    ...latestIndependenceDayImages,
    ...allGalleryItems.filter((item) => item.category === "campus").slice(0, 3),
  ].slice(0, 8);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-main">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            label="Institute Gallery"
            title="Independence Day, Campus & Media Highlights"
            description="Explore our latest celebration moments, newspaper press features, and hands-on computer training labs at Sai SEO Solution."
            align="left"
          />
          <Link href="/gallery" className="btn-secondary shrink-0">
            <Images size={16} />
            View Full Gallery
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {previewItems.map((item) => {
            const isNews = item.category === "news";
            const isEvent = item.category === "events";

            return (
              <Link
                key={item.id}
                href={isNews ? "/gallery?tab=news" : isEvent ? "/gallery?tab=independence" : "/gallery"}
                className={`group relative overflow-hidden rounded-2xl border shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${
                  isNews
                    ? "border-teal/40 ring-2 ring-teal/20"
                    : "border-slate-200/80"
                }`}
              >
                {/* Badge */}
                <div className="absolute left-2.5 top-2.5 z-10 rounded-full bg-brand/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
                  {item.tag}
                </div>

                <div className="relative aspect-square bg-slate-100">
                  <Image
                    src={mediaUrl(item.filename)}
                    alt={item.title}
                    fill
                    className={`transition-transform duration-500 group-hover:scale-105 ${
                      isNews ? "object-contain p-2 bg-slate-50" : "object-cover"
                    }`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-brand/0 transition-colors group-hover:bg-brand/20" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
