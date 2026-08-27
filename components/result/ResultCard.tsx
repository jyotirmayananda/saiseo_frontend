"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultCardProps {
  data: {
    student: {
      name: string;
      rollNumber: string;
      course: string;
      fatherName: string;
      photoUrl?: string | null;
      certificateUrl?: string | null;
      studentType?: string;
      internshipStartDate?: string | null;
      internshipEndDate?: string | null;
      passoutYear?: string | null;
      passoutDate?: string | null;
    };
    results: {
      subjectName: string;
      marksObtained: number;
      maxMarks: number;
    }[];
    totalObtained: number;
    totalMax: number;
    percentage: number;
    grade: string;
    passed: boolean;
  };
}

export default function ResultCard({ data }: ResultCardProps) {
  const isIntern = data.student.studentType === "internship";

  return (
    <div className="card overflow-hidden shadow-card">
      <div className="bg-brand px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-light">
          {isIntern ? "Internship Record" : "Examination Result"}
        </p>
        <p className="font-heading font-semibold text-white">Sai SEO Solution</p>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="grid gap-4 sm:grid-cols-2 flex-1">
            <Info label={isIntern ? "Intern" : "Student"} value={data.student.name} />
            <Info label="Roll No." value={data.student.rollNumber} />
            <Info label={isIntern ? "Domain" : "Course"} value={data.student.course} />
            <Info label="Father's Name" value={data.student.fatherName} />
            {data.student.passoutYear && (
              <Info label="Passout Year" value={data.student.passoutYear} />
            )}
            {data.student.passoutDate && (
              <Info label="Passout Date" value={data.student.passoutDate} />
            )}
            {isIntern && data.student.internshipStartDate && (
              <Info label="Internship Start" value={data.student.internshipStartDate} />
            )}
            {isIntern && data.student.internshipEndDate && (
              <Info label="Internship End" value={data.student.internshipEndDate} />
            )}
          </div>
          {data.student.photoUrl && (
            <img
              src={data.student.photoUrl}
              alt={data.student.name}
              className="h-20 w-20 rounded-full object-cover border border-slate-200 self-center sm:self-auto"
            />
          )}
        </div>

        {data.results.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-surface">
                <th className="px-4 py-2.5 text-left font-semibold text-muted">Subject</th>
                <th className="px-4 py-2.5 text-center font-semibold text-muted">Marks</th>
                <th className="px-4 py-2.5 text-center font-semibold text-muted">Max</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((r, i) => (
                <motion.tr
                  key={r.subjectName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-2.5 text-brand">{r.subjectName}</td>
                  <td className="px-4 py-2.5 text-center font-semibold text-brand">
                    {r.marksObtained}
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted">{r.maxMarks}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {data.results.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total" value={`${data.totalObtained}/${data.totalMax}`} />
          <Stat label="Percentage" value={`${data.percentage}%`} />
          <Stat label="Grade" value={data.grade} />
          <div className="flex flex-col items-center justify-center rounded-xl bg-surface p-3">
            <span className="text-xs text-muted">Status</span>
            <span
              className={`mt-0.5 flex items-center gap-1 text-sm font-bold ${
                data.passed ? "text-forest" : "text-red-600"
              }`}
            >
              {data.passed ? (
                <>
                  <CheckCircle size={14} /> PASS
                </>
              ) : (
                <>
                  <XCircle size={14} /> FAIL
                </>
              )}
            </span>
          </div>
        </div>
        )}

        {data.student.certificateUrl && (
          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Official Certificate
            </p>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-surface p-2 flex justify-center">
              <img
                src={data.student.certificateUrl}
                alt="Certificate"
                className="w-full h-auto max-h-[400px] object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 font-medium text-brand">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface p-3 text-center">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 font-heading text-lg font-bold text-brand">{value}</p>
    </div>
  );
}
