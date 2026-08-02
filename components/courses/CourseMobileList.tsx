"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  Clock,
  Sparkles,
} from "lucide-react";
import type { Course, CourseCategory } from "@/lib/courses";
import { cn } from "@/lib/utils";

const categoryAccent: Record<CourseCategory, string> = {
  diploma: "from-brand to-brand-light",
  programming: "from-teal-dark to-teal",
  professional: "from-maroon to-maroon-light",
};

const categoryRing: Record<CourseCategory, string> = {
  diploma: "ring-brand/20",
  programming: "ring-teal/25",
  professional: "ring-maroon/20",
};

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

function getCourseImage(courseId: string): string {
  const mapped = courseImageMap[courseId.toLowerCase()];
  if (mapped !== undefined) {
    return mapped;
  }
  return "/courses/diploma_general.png";
}

export default function CourseMobileList({
  courses,
  category,
}: {
  courses: Course[];
  category: CourseCategory;
}) {
  const [openId, setOpenId] = useState<string | null>(courses[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {courses.map((course, index) => {
        const isOpen = openId === course.id;
        const imageUrl = getCourseImage(course.id);
        return (
          <motion.article
            key={course.id}
            id={course.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className={cn(
              "scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/60 ring-1 ring-slate-200/80 transition-shadow",
              isOpen && categoryRing[category]
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : course.id)}
              className="flex w-full items-start gap-3 p-4 text-left"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white",
                  categoryAccent[category]
                )}
              >
                {course.name.length <= 4 ? course.name : course.name.slice(0, 2)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-dark">
                    {course.level}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                    <Clock size={11} />
                    {course.duration}
                  </span>
                </div>
                <h3 className="mt-1.5 font-heading text-[15px] font-bold leading-snug text-brand">
                  {course.fullName}
                </h3>
                {!isOpen && (
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {course.description}
                  </p>
                )}
              </div>

              <ChevronDown
                size={18}
                className={cn(
                  "mt-1 shrink-0 text-slate-400 transition-transform duration-200",
                  isOpen && "rotate-180 text-teal-dark"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-3">
                    <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={imageUrl}
                        alt={course.fullName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {course.description}
                    </p>

                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                        <Sparkles size={13} className="text-teal-dark" />
                        Highlights
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                        <BookOpen size={13} className="text-teal-dark" />
                        Syllabus
                      </p>
                      <ol className="space-y-1.5">
                        {course.syllabus.map((item, i) => (
                          <li
                            key={item}
                            className="flex gap-2.5 rounded-lg bg-surface px-2.5 py-2 text-xs text-slate-600"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal/10 text-[10px] font-bold text-teal-dark">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-xl bg-surface-2 p-3">
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                        <Briefcase size={13} className="text-teal-dark" />
                        Careers
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.career.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-slate-200/80 bg-white px-2 py-1 text-[10px] font-medium text-brand"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
