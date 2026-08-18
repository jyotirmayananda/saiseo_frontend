"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  ChevronRight,
  ZoomIn,
  X,
  Award,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  Images,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { mediaUrl, latestIndependenceDayImages } from "@/lib/gallery";

export default function PressCoverage() {
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const newspaperItem = latestIndependenceDayImages[0];
  const celebrationPhotos = latestIndependenceDayImages.slice(1);

  return (
    <section className="relative overflow-hidden bg-surface-2 py-16 sm:py-24 border-y border-slate-200/70">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeader
            label="In The News & Media"
            title="Sai SEO Solution Featured in Daily Newspaper"
            description="Our Independence Day celebration and career skill empowerment covered in regional print media."
            align="left"
          />

          <Link
            href="/gallery?tab=news"
            className="btn-secondary shrink-0 inline-flex items-center gap-2"
          >
            <Images size={16} />
            <span>View All Event Photos</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Featured Newspaper Card & Highlights Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-center">
          {/* Newspaper Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div
              onClick={() => setZoomImage(mediaUrl(newspaperItem.filename))}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-brand/10 bg-white p-3.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl"
            >
              {/* Badge overlay */}
              <div className="absolute left-6 top-6 z-20 flex items-center gap-1.5 rounded-full bg-brand/90 px-3.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
                <Newspaper size={13} className="text-teal-light" />
                <span>Odia Daily Press Clipping</span>
              </div>

              <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={mediaUrl(newspaperItem.filename)}
                  alt="Sai SEO Solution featured in Odia Newspaper"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                    <ZoomIn size={26} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Click to zoom & read full article
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-2 pt-1 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-teal" />
                  Published August 2026
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-teal" />
                  Brahmapur, Odisha
                </span>
              </div>
            </div>
          </motion.div>

          {/* Press Highlights & Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-dark w-fit">
              <Sparkles size={14} className="text-teal" />
              <span>Print Media Recognition</span>
            </div>

            <h3 className="font-heading text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              Celebrating Independence Day with National Pride & Digital Education
            </h3>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              The grand celebration at our Hatibandha Street campus was covered in leading regional print media. Managing Director{" "}
              <strong className="text-brand">Jyotirmaya Nahak</strong> hoisted the National Tricolor, addressing students on digital empowerment and job-oriented IT training in the presence of distinguished guests.
            </p>

            {/* Feature Points */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand">
                    Leadership Address
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Flag hoisting and motivational address by Director Jyotirmaya Nahak.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand">
                    Honored Guests
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Presence of Kairaba Prasad Das, Sanjita Mohanty & Manoranjan Sahu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand">
                    Brahmapur Campus
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Held at Sai Skill Development / Sai SEO Solution, Hatibandha Street.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand">
                    Student Empowerment
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Inspiring youth with practical software, hardware, and IT careers.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick mini photo row */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                🇮🇳 Independence Day Campus Moments
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {celebrationPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setZoomImage(mediaUrl(photo.filename))}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <Image
                      src={mediaUrl(photo.filename)}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="100px"
                    />
                    <div className="absolute inset-0 bg-brand/20 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setZoomImage(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/25 focus:outline-none"
              onClick={() => setZoomImage(null)}
              aria-label="Close image preview"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[80vh] w-[min(90vw,860px)]">
                <Image
                  src={zoomImage}
                  alt="Full preview"
                  width={1200}
                  height={900}
                  className="max-h-[78vh] w-auto mx-auto object-contain"
                  unoptimized
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3 text-xs text-slate-600">
                <span className="font-semibold text-brand">
                  Sai SEO Solution — Press & Event Gallery
                </span>
                <button
                  onClick={() => setZoomImage(null)}
                  className="rounded-full bg-surface-2 px-3 py-1 font-semibold text-brand hover:bg-slate-200"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
