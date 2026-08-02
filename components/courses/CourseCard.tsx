"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Briefcase, ChevronDown, Clock, Layers, Check } from "lucide-react";
import type { Course } from "@/lib/courses";
import { cn } from "@/lib/utils";

const courseImageMap: Record<string, string> = {
  pgdca: "/courses/diploma_general.png",
  dca: "/courses/diploma_general.png",
  cca: "/courses/diploma_general.png",
  python: "/courses/python_programming.png",
  java: "/courses/java_backend.png",
  c: "/courses/java_backend.png",
  cpp: "/courses/java_backend.png",
  php: "/courses/web_design.png",
  dotnet: "/courses/java_backend.png",
  oracle: "/courses/database_oracle.png",
  webdesign: "/courses/web_design.png",
  tally: "/courses/office_accounting.png",
  autocad: "/courses/cad_engineering.png",
  photoshop: "/courses/web_design.png",
  hardware: "/courses/hardware_networking.png",
  networking: "/courses/hardware_networking.png",
};

const categoryLabels = {
  diploma: "Diploma Program",
  programming: "Coding Language",
  professional: "Professional Skill",
};

function getCourseImage(courseId: string): string {
  const mapped = courseImageMap[courseId.toLowerCase()];
  if (mapped !== undefined) {
    return mapped;
  }
  return "/courses/diploma_general.png";
}

export default function CourseCard({
  course,
  index,
}: {
  course: Course;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const imageUrl = getCourseImage(course.id);
  const catLabel = categoryLabels[course.category] || course.category;

  return (
    <motion.article
      id={course.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.05 }}
      className="card scroll-mt-28 overflow-hidden group border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Dynamic Image Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={course.fullName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Category Floating Badge */}
          <span className="absolute top-3 right-4 rounded-full bg-slate-950/75 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-200 ring-1 ring-white/10">
            {catLabel}
          </span>

          {/* Level Floating Badge */}
          <span className="absolute bottom-3 left-4 rounded-full bg-teal-dark/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-light">
            {course.level}
          </span>
        </div>

        {/* Title Block */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-dark">
                {course.name}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold leading-snug text-brand sm:text-xl">
                {course.fullName}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0 self-start sm:self-auto rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand ring-1 ring-slate-200/80 shadow-sm">
              <Clock size={12} className="text-teal-dark" />
              {course.duration}
            </div>
          </div>
        </div>

        {/* Description & Key Highlights */}
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-sm leading-relaxed text-slate-600 font-normal">
            {course.description}
          </p>

          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/30">
            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
              <Layers size={14} className="text-teal-dark" />
              Key highlights
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {course.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                  <Check size={14} className="text-teal mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Expanded syllabus & careers section */}
      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between rounded-xl border border-teal/15 bg-teal/5 hover:bg-teal/10 px-4 py-2.5 text-xs font-bold text-brand transition-colors duration-200"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-teal-dark" />
            {expanded ? "Hide syllabus & careers" : "View syllabus & career options"}
          </span>
          <ChevronDown
            size={16}
            className={cn("text-teal-dark transition-transform duration-300", expanded && "rotate-180")}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 border-t border-slate-100 mt-4">
                <SyllabusBlock syllabus={course.syllabus} />
                <CareerBlock career={course.career} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function SyllabusBlock({ syllabus }: { syllabus: string[] }) {
  return (
    <div>
      <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
        <BookOpen size={13} className="text-teal-dark" />
        Course Syllabus
      </p>
      <ol className="grid gap-2 sm:grid-cols-2">
        {syllabus.map((item, i) => (
          <li key={item} className="flex gap-2.5 rounded-lg bg-surface px-3 py-2.5 text-xs text-slate-600 border border-slate-100/50">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal/10 text-[9px] font-bold text-teal-dark">
              {i + 1}
            </span>
            <span className="leading-relaxed font-medium">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CareerBlock({ career }: { career: string[] }) {
  return (
    <div className="rounded-xl bg-surface-2 p-4 border border-slate-200/50">
      <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
        <Briefcase size={13} className="text-teal-dark" />
        Career opportunities
      </p>
      <div className="flex flex-wrap gap-1.5">
        {career.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors px-2.5 py-1.5 text-[11px] font-semibold text-brand shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
