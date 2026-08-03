"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Award,
  MapPin,
  GraduationCap,
  Phone,
} from "lucide-react";
import { images } from "@/lib/images";

const stats = [
  { value: "15+", label: "Courses" },
  { value: "1000+", label: "Students" },
  { value: "ISO", label: "9001:2015" },
];

const highlights = ["PGDCA & DCA", "Python & Java", "Hardware Repair"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand">
      {/* Mobile hero image — top banner */}
      <div className="relative h-[42vh] min-h-[240px] max-h-[360px] lg:hidden">
        <Image
          src={images.hero}
          alt="Students at Sai SEO Solution"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-brand/30" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-light backdrop-blur-sm">
            <Award size={12} />
            ISO Certified
          </span>
          <h1 className="mt-3 font-heading text-[1.75rem] font-bold leading-tight tracking-tight text-white">
            Learn. Build.{" "}
            <span className="text-teal-light">Succeed.</span>
          </h1>
        </div>
      </div>

      <div className="grid lg:min-h-[92vh] lg:grid-cols-[1fr_1.05fr]">
        {/* Content panel */}
        <div className="relative flex flex-col justify-center px-4 pb-8 pt-5 sm:px-6 lg:px-12 lg:py-32 lg:pb-12 lg:pt-28 xl:px-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative z-10 max-w-xl"
          >
            {/* Desktop-only badge & headline */}
            <span className="mb-5 hidden items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-light lg:inline-flex">
              <Award size={14} />
              ISO 9001:2015 Certified Institute
            </span>

            <h1 className="hidden font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:block lg:text-[3.25rem]">
              Learn. Build.{" "}
              <span className="bg-gradient-to-r from-teal-light to-teal bg-clip-text text-transparent">
                Succeed.
              </span>
            </h1>

            <p className="text-[15px] leading-relaxed text-slate-300 sm:text-base lg:mt-5 lg:text-lg">
              Diploma programs, programming courses & IT services — from one
              trusted campus in Berhampur.
            </p>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-6 lg:flex-wrap">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 lg:mt-8">
              <Link
                href="/#courses"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal/25 transition-all active:scale-[0.98] hover:bg-teal-dark sm:w-auto sm:rounded-full"
              >
                Explore Courses
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/result"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all active:scale-[0.98] hover:border-white/40 hover:bg-white/10 sm:w-auto sm:rounded-full"
              >
                Check Result
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 lg:mt-10 lg:border-t lg:border-white/10 lg:pt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-left"
                >
                  <p className="font-heading text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase leading-tight tracking-wide text-slate-400 sm:text-[11px] lg:text-xs">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm lg:mt-8">
              <a
                href="https://maps.app.goo.gl/RGQptfJFbHUzM5seA"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 hover:opacity-95 transition-opacity"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/20 text-teal-light group-hover:scale-105 transition-transform duration-200">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white group-hover:text-teal-light transition-colors duration-200">
                    Hatibandha Street, Brahmapur
                  </p>
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                    Software & Hardware Solution (View Map)
                  </p>
                </div>
              </a>
              <a
                href="tel:7978258180"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-teal/20 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal/30 active:bg-teal/40 lg:mt-4 lg:w-auto lg:rounded-full lg:px-4 lg:py-2.5 lg:bg-white/10"
              >
                <Phone size={15} className="text-teal-light" />
                Call +91 7978258180
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop image panel */}
        <div className="relative hidden min-h-[480px] lg:block">
          <Image
            src={images.hero}
            alt="Students at Sai SEO Solution"
            fill
            priority
            className="object-cover"
            sizes="55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="absolute right-8 top-1/4 max-w-[220px] rounded-2xl border border-white/20 bg-white/95 p-4 shadow-card backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-brand">
                  Diploma Programs
                </p>
                <p className="text-xs text-muted">PGDCA · DCA · CCA</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="absolute bottom-10 left-8 right-8 rounded-2xl border border-white/20 bg-brand/80 p-5 backdrop-blur-md"
          >
            <p className="font-heading text-lg font-semibold text-white">
              Practical training. Real skills. Better careers.
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Modern computer labs, experienced faculty, and job-oriented courses.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
